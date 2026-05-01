import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { devlogs } from "@/lib/data/content";
import { ArrowRight, Clock, Settings, Palette, Trophy } from "lucide-react";

const devIcons = [Settings, Palette, Trophy];

const categoryColors: Record<string, string> = {
  Unity: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Design: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Studio Updates": "text-green-400 bg-green-400/10 border-green-400/20",
};

export default function DevlogsPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-fluke-bg relative overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
              Studio Updates
            </p>
            <h2 className="font-bebas text-5xl sm:text-7xl text-fluke-text yellow-line">
              Latest News
            </h2>
          </div>
          <Link
            to="/devlogs"
            className="btn-outline px-6 py-2.5 rounded-xl font-sora text-sm inline-flex items-center gap-2 self-start md:self-auto"
          >
            All Articles
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {devlogs.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Link to={`/devlogs/${post.slug}`} className="group h-full block">
                <div 
                  className="relative h-full rounded-2xl overflow-hidden transition-all duration-300 flex flex-col isolate"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  {/* Thumbnail area */}
                  <div
                    className="h-44 flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, hsl(${i * 80 + 200}, 40%, var(--thumb-lightness, 8%)) 0%, hsl(${i * 80 + 230}, 50%, var(--thumb-lightness-hi, 14%)) 100%)`,
                    }}
                  >
                    <span className="opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 text-fluke-yellow">
                      {(() => {
                        const Icon = devIcons[i % 3];
                        return <Icon size={48} strokeWidth={1.5} />;
                      })()}
                    </span>
                    {/* Yellow left border reveal */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-fluke-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom z-20" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-[10px] font-orbitron tracking-wider px-2 py-0.5 rounded border ${
                          categoryColors[post.category] || "text-fluke-yellow bg-fluke-yellow/10 border-fluke-yellow/20"
                        }`}
                      >
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-fluke-muted font-sora">
                        <Clock size={10} />
                        {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="font-sora font-semibold text-sm text-fluke-text group-hover:text-fluke-yellow transition-colors mb-2 flex-1">
                      {post.title}
                    </h3>
                    <p className="font-sora text-xs text-fluke-muted line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-fluke-muted/60 font-sora pt-4 border-t border-fluke-yellow/10">
                      <span>by {post.author}</span>
                      <div className="flex items-center gap-2">
                        <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
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
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
