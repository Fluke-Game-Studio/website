import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useApplicationController } from '../controllers/applicationController';
import '../styles/careers.css';

type LocationState = {
  job?: {
    title?: string;
    department?: string;
    location?: string;
  };
};

function FieldInput({ field, value, onChange }: any) {
  const baseClass = 'w-full px-4 py-3 rounded-xl bg-fluke-surface border border-fluke-yellow/20 text-fluke-text font-sora text-sm placeholder:text-fluke-muted/50 focus:outline-none focus:border-fluke-yellow/60 transition-colors';

  if (field.type === 'textarea') {
    return (
      <textarea
        className={baseClass}
        value={value ?? ''}
        onChange={(event) => onChange(field.id, event.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        rows={5}
      />
    );
  }

  if (field.type === 'radio' && Array.isArray(field.options) && field.options.length > 0) {
    return (
      <div className="space-y-3">
        {field.options.map((option: string) => (
          <label
            key={option}
            className="flex items-center gap-3 rounded-xl border border-fluke-yellow/15 bg-fluke-surface px-4 py-3 cursor-pointer"
          >
            <input
              type="radio"
              name={field.id}
              value={option}
              checked={value === option}
              onChange={() => onChange(field.id, option)}
              className="accent-fluke-yellow"
            />
            <span className="font-orbitron text-[11px] tracking-wide uppercase text-fluke-text">{option}</span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === 'checkbox') {
    if (Array.isArray(field.options) && field.options.length > 0) {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div className="space-y-3">
          {field.options.map((option: string) => {
            const checked = selected.includes(option);
            return (
              <label
                key={option}
                className="flex items-center gap-3 rounded-xl border border-fluke-yellow/15 bg-fluke-surface px-4 py-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    const next = checked
                      ? selected.filter((item: string) => item !== option)
                      : [...selected, option];
                    onChange(field.id, next);
                  }}
                  className="accent-fluke-yellow"
                />
                <span className="font-orbitron text-[11px] tracking-wide uppercase text-fluke-text">{option}</span>
              </label>
            );
          })}
        </div>
      );
    }

    return (
      <label className="flex items-center gap-3 rounded-xl border border-fluke-yellow/15 bg-fluke-surface px-4 py-3 cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(field.id, event.target.checked)}
          className="accent-fluke-yellow"
        />
        <span className="font-orbitron text-[11px] tracking-wide uppercase text-fluke-text">{field.label}</span>
      </label>
    );
  }

  if (field.type === 'select' && Array.isArray(field.options) && field.options.length > 0) {
    return (
      <select
        className={baseClass}
        value={value ?? ''}
        onChange={(event) => onChange(field.id, event.target.value)}
        required={field.required}
      >
        <option value="">Select an option</option>
        {field.options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  const inputType =
    field.type === 'email' || field.type === 'url' || field.type === 'tel' || field.type === 'number'
      ? field.type
      : 'text';

  return (
    <input
      type={inputType}
      className={baseClass}
      value={value ?? ''}
      onChange={(event) => onChange(field.id, event.target.value)}
      placeholder={field.placeholder}
      required={field.required}
    />
  );
}

export default function CareersApplyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const state = location.state as LocationState | null;
  const roleTitle = state?.job?.title || searchParams.get('roleTitle');

  const {
    flow,
    loading,
    error,
    currentChapter,
    nextChapter,
    prevChapter,
    answers,
    setAnswer,
    validateChapter,
    isSubmitting,
    isSubmitted,
    submitError,
    submitReceipt,
    submit,
  } = useApplicationController(roleTitle);

  const chapter = flow?.chapters[currentChapter];
  const isLastChapter = !!flow && currentChapter === flow.chapters.length - 1;
  const canContinue = chapter ? validateChapter(chapter) : false;

  const handlePrimaryAction = () => {
    if (!chapter || !canContinue) return;
    if (isLastChapter) {
      void submit();
      return;
    }
    nextChapter();
  };

  return (
    <div className="min-h-screen bg-fluke-bg pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <button
          type="button"
          onClick={() => navigate('/careers')}
          className="inline-flex items-center gap-2 text-sm text-fluke-muted hover:text-fluke-yellow transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to careers
        </button>

        {loading && (
          <div
            className="rounded-2xl p-10 text-center"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--card-shadow)' }}
          >
            <p className="font-sora text-fluke-muted">Loading application questions…</p>
          </div>
        )}

        {!loading && error && (
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--card-shadow)' }}
          >
            <h1 className="font-orbitron text-2xl text-fluke-text mb-3">Unable to load form</h1>
            <p className="font-sora text-fluke-muted">{error}</p>
          </div>
        )}

        {!loading && !error && flow && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            <section
              className="lg:col-span-2 rounded-2xl p-8"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--card-shadow)' }}
            >
              <p className="font-orbitron text-[10px] tracking-[0.4em] text-fluke-yellow uppercase mb-4">
                Application
              </p>
              <h1 className="font-bebas text-5xl text-fluke-text uppercase leading-none mb-4">
                Apply for {flow.roleTitle}
              </h1>
              <p className="font-sora text-fluke-muted mb-6">
                Complete the questions below to submit your application.
              </p>

              <div className="space-y-3 mb-6">
                {flow.chapters.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className={`rounded-xl px-4 py-3 border ${index === currentChapter ? 'border-fluke-yellow/50 bg-fluke-surface' : 'border-fluke-yellow/15 bg-fluke-surface/70'}`}
                  >
                    <p className="font-orbitron text-[10px] tracking-[0.3em] text-fluke-yellow uppercase mb-1">
                      Step {index + 1}
                    </p>
                    <p className="font-sora text-sm text-fluke-text">{item.title}</p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate('/careers')}
                className="btn-outline w-full py-3 rounded-xl font-sora"
              >
                Review roles instead
              </button>
            </section>

            <section
              className="lg:col-span-3 rounded-2xl p-8"
              style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', boxShadow: 'var(--card-shadow)' }}
            >
              {isSubmitted ? (
                <div className="min-h-[360px] flex flex-col items-center justify-center text-center">
                  <CheckCircle2 size={56} className="text-fluke-yellow mb-4" />
                  <h2 className="font-orbitron text-2xl text-fluke-text mb-3">Application received</h2>
                  <p className="font-sora text-fluke-muted max-w-md mb-6">
                    Thanks, your application was submitted successfully.
                  </p>
                  {submitReceipt && (
                    <pre className="w-full max-w-lg rounded-xl bg-fluke-surface border border-fluke-yellow/15 p-4 text-left text-xs text-fluke-muted overflow-auto">
                      {JSON.stringify(submitReceipt, null, 2)}
                    </pre>
                  )}
                </div>
              ) : chapter ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={chapter.title}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="font-orbitron text-[10px] tracking-[0.4em] text-fluke-yellow uppercase mb-3">
                        Chapter {currentChapter + 1} of {flow.chapters.length}
                      </p>
                      <h2 className="font-bebas text-4xl text-fluke-text uppercase leading-none mb-3">
                        {chapter.title}
                      </h2>
                      {chapter.description && (
                        <p className="font-sora text-fluke-muted mb-8 max-w-2xl">
                          {chapter.description}
                        </p>
                      )}

                      <div className="space-y-6">
                        {chapter.fields.length > 0 ? (
                          chapter.fields.map((field: any) => (
                            <div key={field.id}>
                              <label className="font-orbitron text-[10px] tracking-widest text-fluke-yellow uppercase mb-2 block">
                                {field.label}{field.required ? ' *' : ''}
                              </label>
                              <FieldInput field={field} value={answers[field.id]} onChange={setAnswer} />
                              {field.helpText && (
                                <p className="mt-2 text-xs text-fluke-muted font-sora">
                                  {field.helpText}
                                </p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="font-sora text-fluke-muted">
                            No questions were configured for this step.
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {submitError && (
                    <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {submitError}
                    </div>
                  )}

                  <footer className="mt-8 flex flex-col sm:flex-row gap-4 justify-between border-t border-fluke-yellow/15 pt-6">
                    <button
                      type="button"
                      onClick={prevChapter}
                      disabled={currentChapter === 0 || isSubmitting}
                      className="btn-outline flex items-center justify-center gap-2 flex-1 py-3 rounded-xl font-sora disabled:opacity-40"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={handlePrimaryAction}
                      disabled={!canContinue || isSubmitting}
                      className="btn-primary flex items-center justify-center gap-2 flex-1 py-3 rounded-xl font-sora disabled:opacity-40"
                    >
                      {isLastChapter ? (
                        <>
                          {isSubmitting ? 'Submitting…' : 'Submit Application'}
                          <Send size={16} />
                        </>
                      ) : (
                        <>
                          Continue
                          <ChevronRight size={16} />
                        </>
                      )}
                    </button>
                  </footer>
                </>
              ) : null}
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
