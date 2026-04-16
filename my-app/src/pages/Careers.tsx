import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCareerController } from '../controllers/careerController';
import { JobCard, JobDetail } from '../components/careers';
import '../styles/careers.css';

const CareersPage: React.FC = () => {
    const { jobs, loading, error, selectedJob, setSelectedJob } = useCareerController();
    const navigate = useNavigate();

    function handleApply(job: any) {
        navigate(`/careers/apply?roleTitle=${encodeURIComponent(job.title)}`, {
            state: { job }
        });
    }

    return (
        <div className="careers-standalone-wrapper">
          <div className="careers-page">
              <div className="careers-hero">
                  <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      className="container"
                  >
                      <span className="phi-label">Join the Studio</span>
                      <h1 className="careers-hero__title">Build the Next Legend</h1>
                      <p className="careers-hero__sub">
                          Fluke Games is looking for passionate volunteers to help craft an experience
                          unlike anything the world has seen. No salary, just pure creative fire.
                      </p>
                  </motion.div>
              </div>

              <div className="container careers-layout">
                  {loading && (
                      <div className="careers-loading">
                          <div className="hex-pulse" />
                          <p>Loading open roles…</p>
                      </div>
                  )}

                  {error && (
                      <div className="careers-error">
                          <p>{error}</p>
                      </div>
                  )}

                  {!loading && !error && jobs.length === 0 && (
                      <div className="careers-empty">
                          <p>No open roles right now. Check back soon.</p>
                      </div>
                  )}

                  {!loading && !error && jobs.length > 0 && (
                      <div className="careers-split">
                          <aside className="careers-list">
                              {jobs.map((job) => {
                                  const isSelected = selectedJob?.jobId === job.jobId && selectedJob?.title === job.title;
                                  return (
                                      <div key={job.jobId || job.title} className="careers-list-item">
                                          <JobCard
                                              job={job}
                                              isSelected={isSelected}
                                              onClick={setSelectedJob}
                                          />
                                          <AnimatePresence>
                                              {isSelected && (
                                                  <motion.div
                                                      initial={{ height: 0, opacity: 0 }}
                                                      animate={{ height: "auto", opacity: 1 }}
                                                      exit={{ height: 0, opacity: 0 }}
                                                      className="careers-mobile-detail-wrapper"
                                                  >
                                                      <JobDetail job={selectedJob} onApply={handleApply} />
                                                  </motion.div>
                                              )}
                                          </AnimatePresence>
                                      </div>
                                  );
                              })}
                          </aside>
 
                          <div className="careers-detail">
                              <AnimatePresence mode="wait">
                                  {selectedJob ? (
                                      <JobDetail key={selectedJob.jobId || selectedJob.title} job={selectedJob} onApply={handleApply} />
                                  ) : (
                                      <motion.p
                                          key="hint"
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          className="careers-hint"
                                      >
                                          ← Select a role to view details
                                      </motion.p>
                                  )}
                              </AnimatePresence>
                          </div>
                      </div>
                  )}
              </div>
          </div>
        </div>
    );
};

export default CareersPage;
