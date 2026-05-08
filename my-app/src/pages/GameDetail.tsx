import { useParams, Link, Navigate } from "react-router-dom";
import { games } from "@/lib/data/games";
import { ArrowLeft, Monitor, Smartphone, Gamepad2, Globe, CheckCircle, ExternalLink } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

const platformIcons: Record<string, React.ReactNode> = {
  PC: <Monitor size={14} />,
  Mobile: <Smartphone size={14} />,
  Console: <Gamepad2 size={14} />,
  Web: <Globe size={14} />,
};

export default function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const game = games.find((g) => g.slug === slug);
  const { theme } = useTheme();
  const isLight = theme === "light";

  if (!game) {
    return <Navigate to="/games" replace />;
  }

  const idx = games.indexOf(game);
  const heroColors = isLight
    ? ["#dbeafe", "#cffafe", "#dcfce7", "#fef3c7"]
    : ["#2a1500", "#15002a", "#002a15", "#000a2a"];
  const panelStyle = {
    backgroundColor: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    boxShadow: "var(--card-shadow)",
  };
  const heroTextClass = isLight ? "text-slate-900" : "text-fluke-text";

  return (
    <div
      className="min-h-screen"
      style={{
        background: isLight
          ? "radial-gradient(circle at top, rgba(8,145,178,0.12) 0%, rgba(255,255,255,0) 42%), linear-gradient(180deg, #f8feff 0%, #f0fdfa 42%, #ffffff 100%)"
          : "var(--fluke-bg)",
      }}
    >
      {/* Hero */}
      <div
        className="relative flex h-[60vh] items-end overflow-hidden pb-16"
        style={{
          background: isLight
            ? `linear-gradient(135deg, ${heroColors[idx % heroColors.length]} 0%, rgba(255,255,255,0.95) 100%)`
            : `linear-gradient(135deg, ${heroColors[idx % heroColors.length]} 0%, var(--fluke-bg) 100%)`,
        }}
      >
        {/* Background emoji */}
        <div className={`absolute inset-0 flex items-center justify-center text-[18rem] pointer-events-none select-none ${isLight ? "opacity-[0.06]" : "opacity-10"}`}>
          {["🏎️", "⚔️", "🕹️", "🚀"][idx % 4]}
        </div>
        <div className={`absolute inset-0 ${isLight ? "bg-gradient-to-t from-white via-white/35 to-transparent" : "bg-gradient-to-t from-fluke-bg via-transparent to-transparent"}`} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <Link
            to="/games"
            className={`inline-flex items-center gap-2 text-sm font-sora mb-8 transition-colors ${isLight ? "text-slate-600 hover:text-slate-900" : "text-fluke-muted hover:text-fluke-yellow"}`}
          >
            <ArrowLeft size={14} /> Back to Games
          </Link>
          <p className={`font-orbitron text-xs tracking-[0.3em] uppercase mb-2 ${isLight ? "text-cyan-700" : "text-fluke-yellow"}`}>
            {game.genre} · {game.releaseYear}
          </p>
          <h1 className={`font-bebas text-6xl sm:text-8xl mb-4 ${heroTextClass}`}>{game.title}</h1>
          <div className="flex flex-wrap gap-2 items-center">
            {game.platforms.map((p) => (
              <span
                key={p}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-sora ${isLight ? "border border-cyan-200 bg-white/80 text-cyan-800" : "border border-fluke-yellow/20 text-fluke-muted"}`}
              >
                {platformIcons[p]} {p}
              </span>
            ))}
            <span
              className={`ml-2 rounded-full border px-3 py-1 text-xs font-orbitron tracking-wider ${
                game.status === "Released"
                  ? isLight
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-green-400/20 bg-green-400/10 text-green-400"
                  : game.status === "In Development"
                    ? isLight
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-fluke-yellow/20 bg-fluke-yellow/10 text-fluke-yellow"
                    : isLight
                      ? "border-violet-200 bg-violet-50 text-violet-700"
                      : "border-purple-400/20 bg-purple-400/10 text-purple-400"
              }`}
            >
              {game.status}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl p-6 md:p-8" style={panelStyle}>
              <h2 className={`mb-4 font-orbitron text-lg font-semibold ${isLight ? "text-cyan-700" : "text-fluke-yellow"}`}>Overview</h2>
              <p className="font-sora leading-relaxed text-fluke-muted">{game.longDescription}</p>
            </div>
            <div className="rounded-3xl p-6 md:p-8" style={panelStyle}>
              <h2 className={`mb-4 font-orbitron text-lg font-semibold ${isLight ? "text-cyan-700" : "text-fluke-yellow"}`}>Key Features</h2>
              <ul className="space-y-3">
                {game.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-sora text-sm text-fluke-muted">
                    <CheckCircle size={14} className="text-fluke-yellow flex-none" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl p-6 md:p-8" style={panelStyle}>
              <h2 className={`mb-4 font-orbitron text-lg font-semibold ${isLight ? "text-cyan-700" : "text-fluke-yellow"}`}>Screenshots</h2>
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-xl flex items-center justify-center text-4xl overflow-hidden border"
                    style={{
                      borderColor: isLight ? "rgba(8,145,178,0.14)" : "rgba(245,197,66,0.12)",
                      background: isLight
                        ? `linear-gradient(135deg, hsl(${i * 60}, 55%, 92%), hsl(${i * 60 + 40}, 60%, 97%))`
                        : `linear-gradient(135deg, hsl(${i * 60}, 30%, var(--thumb-lightness, 10%)), hsl(${i * 60 + 40}, 40%, var(--thumb-lightness-hi, 15%)))`,
                    }}
                  >
                    <span className={isLight ? "opacity-20" : "opacity-30"}>📷</span>
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
                className={`flex items-center justify-between gap-3 rounded-2xl px-5 py-4 transition ${isLight ? "border border-cyan-200 bg-cyan-50 text-cyan-950 hover:bg-cyan-100" : "border border-fluke-yellow/20 bg-fluke-yellow/10 text-fluke-text hover:bg-fluke-yellow/15"}`}
              >
                <div>
                  <div className={`font-orbitron text-[11px] tracking-[0.35em] uppercase ${isLight ? "text-cyan-700" : "text-fluke-yellow/90"}`}>
                    Featured Site
                  </div>
                  <div className="mt-1 font-sora text-sm text-fluke-muted">
                    Open the dedicated Pavan website.
                  </div>
                </div>
                <ExternalLink size={18} className={isLight ? "text-cyan-700" : "text-fluke-yellow"} />
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
              <h3 className={`mb-4 font-orbitron text-xs tracking-widest uppercase ${isLight ? "text-cyan-700" : "text-fluke-yellow"}`}>Tags</h3>
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
