import { useMemo, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Gamepad2, Package, Clapperboard, Globe, Palette, Joystick, ExternalLink } from "lucide-react";
import StudioProjectModal from "@/components/StudioProjectModal";
import { getStudioProjects, toStudioPortfolioItems, StudioProject } from "@/lib/studioProjects";

const icons = [Gamepad2, Package, Clapperboard, Globe, Palette, Joystick];

const categories = ["All", "Games", "Assets", "Trailers", "Websites", "Art"] as const;

export default function FeaturedPortfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<StudioProject | null>(null);

  const items = useMemo(() => toStudioPortfolioItems(getStudioProjects()), []);
  const filtered = active === "All" ? items : items.filter((p) => p.category === active);

  const categoryColors: Record<string, string> = {
    Games: "#22c55e",
    Assets: "#3b82f6",
    Trailers: "#ec4899",
    Websites: "#8b5cf6",
    Art: "#f97316",
  };

  return (
    <section className="py-32 bg-fluke-surface relative overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            Our Work
          </p>
          <h2 className="font-bebas text-5xl sm:text-7xl text-fluke-text yellow-line">
            Featured Portfolio
          </h2>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full font-sora text-sm border transition-all duration-300 ${active === cat
                  ? "bg-fluke-yellow border-fluke-yellow text-fluke-bg font-semibold"
                  : "border-fluke-yellow/20 text-fluke-muted hover:border-fluke-yellow/40 hover:text-fluke-text"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  duration: 0.35, 
                  delay: i * 0.04,
                  layout: { type: "spring", stiffness: 300, damping: 25 },
                  y: { type: "spring", stiffness: 400, damping: 20 }
                }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer isolate"
                onClick={() => setSelectedProject(item.raw)}
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                {/* External link for Project Pavan */}
                {item.id === "pavan" ? (
                  <a
                    href="https://pavan.flukegamestudio.com"
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Visit Project Pavan website"
                    className="absolute top-3 right-3 z-40 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-fluke-text transition hover:bg-white/10"
                  >
                    <ExternalLink size={16} />
                  </a>
                ) : null}
                {/* Placeholder art */}
                <div
                  className="relative h-52 overflow-hidden flex items-center justify-center text-6xl"
                  style={{
                    background: `linear-gradient(135deg, hsl(${i * 50}, 30%, var(--thumb-lightness, 8%)) 0%, hsl(${i * 50 + 40}, 50%, var(--thumb-lightness-hi, 14%)) 100%)`,
                  }}
                >
                  <span className="opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-[opacity,transform] duration-200 text-fluke-yellow">
                    {(() => {
                      const Icon = icons[i % 6];
                      return <Icon size={56} strokeWidth={1.5} />;
                    })()}
                  </span>
                  {/* Category badge */}
                  <div
                    className="absolute top-3 left-3 text-xs font-orbitron tracking-widest px-3 py-1 rounded-full"
                    style={{
                      background: `${categoryColors[item.category]}22`,
                      color: categoryColors[item.category],
                      border: `1px solid ${categoryColors[item.category]}44`,
                    }}
                  >
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-sora font-semibold text-sm text-fluke-text group-hover:text-fluke-yellow transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="font-sora text-xs text-fluke-muted mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[10px] font-sora px-2 py-0.5 rounded bg-fluke-surface text-fluke-muted border border-fluke-yellow/10"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover state overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30" 
                  style={{ 
                    border: '2px solid var(--card-hover-border)',
                    boxShadow: 'var(--card-hover-shadow)',
                    borderRadius: 'inherit'
                  }} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <StudioProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
