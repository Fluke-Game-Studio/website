import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { games } from "@/lib/data/games";
import { Gamepad2, Monitor, Smartphone, Globe, Car, Swords, Joystick, Rocket } from "lucide-react";

const artworkIcons = [Car, Swords, Joystick, Rocket];

const platformIcons: Record<string, React.ReactNode> = {
  PC: <Monitor size={12} />,
  Mobile: <Smartphone size={12} />,
  Console: <Gamepad2 size={12} />,
  Web: <Globe size={12} />,
};

const statusColors: Record<string, string> = {
  Released: "text-green-400 bg-green-950/70 border-green-400/30",
  "In Development": "text-yellow-400 bg-black/50 border-yellow-400/40",
  "Coming Soon": "text-purple-300 bg-purple-950/70 border-purple-300/30",
};

export default function GamesShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-fluke-bg relative overflow-hidden" ref={ref}>
      <div className="section-divider absolute top-0 left-0" />
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            Our Worlds
          </p>
          <h2 className="font-bebas text-5xl sm:text-7xl text-fluke-text yellow-line">
            Games We&apos;ve Built
          </h2>
        </motion.div>
      </div>

      {/* Grid area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6 pb-6 md:px-10 max-w-screen-2xl mx-auto">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 * (i % 4), ease: "easeOut" }}
            className="w-full flex"
          >
            <Link to={`/games/${game.slug}`} className="group w-full h-full block">
            <motion.div 
                whileHover={{ y: -10, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-3xl overflow-hidden h-[420px] isolate will-change-transform w-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  boxShadow: 'var(--card-shadow)',
                }}
              >
                {/* Game art placeholder - image background */}
                <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                  <div
                    className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-110 flex items-center justify-center opacity-30 group-hover:opacity-40"
                    style={{
                      background: `linear-gradient(135deg, hsl(${i * 60 + 20}, 40%, 15%) 0%, hsl(${i * 60}, 50%, 8%) 100%)`,
                    }}
                  >
                    {(() => {
                      const Icon = artworkIcons[i % 4];
                      return <Icon size={120} strokeWidth={0.5} className="text-fluke-yellow/40 mix-blend-overlay" />;
                    })()}
                  </div>
                  {/* Atmospheric overlay — always dark (cinematic intent, not theme-dependent) */}
                  <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.75) 45%, transparent 100%)' }} />
                </div>

                {/* Card content */}
                <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end">
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`text-[10px] font-orbitron tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md ${statusColors[game.status]}`}>
                      {game.status}
                    </span>
                  </div>

                  <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-orbitron text-xs text-fluke-yellow tracking-widest uppercase">
                        {game.genre}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="font-sora text-xs text-white/70">{game.releaseYear}</span>
                    </div>

                    <h3 className="font-bebas text-4xl text-white group-hover:text-fluke-yellow transition-colors duration-200 mb-3 tracking-wide">
                      {game.title}
                    </h3>

                    <p className="font-sora text-sm text-white/70 line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {game.description}
                    </p>

                    {/* Platforms */}
                    <div className="flex gap-2 items-center">
                      <div className="text-xs font-sora text-white/70 mr-2">Platforms:</div>
                      {game.platforms.map((p) => (
                        <span
                          key={p}
                          title={p}
                          className="flex items-center justify-center w-8 h-8 text-white/80 bg-white/5 hover:bg-white/15 hover:text-fluke-yellow border border-white/5 rounded-full backdrop-blur-sm transition-[colors,background-color] duration-200"
                        >
                          {platformIcons[p]}
                        </span>
                      ))}
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
              </motion.div>
            </Link>
          </motion.div>
        ))}

        {/* View all card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 25 }}
            className="w-full h-full min-h-[420px]"
          >
          <Link to="/games" className="block h-full">
            <div className="h-full w-full rounded-3xl border border-dashed border-fluke-yellow/30 flex flex-col items-center justify-center gap-4 hover:border-fluke-yellow/60 hover:bg-fluke-yellow/5 transition-all duration-300 group bg-fluke-surface/30">
              <div className="w-16 h-16 rounded-full border border-fluke-yellow/20 flex items-center justify-center group-hover:border-fluke-yellow transition-colors bg-fluke-bg/50">
                <Gamepad2 size={28} className="text-fluke-yellow/50 group-hover:text-fluke-yellow transition-colors" />
              </div>
              <p className="font-orbitron text-sm text-fluke-muted group-hover:text-fluke-yellow transition-colors tracking-widest">
                VIEW ALL GAMES
              </p>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
