import { useParams, Link, Navigate } from "react-router-dom";
import { games } from "@/lib/data/games";
import { ArrowLeft, Monitor, Smartphone, Gamepad2, Globe, CheckCircle, ExternalLink } from "lucide-react";

const platformIcons: Record<string, React.ReactNode> = {
  PC: <Monitor size={14} />,
  Mobile: <Smartphone size={14} />,
  Console: <Gamepad2 size={14} />,
  Web: <Globe size={14} />,
};

export default function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const game = games.find((g) => g.slug === slug);

  if (!game) {
    return <Navigate to="/games" replace />;
  }

  const idx = games.indexOf(game);
  const bgColors = ["#2a1500", "#15002a", "#002a15", "#000a2a"];

  return (
    <div className="min-h-screen bg-fluke-bg">
      {/* Hero */}
      <div
        className="relative h-[60vh] flex items-end pb-16 overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${bgColors[idx % bgColors.length]} 0%, var(--fluke-bg) 100%)` }}
      >
        {/* Background emoji */}
        <div className="absolute inset-0 flex items-center justify-center text-[18rem] opacity-10 pointer-events-none select-none">
          {["🏎️", "⚔️", "🕹️", "🚀"][idx % 4]}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-fluke-bg via-transparent to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-sm text-fluke-muted hover:text-fluke-yellow font-sora mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Games
          </Link>
          <p className="font-orbitron text-xs tracking-[0.3em] text-fluke-yellow uppercase mb-2">
            {game.genre} · {game.releaseYear}
          </p>
          <h1 className="font-bebas text-6xl sm:text-8xl text-fluke-text mb-4">{game.title}</h1>
          <div className="flex flex-wrap gap-2 items-center">
            {game.platforms.map((p) => (
              <span key={p} className="flex items-center gap-1.5 text-xs font-sora text-fluke-muted border border-fluke-yellow/20 rounded-full px-3 py-1">
                {platformIcons[p]} {p}
              </span>
            ))}
            <span className={`text-xs font-orbitron tracking-wider px-3 py-1 rounded-full border ml-2 ${
              game.status === "Released" ? "text-green-400 bg-green-400/10 border-green-400/20" :
              game.status === "In Development" ? "text-fluke-yellow bg-fluke-yellow/10 border-fluke-yellow/20" :
              "text-purple-400 bg-purple-400/10 border-purple-400/20"
            }`}>
              {game.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="font-orbitron font-semibold text-lg text-fluke-yellow mb-4">Overview</h2>
              <p className="font-sora text-fluke-muted leading-relaxed">{game.longDescription}</p>
            </div>
            <div>
              <h2 className="font-orbitron font-semibold text-lg text-fluke-yellow mb-4">Key Features</h2>
              <ul className="space-y-3">
                {game.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sora text-sm text-fluke-muted">
                    <CheckCircle size={14} className="text-fluke-yellow flex-none" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-orbitron font-semibold text-lg text-fluke-yellow mb-4">Screenshots</h2>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl flex items-center justify-center text-4xl"
                    style={{ background: `linear-gradient(135deg, hsl(${i * 60}, 30%, var(--thumb-lightness, 10%)), hsl(${i * 60 + 40}, 40%, var(--thumb-lightness-hi, 15%)))` }}
                  >
                    <span className="opacity-30">📷</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {game.externalUrl ? (
              <a
                href={game.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-2xl border border-fluke-yellow/20 bg-fluke-yellow/10 px-5 py-4 text-fluke-text transition hover:bg-fluke-yellow/15"
              >
                <div>
                  <div className="font-orbitron text-[11px] tracking-[0.35em] uppercase text-fluke-yellow/90">
                    Featured Site
                  </div>
                  <div className="mt-1 font-sora text-sm text-fluke-muted">
                    Open the dedicated Pavan website.
                  </div>
                </div>
                <ExternalLink size={18} className="text-fluke-yellow" />
              </a>
            ) : null}

            <div 
              className="rounded-2xl p-6 transition-all duration-300"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <h3 className="font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((t) => (
                  <span key={t} className="text-xs font-sora px-3 py-1 rounded-full bg-fluke-bg border border-fluke-yellow/10 text-fluke-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <Link
              to="/contact"
              className="btn-primary w-full py-3 rounded-xl font-sora text-sm text-center block"
            >
              Collaborate on a Game
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
