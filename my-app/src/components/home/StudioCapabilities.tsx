import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { useInView as useIntersectionObserver } from "react-intersection-observer";

// Handle potential interop issues where CountUp might be a named export or default object
const CountUpComponent = (CountUp as any).default || CountUp;


const stats = [
  { label: "Games Developed", value: 12, suffix: "+" },
  { label: "Assets Created", value: 500, suffix: "+" },
  { label: "Clients Worked With", value: 30, suffix: "+" },
  { label: "Engines Used", value: 5, suffix: "" },
];

const capabilities = [
  { label: "Unity", percent: 95 },
  { label: "Unreal Engine 5", percent: 82 },
  { label: "3D Art (Blender)", percent: 90 },
  { label: "Web Development", percent: 88 },
  { label: "Sound Design", percent: 78 },
  { label: "Game Design", percent: 92 },
];

function StatCard({ stat, delay }: { stat: typeof stats[0]; delay: number }) {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.4, triggerOnce: true });

  return (
    <div
      ref={ref}
      className="relative p-8 rounded-2xl transition-all duration-300 group isolate"
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
      }}
    >
      <div className="font-orbitron text-5xl font-bold gradient-text mb-2">
        {inView && (
          <CountUpComponent
            start={0}
            end={stat.value}
            duration={2}
            delay={delay}
          />
        )}
        {stat.suffix}
      </div>
      <div className="font-sora text-sm text-fluke-muted">{stat.label}</div>
      
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
  );
}

export default function StudioCapabilities() {
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
          className="mb-16 text-center"
        >
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            By the Numbers
          </p>
          <h2 className="font-bebas text-5xl sm:text-7xl text-fluke-text">
            Studio Capabilities
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StatCard stat={stat} delay={i * 0.2} />
            </motion.div>
          ))}
        </div>

        {/* Skill bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.label}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <div className="mb-2 flex justify-between items-center">
                <span className="font-sora text-sm text-fluke-muted">{cap.label}</span>
                <span className="font-orbitron text-xs text-fluke-yellow">{cap.percent}%</span>
              </div>
              <div className="h-1.5 bg-fluke-surface rounded-full overflow-hidden border border-fluke-yellow/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${cap.percent}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, var(--fluke-yellow), var(--fluke-glow))",
                    boxShadow: "0 0 10px rgba(217, 119, 6, 0.4)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
