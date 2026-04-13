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
  Released: "text-green-600 bg-green-50 border-green-200",
  "In Development": "text-fluke-yellow bg-fluke-yellow/10 border-fluke-yellow/20",
  "Coming Soon": "text-purple-600 bg-purple-50 border-purple-200",
};

const bgGradients = [
  "from-[hsl(20,40%,var(--thumb-lightness,8%))] to-[hsl(20,50%,var(--thumb-lightness-hi,14%))]",
  "from-[hsl(260,40%,var(--thumb-lightness,8%))] to-[hsl(260,50%,var(--thumb-lightness-hi,14%))]",
  "from-[hsl(160,40%,var(--thumb-lightness,8%))] to-[hsl(160,50%,var(--thumb-lightness-hi,14%))]",
  "from-[hsl(220,40%,var(--thumb-lightness,8%))] to-[hsl(220,50%,var(--thumb-lightness-hi,14%))]",
];

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
            Every game we&apos;ve built — from jam prototypes to full commercial releases. Click a title to learn more.
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
                <div className="absolute inset-0 z-0">
                  <div className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center opacity-30 group-hover:opacity-40"
                       style={{
                         background: `linear-gradient(135deg, hsl(${i * 60 + 20}, 40%, 15%) 0%, hsl(${i * 60}, 50%, 8%) 100%)`,
                       }}>
                      {(() => {
                        const Icon = artworkIcons[i % 4];
                        return <Icon size={120} strokeWidth={0.5} className="text-fluke-yellow/40 mix-blend-overlay" />;
                      })()}
                  </div>
                  {/* Atmospheric overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-fluke-surface via-fluke-surface/80 to-transparent z-10" />
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
                      <span className="w-1 h-1 rounded-full bg-fluke-muted/40" />
                      <span className="font-sora text-xs text-fluke-muted">{game.releaseYear}</span>
                    </div>

                    <h2 className="font-bebas text-4xl text-fluke-text group-hover:text-fluke-white transition-colors mb-3 tracking-wide">
                      {game.title}
                    </h2>
                    
                    <p className="font-sora text-sm text-fluke-muted mb-6 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {game.description}
                    </p>

                    <div className="flex items-center justify-between border-t border-fluke-yellow/10 pt-4">
                      <div className="flex gap-2 items-center">
                        <div className="text-[10px] font-sora text-fluke-muted mr-1">PLATFORMS</div>
                        {game.platforms.map((p) => (
                          <span key={p} title={p} className="flex items-center justify-center w-7 h-7 text-fluke-muted/80 bg-fluke-surface/50 hover:bg-fluke-yellow/10 hover:text-fluke-yellow border border-fluke-yellow/10 rounded-full backdrop-blur-sm transition-all">
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
