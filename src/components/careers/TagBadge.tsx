import React from 'react';

interface TagBadgeProps {
    tag: string;
}

export const TagBadge: React.FC<TagBadgeProps> = ({ tag }) => (
    <span className="career-tag font-orbitron">{tag}</span>
);
