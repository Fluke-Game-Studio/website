import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useScroll } from "framer-motion";
import {
  BarChart3,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Medal,
  MessageCircle,
  Play,
  Send,
  Sparkles,
  TrendingUp,
  Trophy,
  X,
  Square,
  Zap,
  Star,
  Target,
  Sword,
  Crown,
} from "lucide-react";
import PublicBotAvatar2DBit from "./PublicBotAvatar2DBit";
import {
  PublicAnalyticsDashboard,
  PublicAwardItem,
  PublicMediaAsset,
  PublicTeamMember,
  PublicUpdateItem,
  publicStudioService,
} from "@/services/publicStudioService";
import { resolveAwardArtwork } from "@/lib/awardArtwork";

type ChatRole = "user" | "assistant";
type ChatMessage = { id: string; role: ChatRole; content: string; ts: number };

function safeStr(v: any) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function fmtDate(v: any) {
  const s = safeStr(v);
  if (!s) return "—";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return s;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

function dayKey(v: any) {
  const s = safeStr(v);
  if (!s) return "";
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function isImage(url: string) {
  return /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/i.test(url || "");
}

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(url || "");
}

function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeMedia(list: PublicUpdateItem[]) {
  const out: Array<PublicMediaAsset & { updateDate?: string }> = [];
  const seen = new Set<string>();
  for (const item of list) {
    const date = safeStr(item.createdAt || item.weekStart);
    const assets = [...(item.attachments || []), ...(item.media || [])];
    for (const media of assets) {
      const url = safeStr(media.publicUrl || media.youtubeUrl || "");
      const key = `${safeStr(item.employee_name)}__${date}__${safeStr(media.name)}__${url}`;
      if (!url || seen.has(key)) continue;
      seen.add(key);
      out.push({ ...media, updateDate: date });
    }
  }
  return out;
}

function buildEmployeeContext(
  member: PublicTeamMember,
  analytics: PublicAnalyticsDashboard | null,
  awards: PublicAwardItem[],
  mediaCount: number,
  employeeUpdateCount = 0,
  employeeWeekCount = 0
) {
  const weekly = analytics?.charts?.weeklySeries || [];
  const recentAwards = awards.slice(0, 5).map((award) => safeStr(award.title || award.type)).filter(Boolean);
  const publicUsername = safeStr((member as any).username);

  return [
    `Employee: ${safeStr(member.employee_name)}`,
    `Public username: ${publicUsername || "n/a"}`,
    `Title: ${safeStr(member.employee_title)}`,
    `Department: ${safeStr(member.department) || "n/a"}`,
    `Location: ${safeStr(member.location) || "n/a"}`,
    `Employment: ${safeStr(member.employment_type) || "n/a"}`,
    `Employee updates visible: ${employeeUpdateCount}`,
    `Employee weeks visible: ${employeeWeekCount}`,
    `LinkedIn connected: ${member.linkedin_connected ? "yes" : "no"}`,
    `Discord connected: ${member.discord_connected ? "yes" : "no"}`,
    `Awards published: ${awards.length}`,
    `Media assets: ${mediaCount}`,
    `Recent awards: ${recentAwards.join(", ") || "none"}`,
    `Weekly points: ${weekly.length}`,
    "Scope: one employee only. Do not answer about the whole team.",
    "If some public data is missing, summarize only what is visible rather than saying updates were not found.",
    "Use only public-safe wording. No emails, usernames, or internal-only details.",
  ].join("\n");
}

function buildSummaryPrompt(
  member: PublicTeamMember,
  analytics: PublicAnalyticsDashboard | null,
  awards: PublicAwardItem[],
  mediaCount: number,
  employeeUpdateCount = 0,
  employeeWeekCount = 0
) {
  return [
    "Create a short public-safe summary for this single employee, not the studio team.",
    buildEmployeeContext(member, analytics, awards, mediaCount, employeeUpdateCount, employeeWeekCount),
    "Write 4-6 concise lines, focusing on public-safe highlights, awards, media volume, and visible studio presence.",
    "Do not mention missing submitted updates or team-wide data unless the user explicitly asks.",
  ].join("\n\n");
}

function buildFollowupPrompt(
  member: PublicTeamMember,
  analytics: PublicAnalyticsDashboard | null,
  awards: PublicAwardItem[],
  mediaCount: number,
  question: string,
  employeeUpdateCount = 0,
  employeeWeekCount = 0
) {
  return [
    "Answer the following about this single public employee profile.",
    buildEmployeeContext(member, analytics, awards, mediaCount, employeeUpdateCount, employeeWeekCount),
    `Question: ${question}`,
    "Stay scoped to this employee only.",
  ].join("\n\n");
}

function buildLocalEmployeeFallbackSummary(
  member: PublicTeamMember,
  awards: PublicAwardItem[],
  mediaCount: number,
  analytics: PublicAnalyticsDashboard | null,
  employeeUpdateCount = 0,
  employeeWeekCount = 0
) {
  const totalAwards = awards.length;
  const title = safeStr(member.employee_title) || "Team member";
  const dept = safeStr(member.department);
  const location = safeStr(member.location);
  return [
    `${safeStr(member.employee_name)} is featured on the public site as a ${title}.`,
    dept ? `They are associated with ${dept}${location ? ` in ${location}` : ""}.` : location ? `They are associated with ${location}.` : "",
    `Public profile highlights include ${totalAwards} award${totalAwards === 1 ? "" : "s"}, ${mediaCount} media item${mediaCount === 1 ? "" : "s"}, ${employeeUpdateCount} update${employeeUpdateCount === 1 ? "" : "s"}, and ${employeeWeekCount} visible week${employeeWeekCount === 1 ? "" : "s"}.`,
    analytics?.charts?.weeklySeries?.length
      ? `The broader public analytics feed is available, but this panel is scoped to the selected employee.`
      : "This panel is scoped to the selected employee.",
    "Use the Awards and Screenshots tabs for the visual highlights, or ask a follow-up for a narrower public-safe summary.",
  ]
    .filter(Boolean)
    .join(" ");
}

function looksLikeNoUpdatesMessage(reply: string) {
  const text = safeStr(reply).toLowerCase();
  return (
    text.includes("could not find submitted updates") ||
    text.includes("no submitted updates") ||
    text.includes("try a different week/project filter")
  );
}

// --- NEW REDESIGN COMPONENTS ---

function AwardParallaxCard({ award, idx }: { award: PublicAwardItem; idx: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    // Set CSS variables for the glare effect
    e.currentTarget.style.setProperty("--mouse-x", `${(mouseX / width) * 100}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${(mouseY / height) * 100}%`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const artwork = resolveAwardArtwork(award);
  const imageUrl = safeStr(artwork.imageUrl || award.imageUrl);
  const title = safeStr(award.title || award.type || `Award ${idx + 1}`);
  const description = safeStr(award.description);
  const kind = safeStr(award.type || award.tier).toLowerCase();
  const kindLabel = safeStr(award.type || award.tier || "Award");
  const isTrophy = kind === "trophy" || kind.includes("trophy") || kind.includes("official");

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group/award relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-1 transition-all hover:border-fluke-yellow/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      <div className="relative h-full rounded-xl bg-fluke-bg/40 backdrop-blur-sm overflow-hidden" style={{ transform: "translateZ(20px)" }}>
        {/* Parallax Image Area */}
        <div className="relative h-24 flex items-center justify-center p-1 bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
          <motion.div 
            style={{ transform: "translateZ(40px)" }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            {imageUrl ? (
              isImage(imageUrl) ? (
                <img src={imageUrl} alt={title} className="h-full object-contain filter drop-shadow-[0_0_15px_rgba(245,197,66,0.3)]" />
              ) : (
                <Trophy size={64} className="text-fluke-yellow" />
              )
            ) : isTrophy ? (
              <Trophy size={64} className="text-fluke-yellow" />
            ) : (
              <Medal size={64} className="text-emerald-400" />
            )}
          </motion.div>
          
          {/* Glare Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover/award:opacity-100 transition-opacity duration-500"
            style={{ 
               background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.1) 0%, transparent 80%)`
            }}
          />
        </div>

        <div className="p-4" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full bg-fluke-yellow/10 border border-fluke-yellow/20 text-[9px] text-fluke-yellow uppercase font-bold tracking-widest">
              {kindLabel}
            </span>
            <div className="text-[10px] text-fluke-muted font-mono">{fmtDate(award.awardedAt)}</div>
          </div>
          <h3 className="font-bebas text-lg text-white tracking-wide line-clamp-1 group-hover/award:text-fluke-yellow transition-colors">
            {title}
          </h3>
          <p className="mt-0.5 text-[10px] text-fluke-muted line-clamp-2 leading-tight">
            {description || "Studio recognition for excellence."}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

function AchievementTimeline({ achievements }: { achievements: PublicAwardItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track horizontal scroll progress
  const { scrollXProgress } = useScroll({
    container: containerRef,
  });

  // Smooth the progress for the line
  const scaleX = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const getIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes("code") || t.includes("dev")) return Sword;
    if (t.includes("art") || t.includes("design")) return Target;
    if (t.includes("lead") || t.includes("manager")) return Crown;
    if (t.includes("milestone") || t.includes("release")) return Zap;
    return Star;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      if (containerRef.current) {
        e.preventDefault();
        containerRef.current.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <div className="relative pt-20 pb-8 group/track">
      {/* Background Line (Ghost) */}
      <div className="absolute top-[102px] left-4 right-4 h-1 bg-white/5 z-0 rounded-full" />
      
      {/* Animated Growth Line */}
      <motion.div 
        className="absolute top-[102px] left-4 right-4 h-1 bg-gradient-to-r from-fluke-yellow via-fluke-yellow to-fluke-yellow shadow-[0_0_15px_rgba(245,197,66,0.8)] z-1 origin-left rounded-full"
        style={{ scaleX }}
      />
      
      <div 
        ref={containerRef}
        onWheel={handleWheel}
        className="flex flex-row gap-6 overflow-x-auto pb-4 px-4 relative z-10 custom-horizontal-scrollbar"
      >
        <style dangerouslySetInnerHTML={{ __html: `
          .custom-horizontal-scrollbar::-webkit-scrollbar {
            height: 4px;
          }
          .custom-horizontal-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          .custom-horizontal-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(245, 197, 66, 0.4);
            border-radius: 10px;
          }
          .custom-horizontal-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(245, 197, 66, 0.8);
          }
        `}} />
        {achievements.map((item, idx) => {
          const Icon = getIcon(safeStr(item.type || item.title));
          return (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center flex-shrink-0 w-[220px] group"
            >
              {/* Level Node (Dot on the line) */}
              <div className="absolute top-[32px] left-1/2 -translate-x-1/2 z-20">
                <div className="w-10 h-10 rounded-full bg-fluke-bg border-4 border-fluke-yellow flex items-center justify-center relative shadow-[0_0_20px_rgba(245,197,66,0.6)] group-hover:scale-110 transition-transform duration-300">
                  <Icon size={18} className="text-fluke-yellow" />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border-2 border-fluke-yellow"
                  />
                </div>
              </div>

              {/* Date Badge above the node */}
              <div className="mb-14 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-fluke-yellow tracking-widest uppercase">
                {fmtDate(item.awardedAt)}
              </div>

              {/* Achievement Card below the node */}
              <div className="w-full rounded-2xl border border-white/5 bg-white/[0.03] p-6 hover:bg-white/[0.06] hover:border-fluke-yellow/20 transition-all duration-300 group-hover:-translate-y-1 shadow-2xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-[1px] flex-1 bg-fluke-yellow/20" />
                </div>
                
                <h4 className="font-bebas text-2xl text-white tracking-widest leading-tight mb-2 group-hover:text-fluke-yellow transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-fluke-muted leading-relaxed font-sora line-clamp-3">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                   <div className="px-2 py-0.5 rounded bg-fluke-yellow/10 text-[8px] font-orbitron text-fluke-yellow uppercase">
                    {safeStr(item.type || "Milestone")}
                   </div>
                   <Sparkles className="text-fluke-yellow/30 group-hover:text-fluke-yellow opacity-0 group-hover:opacity-100 transition-all" size={14} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Scroll hint for desktop */}
      <div className="mt-4 flex justify-end gap-2 pr-4 opacity-0 group-hover/track:opacity-40 transition-opacity">
        <div className="flex items-center gap-1.5 text-[9px] font-orbitron text-fluke-muted uppercase tracking-widest">
          Use Mouse Wheel to Scroll
          <ChevronRight size={12} />
        </div>
      </div>
    </div>
  );
}

function MiniLineChart({
  title,
  subtitle,
  data,
  stroke = "#38bdf8",
}: {
  title: string;
  subtitle: string;
  data: Array<{ label: string; value: number }>;
  stroke?: string;
}) {
  const width = 640;
  const height = 210;
  const padX = 16;
  const padY = 16;
  const values = data.map((d) => Number(d.value || 0));
  const max = Math.max(1, ...values);
  const span = Math.max(1, max);
  const points = data.map((d, idx) => {
    const x = padX + (idx * (width - padX * 2)) / Math.max(1, data.length - 1);
    const y = height - padY - (Number(d.value || 0) / span) * (height - padY * 2);
    return { x, y, label: d.label, value: Number(d.value || 0) };
  });
  const linePath = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = points.length
    ? `${linePath} L ${points[points.length - 1].x} ${height - padY} L ${points[0].x} ${height - padY} Z`
    : "";

  return (
    <div className="edp-chart rounded-3xl border border-white/10 bg-black/15 p-5">
      <div className="mb-4">
        <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold">{title}</div>
        <div className="text-sm text-fluke-muted mt-1">{subtitle}</div>
      </div>
      {!points.length ? (
        <div className="h-[210px] rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-fluke-muted">
          No chart data yet.
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[210px] block">
            <defs>
              <linearGradient id={`grad-${title.replace(/\s+/g, "-")}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity="0.30" />
                <stop offset="100%" stopColor={stroke} stopOpacity="0.02" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((ratio) => (
              <line
                key={ratio}
                x1={padX}
                x2={width - padX}
                y1={padY + ratio * (height - padY * 2)}
                y2={padY + ratio * (height - padY * 2)}
                className="chart-grid-line"
                stroke="rgba(255,255,255,.08)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
            ))}
            {areaPath ? (
              <path 
                d={areaPath} 
                fill={`url(#grad-${title.replace(/\s+/g, "-")})`} 
                className="transition-all duration-700 ease-in-out"
              />
            ) : null}
            <path 
              d={linePath} 
              fill="none" 
              stroke={stroke} 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="chart-main-line shadow-[0_0_15px_rgba(245,197,66,0.5)]"
              style={{ filter: `drop-shadow(0 0 8px ${stroke})` }}
            />
            {points.map((p) => (
              <circle 
                key={`${p.label}-${p.value}`} 
                cx={p.x} 
                cy={p.y} 
                r="5" 
                fill={stroke} 
                className="chart-dot cursor-pointer transition-transform hover:scale-150" 
                stroke="#0b1220" 
                strokeWidth="2" 
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}

function PublicChatDrawer({
  open,
  onClose,
  member,
  analytics,
  awards,
  mediaCount,
  pendingQuestion,
  onPendingQuestionConsumed,
}: {
  open: boolean;
  onClose: () => void;
  member: PublicTeamMember;
  analytics: PublicAnalyticsDashboard | null;
  awards: PublicAwardItem[];
  mediaCount: number;
  pendingQuestion?: string | null;
  onPendingQuestionConsumed?: () => void;
}) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const typingTimerRef = useRef<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [robotStatus, setRobotStatus] = useState<"neutral" | "speaking" | "thinking">("neutral");
  const abortRef = useRef<AbortController | null>(null);

  const chips = useMemo(
    () => [
      "Give me a concise public summary.",
      "What are the highlighted awards?",
      "Show media highlights.",
      "What should visitors know about this person?",
    ],
    []
  );

  const context = useMemo(
    () => buildEmployeeContext(member, analytics, awards, mediaCount),
    [member, analytics, awards, mediaCount]
  );

  // Auto-greet on first open (no pending question)
  useEffect(() => {
    if (!open) return;
    if (messages.length) return;
    if (pendingQuestion) return; // handled by the pendingQuestion effect below

    let cancelled = false;
    setLoading(true);
    setRobotStatus("thinking");

    publicStudioService
      .askPublicAssistant(buildSummaryPrompt(member, analytics, awards, mediaCount), {
        agentEmployeeId: "project_manager_core",
        username: safeStr(member.employee_name),
      })
      .then(async (reply) => {
        if (cancelled) return;
        setMessages([{ id: uid(), role: "assistant", content: "", ts: Date.now() }]);
        await animateReply(reply || "No summary was returned.", 0);
      })
      .catch((err: any) => {
        if (cancelled) return;
        setMessages([{ id: uid(), role: "assistant", content: safeStr(err?.message || "Failed to generate summary."), ts: Date.now() }]);
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => {
      cancelled = true;
      if (typingTimerRef.current) { window.clearInterval(typingTimerRef.current); typingTimerRef.current = null; }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Fire pending question when drawer opens with a pre-selected chip
  useEffect(() => {
    if (!open || !pendingQuestion) return;
    onPendingQuestionConsumed?.();
    void sendPrompt(pendingQuestion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pendingQuestion]);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open, loading]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "0px";
    const next = Math.min(Math.max(inputRef.current.scrollHeight, 52), 140);
    inputRef.current.style.height = `${next}px`;
  }, [input]);

  function animateReply(text: string, messageIndex: number) {
    return new Promise<void>((resolve) => {
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }

      setRobotStatus("speaking");
      const chars = Array.from(text);
      let i = 0;

      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === messageIndex
            ? {
                ...msg,
                content: "",
              }
            : msg
        )
      );

      typingTimerRef.current = window.setInterval(() => {
        i += Math.max(1, Math.ceil(chars.length / 120));
        const next = chars.slice(0, i).join("");
        setMessages((prev) =>
          prev.map((msg, idx) =>
            idx === messageIndex
              ? {
                  ...msg,
                  content: next,
                }
              : msg
          )
        );

        if (i >= chars.length) {
          if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
          typingTimerRef.current = null;
          setRobotStatus("neutral");
          resolve();
        }
      }, 18);
    });
  }

  async function sendPrompt(prompt: string) {
    const trimmed = safeStr(prompt);
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
      ts: Date.now(),
    };

    const assistantMsg: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: "",
      ts: Date.now(),
    };

    const nextIndex = messages.length + 1;
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setLoading(true);
    setRobotStatus("thinking");

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const reply = await publicStudioService.askPublicAssistant(
        buildFollowupPrompt(member, analytics, awards, mediaCount, trimmed),
        {
          agentEmployeeId: "project_manager_core",
          username: safeStr((member as any).username || member.employee_name),
          abortSignal: abortRef.current.signal,
        }
      );
      const finalReply = looksLikeNoUpdatesMessage(reply)
        ? buildLocalEmployeeFallbackSummary(member, awards, mediaCount, analytics)
        : reply;
      await animateReply(finalReply || "No answer was returned.", nextIndex);
    } catch (err: any) {
      const msg = safeStr(err?.message || "Public assistant failed.");
      setMessages((prev) =>
        prev.map((m, idx) => (idx === nextIndex ? { ...m, content: msg } : m))
      );
      setRobotStatus("neutral");
    } finally {
      setLoading(false);
      abortRef.current = null;
      setTimeout(() => setRobotStatus("neutral"), 220);
    }
  }

  function stopPrompt() {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    if (typingTimerRef.current) {
      window.clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
    setLoading(false);
    setRobotStatus("neutral");
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.content === "Thinking...") {
        return prev.slice(0, -1);
      }
      return prev;
    });
  }

  if (!open) return null;

  const profileStats = [
    { label: "Title", value: safeStr(member.employee_title) || "—" },
    { label: "Dept", value: safeStr(member.department) || "—" },
    { label: "Awards", value: String(awards.length) },
    { label: "Media", value: String(mediaCount) },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="edp-chat-drawer mt-6 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,32,.98),rgba(7,12,22,.98))] shadow-2xl overflow-hidden"
    >
      {/* Drawer Header */}
      <div className="flex items-start justify-between gap-4 p-5 border-b border-white/10">
        <div className="flex items-start gap-3 min-w-0">
          <PublicBotAvatar2DBit status={loading ? "thinking" : robotStatus} size={44} />
          <div className="min-w-0">
            <div className="font-semibold text-fluke-text">Profile Assistant</div>
            <div className="text-sm text-fluke-muted mt-1">Scoped to {safeStr(member.employee_name)}'s public data.</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full border border-white/10 bg-white/5 text-fluke-text grid place-items-center hover:border-fluke-yellow/40 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-4">
        {/* Chat column */}
        <div className="rounded-2xl border border-white/10 bg-black/15 p-4 flex flex-col min-h-[380px]">
          <div ref={listRef} className="flex-1 overflow-auto pr-1 space-y-3 max-h-[320px]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`edp-chat-bubble max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 border ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-500/15 border-blue-400/20 text-blue-50"
                    : "bg-white/5 border-white/10 text-fluke-text"
                }`}
              >
                {msg.content || (msg.role === "assistant" && loading) ? (
                  msg.content || (
                    <span className="inline-flex items-center gap-1">
                      <span className="animate-bounce [animation-delay:0ms] w-1.5 h-1.5 bg-fluke-yellow/60 rounded-full inline-block" />
                      <span className="animate-bounce [animation-delay:150ms] w-1.5 h-1.5 bg-fluke-yellow/60 rounded-full inline-block" />
                      <span className="animate-bounce [animation-delay:300ms] w-1.5 h-1.5 bg-fluke-yellow/60 rounded-full inline-block" />
                    </span>
                  )
                ) : null}
              </div>
            ))}
          </div>

          {/* Quick chips inside chat */}
          {!messages.length && !loading ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  disabled={loading}
                  onClick={() => void sendPrompt(chip)}
                  className="px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-fluke-text hover:border-fluke-yellow/40 transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>
          ) : null}

          {/* Composer */}
          <div className="edp-composer mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a follow-up about this employee..."
                className="w-full bg-transparent outline-none resize-none text-sm text-fluke-text placeholder:text-fluke-muted min-h-[52px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendPrompt(input);
                  }
                }}
              />
              <button
                type="button"
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                disabled={!loading && !safeStr(input)}
                onClick={() => (loading ? stopPrompt() : void sendPrompt(input))}
                style={{
                  background: loading ? "rgba(239, 68, 68, 0.2)" : "var(--fluke-yellow)",
                  color: loading ? "#ef4444" : "black",
                  border: loading ? "1px solid rgba(239, 68, 68, 0.3)" : "none",
                }}
              >
                {loading ? <Square size={16} fill="currentColor" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Profile context sidebar – no duplicate summary */}
        <div className="space-y-4">
          {/* Stat tiles */}
          <div className="edp-section rounded-3xl border border-white/10 bg-black/15 p-5">
            <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold mb-4">
              Profile Context
            </div>
            <div className="grid grid-cols-2 gap-3">
              {profileStats.map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-fluke-muted mb-1">{s.label}</div>
                  <div className="text-xs font-semibold text-fluke-text line-clamp-2">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Ask chips */}
          <div className="edp-section rounded-3xl border border-white/10 bg-black/15 p-5">
            <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold mb-3">
              Ask a question
            </div>
            <div className="flex flex-col gap-2">
              {chips.map((chip) => (
                <button
                  key={`side-${chip}`}
                  type="button"
                  disabled={loading}
                  onClick={() => void sendPrompt(chip)}
                  className="w-full text-left inline-flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-xs text-fluke-text hover:border-fluke-yellow/40 hover:bg-white/10 transition-colors"
                >
                  <MessageCircle size={11} className="flex-none text-fluke-yellow/70" />
                  {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function EmployeeDetailPanel({
  member,
  awards,
  updates,
  analytics,
}: {
  member: PublicTeamMember;
  awards: PublicAwardItem[];
  updates: PublicUpdateItem[];
  analytics: PublicAnalyticsDashboard | null;
}) {
  const [tab, setTab] = useState<"overview" | "media" | "awards">("overview");
  const [chatOpen, setChatOpen] = useState(false);
  const [pendingQuestion, setPendingQuestion] = useState<string | null>(null);

  function openChatWithQuestion(q: string) {
    setPendingQuestion(q);
    setChatOpen(true);
  }
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(true);
  const media = useMemo(() => normalizeMedia(updates), [updates]);
  const employeeUpdates = useMemo(() => {
    const name = safeStr(member.employee_name).toLowerCase();
    return updates
      .filter((item) => safeStr(item.employee_name).toLowerCase() === name)
      .sort((a, b) => String(b.createdAt || b.weekStart || "").localeCompare(String(a.createdAt || a.weekStart || "")));
  }, [updates, member.employee_name]);
  const memberAwards = useMemo(() => {
    const name = safeStr(member.employee_name).toLowerCase();
    return awards
      .filter((award) => safeStr(award.person?.name).toLowerCase() === name)
      .sort((a, b) => String(b.awardedAt || "").localeCompare(String(a.awardedAt || "")));
  }, [awards, member]);

  const { achievements, officialAwards } = useMemo(() => {
    const ach: PublicAwardItem[] = [];
    const off: PublicAwardItem[] = [];
    memberAwards.forEach((a) => {
      const kind = safeStr(a.type || a.tier).toLowerCase();
      if (kind.includes("achievement") || kind.includes("milestone") || kind.includes("update")) {
        ach.push(a);
      } else {
        off.push(a);
      }
    });
    return { achievements: ach, officialAwards: off };
  }, [memberAwards]);

  const employeeWeeklyCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of employeeUpdates) {
      const key = safeStr(item.weekStart || item.createdAt);
      if (!key) continue;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([weekStart, updatesCount]) => ({ label: weekStart, value: updatesCount }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [employeeUpdates]);

  const employeeDailyCounts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of employeeUpdates) {
      const key = dayKey(item.createdAt || item.weekStart);
      if (!key) continue;
      map.set(key, (map.get(key) || 0) + 1);
    }
    return Array.from(map.entries())
      .map(([day, updatesCount]) => ({ label: day, value: updatesCount }))
      .sort((a, b) => a.label.localeCompare(b.label))
      .slice(-16);
  }, [employeeUpdates]);

  const submissionTrend = employeeWeeklyCounts;
  const updateTrend = employeeDailyCounts;

  const mediaItems = media.filter((item) => {
    const name = safeStr((item as any).employee_name).toLowerCase();
    return !name || name === safeStr(member.employee_name).toLowerCase();
  });
  const employeeWeeks = useMemo(() => {
    const set = new Set<string>();
    employeeUpdates.forEach((item) => {
      const week = safeStr(item.weekStart);
      if (week) set.add(week);
    });
    return Array.from(set.values()).sort();
  }, [employeeUpdates]);
  const latestUpdate = employeeUpdates[0] || null;
  const latestLabel = latestUpdate ? fmtDate(latestUpdate.createdAt || latestUpdate.weekStart) : "—";

  const [mediaIndex, setMediaIndex] = useState(0);
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [showAllAwards, setShowAllAwards] = useState(false);

  useEffect(() => {
    setMediaIndex(0);
    setShowAllMedia(false);
    setShowAllAwards(false);
  }, [member.employee_name]);

  const currentMedia = mediaItems[mediaIndex] || null;

  const summaryStats = useMemo(() => {
    return [
      { label: "Updates", value: employeeUpdates.length },
      { label: "Weeks", value: employeeWeeks.length },
      { label: "Awards", value: memberAwards.length },
      { label: "Media", value: mediaItems.length },
      { label: "Active Days", value: employeeDailyCounts.length },
      { label: "Latest", value: latestLabel },
    ];
  }, [employeeDailyCounts.length, employeeUpdates.length, employeeWeeks.length, latestLabel, memberAwards.length, mediaItems.length]);

  useEffect(() => {
    let cancelled = false;

    async function loadSummary() {
      try {
        setSummaryLoading(true);
        const prompt = buildSummaryPrompt(
          member,
          analytics,
          memberAwards,
          mediaItems.length,
          employeeUpdates.length,
          employeeWeeks.length
        );
        const reply = await publicStudioService.askPublicAssistant(
          prompt,
          {
            agentEmployeeId: "project_manager_core",
            username: safeStr((member as any).username || member.employee_name),
          }
        );
        if (!cancelled) {
          setSummary(
            looksLikeNoUpdatesMessage(reply)
              ? buildLocalEmployeeFallbackSummary(
                  member,
                  memberAwards,
                  mediaItems.length,
                  analytics,
                  employeeUpdates.length,
                  employeeWeeks.length
                )
              : reply
          );
        }
      } catch {
        if (!cancelled) {
          setSummary(
            buildLocalEmployeeFallbackSummary(
              member,
              memberAwards,
              mediaItems.length,
              analytics,
              employeeUpdates.length,
              employeeWeeks.length
            )
          );
        }
      } finally {
        if (!cancelled) setSummaryLoading(false);
      }
    }

    loadSummary();
    return () => {
      cancelled = true;
    };
  }, [member, analytics, memberAwards, mediaItems.length, employeeUpdates.length, employeeWeeks.length]);

  return (
    <div className="edp-container max-w-full min-w-0 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.92),rgba(7,11,20,0.96))] shadow-2xl overflow-hidden">
      {/* Hero Header with Profile */}
      <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-r from-white/5 via-transparent to-transparent border-b border-white/10">
        <div className="flex flex-col md:flex-row items-start gap-6 md:items-center md:justify-between">
          <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold">
                <Sparkles size={13} />
                AI Profile Summary
              </div>
              <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
                {summaryLoading ? (
                  <p className="text-sm md:text-base text-fluke-muted leading-relaxed animate-pulse">
                    Generating a concise summary for this team member...
                  </p>
                ) : (
                  <p className="text-sm md:text-base text-fluke-text leading-relaxed whitespace-pre-wrap">
                    {summary || buildLocalEmployeeFallbackSummary(member, memberAwards, mediaItems.length, analytics, employeeUpdates.length, employeeWeeks.length)}
                  </p>
                )}
              </div>
          </div>
          <button
            type="button"
            onClick={() => openChatWithQuestion("Give me a concise public summary of this employee.")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fluke-yellow text-black font-semibold hover:bg-fluke-yellow/90 transition-colors whitespace-nowrap"
          >
            <Sparkles size={16} />
            AI Chat
          </button>
        </div>

        {/* Key Stats - Dashboard Style */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
          {summaryStats.map((card) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="edp-section rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 hover:border-fluke-yellow/30 transition-all group"
            >
              <div className="text-[10px] uppercase tracking-[0.24em] text-fluke-muted group-hover:text-fluke-yellow transition-colors font-semibold">{card.label}</div>
              <div
                className={`mt-3 font-bold text-white group-hover:text-fluke-yellow transition-colors ${
                  typeof card.value === "number" ? "text-3xl md:text-4xl" : "text-sm leading-5"
                }`}
              >
                {card.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {[
            { key: "overview", label: "Overview", icon: BarChart3 },
            { key: "media", label: "Gallery", icon: ImageIcon },
            { key: "awards", label: "Awards", icon: Trophy },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key as any)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                tab === item.key
                  ? "bg-fluke-yellow text-black shadow-lg shadow-fluke-yellow/30"
                  : "bg-white/5 text-fluke-text border border-white/10 hover:bg-white/10"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <item.icon size={14} />
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8 space-y-8">
        {tab === "overview" ? (
          <>
            {/* Analytics Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="edp-section rounded-3xl border border-white/10 bg-black/15 p-6 overflow-hidden"
              >
                <div className="mb-6">
                  <h3 className="font-bebas text-2xl text-white inline-flex items-center gap-2">
                    <TrendingUp size={20} className="text-fluke-yellow" />
                    Activity Trend
                  </h3>
                  <p className="text-xs text-fluke-muted mt-1">Weekly submission activity</p>
                </div>
                <MiniLineChart title="Submission Trend" subtitle="Weekly submission count" data={submissionTrend} stroke="#38bdf8" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="edp-section rounded-3xl border border-white/10 bg-black/15 p-6 overflow-hidden"
              >
                <div className="mb-6">
                  <h3 className="font-bebas text-2xl text-white inline-flex items-center gap-2">
                    <BarChart3 size={20} className="text-fluke-yellow" />
                    Update Activity
                  </h3>
                  <p className="text-xs text-fluke-muted mt-1">Daily update frequency</p>
                </div>
                <MiniLineChart title="Daily Updates" subtitle="Update activity per day" data={updateTrend} stroke="#f59e0b" />
              </motion.div>
            </div>

            {/* Quick Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="edp-section rounded-3xl border border-white/10 bg-black/15 p-6"
            >
              <h3 className="font-bebas text-xl text-white mb-4 inline-flex items-center gap-2">
                <MessageCircle size={18} className="text-fluke-yellow" />
                Quick Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "What are their key strengths?",
                  "Notable achievements and awards?",
                  "Project highlights and media?",
                  "Department role and impact?",
                ].map((chip) => (
                  <motion.button
                    key={chip}
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={() => openChatWithQuestion(chip)}
                    className="text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-fluke-yellow/30 transition-all group"
                  >
                    <p className="text-sm font-semibold text-fluke-text group-hover:text-fluke-yellow transition-colors">
                      {chip}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}

        {tab === "media" ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="edp-section rounded-3xl border border-white/10 bg-black/15 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="font-bebas text-2xl text-white inline-flex items-center gap-2">
                  <ImageIcon size={20} className="text-fluke-yellow" />
                  Media Showcase
                </h3>
                <p className="text-xs text-fluke-muted mt-1">Featured gallery from public updates</p>
              </div>
              <div className="p-8">
                {currentMedia ? (
                  <div className="group/viewer relative rounded-3xl border border-white/10 bg-black/40 overflow-hidden shadow-2xl">
                    <div className="aspect-video bg-black flex items-center justify-center relative">
                      {currentMedia.youtubeUrl ? (
                        <iframe
                          src={currentMedia.youtubeUrl}
                          title={safeStr(currentMedia.name)}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      ) : isImage(safeStr(currentMedia.publicUrl)) ? (
                        <img
                          src={safeStr(currentMedia.publicUrl)}
                          alt={safeStr(currentMedia.name)}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/viewer:scale-105"
                        />
                      ) : isVideo(safeStr(currentMedia.publicUrl)) ? (
                        <video src={safeStr(currentMedia.publicUrl)} controls className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-fluke-muted font-mono text-xs uppercase tracking-widest"> Intel Corrupted // Payload Missing</div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <div className="p-6 relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-4 bg-fluke-yellow rounded-full shadow-[0_0_8px_var(--fluke-yellow)]" />
                        <div className="font-bebas text-2xl tracking-wide text-white">{safeStr(currentMedia.name)}</div>
                      </div>
                      <div className="text-[10px] text-fluke-yellow/60 font-mono flex items-center gap-2">
                        <CalendarDays size={12} />
                        {fmtDate((currentMedia as any).updateDate)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[2rem] border border-dashed border-white/5 bg-white/[0.02] p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/5">
                      <ImageIcon className="text-white/20" size={32} />
                    </div>
                    <p className="text-fluke-muted font-medium text-sm">No visual media available</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="edp-section rounded-3xl border border-white/10 bg-black/15 p-6 flex flex-col"
            >
              <h3 className="font-bebas text-xl text-white mb-4">📚 All Media ({mediaItems.length})</h3>
              <div className="space-y-2 flex-1 overflow-y-auto pr-2">
                {mediaItems.length ? (
                  mediaItems.slice(0, showAllMedia ? undefined : 5).map((item, idx) => {
                    const url = safeStr(item.publicUrl || item.youtubeUrl);
                    return (
                      <button
                        key={`${safeStr(item.name)}-${idx}`}
                        type="button"
                        onClick={() => setMediaIndex(idx)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          mediaIndex === idx
                            ? "bg-fluke-yellow/20 border-fluke-yellow text-fluke-yellow"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <div className="text-sm font-semibold line-clamp-1">{safeStr(item.name) || "Media"}</div>
                        <div className="text-xs text-fluke-muted/80 mt-1">{fmtDate((item as any).updateDate)}</div>
                      </button>
                    );
                  })
                ) : (
                  <div className="text-fluke-muted text-sm text-center py-6">No media available</div>
                )}
              </div>
              {mediaItems.length > 5 && (
                <button
                  onClick={() => setShowAllMedia(!showAllMedia)}
                  className="mt-4 w-full py-2 text-xs text-fluke-yellow font-semibold border border-dashed border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  {showAllMedia ? "Show Less" : `Show All ${mediaItems.length}`}
                </button>
              )}
            </motion.div>
          </div>
        ) : null}

        {tab === "awards" ? (
          <div className="space-y-16">
            {!memberAwards.length ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-fluke-muted text-center">
                <Trophy size={32} className="mx-auto mb-3 opacity-50" />
                <p>No accolades recorded yet</p>
              </div>
            ) : (
              <>
                {/* Achievements Timeline Section */}
                {achievements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4">
                      <h3 className="font-bebas text-3xl text-white tracking-widest uppercase">
                        Career <span className="text-fluke-yellow">Milestones</span>
                      </h3>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-fluke-yellow/40 to-transparent" />
                    </div>

                    <AchievementTimeline achievements={achievements} />
                  </motion.div>
                )}

                {/* Official Awards Section */}
                {officialAwards.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <h3 className="font-bebas text-3xl text-white tracking-widest uppercase">
                        Official <span className="text-fluke-yellow">Recognition</span>
                      </h3>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-fluke-yellow/40 to-transparent" />
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {officialAwards.slice(0, showAllAwards ? undefined : 8).map((award, idx) => (
                        <AwardParallaxCard key={award.id || idx} award={award} idx={idx} />
                      ))}
                    </div>

                    {officialAwards.length > 8 && (
                      <button
                        onClick={() => setShowAllAwards(!showAllAwards)}
                        className="w-full py-4 text-xs font-orbitron text-fluke-yellow tracking-widest border border-dashed border-white/10 rounded-2xl hover:bg-white/5 transition-all"
                      >
                        {showAllAwards ? "COLLAPSE TROPHY ROOM" : `VIEW ALL ${officialAwards.length} AWARDS`}
                      </button>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </div>
        ) : null}

        <PublicChatDrawer
          open={chatOpen}
          onClose={() => { setChatOpen(false); setPendingQuestion(null); }}
          member={member}
          analytics={analytics}
          awards={memberAwards}
          mediaCount={mediaItems.length}
          pendingQuestion={pendingQuestion}
          onPendingQuestionConsumed={() => setPendingQuestion(null)}
        />
      </div>
    </div>
  );
}

export default EmployeeDetailPanel;
