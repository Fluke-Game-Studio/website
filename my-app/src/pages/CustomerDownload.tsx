import { useEffect, useMemo, useState } from "react";
import { useCustomerAuth } from "../auth/CustomerAuthContext";
import { customerApi, type CustomerDownloadItem } from "../services/customerApi";
import { games } from "../lib/data/games";
import { Download, User, Hash, Shield, ChevronRight, MessageSquare, Box, Terminal, Globe, Calendar, CheckCircle2, ShieldCheck, Lock, ExternalLink, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DiscordButton from "../components/DiscordButton";
import { useTheme } from "../lib/ThemeContext";

export default function CustomerDownload() {
  const { profile, logout } = useCustomerAuth();
  const { theme } = useTheme();
  const isLight = theme === "light";
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState<CustomerDownloadItem[]>([]);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [envByProduct, setEnvByProduct] = useState<Record<string, string>>({});

  async function loadDownloads() {
    setLoading(true);
    try {
      const d = await customerApi.downloads();
      const fetchedItems = Array.isArray(d.items) ? d.items : [];
      setItems(fetchedItems);
      if (fetchedItems.length > 0 && !activeProductId) {
        setActiveProductId(`${fetchedItems[0].product_id}`);
      }
      setErr("");
    } catch (e: any) {
      setErr(e?.message || "Failed to load downloads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDownloads();
    const id = window.setInterval(() => {
      if (!document.hidden) void loadDownloads();
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  const customerType = String(profile?.customer?.customer_type || "").toLowerCase();
  const isStaff = customerType === "developer" || customerType === "tester";
  
  const grouped = useMemo(() => {
    const out: Record<string, CustomerDownloadItem[]> = {};
    for (const it of items) {
      const key = `${it.product_id}`;
      if (!out[key]) out[key] = [];
      out[key].push(it);
    }
    return Object.entries(out).map(([productId, entries]) => {
      const base = entries[0];
      const gameData = games.find(g => g.id === productId || g.slug === base.project_id);
      return { productId, base, entries, gameData };
    });
  }, [items]);

  const activeGroup = grouped.find(g => g.productId === activeProductId);

  const glassClass = isLight ? "glass" : "glass-dark";

  return (
    <div className="min-h-screen bg-fluke-bg flex flex-col md:flex-row pt-20">
      {/* ─── LEFT SIDEBAR (GAMES ONLY) ─── */}
      <aside className={`w-20 md:w-72 flex-none border-r ${isLight ? 'border-fluke-yellow/10' : 'border-white/5'} flex flex-col sticky top-20 h-[calc(100vh-80px)] z-30 bg-fluke-bg/50 backdrop-blur-xl`}>
        <div className="p-4 md:p-6 flex flex-col h-full">
          <div className="mb-8 hidden md:block">
            <h2 className="font-bebas text-3xl text-fluke-text tracking-wider ml-2">LIBRARY</h2>
            <div className="h-[2px] w-12 bg-fluke-yellow mt-1 ml-2" />
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto no-scrollbar">
            {grouped.map((g) => (
              <button
                key={g.productId}
                onClick={() => setActiveProductId(g.productId)}
                className={`
                  w-full flex items-center gap-3 p-2 md:p-3 rounded-xl transition-all duration-300 group relative
                  ${activeProductId === g.productId 
                    ? "bg-fluke-yellow/10 border border-fluke-yellow/30 shadow-lg shadow-fluke-yellow/5" 
                    : "hover:bg-white/5 border border-transparent"
                  }
                `}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden bg-fluke-surface flex-none border border-white/5 shadow-md">
                  {g.gameData?.coverImage ? (
                    <img src={g.gameData.coverImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-fluke-yellow/40">
                      <Box size={18} />
                    </div>
                  )}
                </div>
                <div className="hidden md:block text-left flex-1 overflow-hidden">
                  <div className={`text-xs font-orbitron font-bold truncate tracking-wide ${activeProductId === g.productId ? 'text-fluke-yellow' : 'text-fluke-text'}`}>
                    {g.base.name}
                  </div>
                </div>
                {activeProductId === g.productId && (
                  <motion.div layoutId="active-nav" className="absolute -left-1 w-1 h-6 bg-fluke-yellow rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 hidden md:block">
             <button onClick={logout} className="w-full py-3 rounded-xl border border-red-500/20 text-red-400 text-[10px] font-orbitron font-bold tracking-widest hover:bg-red-500/10 transition-colors uppercase">
               Terminate Session
             </button>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 min-w-0 overflow-y-auto relative flex flex-col">
        {/* TOP BAR (Profile & Discord) */}
        <nav className="sticky top-0 z-40 w-full px-8 py-4 flex items-center justify-between bg-fluke-bg/80 backdrop-blur-md border-b border-white/5">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-fluke-yellow/10 border border-fluke-yellow/20 flex items-center justify-center text-fluke-yellow">
                <User size={20} />
              </div>
              <div className="hidden sm:block">
                <div className="text-[10px] font-orbitron text-fluke-muted tracking-widest uppercase mb-0.5">Logged in as</div>
                <div className="text-xs font-orbitron font-bold text-fluke-text uppercase">{profile?.customer?.name}</div>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <DiscordButton size="sm" className="!rounded-full shadow-lg shadow-fluke-yellow/10" />
              <div className={`hidden lg:flex items-center gap-3 px-4 py-2 rounded-full ${glassClass} border ${isLight ? 'border-fluke-yellow/30' : 'border-white/10'}`}>
                 <ShieldCheck className="text-fluke-yellow" size={14} />
                 <span className="text-[10px] font-orbitron text-fluke-muted uppercase tracking-widest">
                    Fluke Guard <span className="text-fluke-yellow ml-1">Active</span>
                 </span>
              </div>
           </div>
        </nav>

        <AnimatePresence mode="wait">
          {activeGroup ? (
            <motion.div
              key={activeGroup.productId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              {/* Header */}
              <div className="relative p-8 md:p-12 lg:p-16 border-b border-white/5">
                 {activeGroup.gameData?.coverImage && (
                    <div className="absolute inset-0 z-0 overflow-hidden opacity-30 blur-2xl pointer-events-none">
                       <img src={activeGroup.gameData.coverImage} className="w-full h-full object-cover scale-150" />
                    </div>
                 )}
                 
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                       <span className="px-3 py-1 rounded-md bg-fluke-yellow text-fluke-bg font-orbitron text-[9px] font-bold tracking-[0.2em] uppercase">
                          {activeGroup.gameData?.status || "LIVE"}
                       </span>
                       <span className={`px-3 py-1 rounded-md ${isLight ? 'bg-white border-fluke-yellow/20 text-fluke-muted' : 'bg-white/5 border-white/10 text-white/60'} border font-orbitron text-[9px] font-bold uppercase`}>
                          ID: {activeGroup.base.product_id}
                       </span>
                       {isStaff && (
                         <span className="px-3 py-1 rounded-md bg-purple-500/20 border border-purple-500/40 text-purple-300 font-orbitron text-[9px] font-bold uppercase flex items-center gap-1.5">
                            <Terminal size={10} /> STAFF
                         </span>
                       )}
                    </div>
                    <h1 className="font-bebas text-6xl md:text-8xl text-fluke-text mb-4 leading-none">{activeGroup.base.name}</h1>
                    <p className="font-sora text-fluke-muted max-w-2xl text-base md:text-lg leading-relaxed">
                       {activeGroup.gameData?.description || "Select a build from the available environments below to start your installation."}
                    </p>
                 </div>
              </div>

              {/* Downloads Content */}
              <div className="p-8 md:p-12 lg:p-16 flex-1 bg-gradient-to-b from-transparent to-black/5">
                 {/* Environment Tabs */}
                 <div className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/5 pb-8">
                    <div>
                       <h3 className="font-orbitron text-[10px] text-fluke-yellow tracking-[0.3em] uppercase mb-1 font-bold">Select Deployment</h3>
                       <p className="text-xs text-fluke-muted font-sora">Switch between internal, test, or production builds.</p>
                    </div>
                    <div className={`p-1 rounded-xl ${isLight ? 'bg-fluke-yellow/5 border-fluke-yellow/20' : 'bg-black/20 border-white/5'} border flex gap-1`}>
                       {(() => {
                          const scopes = Array.from(new Set(activeGroup.entries.flatMap(e => e.scopes || ["internal"])));
                          const selectedScope = envByProduct[activeGroup.productId] || scopes[0] || "internal";
                          return scopes.map(scope => (
                             <button
                                key={scope}
                                onClick={() => setEnvByProduct(prev => ({ ...prev, [activeGroup.productId]: scope }))}
                                className={`
                                   px-6 py-2.5 rounded-lg text-[10px] font-orbitron font-bold tracking-widest transition-all
                                   ${selectedScope === scope 
                                      ? "bg-fluke-yellow text-fluke-bg shadow-lg shadow-fluke-yellow/20" 
                                      : "text-fluke-muted hover:text-fluke-yellow"
                                   }
                                `}
                             >
                                {scope.toUpperCase()}
                             </button>
                          ));
                       })()}
                    </div>
                 </div>

                 {/* Builds Grid */}
                 <div className="grid gap-6">
                    {(() => {
                       const scopes = Array.from(new Set(activeGroup.entries.flatMap(e => e.scopes || ["internal"])));
                       const selectedScope = envByProduct[activeGroup.productId] || scopes[0] || "internal";
                       const releases = activeGroup.base.releasesByScope?.[selectedScope] || [];

                       if (releases.length === 0) {
                          return (
                             <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
                                <Box className="mx-auto text-fluke-muted opacity-20 mb-4" size={48} />
                                <p className="font-orbitron text-fluke-muted uppercase tracking-widest text-sm">No builds available in this environment</p>
                             </div>
                          );
                       }

                       return releases.map((r, i) => (
                          <motion.div
                             key={`${r.version}-${i}`}
                             initial={{ opacity: 0, y: 10 }}
                             animate={{ opacity: 1, y: 0 }}
                             transition={{ delay: 0.1 * i }}
                             className={`flex flex-col md:flex-row md:items-center gap-8 p-6 md:p-8 rounded-3xl ${glassClass} border ${isLight ? 'border-fluke-yellow/20 shadow-sm' : 'border-white/5 hover:border-fluke-yellow/30 shadow-xl'} transition-all duration-300 group`}
                          >
                             <div className="flex-1 flex flex-wrap items-center gap-8 md:gap-12">
                                <div>
                                   <div className="text-[9px] font-orbitron text-fluke-muted tracking-widest uppercase mb-1 font-bold">Build Version</div>
                                   <div className="font-orbitron font-black text-4xl text-fluke-text tracking-tight group-hover:text-fluke-yellow transition-colors">{r.version}</div>
                                </div>
                                <div>
                                   <div className="text-[9px] font-orbitron text-fluke-muted tracking-widest uppercase mb-1 font-bold">Release Tier</div>
                                   <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-fluke-yellow/5 border border-fluke-yellow/10">
                                      <CheckCircle2 size={12} className="text-green-500" />
                                      <span className="font-orbitron text-[10px] text-fluke-text font-bold uppercase">{r.release_status}</span>
                                   </div>
                                </div>
                                <div>
                                   <div className="text-[9px] font-orbitron text-fluke-muted tracking-widest uppercase mb-1 font-bold">Architecture</div>
                                   <div className="flex items-center gap-2">
                                      <Globe size={12} className="text-blue-400" />
                                      <span className="font-orbitron text-[10px] text-fluke-text font-bold uppercase">{r.platform || "UNIVERSAL"}</span>
                                   </div>
                                </div>
                             </div>

                             <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-none btn-primary !rounded-2xl px-12 py-5 flex items-center gap-4 text-xs font-black shadow-2xl hover:shadow-fluke-yellow/40 transition-all"
                             >
                                DOWNLOAD NOW
                                <Download size={20} strokeWidth={3} />
                             </motion.button>
                          </motion.div>
                       ));
                    })()}
                 </div>
              </div>

              {/* Guard Badge (Injected into main view) */}
              <div className="px-8 md:p-12 lg:px-16 pb-12 mt-auto">
                 <div className={`p-6 rounded-3xl ${isLight ? 'bg-fluke-yellow/5 border-fluke-yellow/20' : 'bg-black/20 border-white/5'} border flex flex-col sm:flex-row items-center justify-between gap-6`}>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-fluke-yellow/10 border border-fluke-yellow/30 flex items-center justify-center text-fluke-yellow relative">
                          <ShieldCheck size={28} />
                          <span className="absolute inset-0 bg-fluke-yellow/20 blur-lg rounded-full animate-pulse" />
                       </div>
                       <div>
                          <h4 className="font-orbitron text-xs font-black text-fluke-text tracking-[0.2em] uppercase">FLUKE GUARD PROTECTED</h4>
                          <p className="text-[10px] font-sora text-fluke-muted uppercase tracking-tight opacity-70">
                             Tier: <span className="text-fluke-yellow font-bold">{activeGroup.base.entitlement?.tier}</span> · 
                             Status: <span className="text-green-500 font-bold ml-1">{activeGroup.base.entitlement?.status?.toUpperCase()}</span>
                          </p>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="text-[10px] font-orbitron text-fluke-muted tracking-widest uppercase hidden lg:block">System Authenticated</div>
                       <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : (
             /* Loading / Empty State */
             <div className="flex-1 flex items-center justify-center p-12 text-center">
                <div className="max-w-md">
                   <div className="w-20 h-20 rounded-3xl bg-fluke-surface border border-white/5 flex items-center justify-center mx-auto mb-6 text-fluke-yellow/20 animate-pulse">
                      <Box size={40} />
                   </div>
                   <h2 className="font-bebas text-5xl text-fluke-text mb-4 uppercase">Syncing Library...</h2>
                   <p className="font-sora text-fluke-muted mb-8 leading-relaxed">
                      We are fetching your authorized builds from the Fluke server. This usually takes just a moment.
                   </p>
                </div>
             </div>
          )}
        </AnimatePresence>
      </main>

      {/* ─── ERROR OVERLAY ─── */}
      {err && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl bg-red-500 text-white font-orbitron font-bold text-[10px] tracking-widest shadow-2xl flex items-center gap-3"
        >
          <Lock size={16} />
          {err.toUpperCase()}
        </motion.div>
      )}
    </div>
  );
}
