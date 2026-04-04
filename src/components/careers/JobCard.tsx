import React from 'react';
import { motion } from 'framer-motion';
import { Job } from '../../services/careerService';
import { TagBadge } from './TagBadge';

interface JobCardProps {
    job: Job;
    isSelected: boolean;
    onClick: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isSelected, onClick }) => (
    <motion.div
        className={`job-card ${isSelected ? 'job-card--active' : ''}`}
        onClick={() => onClick(job)}
        whileHover={{ x: 4 }}
        layout
    >
        <div className="job-card__header">
            <h3 className="job-card__title">{job.title}</h3>
            <span className="job-card__type">{job.type}</span>
        </div>
        {job.tags?.length > 0 && (
            <div className="job-card__tags">
                {job.tags.map((tag, i) => <TagBadge key={i} tag={tag} />)}
            </div>
        )}
    </motion.div>
);
