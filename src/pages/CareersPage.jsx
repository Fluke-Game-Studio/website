import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = 'https://xtipeal88c.execute-api.us-east-1.amazonaws.com';

function normalizeJobs(payload) {
  const items = payload?.items || payload?.Items || payload?.data || (Array.isArray(payload) ? payload : []);
  return (items || []).map((j) => {
    const rawDesc = j?.description || j?.desc || '';
    const desc = rawDesc.includes('<')
      ? rawDesc
      : String(rawDesc)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');

    return {
      jobId: String(j?.jobId || j?.id || ''),
      title: String(j?.title || ''),
      type: String(j?.employmentType || j?.employment_type || j?.type || 'Volunteer (Remote)'),
      tags: Array.isArray(j?.tags) ? j.tags : [],
      desc
    };
  });
}

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE}/jobs`, { headers: { Accept: '*/*' } })
      .then(async (resp) => {
        if (!resp.ok) throw new Error('Failed to load jobs');
        const data = await resp.json();
        const body = typeof data?.body === 'string' ? JSON.parse(data.body) : data;
        if (!isMounted) return;
        setJobs(normalizeJobs(body));
      })
      .catch((err) => {
        if (!isMounted) return;
        setLoadError(err?.message || 'Failed to load jobs');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const hasJobs = useMemo(() => !loading && !loadError && jobs.length > 0, [loading, loadError, jobs]);

  return (
    <div className="careers-wrap" style={{ paddingTop: '90px' }}>
      <h4 className="gold-text" style={{ fontFamily: 'FlukeGame', color: '#fff', margin: 0 }}>Careers</h4>
      <p className="white-text careers-subtitle">
        We are building an education-driven community studio. Roles are volunteer and focused on portfolio growth.
      </p>

      {loading && <div className="careers-note">Loading roles...</div>}
      {!loading && loadError && <div className="careers-note">{loadError}</div>}
      {!loading && !loadError && !jobs.length && <div className="careers-note">No active roles are available right now.</div>}

      {hasJobs && (
        <div className="job-list">
          {jobs.map((job, index) => (
            <button
              type="button"
              key={job.jobId || index}
              className="frostEffect job-card"
              onClick={() => setSelectedJob(job)}
              style={{ width: '100%', border: 'none', textAlign: 'left', color: 'inherit', background: 'rgba(255,255,255,0.04)' }}
            >
              <div style={{ display: 'flex', gap: '12px', minWidth: 0 }}>
                <i className="fas fa-briefcase" />
                <div style={{ minWidth: 0 }}>
                  <div className="job-title truncate">{job.title}</div>
                  <div className="job-meta">
                    <span className="job-chip">{job.type}</span>
                    {job.tags.map((tag, idx) => <span className="job-chip" key={idx}>{tag}</span>)}
                  </div>
                </div>
              </div>
              <div className="job-right">
                <span className="white-text" style={{ fontWeight: 800 }}>View</span>
                <i className="fas fa-chevron-right" />
              </div>
            </button>
          ))}
        </div>
      )}

      {selectedJob && (
        <div className="job-modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="job-modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="job-hero">
              <h5 className="job-hero-title">{selectedJob.title}</h5>
              <button type="button" className="btn-flat white-text" onClick={() => setSelectedJob(null)}>
                <i className="fas fa-times" />
              </button>
            </div>
            <div style={{ color: '#fff', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: selectedJob.desc }} />
            <div style={{ marginTop: '18px', display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                to={`/careers/apply?jobId=${encodeURIComponent(selectedJob.jobId)}&roleTitle=${encodeURIComponent(selectedJob.title)}`}
                className="btn waves-effect waves-light amber darken-2"
                onClick={() => setSelectedJob(null)}
              >
                Apply
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
