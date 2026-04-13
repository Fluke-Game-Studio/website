import { useState, useEffect } from "react";
import { Job, careerService } from "../services/careerService";

export const useCareerController = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    useEffect(() => {
        let cancelled = false;
        const loadJobs = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await careerService.fetchJobs();
                
                if (cancelled) return;
                
                setJobs(data);
                if (data.length > 0) {
                    setSelectedJob(data[0]);
                }
            } catch (err: any) {
                if (cancelled) return;
                setError(err.message || "An error occurred while fetching jobs.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        loadJobs();
        return () => { cancelled = true; };
    }, []);

    return {
        jobs,
        loading,
        error,
        selectedJob,
        setSelectedJob
    };
};
