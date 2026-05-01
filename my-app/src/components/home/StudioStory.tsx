import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Embers from "./Embers";

const milestones = [
  {
    year: "2020",
    title: "Fluke Games Founded",
    description: "Fluke Games began as a personal pursuit with a clear intent to build real games and learn by shipping. The first milestone came early with the release of Beat Slayer V1, setting the tone for a hands-on, execution-driven journey.",
    icon: "🌱",
  },
  {
    year: "2021",
    title: "First Iterations in the Wild",
    description: "The studio continued forward with Crazyy Cops V1. This phase was about putting ideas into the hands of players, understanding what works, and building confidence through real releases.",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Raising the Bar",
    description: "With Crazyy Cops V2, Fluke Games took a step forward in quality and direction. It reflected a more refined approach, stronger execution, and a growing understanding of what it takes to build engaging experiences.",
    icon: "⚡",
  },
  {
    year: "2023",
    title: "Growing Beyond One",
    description: "Fluke Games evolved into a collaborative effort. Creators came together to contribute, learn, and build within a shared vision. The focus shifted from individual output to collective growth.",
    icon: "🤝",
  },
  {
    year: "2024 to Present",
    title: "Focused on What Comes Next",
    description: "Today, Fluke Games is building toward its most ambitious work yet. With a stronger foundation and a growing team, the studio is committed to creating experiences that are thoughtful, polished, and built to last.",
    icon: "⚔️",
  },
];

export default function StudioStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-fluke-bg overflow-clip">
      <Embers />
      
      {/* Sticky Wrapper */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10 w-full">
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            Our Journey
          </p>
          <h2 className="font-bebas text-6xl sm:text-8xl text-fluke-text yellow-line">
            Studio Story
          </h2>
        </div>

        {/* Horizontal Path Container */}
        <div className="relative flex items-center h-1/2">
          {/* SVG Path */}
          <svg
            className="absolute top-1/2 left-0 w-full h-1 overflow-visible z-0"
            viewBox="0 0 1000 1"
          >
            <line x1="0" y1="0.5" x2="1000" y2="0.5" stroke="var(--fluke-surface)" strokeWidth="2" />
            <motion.line 
              x1="0" y1="0.5" x2="1000" y2="0.5" 
              stroke="var(--fluke-yellow)" 
              strokeWidth="2" 
              style={{ pathLength }}
              strokeDasharray="1"
            />
          </svg>
          
          <motion.div
            style={{ x: springX }}
            className="flex gap-24 px-[10%] items-center"
          >
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                className="flex-none w-[350px] relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Year Badge */}
                <div className="absolute -top-12 left-0 font-orbitron text-2xl font-black text-fluke-yellow/40 tracking-tighter">
                  {m.year}
                </div>
                
                {/* Node */}
                <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-fluke-bg border-2 border-fluke-yellow flex items-center justify-center z-10 shadow-[0_0_15px_var(--fluke-yellow)]">
                  <span className="text-[10px]">{m.icon}</span>
                </div>

                {/* Card */}
                <div 
                  className="rounded-3xl p-8 ml-8 transition-all duration-300 relative group isolate"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                  <h3 className="font-bebas text-3xl text-fluke-text mb-3 group-hover:text-fluke-yellow transition-colors tracking-wide">
                    {m.title}
                  </h3>
                  <p className="font-sora text-sm text-fluke-muted leading-relaxed">
                    {m.description}
                  </p>

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
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-20 left-12 flex items-center gap-4">
          <div className="h-0.5 w-32 bg-fluke-surface relative overflow-hidden">
            <motion.div 
              style={{ scaleX: scrollYProgress }} 
              className="absolute inset-y-0 left-0 w-full bg-fluke-yellow origin-left" 
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
          <span className="font-orbitron text-[10px] tracking-widest text-fluke-muted uppercase">2020 — Present</span>
        </div>
      </div>
    </section>
  );
}
