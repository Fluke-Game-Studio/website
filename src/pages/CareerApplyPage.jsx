import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const JOBS_API_URL = 'https://xtipeal88c.execute-api.us-east-1.amazonaws.com/jobs';
const APPLY_API_URL = 'https://xtipeal88c.execute-api.us-east-1.amazonaws.com/apply';

function safeStr(x) {
  return x === null || x === undefined ? '' : String(x);
}

function normalizeQuestion(q) {
  const id = q?.id || q?.key;
  if (!id) return null;

  let type = String(q?.type || 'text').toLowerCase().trim();
  if (['phone', 'phonenumber', 'mobile'].includes(type)) type = 'tel';
  if (['longtext', 'multiline'].includes(type)) type = 'textarea';
  if (type === 'singlechoice') type = 'radio';
  if (type === 'multichoice') type = 'checkbox';

  return {
    key: id,
    label: q?.label || id,
    type,
    required: !!q?.required,
    options: q?.options || []
  };
}

function questionGroupsFromJob(job) {
  const normalizeList = (arr) => (arr || []).map(normalizeQuestion).filter(Boolean);

  const groups = [
    { title: 'General Questions', fields: normalizeList(job?.generalQuestions) },
    { title: 'Applicant Information', fields: normalizeList(job?.personalQuestions) },
    { title: safeStr(job?.title || 'Role Questions'), fields: normalizeList(job?.roleQuestions) },
    {
      title: 'Acknowledgement',
      fields: [
        {
          key: 'ackVolunteer',
          label: 'I acknowledge that this is a volunteer based role.',
          type: 'radio',
          required: true,
          options: ['Agree and Submit', 'Disagree']
        }
      ]
    }
  ];

  return groups.filter((g) => g.fields.length > 0);
}

export default function CareerApplyPage() {
  const [params] = useSearchParams();
  const roleTitle = params.get('roleTitle') || '';
  const jobId = params.get('jobId') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ roleTitle, jobId, whatsappOptIn: false });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetch(JOBS_API_URL, { headers: { Accept: 'application/json' } })
      .then(async (resp) => {
        if (!resp.ok) throw new Error('Unable to load application form.');
        const data = await resp.json();
        const items = data?.items || [];
        const found = items.find((j) => safeStr(j.jobId) === jobId)
          || items.find((j) => safeStr(j.title).toLowerCase() === safeStr(roleTitle).toLowerCase())
          || null;

        if (!found) {
          setError('Unable to open application: role not found.');
          return;
        }

        setJob(found);
        setForm((prev) => ({ ...prev, roleTitle: found.title || roleTitle, jobId: found.jobId || jobId }));
      })
      .catch((e) => {
        setError(e?.message || 'Unable to load application form.');
      })
      .finally(() => setLoading(false));
  }, [jobId, roleTitle]);

  const groups = useMemo(() => questionGroupsFromJob(job), [job]);

  const setValue = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    for (const group of groups) {
      for (const field of group.fields) {
        const value = form[field.key];
        if (field.required) {
          const empty = value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length);
          if (empty) return `${field.label} is required.`;
        }
      }
    }

    if (form.ackVolunteer !== 'Agree and Submit') {
      return 'Please select "Agree and Submit" before submitting.';
    }

    return '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (submitting || submitted || loading) return;

    const validation = validate();
    if (validation) {
      setError(validation);
      return;
    }

    setError('');
    setSubmitting(true);

    const payload = {
      meta: {
        submittedAt: new Date().toISOString(),
        source: 'fluke-games-careers',
        formVersion: 'react-v1'
      },
      role: {
        id: safeStr(job?.title).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: form.roleTitle,
        jobId: form.jobId,
        team: safeStr(job?.team),
        location: safeStr(job?.location),
        employmentType: safeStr(job?.employmentType)
      },
      applicant: {
        fullName: form.fullName || form.name || '',
        email: form.email || '',
        phone: form.phone || '',
        whatsappOptIn: !!form.whatsappOptIn
      },
      answersRaw: form,
      answersReadable: form
    };

    fetch(APPLY_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(async (resp) => {
        const data = await resp.json().catch(() => ({}));
        if (!resp.ok) {
          throw new Error(data?.message || data?.error || 'Submit failed. Please try again.');
        }
        setSubmitted(true);
        setReceipt({
          roleTitle: form.roleTitle,
          email: form.email || '',
          submittedPretty: new Date().toLocaleString(),
          trackingId: data.trackingId || data.applicationId || data.requestId || data.id || ''
        });
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        const msg = err?.message || 'Submit failed. Please try again.';
        setError(msg);
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) return <div className="container" style={{ paddingTop: '130px' }}>Loading application form...</div>;
  if (error && !job) return <div className="container" style={{ paddingTop: '130px' }}>{error}</div>;

  return (
    <div className="container career-apply-wrap" style={{ paddingTop: '130px', paddingBottom: '50px' }}>
      <div className="career-card card z-depth-3">
        <div className="card-content">
          <h4 style={{ color: '#ffd54f', marginTop: 0 }}>Fluke Games Application</h4>
          <p style={{ color: 'white' }}>Role: <b>{form.roleTitle || 'General Application'}</b></p>

          {error && <div className="career-note">{error}</div>}

          {submitted ? (
            <div className="career-success-box" style={{ marginTop: '16px' }}>
              <div>Application received.</div>
              <div>Role: {receipt?.roleTitle}</div>
              <div>Email: {receipt?.email}</div>
              <div>Submitted: {receipt?.submittedPretty}</div>
              {receipt?.trackingId && <div>Tracking ID: {receipt.trackingId}</div>}
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              {groups.map((group) => (
                <section key={group.title} style={{ marginBottom: '20px' }}>
                  <h5 style={{ color: 'white' }}>{group.title}</h5>
                  {group.fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: '12px' }}>
                      <label style={{ color: 'white', display: 'block', marginBottom: '6px' }}>
                        {field.label}{field.required ? ' *' : ''}
                      </label>

                      {field.type === 'textarea' && (
                        <textarea
                          value={form[field.key] || ''}
                          onChange={(e) => setValue(field.key, e.target.value)}
                          className="browser-default"
                          rows={4}
                        />
                      )}

                      {['text', 'email', 'url', 'tel'].includes(field.type) && (
                        <input
                          className="browser-default"
                          type={field.type}
                          value={form[field.key] || ''}
                          onChange={(e) => setValue(field.key, e.target.value)}
                        />
                      )}

                      {field.type === 'radio' && field.options.map((opt) => (
                        <label key={opt} style={{ color: 'white', marginRight: '12px' }}>
                          <input
                            type="radio"
                            name={field.key}
                            value={opt}
                            checked={form[field.key] === opt}
                            onChange={() => setValue(field.key, opt)}
                          />
                          <span style={{ marginLeft: '6px' }}>{opt}</span>
                        </label>
                      ))}

                      {field.type === 'checkbox' && field.options.map((opt) => {
                        const arr = Array.isArray(form[field.key]) ? form[field.key] : [];
                        const checked = arr.includes(opt);
                        return (
                          <label key={opt} style={{ color: 'white', marginRight: '12px' }}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => {
                                const next = checked ? arr.filter((x) => x !== opt) : [...arr, opt];
                                setValue(field.key, next);
                              }}
                            />
                            <span style={{ marginLeft: '6px' }}>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  ))}
                </section>
              ))}

              <button type="submit" className="btn amber darken-2" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
