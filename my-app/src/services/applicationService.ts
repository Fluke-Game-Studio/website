// src/services/applicationService.ts

const API_BASE = (() => {
    const configured = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();

    if (configured && configured !== "/api") {
        return configured.replace(/\/$/, "");
    }

    return import.meta.env.DEV
        ? "/api"
        : "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";
})();

export interface Question {
    id: string;
    key: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    placeholder?: string;
    helpText?: string;
}

export interface ApplicationChapter {
    title: string;
    description: string;
    fields: Question[];
}

export interface ApplicationFlow {
    roleId: string;
    roleTitle: string;
    chapters: ApplicationChapter[];
}

/**
 * Shared utility functions
 */
const utils = {
    tryJsonParse: (x: any) => {
        if (!x) return null;
        if (typeof x === 'object') return x;
        try { return JSON.parse(x); } catch { return null; }
    },
    humanizeId: (id: string) => {
        if (!id) return '';
        return id
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .replace(/_/g, ' ')
            .trim();
    },
    inferTypeFromId: (id: string) => {
        const lower = id.toLowerCase();
        if (lower.includes('email')) return 'email';
        if (lower.includes('url') || lower.includes('link') || lower.includes('portfolio') || lower.includes('resume')) return 'url';
        if (lower.includes('phone') || lower.includes('mobile')) return 'tel';
        if (lower.includes('desc') || lower.includes('reason') || lower.includes('about') || lower.includes('feedback') || lower.includes('message')) return 'textarea';
        if (lower.includes('country')) return 'country';
        if (lower.includes('state') || lower.includes('province') || lower.includes('region')) return 'state';
        if (lower.includes('city') || lower.includes('town')) return 'city';
        if (lower.includes('address')) return 'address';
        return 'text';
    },
    safeStr: (x: any) => (x === null || x === undefined ? '' : String(x))
};

/**
 * Normalizes a question object from the API
 */
function normalizeQuestion(q: any): Question | null {
    const id = q?.id || q?.key || '';
    if (!id) return null;

    let t = String(q?.type || utils.inferTypeFromId(id)).toLowerCase().trim();
    if (t === 'phone' || t === 'phonenumber' || t === 'mobile') t = 'tel';
    if (t === 'longtext' || t === 'multiline') t = 'textarea';
    if (t === 'singlechoice') t = 'radio';
    if (t === 'multichoice') t = 'checkbox';
    if (!t) t = 'text';

    return {
        key: id,
        id,
        label: q?.label || utils.humanizeId(id),
        type: t,
        required: !!(q?.required),
        options: q?.options,
        placeholder: q?.placeholder || (t === 'email' ? 'you@example.com' : t === 'textarea' ? 'Write your answer here…' : ''),
        helpText: q?.helpText,
    };
}

/**
 * Normalizes a list of questions
 */
function normalizeQuestions(list: any[]): Question[] {
    return (list || []).map(normalizeQuestion).filter((q): q is Question => q !== null);
}

/**
 * Orders questions based on provided IDs
 */
function orderByIds(ids: string[], list: any[]): Question[] {
    const qs = normalizeQuestions(list);
    if (!Array.isArray(ids) || !ids.length) return qs;

    const byId = Object.fromEntries(qs.map((q) => [q.id, q]));
    const ordered = ids.filter((id) => byId[id]).map((id) => byId[id]);
    const remaining = qs.filter((q) => !ids.includes(q.id));
    return [...ordered, ...remaining];
}

/**
 * Converts job to role ID
 */
function jobToRoleId(job: any): string {
    return utils.safeStr(job?.title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || utils.safeStr(job?.jobId);
}

/**
 * Builds application flow structure from job data
 */
export function buildApplicationFlow(job: any): ApplicationFlow | null {
    if (!job) return null;

    const roleId = jobToRoleId(job);
    const roleTitle = utils.safeStr(job.title) || roleId;

    const generalFields = orderByIds(job.generalQuestionIds, job.generalQuestions);
    const personalFields = orderByIds(job.personalQuestionIds, job.personalQuestions);
    const roleFields = orderByIds(job.roleQuestionIds, job.roleQuestions);

    const chapters: ApplicationChapter[] = [];

    if (generalFields.length) {
        chapters.push({
            title: 'General Questions',
            description: "Share how you connect with the game's direction and any feedback you may have.",
            fields: generalFields,
        });
    }

    if (personalFields.length) {
        chapters.push({
            title: 'Applicant Information',
            description: 'Tell us a bit about yourself.',
            fields: personalFields,
        });
    }

    // Always include role-specific questions if they exist, or even if it's just the default role info
    chapters.push({
        title: roleTitle,
        description: utils.safeStr(job.description).trim() ? 'Role-specific questions for this position.' : '',
        fields: roleFields,
    });

    // Final Acknowledgement Chapter
    chapters.push({
        title: 'Volunteer Acknowledgement',
        description: 'This is a **volunteer-based position**. Please confirm that you understand no financial compensation, stipend, or salary is provided for this role.',
        fields: [
            {
                id: 'ackVolunteer',
                key: 'ackVolunteer',
                label: 'To proceed, please type exactly: I confirm for the volunteer position',
                type: 'text',
                required: true,
                placeholder: 'I confirm for the volunteer position',
                helpText: 'By typing this, you acknowledge the volunteer nature of this position.'
            }
        ]
    });

    return {
        roleId,
        roleTitle,
        chapters,
    };
}

export const applicationService = {
    async submitApplication(payload: any): Promise<any> {
        const res = await fetch(`${API_BASE}/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data?.message || data?.error || 'Failed to submit application');
        }
        return data;
    }
};
