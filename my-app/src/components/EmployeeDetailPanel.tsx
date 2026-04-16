import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Medal,
  MessageSquareReply,
  Play,
  Send,
  Sparkles,
  Trophy,
  X,
  Square,
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
}: {
  open: boolean;
  onClose: () => void;
  member: PublicTeamMember;
  analytics: PublicAnalyticsDashboard | null;
  awards: PublicAwardItem[];
  mediaCount: number;
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

  useEffect(() => {
    if (!open) return;
    if (messages.length) return;

    let cancelled = false;
    setLoading(true);
    setRobotStatus("thinking");

    publicStudioService
      .askPublicAssistant(buildSummaryPrompt(member, analytics, awards, mediaCount), context, {
        agentEmployeeId: "project_manager_core",
        username: safeStr(member.employee_name),
      })
      .then(async (reply) => {
        if (cancelled) return;
        setMessages([
          {
            id: uid(),
            role: "assistant",
            content: "",
            ts: Date.now(),
          },
        ]);
        await animateReply(reply || "No summary was returned.", 0);
      })
      .catch((err: any) => {
        if (cancelled) return;
        setMessages([
          {
            id: uid(),
            role: "assistant",
            content: safeStr(err?.message || "Failed to generate summary."),
            ts: Date.now(),
          },
        ]);
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
      if (typingTimerRef.current) {
        window.clearInterval(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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
      content: "Thinking...",
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
        context,
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="edp-chat-drawer mt-6 rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(11,18,32,.98),rgba(7,12,22,.98))] shadow-2xl overflow-hidden"
    >
      <div className="flex items-start justify-between gap-4 p-5 border-b border-white/10">
        <div className="flex items-start gap-3 min-w-0">
          <PublicBotAvatar2DBit status={loading ? "thinking" : robotStatus} size={44} />
          <div className="min-w-0">
            <div className="font-semibold text-fluke-text">Reply Assistant</div>
            <div className="text-sm text-fluke-muted mt-1">Public-only context for {safeStr(member.employee_name)}.</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full border border-white/10 bg-white/5 text-fluke-text grid place-items-center"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-5 grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/15 p-4 min-h-[360px]">
          <div ref={listRef} className="max-h-[340px] overflow-auto pr-1 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`edp-chat-bubble max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 border ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-500/15 border-blue-400/20 text-blue-50"
                    : "bg-white/5 border-white/10 text-fluke-text"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {loading ? (
              <div className="max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 border bg-white/5 border-white/10 text-fluke-text">
                Thinking...
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                disabled={loading}
                onClick={() => void sendPrompt(chip)}
                className="px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-fluke-text hover:border-fluke-yellow/40"
              >
                {chip}
              </button>
            ))}
          </div>

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

        <div className="space-y-4">
          <div className="edp-section rounded-3xl border border-white/10 bg-black/15 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold">AI Summary</div>
                <div className="text-sm text-fluke-muted mt-1">Generated from the public profile, awards, media, and analytics context.</div>
              </div>
              <button
                type="button"
                onClick={() => (loading ? stopPrompt() : void sendPrompt("Give me a concise public summary of this employee."))}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs transition-colors"
                style={{
                  color: loading ? "#ef4444" : "inherit",
                  borderColor: loading ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.1)"
                }}
              >
                {loading ? <Square size={13} fill="currentColor" /> : <MessageSquareReply size={13} />}
                {loading ? "Stop" : "Reply"}
              </button>
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-[#05080f] p-5 min-h-[140px] relative overflow-hidden group/readout">
              <div className="absolute top-0 left-0 w-1 h-full bg-fluke-yellow shadow-[0_0_15px_var(--fluke-yellow)]" />
              {messages.length ? (
                <div className="relative z-10">
                  <p className="text-sm leading-7 text-fluke-text/90 whitespace-pre-wrap font-mono tracking-tight">
                    {messages[0]?.content || "Initializing secure uplink..."}
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-fluke-yellow ml-1 align-middle"
                    />
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-fluke-yellow/50 font-mono text-xs uppercase tracking-widest animate-pulse">
                  <Sparkles size={14} />
                  Scanning public records...
                </div>
              )}
              {/* Subtle Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </div>
          </div>

          <div className="edp-section rounded-3xl border border-white/10 bg-black/15 p-5">
            <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold mb-3">
              Helper chips
            </div>
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <button
                  key={`small-${chip}`}
                  type="button"
                  disabled={loading}
                  onClick={() => void sendPrompt(chip)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-fluke-text hover:border-fluke-yellow/40"
                >
                  <ArrowLeftRight size={12} />
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
          buildEmployeeContext(
            member,
            analytics,
            memberAwards,
            mediaItems.length,
            employeeUpdates.length,
            employeeWeeks.length
          ),
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
    <div className="edp-container rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,28,0.92),rgba(7,11,20,0.96))] shadow-2xl overflow-hidden">
      <div className="p-4 md:p-6 lg:p-8 border-b border-white/10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold">Employee Deep Dive</div>
            <h2 className="font-bebas text-5xl md:text-6xl uppercase tracking-tight mt-2">
              {safeStr(member.employee_name)}
            </h2>
            <p className="text-fluke-muted mt-3 max-w-3xl">
              Public-safe charts, media, awards, and an AI summary. Use the reply drawer to ask follow-up questions about this employee.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-fluke-yellow text-black font-semibold"
          >
            <MessageSquareReply size={16} />
            Reply
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {[
            { key: "overview", label: "General" },
            { key: "media", label: "Screenshots" },
            { key: "awards", label: "Awards" },
          ].map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key as any)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                tab === item.key
                  ? "bg-fluke-yellow text-black"
                  : "bg-white/5 text-fluke-text border border-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {tab === "overview" ? (
          <>
            <div className="edp-section rounded-3xl border border-white/10 bg-black/15 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold">AI Summary</div>
                  <div className="text-sm text-fluke-muted mt-1">
                    Public-safe summary generated from the employee profile, awards, media, and analytics context.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs"
                >
                  <Sparkles size={13} />
                  Reply
                </button>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 min-h-[120px]">
                {summaryLoading ? (
                  <div className="flex items-center gap-2 text-fluke-muted">
                    <Sparkles size={15} />
                    Generating summary...
                  </div>
                ) : (
                  <p className="text-sm leading-7 text-fluke-text whitespace-pre-wrap">
                    {summary || "No summary available yet."}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {summaryStats.map((card) => (
                <div key={card.label} className="edp-section rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-fluke-muted">{card.label}</div>
                  <div
                    className={`mt-3 font-bold text-fluke-text ${
                      typeof card.value === "number" ? "text-3xl" : "text-base leading-6"
                    }`}
                  >
                    {card.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <MiniLineChart
                title="Submission Trend"
                subtitle="Public weekly update submissions."
                data={submissionTrend}
                stroke="#38bdf8"
              />
              <MiniLineChart
                title="Update Trend"
                subtitle="Public daily update activity."
                data={updateTrend}
                stroke="#f59e0b"
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/15 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold">Quick Prompts</div>
                  <div className="text-sm text-fluke-muted mt-1">Ask the embedded assistant about this employee.</div>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs"
                >
                  <Sparkles size={13} />
                  Open reply box
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Give me a concise public summary.",
                  "What are the highlighted awards?",
                  "Show media highlights.",
                  "What should visitors know about this person?",
                ].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setChatOpen(true)}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-fluke-text hover:border-fluke-yellow/40 transition-colors"
                  >
                    <ArrowLeftRight size={12} />
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {tab === "media" ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-4">
            <div className="edp-section rounded-3xl border border-white/10 bg-black/15 overflow-hidden">
              <div className="p-5 border-b border-white/10">
                <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold">Media Slideshow</div>
                <div className="text-sm text-fluke-muted mt-1">
                  Screenshots and videos surfaced from public update attachments.
                </div>
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
                      
                      {/* Interactive Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/viewer:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                    <div className="p-6 relative">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-4 bg-fluke-yellow rounded-full shadow-[0_0_8px_var(--fluke-yellow)]" />
                        <div className="font-bebas text-2xl tracking-wide text-white">{safeStr(currentMedia.name)}</div>
                      </div>
                      <div className="text-[10px] text-fluke-yellow/60 font-mono flex items-center gap-2">
                        <CalendarDays size={12} />
                        POSTED_ON // {fmtDate((currentMedia as any).updateDate)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[2rem] border border-dashed border-white/5 bg-white/[0.02] p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/5">
                      <ImageIcon className="text-white/20" size={32} />
                    </div>
                    <p className="text-fluke-muted font-medium text-sm">No visual intel available for this sector.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="edp-section rounded-3xl border border-white/10 bg-black/15 p-5">
              <div className="text-[11px] uppercase tracking-[0.28em] text-fluke-yellow font-semibold">All Media</div>
              <div className="mt-4">
                {(() => {
                  const limit = 4;
                  const visible = showAllMedia ? mediaItems : mediaItems.slice(0, limit);
                  const hasMore = mediaItems.length > limit;

                  return (
                    <>
                      <div className="grid grid-cols-2 gap-3 max-h-[560px] overflow-auto pr-1">
                        {mediaItems.length ? (
                          visible.map((item, idx) => {
                            const url = safeStr(item.publicUrl || item.youtubeUrl);
                            return (
                              <button
                                key={`${safeStr(item.name)}-${idx}`}
                                type="button"
                                onClick={() => setMediaIndex(idx)}
                                className={`edp-section rounded-2xl border text-left overflow-hidden transition-colors ${
                                  mediaIndex === idx ? "border-fluke-yellow bg-fluke-yellow/10" : "border-white/10 bg-white/5"
                                }`}
                              >
                                <div className="aspect-video bg-black/30 flex items-center justify-center overflow-hidden">
                                  {item.youtubeUrl ? (
                                    <div className="w-full h-full grid place-items-center text-fluke-yellow">
                                      <Play size={28} />
                                    </div>
                                  ) : isImage(url) ? (
                                    <img src={url} alt={safeStr(item.name)} className="w-full h-full object-cover" />
                                  ) : isVideo(url) ? (
                                    <div className="w-full h-full grid place-items-center text-fluke-yellow">
                                      <Play size={28} />
                                    </div>
                                  ) : (
                                    <div className="w-full h-full grid place-items-center text-fluke-muted">
                                      <ImageIcon size={24} />
                                    </div>
                                  )}
                                </div>
                                <div className="p-3 text-[10px] md:text-sm">
                                  <div className="font-semibold text-fluke-text line-clamp-1">{safeStr(item.name) || "Media"}</div>
                                  <div className="text-fluke-muted mt-1">{fmtDate((item as any).updateDate)}</div>
                                </div>
                              </button>
                            );
                          })
                        ) : (
                          <div className="col-span-2 rounded-2xl border border-dashed border-white/10 bg-white/5 p-6 text-fluke-muted">
                            No screenshots or videos available.
                          </div>
                        )}
                      </div>
                      {hasMore && (
                        <button
                          onClick={() => setShowAllMedia(!showAllMedia)}
                          className="w-full mt-4 py-3 text-xs text-fluke-yellow font-semibold border border-dashed border-white/10 rounded-xl hover:bg-white/5 transition-colors"
                        >
                          {showAllMedia ? "Show Less" : `View All ${mediaItems.length} media items`}
                        </button>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        ) : null}

        {tab === "awards" ? (
          <div className="space-y-4">
            {!memberAwards.length ? (
              <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-fluke-muted">
                No awards or achievements have been published for this employee yet.
              </div>
            ) : (
              (() => {
                const limit = 3;
                const visible = showAllAwards ? memberAwards : memberAwards.slice(0, limit);
                const hasMore = memberAwards.length > limit;

                return (
                  <>
                    {visible.map((award, idx) => {
                      const artwork = resolveAwardArtwork(award);
                      const imageUrl = safeStr(artwork.imageUrl || award.imageUrl);
                      const title = safeStr(award.title || award.type || `Award ${idx + 1}`);
                      const description = safeStr(award.description);
                      const kind = safeStr(award.type || award.tier).toLowerCase();
                      const isTrophy = kind === "trophy";
                      return (
                        <motion.article
                          key={`${award.id || title}-${idx}`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          className="group/award relative rounded-2xl p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-fluke-yellow/30 transition-all flex gap-6 overflow-hidden"
                        >
                          {/* Animated Border Pulse */}
                          <div className="absolute top-0 left-0 w-[2px] h-0 bg-fluke-yellow group-hover/award:h-full transition-all duration-500 shadow-[0_0_15px_var(--fluke-yellow)]" />
                          
                          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-none bg-black/40 border border-white/10 flex items-center justify-center p-2 shadow-inner group-hover/award:scale-105 transition-transform">
                            {isTrophy ? (
                              imageUrl ? (
                                isImage(imageUrl) ? (
                                  <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
                                ) : isVideo(imageUrl) ? (
                                  <video src={imageUrl} className="w-full h-full object-cover" muted playsInline />
                                ) : (
                                  <Trophy className="text-fluke-yellow transition-transform group-hover/award:rotate-12" size={32} />
                                )
                              ) : (
                                <Trophy className="text-fluke-yellow transition-transform group-hover/award:rotate-12" size={32} />
                              )
                            ) : (
                              <Medal className="text-emerald-400 transition-transform group-hover/award:rotate-12" size={32} />
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                          </div>
                          
                          <div className="min-w-0 flex-1 relative z-10">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bebas text-3xl tracking-wide text-white mb-2 leading-none uppercase">{title}</h3>
                                <p className="text-xs md:text-sm text-fluke-text/60 leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
                                  {description || "Achievement securely logged in studio records."}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-fluke-yellow/10 border border-fluke-yellow/20 text-[10px] font-bold uppercase tracking-widest text-fluke-yellow">
                                  <CalendarDays size={12} />
                                  {fmtDate(award.awardedAt)}
                                </span>
                                <div className="text-[9px] font-mono text-fluke-muted opacity-40 uppercase tracking-widest">Record_ID_{initials}_{idx + 10}</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Radial Background Glow */}
                          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-fluke-yellow/0 group-hover/award:bg-fluke-yellow/5 blur-[40px] rounded-full transition-colors" />
                        </motion.article>
                      );
                    })}
                    {hasMore && (
                      <button
                        onClick={() => setShowAllAwards(!showAllAwards)}
                        className="w-full py-4 text-sm text-fluke-yellow font-semibold border border-dashed border-white/10 rounded-2xl hover:bg-white/5 transition-colors"
                      >
                        {showAllAwards ? "Show Less" : `View All ${memberAwards.length} Awards`}
                      </button>
                    )}
                  </>
                );
              })()
            )}
          </div>
        ) : null}

        <PublicChatDrawer
          open={chatOpen}
          onClose={() => setChatOpen(false)}
          member={member}
          analytics={analytics}
          awards={memberAwards}
          mediaCount={mediaItems.length}
        />
      </div>
    </div>
  );
}

export default EmployeeDetailPanel;
