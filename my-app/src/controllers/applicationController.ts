// src/controllers/applicationController.ts
import { useState, useEffect } from 'react';
import { careerService, Job } from '../services/careerService';
import { buildApplicationFlow, applicationService, ApplicationFlow } from '../services/applicationService';

/**
 * Controller hook for managing job application flow
 * Handles form state, navigation, validation, and submission
 */
export function useApplicationController(roleTitle: string | null) {
    const [flow, setFlow] = useState<ApplicationFlow | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentChapter, setCurrentChapter] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitReceipt, setSubmitReceipt] = useState<any>(null);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (!roleTitle) return;
        let cancelled = false;

        setLoading(true);
        setError('');

        careerService.fetchJobs()
            .then((jobs) => {
                if (cancelled) return;

                const title = String(roleTitle).trim().toLowerCase();
                const job =
                    jobs.find((j) => String(j.title).trim().toLowerCase() === title) ||
                    jobs.find((j) => String(j.title).trim().toLowerCase().includes(title)) ||
                    null;

                if (!job) {
                    setError(`Role "${roleTitle}" not found.`);
                    return;
                }

                const built = buildApplicationFlow(job.raw || job);
                setFlow(built);
                setCurrentChapter(0);
                setAnswers({});
                setTouched({});
            })
            .catch((err) => {
                if (cancelled) return;
                setError(err?.message || 'Failed to load application form.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [roleTitle]);

    function setAnswer(key: string, value: any) {
        setAnswers((prev) => ({ ...prev, [key]: value }));
        setTouched((prev) => ({ ...prev, [key]: true }));
    }

    function getFieldErrors(chapter: any) {
        const errs: Record<string, string> = {};
        if (!chapter?.fields) return errs;
        for (const field of chapter.fields) {
            const val = answers[field.id];
            
            if (field.required) {
                if (val === undefined || val === null || String(val).trim() === '') {
                    errs[field.id] = 'Required parameter.';
                    continue;
                }
                if (Array.isArray(val) && val.length === 0) {
                    errs[field.id] = 'Please select at least one option.';
                    continue;
                }
                if (typeof val === 'boolean' && val === false) {
                    errs[field.id] = 'This must be checked.';
                    continue;
                }
            }

            if (field.id === 'ackVolunteer' && val && String(val).trim().toLowerCase() !== 'i confirm for the volunteer position') {
                errs[field.id] = 'Please type "I confirm for the volunteer position" to proceed.';
                continue;
            }

            if (val && String(val).trim() !== '') {
                const str = String(val).trim();
                if (field.type === 'email') {
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) errs[field.id] = 'Invalid email address.';
                }
                if (field.type === 'url') {
                    if (!/^https?:\/\/.+\..+/.test(str)) errs[field.id] = 'Invalid URL (must start with http:// or https://).';
                }
                if (field.type === 'tel') {
                    const digitCount = (str.match(/\d/g) || []).length;
                    if (!/^[+]?[\d\s\-\(\)]{7,25}$/.test(str) || digitCount < 10) {
                        errs[field.id] = 'Phone number must contain at least 10 digits.';
                    }
                }
            }
        }
        return errs;
    }

    function validateChapter(chapter: any) {
        return Object.keys(getFieldErrors(chapter)).length === 0;
    }

    function buildApplicantProfile() {
        const applicant: Record<string, any> = {};

        if (!flow) return applicant;

        for (const chapter of flow.chapters) {
            for (const field of chapter.fields || []) {
                const value = answers[field.id];
                if (value === undefined || value === null || value === '') continue;

                const text = String(value).trim();
                const label = `${field.label || ''} ${field.id || ''}`.toLowerCase();

                if (!applicant.email && field.type === 'email') {
                    applicant.email = text;
                    continue;
                }

                if (!applicant.fullName && /full\s*name|\bname\b/.test(label) && !/username/.test(label)) {
                    applicant.fullName = text;
                    continue;
                }

                if (!applicant.phone && field.type === 'tel') {
                    applicant.phone = text;
                    continue;
                }

                if (!applicant.resume && /resume|cv/.test(label)) {
                    applicant.resume = text;
                    continue;
                }

                if (!applicant.portfolio && /portfolio|website/.test(label)) {
                    applicant.portfolio = text;
                    continue;
                }

                if (!applicant.address && /address/.test(label)) {
                    applicant.address = text;
                    continue;
                }

                if (!applicant.city && /city/.test(label)) {
                    applicant.city = text;
                    continue;
                }

                if (!applicant.country && /country/.test(label)) {
                    applicant.country = text;
                }
            }
        }

        return applicant;
    }

    function nextChapter() {
        if (!flow) return;
        if (currentChapter < flow.chapters.length - 1) {
            setCurrentChapter((c) => c + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    function prevChapter() {
        if (currentChapter > 0) {
            setCurrentChapter((c) => c - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    async function submit() {
        if (!flow) return;

        // Custom validation for volunteer acknowledgement if present
        const ack = answers['ackVolunteer'];
        if (answers.hasOwnProperty('ackVolunteer') && String(ack).trim().toLowerCase() !== 'i confirm for the volunteer position') {
            setSubmitError('Please type "I confirm for the volunteer position" to acknowledge the position terms.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const applicant = buildApplicantProfile();

            const res = await applicationService.submitApplication({
                role: {
                    id: flow.roleId,
                    title: flow.roleTitle,
                },
                applicant,
                answers,
                meta: {
                    source: 'website-careers',
                    formVersion: '1',
                    submittedAt: new Date().toISOString(),
                },
            });
            setSubmitReceipt(res);
            setIsSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err: any) {
            setSubmitError(err.message || 'Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        flow,
        loading,
        error,
        currentChapter,
        nextChapter,
        prevChapter,
        answers,
        setAnswer,
        validateChapter,
        getFieldErrors,
        touched,
        setTouched,
        isSubmitting,
        isSubmitted,
        submitError,
        submitReceipt,
        submit
    };
}
