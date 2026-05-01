const API_BASE = (() => {
    const configured = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();

    if (configured && configured !== "/api") {
        return configured.replace(/\/$/, "");
    }

    return import.meta.env.DEV
        ? "/api"
        : "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";
})();

const JOBS_API = `${API_BASE}/jobs`;
const APPLY_API = `${API_BASE}/apply`;

export interface Job {
    jobId?: string;
    title: string;
    type: string;
    tags: string[];
    desc: string;
    questions?: string[];
    raw: any;
}

/**
 * Shared utility functions
 */
export const utils = {
    tryJsonParse: (x: any) => {
        if (!x) return null;
        if (typeof x === 'object') return x;
        try { return JSON.parse(x); } catch { return null; }
    },
    unwrapPayload: (data: any) => {
        let p = data;
        if (typeof p === 'string') p = utils.tryJsonParse(p) || { raw: p };
        if (p && typeof p.body === 'string') p = utils.tryJsonParse(p.body) || p;
        return p || {};
    },
    safeStr: (x: any) => (x === null || x === undefined ? '' : String(x))
};

/**
 * Normalizes raw job data from API
 */
function normalizeJob(j: any): Job {
    const title = j?.title ? String(j.title) : '';
    const type = j?.employmentType || j?.employment_type || j?.type || 'Volunteer (Remote)';
    const tags = Array.isArray(j?.tags) ? j.tags.map(String) : [];
    const questions = Array.isArray(j?.questions) ? j.questions.map(String) : [];
    let desc = j?.description || j?.desc || '';

    // Simple HTML normalization for non-HTML descriptions
    if (desc && !desc.includes('<')) {
        desc = desc
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');
    }

    return {
        jobId: j?.jobId || j?.id ? String(j.jobId || j.id) : undefined,
        title,
        type: String(type),
        tags,
        questions,
        desc,
        raw: j || {},
    };
}

export const careerService = {
    async fetchJobs(): Promise<Job[]> {
        const res = await fetch(JOBS_API, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        });

        const contentType = (res.headers.get('content-type') || '').toLowerCase();
        const text = await res.text();
        const data = utils.tryJsonParse(text);

        if (!res.ok) {
            throw new Error(data?.message || data?.error || `Failed to fetch jobs (${res.status})`);
        }

        if (!data || (!contentType.includes('application/json') && text.trim().startsWith('<'))) {
            throw new Error('Jobs API did not return JSON.');
        }

        const payload = utils.unwrapPayload(data);
        const items = payload?.items || payload?.Items || payload?.data || (Array.isArray(payload) ? payload : []);

        return items.map(normalizeJob);
    },

    async applyToJob(applicationData: any): Promise<any> {
        const response = await fetch(APPLY_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(applicationData),
        });
        if (!response.ok) throw new Error("Failed to submit application");
        return await response.json();
    }
};
