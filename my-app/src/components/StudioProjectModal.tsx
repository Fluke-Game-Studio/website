import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { getProjectCarousel, StudioProject } from "@/lib/studioProjects";

type Props = {
  project: StudioProject | null;
  onClose: () => void;
};

function safeStr(v: unknown) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function getExternalProjectUrl(project: StudioProject | null) {
  const externalUrl = safeStr(project?.externalUrl);
  if (externalUrl) return externalUrl;
  if (safeStr(project?.key).toLowerCase() === "pavan" || safeStr(project?.slug).toLowerCase() === "project-pavan") {
    return "https://pavan.flukegamestudio.com";
  }
  return "";
}

function isPavanProject(project: StudioProject | null) {
  const key = safeStr(project?.key).toLowerCase();
  const slug = safeStr(project?.slug).toLowerCase();
  return key === "pavan" || slug === "project-pavan";
}

export default function StudioProjectModal({ project, onClose }: Props) {
  const carousel = useMemo(() => (project ? getProjectCarousel(project) : []), [project]);
  const [index, setIndex] = useState(0);
  const externalProjectUrl = useMemo(() => getExternalProjectUrl(project), [project]);
  const videoUrl = useMemo(() => {
    const direct = safeStr(project?.video);
    if (direct) return direct;
    const videoId = safeStr(project?.videoId);
    if (!videoId) return "";
    return `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}`;
  }, [project?.video, project?.videoId]);

  useEffect(() => {
    setIndex(0);
  }, [project?.key, project?.slug]);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((v) => Math.max(0, v - 1));
      if (e.key === "ArrowRight") setIndex((v) => Math.min(carousel.length - 1, v + 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose, carousel.length]);

  const active = carousel[index] || null;
  const title = safeStr(project?.title);
  const alt = title || "Studio project image";

  const milestoneSummary = useMemo(() => {
    if (!project?.milestones?.length) return [];
    return project.milestones.map((m) => {
      const objectives = Number(m.objectives || 0);
      const done = Number(m.done || 0);
      const pct = objectives > 0 ? Math.round((done / objectives) * 100) : 0;
      return { name: safeStr(m.name), pct: Math.max(0, Math.min(100, pct)) };
    });
  }, [project?.milestones]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[1200] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close project modal"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-fluke-yellow/10 bg-fluke-surface shadow-[0_28px_90px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-4">
              <div className="min-w-0">
                <div className="font-orbitron text-[11px] tracking-[0.35em] uppercase text-fluke-yellow/90">
                  {safeStr(project.projectType) || "Studio Project"}
                </div>
                <h3 className="mt-1 truncate font-bebas text-3xl text-fluke-text">{title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-fluke-muted">
                  {safeStr(project.tagline || project.summary)}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {safeStr(project.github) ? (
                  <a
                    href={safeStr(project.github)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-fluke-text transition hover:bg-white/10"
                    title="Open GitHub"
                  >
                    <Github size={18} />
                  </a>
                ) : null}

                {videoUrl && !isPavanProject(project) ? (
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-fluke-text transition hover:bg-white/10"
                    title="Open video"
                  >
                    <ExternalLink size={18} />
                  </a>
                ) : null}

                {externalProjectUrl ? (
                  <div className="relative">
                    <a
                      href={externalProjectUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Open Project Pavan website"
                      className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-fluke-text transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-fluke-yellow/60"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <span className="pointer-events-none absolute right-0 top-12 w-52 translate-y-1 rounded-xl border border-fluke-yellow/20 bg-fluke-bg/95 px-3 py-2 text-left text-[11px] text-fluke-muted opacity-0 shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <span className="block font-semibold text-fluke-text">Open Project Pavan</span>
                      <span className="block mt-0.5">Visit the dedicated Pavan website.</span>
                    </span>
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-fluke-text transition hover:bg-white/10"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                {active?.url ? (
                  <img
                    src={active.url}
                    alt={alt}
                    className="h-[340px] w-full object-cover sm:h-[420px]"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-[340px] items-center justify-center text-sm text-fluke-muted sm:h-[420px]">
                    No images available.
                  </div>
                )}

                {carousel.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIndex((v) => Math.max(0, v - 1))}
                      disabled={index <= 0}
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition hover:bg-black/55 disabled:opacity-40"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIndex((v) => Math.min(carousel.length - 1, v + 1))}
                      disabled={index >= carousel.length - 1}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur transition hover:bg-black/55 disabled:opacity-40"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                ) : null}

                {active?.headline ? (
                  <div className="absolute bottom-3 left-3 right-3 rounded-2xl border border-white/10 bg-black/45 p-3 text-white backdrop-blur">
                    <div className="text-sm font-semibold">{active.headline}</div>
                    {active.description ? (
                      <div className="mt-0.5 text-xs text-white/80">{active.description}</div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="space-y-4">
                {Array.isArray(project.tags) && project.tags.length ? (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 10).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-fluke-yellow/15 bg-fluke-bg/30 px-3 py-1 text-[11px] text-fluke-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="rounded-2xl border border-white/10 bg-fluke-bg/25 p-4">
                  <div className="font-orbitron text-[11px] tracking-[0.35em] uppercase text-fluke-yellow/90">
                    Snapshot
                  </div>
                  <div className="mt-2 space-y-2 text-sm text-fluke-muted">
                    {safeStr(project.role) ? (
                      <div>
                        <span className="text-fluke-text/90">Role:</span> {safeStr(project.role)}
                      </div>
                    ) : null}
                    {safeStr(project.teamSize) ? (
                      <div>
                        <span className="text-fluke-text/90">Team size:</span> {project.teamSize}
                      </div>
                    ) : null}
                    {safeStr(project.cadence) ? (
                      <div>
                        <span className="text-fluke-text/90">Cadence:</span> {safeStr(project.cadence)}
                      </div>
                    ) : null}
                    {Array.isArray(project.platforms) && project.platforms.length ? (
                      <div>
                        <span className="text-fluke-text/90">Platforms:</span> {project.platforms.join(", ")}
                      </div>
                    ) : null}
                  </div>
                </div>

                {Array.isArray(project.stack) && project.stack.length ? (
                  <div className="rounded-2xl border border-white/10 bg-fluke-bg/25 p-4">
                    <div className="font-orbitron text-[11px] tracking-[0.35em] uppercase text-fluke-yellow/90">
                      Stack
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.stack.slice(0, 12).map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-fluke-muted"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {milestoneSummary.length ? (
                  <div className="rounded-2xl border border-white/10 bg-fluke-bg/25 p-4">
                    <div className="font-orbitron text-[11px] tracking-[0.35em] uppercase text-fluke-yellow/90">
                      Stages
                    </div>
                    <div className="mt-3 space-y-3">
                      {milestoneSummary.slice(0, 6).map((stage) => (
                        <div key={stage.name}>
                          <div className="flex items-center justify-between text-xs text-fluke-muted">
                            <span className="text-fluke-text/90">{stage.name}</span>
                            <span>{stage.pct}%</span>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-white/10">
                            <div
                              className="h-2 rounded-full bg-fluke-yellow"
                              style={{ width: `${stage.pct}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {carousel.length > 1 ? (
              <div className="border-t border-white/10 px-5 py-4">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {carousel.slice(0, 12).map((shot, i) => (
                    <button
                      key={shot.url}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={[
                        "relative h-16 w-28 shrink-0 overflow-hidden rounded-xl border transition",
                        i === index ? "border-fluke-yellow/60" : "border-white/10 hover:border-white/20",
                      ].join(" ")}
                      title={shot.headline || `Screenshot ${i + 1}`}
                    >
                      <img src={shot.url} alt="" className="h-full w-full object-cover" loading="lazy" />
                      {i === index ? (
                        <div className="absolute inset-0 ring-1 ring-inset ring-fluke-yellow/40" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
