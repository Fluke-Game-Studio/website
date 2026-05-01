// src/controllers/applicationController.ts
import { useState, useEffect } from 'react';
import { careerService } from '../services/careerService';
import { buildApplicationFlow, applicationService, ApplicationFlow } from '../services/applicationService';
import { googlePrefillService, type GooglePrefillUser } from '../services/googlePrefillService';

const VOLUNTEER_CONFIRMATION_TEXT = 'I confirm this is a volunteer role';

function safeStr(value: any): string {
    return value === null || value === undefined ? '' : String(value);
}

function isEmpty(value: any): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    return false;
}

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
    const [googleUser, setGoogleUser] = useState<GooglePrefillUser | null>(() => googlePrefillService.readUser());

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
                const baseAnswers = built ? {
                    roleId: built.role.id || '',
                    roleTitle: built.role.title || '',
                    jobId: built.role.jobId || '',
                    whatsappOptIn: false,
                } : {};
                setAnswers(applyGooglePrefillToAnswers(baseAnswers, built, googlePrefillService.readUser()));
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

    useEffect(() => {
        const onGoogleUser = (event: Event) => {
            const user = (event as CustomEvent).detail || googlePrefillService.readUser();
            setGoogleUser(user);
            setAnswers((prev) => applyGooglePrefillToAnswers(prev, flow, user));
        };
        window.addEventListener('fg-google-user', onGoogleUser as EventListener);
        return () => window.removeEventListener('fg-google-user', onGoogleUser as EventListener);
    }, [flow]);

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

            if (field.id === 'ackVolunteer' && val && safeStr(val).trim() !== VOLUNTEER_CONFIRMATION_TEXT) {
                errs[field.id] = `Please type "${VOLUNTEER_CONFIRMATION_TEXT}" to proceed.`;
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

        if (chapter.fields.some((field: any) => isPhoneField(field))) {
            const phoneKey = getPhoneFieldKey();
            if (phoneKey && !isEmpty(answers[phoneKey]) && !answers.whatsappOptIn) {
                errs.whatsappOptIn = 'Please confirm WhatsApp consent to proceed.';
            }
        }

        return errs;
    }

    function validateChapter(chapter: any) {
        return Object.keys(getFieldErrors(chapter)).length === 0;
    }

    function allFields() {
        return (flow?.chapters || []).flatMap((chapter) => chapter.fields || []);
    }

    function fieldsFor(targetFlow: ApplicationFlow | null) {
        return (targetFlow?.chapters || []).flatMap((chapter) => chapter.fields || []);
    }

    function detectFieldKey(predicateFn: (field: any) => boolean, fallbackKey = '') {
        for (const field of allFields()) {
            if (field && predicateFn(field)) return safeStr(field.key || field.id || fallbackKey);
        }
        return fallbackKey;
    }

    function detectFieldKeyInFlow(targetFlow: ApplicationFlow | null, predicateFn: (field: any) => boolean, fallbackKey = '') {
        for (const field of fieldsFor(targetFlow)) {
            if (field && predicateFn(field)) return safeStr(field.key || field.id || fallbackKey);
        }
        return fallbackKey;
    }

    function isPhoneField(field: any) {
        const key = safeStr(field?.key || field?.id).toLowerCase();
        return field?.type === 'tel' || key.includes('phone') || key.includes('mobile');
    }

    function getPhoneFieldKey() {
        return detectFieldKey(isPhoneField, 'phone');
    }

    function getEmailFieldKey() {
        return detectFieldKey((field) => {
            const key = safeStr(field.key || field.id).toLowerCase();
            return field.type === 'email' || key === 'email' || key.includes('email');
        }, 'email');
    }

    function getNameFieldKey() {
        return detectFieldKey((field) => {
            const key = safeStr(field.key || field.id).toLowerCase();
            const label = safeStr(field.label).toLowerCase();
            if (key === 'fullname' || key === 'full_name' || key === 'name') return true;
            if (key.includes('full') && key.includes('name')) return true;
            if (label.includes('full name')) return true;
            if (label === 'name' || label.includes('your name')) return true;
            if (key.includes('applicant') && key.includes('name')) return true;
            if (key.includes('candidate') && key.includes('name')) return true;
            return false;
        }, 'fullName');
    }

    function getEmailFieldKeyInFlow(targetFlow: ApplicationFlow | null) {
        return detectFieldKeyInFlow(targetFlow, (field) => {
            const key = safeStr(field.key || field.id).toLowerCase();
            return field.type === 'email' || key === 'email' || key.includes('email');
        }, 'email');
    }

    function getNameFieldKeyInFlow(targetFlow: ApplicationFlow | null) {
        return detectFieldKeyInFlow(targetFlow, (field) => {
            const key = safeStr(field.key || field.id).toLowerCase();
            const label = safeStr(field.label).toLowerCase();
            if (key === 'fullname' || key === 'full_name' || key === 'name') return true;
            if (key.includes('full') && key.includes('name')) return true;
            if (label.includes('full name')) return true;
            if (label === 'name' || label.includes('your name')) return true;
            if (key.includes('applicant') && key.includes('name')) return true;
            if (key.includes('candidate') && key.includes('name')) return true;
            return false;
        }, 'fullName');
    }

    function applyGooglePrefillToAnswers(
        baseAnswers: Record<string, any>,
        targetFlow: ApplicationFlow | null,
        user: GooglePrefillUser | null
    ) {
        if (!targetFlow || !user?.email) return baseAnswers;
        const nameKey = getNameFieldKeyInFlow(targetFlow);
        const emailKey = getEmailFieldKeyInFlow(targetFlow);
        return {
            ...baseAnswers,
            [nameKey]: user.name || baseAnswers[nameKey],
            [emailKey]: user.email || baseAnswers[emailKey],
        };
    }

    function applyGoogleUser(user: GooglePrefillUser) {
        const saved = googlePrefillService.writeUser(user);
        setGoogleUser(saved);
        setAnswers((prev) => applyGooglePrefillToAnswers(prev, flow, saved));
    }

    function skipGooglePrefill() {
        googlePrefillService.dismissPopup();
    }

    function buildFieldIndex() {
        const idx: Record<string, { label: string; type: string; id: string; key: string }> = {};
        for (const field of allFields()) {
            const key = safeStr(field.key || field.id);
            if (!key) continue;
            idx[key] = {
                label: safeStr(field.label || key),
                type: safeStr(field.type),
                id: safeStr(field.id),
                key,
            };
        }
        return idx;
    }

    function pickByLabelOrKeyContains(
        fieldIndex: Record<string, { label: string; id: string; key: string }>,
        form: Record<string, any>,
        needles: string[]
    ) {
        const ns = needles.map((s) => safeStr(s).toLowerCase());
        let best = '';
        for (const key of Object.keys(fieldIndex || {})) {
            const meta = fieldIndex[key] || {};
            const label = safeStr(meta.label).toLowerCase();
            const id = safeStr(meta.id).toLowerCase();
            const kk = safeStr(key).toLowerCase();
            if (!ns.some((needle) => label.includes(needle) || kk.includes(needle) || id.includes(needle))) continue;
            const value = form[key];
            if (!isEmpty(value)) best = value;
        }
        return best;
    }

    function buildPayload() {
        if (!flow) return {};

        const form = answers || {};
        const googleUser = googlePrefillService.readUser() || { name: '', email: '', imageUrl: '' };
        const fieldIndex = buildFieldIndex();
        const emailKey = getEmailFieldKey();
        const nameKey = getNameFieldKey();
        const phoneKey = getPhoneFieldKey();

        const resolvedName = !isEmpty(form[nameKey]) ? form[nameKey] : (googleUser.name || '');
        const resolvedEmail = !isEmpty(form[emailKey]) ? form[emailKey] : (googleUser.email || '');
        const resolvedResume =
            pickByLabelOrKeyContains(fieldIndex, form, ['resume', 'cv']) ||
            form.resumeLink ||
            '';
        const resolvedPortfolio =
            pickByLabelOrKeyContains(fieldIndex, form, ['portfolio', 'website', 'link']) ||
            form.portfolioLink ||
            '';

        const answersRaw = { ...form };
        const answersReadable: Record<string, any> = {};

        Object.keys(answersRaw).forEach((key) => {
            if (key === 'roleId' || key === 'roleTitle' || key === 'jobId') return;
            const meta = fieldIndex[key];
            const label = meta ? meta.label : key;
            const value = answersRaw[key];
            answersReadable[label] = Array.isArray(value) ? value.slice(0) : value;
        });

        return {
            meta: {
                submittedAt: new Date().toISOString(),
                source: 'fluke-games-careers',
                formVersion: 'v6-api-driven-whatsapp-consent',
            },
            role: {
                id: form.roleId || flow.role.id,
                title: form.roleTitle || flow.role.title,
                jobId: form.jobId || flow.role.jobId,
                team: flow.role.team || '',
                location: flow.role.location || '',
                employmentType: flow.role.employmentType || '',
            },
            google: {
                name: googleUser.name || '',
                email: googleUser.email || '',
                imageUrl: googleUser.imageUrl || '',
            },
            applicant: {
                fullName: resolvedName,
                email: resolvedEmail,
                phone: form[phoneKey],
                whatsappOptIn: !!form.whatsappOptIn,
                university: form.university,
                degreeAndYear: form.degreeYear,
                resumeLink: resolvedResume,
                portfolioLink: resolvedPortfolio,
            },
            answersRaw,
            answersReadable,
        };
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

        const ack = answers['ackVolunteer'];
        if (answers.hasOwnProperty('ackVolunteer') && safeStr(ack).trim() !== VOLUNTEER_CONFIRMATION_TEXT) {
            setSubmitError(`Please type "${VOLUNTEER_CONFIRMATION_TEXT}" before submitting.`);
            return;
        }

        const phoneKey = getPhoneFieldKey();
        if (phoneKey && !isEmpty(answers[phoneKey]) && !answers.whatsappOptIn) {
            setSubmitError('Please confirm WhatsApp consent to proceed.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        try {
            const res = await applicationService.submitApplication(buildPayload());
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
        googleUser,
        locked: googleUser?.email ? {
            [getNameFieldKey()]: true,
            [getEmailFieldKey()]: true,
        } : {},
        applyGoogleUser,
        skipGooglePrefill,
        isGooglePopupDismissed: googlePrefillService.isPopupDismissed,
        isSubmitting,
        isSubmitted,
        submitError,
        submitReceipt,
        submit
    };
}
