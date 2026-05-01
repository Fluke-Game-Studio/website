import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { games } from "@/lib/data/games";
import { Monitor, Smartphone, Gamepad2, Globe, ArrowRight, Car, Swords, Joystick, Rocket } from "lucide-react";

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


export default function GamesPage() {
  return (
    <div className="min-h-screen bg-fluke-bg pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            Our Universe
          </p>
          <h1 className="font-bebas text-6xl sm:text-8xl text-fluke-text mb-4 yellow-line">
            All Games
          </h1>
          <p className="font-sora text-fluke-muted max-w-xl mt-6">
            Every game we've built - from jam prototypes to shipped work. Click a title to learn more.
          </p>
        </div>

        {/* Games grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.12, ease: "easeOut" }}
            >
              <Link to={`/games/${game.slug}`} className="group block h-full">
                <motion.div
                  whileHover={{ y: -10, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative rounded-3xl overflow-hidden h-[460px] isolate"
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                  }}
                >
                {/* Cover art area */}
                <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                  {game.coverImage ? (
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center opacity-30 group-hover:opacity-40"
                      style={{
                        background: `linear-gradient(135deg, hsl(${i * 60 + 20}, 40%, 15%) 0%, hsl(${i * 60}, 50%, 8%) 100%)`,
                      }}
                    >
                      {(() => {
                        const Icon = artworkIcons[i % 4];
                        return <Icon size={120} strokeWidth={0.5} className="text-fluke-yellow/40 mix-blend-overlay" />;
                      })()}
                    </div>
                  )}
                  {/* Atmospheric overlay — always dark (cinematic intent, not theme-dependent) */}
                  <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.75) 45%, transparent 100%)' }} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end">
                   {/* Status Badge */}
                   <div className="absolute top-6 left-6">
                    <span className={`text-[10px] font-orbitron tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md ${statusColors[game.status]}`}>
                      {game.status}
                    </span>
                  </div>

                  <div className="transform transition-transform duration-500 translate-y-6 group-hover:translate-y-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-orbitron text-xs tracking-widest text-fluke-yellow/80 uppercase">
                        {game.genre}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="font-sora text-xs text-white/70">{game.releaseYear}</span>
                    </div>

                    <h2 className="font-bebas text-4xl text-white group-hover:text-fluke-yellow transition-colors mb-3 tracking-wide">
                      {game.title}
                    </h2>
                    
                    <p className="font-sora text-sm text-white/70 mb-6 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {game.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-fluke-yellow/10 pt-4">
                      <div className="flex gap-2 items-center">
                        <div className="text-[10px] font-sora text-white/70 mr-1">PLATFORMS</div>
                        {game.platforms.map((p) => (
                          <span key={p} title={p} className="flex items-center justify-center w-7 h-7 text-white/80 bg-white/10 hover:bg-white/20 hover:text-fluke-yellow border border-white/10 rounded-full backdrop-blur-sm transition-all">
                            {platformIcons[p]}
                          </span>
                        ))}
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-fluke-surface/50 group-hover:bg-fluke-yellow group-hover:text-fluke-bg text-fluke-muted transition-all duration-300 transform group-hover:translate-x-1">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow border */}
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

          {/* Upcoming placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 25 }}
            className="rounded-3xl border border-dashed border-fluke-yellow/30 flex flex-col items-center justify-center gap-4 p-12 text-center min-h-[460px] bg-fluke-surface/30"
          >
            <div className="w-20 h-20 rounded-full border border-fluke-yellow/20 flex items-center justify-center bg-fluke-bg/50 mb-2">
              <span className="text-4xl filter grayscale">🎲</span>
            </div>
            <p className="font-orbitron text-sm text-fluke-muted tracking-widest uppercase">COMING SOON</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
