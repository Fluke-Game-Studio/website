import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { studioAbout } from "@/lib/data/about";
import { ChevronRight, Target, Zap, Shield, Rocket, Cpu } from "lucide-react";

const icons = [Cpu, Target, Zap, Shield, Rocket, Target]; // Match to chapters

export default function AboutAccordion() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative bg-fluke-bg pt-0 pb-32 overflow-hidden border-t border-fluke-yellow/5">
      {/* Immersive HUD Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,var(--fluke-yellow)_0%,transparent_50%)] opacity-10" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_#3B82F6_0%,transparent_50%)] opacity-5" />
        <div className="absolute inset-0 bg-grid" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 border-x border-fluke-yellow/5 px-4 md:px-0">
        {/* Section Header - Minimalist */}
        <div className="px-6 md:px-20 py-12 border-b border-fluke-yellow/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-1 h-6 bg-fluke-yellow shadow-[0_0_15px_var(--fluke-yellow)]" />
            <h2 className="font-bebas text-5xl md:text-6xl text-fluke-text tracking-[0.2em] uppercase">
              Studio <span className="text-fluke-yellow">DNA</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row min-h-[700px]">
          {/* Left: Identity Index (Navigation) */}
          <div className="w-full lg:w-[40%] border-r border-fluke-yellow/5 bg-fluke-yellow/[0.01]">
            <nav className="flex flex-col">
              {studioAbout.map((section, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`relative flex items-center group overflow-hidden transition-all duration-500 border-b border-fluke-yellow/5 last:border-b-0 ${
                    activeTab === idx ? "py-16 bg-fluke-yellow/[0.03]" : "py-10 hover:bg-fluke-yellow/[0.01]"
                  }`}
                >
                  {/* Vertical Progress Indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-700 ${
                    activeTab === idx ? "bg-fluke-yellow opacity-100" : "bg-fluke-yellow/10 opacity-0 group-hover:opacity-40"
                  }`} />

                  <div className="px-8 md:px-20 flex items-center gap-10 md:gap-16 w-full">
                    <span className={`font-bebas text-4xl md:text-6xl tracking-tighter transition-all duration-500 ${
                      activeTab === idx ? "text-fluke-yellow scale-110" : "text-fluke-text/10 group-hover:text-fluke-text/40"
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col items-start translate-y-1">
                      <h3 className={`font-bebas text-3xl md:text-5xl uppercase tracking-widest transition-all ${
                        activeTab === idx ? "text-fluke-text translate-x-4" : "text-fluke-text/30 group-hover:translate-x-2"
                      }`}>
                        {section.title}
                      </h3>
                    </div>
                  </div>

                  {/* HUD Scanning Line for Active Tab */}
                  {activeTab === idx && (
                    <motion.div 
                      layoutId="scanningLine"
                      className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-fluke-yellow to-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Right: The Identity Matrix (Content Display) */}
          <div className="w-full lg:w-[60%] relative flex flex-col justify-start bg-fluke-surface/30 backdrop-blur-3xl">
            {/* Immersive Background Large Number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-num-${activeTab}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 0.05, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="absolute top-10 right-10 pointer-events-none select-none font-bebas text-[20rem] md:text-[35rem] leading-none text-fluke-text whitespace-nowrap"
              >
                0{activeTab + 1}
              </motion.div>
            </AnimatePresence>

            <div className="relative z-10 p-8 md:p-20 pt-16 md:pt-24 flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="max-w-2xl"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="px-3 py-1 rounded bg-fluke-yellow/10 border border-fluke-yellow/20 text-fluke-yellow font-mono text-[10px] tracking-widest uppercase">
                      Archive Access : 0{activeTab + 1}
                    </div>
                    <div className="h-[1px] w-12 bg-fluke-yellow/20" />
                  </div>

                  <h3 className="font-bebas text-6xl md:text-8xl text-fluke-text mb-12 uppercase tracking-wide leading-tight">
                    {studioAbout[activeTab].title}
                  </h3>

                  <div 
                    className="font-sora text-lg md:text-xl text-fluke-muted leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: studioAbout[activeTab].content }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
