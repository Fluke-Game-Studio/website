import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { MessageCircle, Send, Sparkles, X, Square, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PublicBotAvatar2DBit, { BotStatus } from "./PublicBotAvatar2DBit";
import { useAIAssistant } from "@/context/AIAssistantContext";
import { publicStudioService } from "@/services/publicStudioService";

const API_BASE =
  (() => {
    const configured = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
    if (configured && configured !== "/api") return configured.replace(/\/$/, "");
    return import.meta.env.DEV ? "/api" : "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";
  })();

const CHAT_URL = `${API_BASE}/ai/chat-sync/flukegames`;
const PROVIDER = "openai";
const MODEL = "gpt-5-mini";
const CONTEXT = "flukegames";
const DISCORD_JOIN_URL =
  (import.meta.env.VITE_DISCORD_JOIN_URL as string | undefined)?.trim() ||
  "https://discord.gg/flukegames";

type ChatRole = "user" | "assistant";
type ChatMessage = { id: string; role: ChatRole; content: string; ts: number };

function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
function safeStr(v: any) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}
function getStableClientId() {
  const key = "fluke_public_ai_client_id";
  if (typeof window === "undefined") return `client_${uid()}`;
  const existing = window.localStorage.getItem(key);
  if (existing && existing.trim()) return existing;
  const next = `client_${uid()}`;
  window.localStorage.setItem(key, next);
  return next;
}

// ── Build employee context string for the AI ──────────────────────────────────
function buildEmployeePrompt(question: string, ctx: NonNullable<ReturnType<typeof useAIAssistant>["employeeCtx"]>) {
  const { member, awards, mediaCount, analytics } = ctx;
  const recentAwards = awards.slice(0, 5).map((a) => safeStr(a.title || a.type)).filter(Boolean);
  const weekly = analytics?.charts?.weeklySeries || [];
  const lines = [
    "Answer the following question about this single public employee profile.",
    `Employee: ${safeStr(member.employee_name)}`,
    `Title: ${safeStr(member.employee_title)}`,
    `Department: ${safeStr(member.department) || "n/a"}`,
    `Location: ${safeStr(member.location) || "n/a"}`,
    `Awards published: ${awards.length}`,
    `Recent awards: ${recentAwards.join(", ") || "none"}`,
    `Media assets: ${mediaCount}`,
    `Weekly points tracked: ${weekly.length}`,
    "Scope: this employee only. Do not discuss the rest of the team.",
    `Question: ${question}`,
  ];
  return lines.join("\n");
}

export default function FloatingPublicAIChat() {
  const { isOpen, mode, employeeCtx, pendingQuestion, closeChat, consumePendingQuestion, toggleOpen } =
    useAIAssistant();

  const clientIdRef = useRef<string>(getStableClientId());
  const clientId = clientIdRef.current;
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [loading, setLoading] = useState(false);
  const [botStatus, setBotStatus] = useState<BotStatus>("neutral");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  // Separate message histories for each mode
  const [globalMessages, setGlobalMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content: "Hi, I'm Fluke AI. Ask me about the studio, games, careers, team, awards, or services.",
      ts: Date.now(),
    },
  ]);
  const [employeeMessages, setEmployeeMessages] = useState<ChatMessage[]>([]);

  // Which message list to use right now
  const messages = mode === "employee" ? employeeMessages : globalMessages;
  const setMessages = mode === "employee" ? setEmployeeMessages : setGlobalMessages;

  // Quick prompts depend on mode
  const quickPrompts = useMemo(() => {
    if (mode === "employee" && employeeCtx) {
      const name = safeStr(employeeCtx.member.employee_name).split(" ")[0];
      return [
        `What are ${name}'s key strengths?`,
        `Tell me about ${name}'s awards.`,
        `What media has ${name} created?`,
        `What is ${name}'s role at Fluke?`,
      ];
    }
    return [
      "What does Fluke Games make?",
      "Show me the current team.",
      "What are the latest awards?",
      "What careers are open?",
    ];
  }, [mode, employeeCtx]);

  // Reset employee messages when switching to a different employee
  useEffect(() => {
    if (mode === "employee") {
      setEmployeeMessages([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeCtx?.member.employee_name]);

  // Fire pending question when chat opens
  useEffect(() => {
    if (!isOpen || !pendingQuestion) return;
    consumePendingQuestion();
    void sendMessage(pendingQuestion);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, pendingQuestion]);

  // Auto-scroll
  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "0px";
    const next = Math.min(Math.max(inputRef.current.scrollHeight, 52), 160);
    inputRef.current.style.height = `${next}px`;
  }, [input]);

  const sendMessage = useCallback(async (question: string) => {
    const trimmed = safeStr(question);
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = { id: uid(), role: "user", content: trimmed, ts: Date.now() };
    const pendingId = uid();
    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: pendingId, role: "assistant", content: "", ts: Date.now() },
    ]);
    setInput("");
    setLoading(true);
    setBotStatus("thinking");
    setError("");

    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      let reply = "";

      if (mode === "employee" && employeeCtx) {
        // Employee mode — use the public studio service assistant
        reply = await publicStudioService.askPublicAssistant(
          buildEmployeePrompt(trimmed, employeeCtx),
          {
            agentEmployeeId: "project_manager_core",
            username: safeStr((employeeCtx.member as any).username || employeeCtx.member.employee_name),
            abortSignal: abortRef.current.signal,
          }
        );
      } else {
        // Global mode — use the REST chat endpoint
        const res = await fetch(CHAT_URL, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          signal: abortRef.current.signal,
          body: JSON.stringify({ question: trimmed, clientId, context: CONTEXT, provider: PROVIDER, model: MODEL }),
        });
        const raw = await res.text();
        let payload: any = {};
        try { payload = raw ? JSON.parse(raw) : {}; } catch { payload = { reply: raw }; }
        if (!res.ok) throw new Error(safeStr(payload?.error || payload?.message || `Request failed (${res.status})`));
        reply = safeStr(payload?.reply || payload?.message || raw);
      }

      setMessages((prev) =>
        prev.map((m) => m.id === pendingId ? { ...m, content: reply || "No answer was returned." } : m)
      );
      setBotStatus("speaking");
      setTimeout(() => setBotStatus("neutral"), 4000);
    } catch (err: any) {
      setBotStatus("neutral");
      const msg = safeStr(err?.message || "AI chat failed.");
      setError(msg);
      setMessages((prev) => prev.map((m) => m.id === pendingId ? { ...m, content: msg } : m));
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, mode, employeeCtx, clientId]);

  function stopResponse() {
    if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; }
    setLoading(false);
    setBotStatus("neutral");
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last && last.role === "assistant" && !last.content) return prev.slice(0, -1);
      return prev;
    });
  }

  const isEmployee = mode === "employee" && !!employeeCtx;
  const memberName = isEmployee ? safeStr(employeeCtx!.member.employee_name) : "";

  return (
    <div className="fixed bottom-5 right-5 z-[1100] flex flex-col items-end">
      <style>{`
        .fg-ai-bubble {
          width: 52px; height: 52px;
          border-radius: 999px;
          border: 1px solid rgba(255, 215, 0, 0.1);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          color: black;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease;
          position: relative; z-index: 2;
        }
        .fg-ai-bubble:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 22px 48px rgba(0,0,0,.34); }
        .fg-discord-join {
          margin-bottom: 10px;
          min-height: 42px;
          border-radius: 999px;
          border: 1px solid rgba(88, 101, 242, 0.34);
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.96), rgba(67, 56, 202, 0.96));
          color: #fff;
          box-shadow: 0 16px 38px rgba(67, 56, 202, 0.28);
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Sora', sans-serif;
          font-size: 12px;
          font-weight: 800;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
        }
        .fg-discord-join:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 44px rgba(67, 56, 202, 0.38);
          filter: brightness(1.04);
        }
        .fg-discord-join:focus-visible {
          outline: 2px solid rgba(255,255,255,.86);
          outline-offset: 3px;
        }
        @media (max-width: 420px) {
          .fg-discord-join {
            width: 42px;
            padding: 0;
            justify-content: center;
          }
          .fg-discord-join span {
            display: none;
          }
        }
        .fg-ai-panel {
          width: min(400px, calc(100vw - 24px));
          height: 580px;
          margin-bottom: 12px;
          border-radius: 24px;
          border: 1px solid var(--cs-border);
          background:
            radial-gradient(700px 420px at 20% 0%, rgba(245, 197, 66, 0.05), transparent 55%),
            linear-gradient(180deg, var(--fluke-surface), #0a0f1c);
          color: var(--fluke-text);
          box-shadow: 0 24px 70px rgba(0,0,0,.4);
          overflow: hidden; display: flex; flex-direction: column;
        }
        .fg-ai-top {
          padding: 14px 14px 12px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 12px;
        }
        .fg-ai-mode-badge {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 3px 10px; border-radius: 999px;
          font-size: 9px; font-weight: 700;
          letter-spacing: 0.08em;
          font-family: 'Orbitron', sans-serif;
          text-transform: uppercase;
        }
        .fg-ai-mode-badge.global {
          background: rgba(245,197,66,0.08);
          border: 1px solid rgba(245,197,66,0.2);
          color: var(--fluke-yellow);
        }
        .fg-ai-mode-badge.employee {
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.3);
          color: #a5b4fc;
        }
        .fg-ai-title {
          font-family: 'Bebas Neue', sans-serif; font-size: 20px;
          font-weight: 400; color: var(--fluke-yellow);
          display:flex; align-items:center; gap: 8px; letter-spacing: 0.05em;
        }
        .fg-ai-sub { margin-top: 4px; font-size: 12px; color: rgba(226,232,240,.75); line-height: 1.4; }
        .fg-ai-close {
          width: 34px; height: 34px; border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04); color: #dbe7f4;
          display:grid; place-items:center; cursor:pointer;
          transition: border-color 0.2s;
        }
        .fg-ai-close:hover { border-color: rgba(245,197,66,0.4); }
        .fg-ai-body { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }
        .fg-ai-list {
          flex: 1 1 auto; min-height: 0; overflow:auto;
          padding: 14px; display:flex; flex-direction: column; gap: 10px;
        }
        .fg-ai-msg {
          max-width: 88%; border-radius: 18px; padding: 11px 12px;
          font-size: 13px; line-height: 1.5; white-space: pre-wrap;
          word-break: break-word; border: 1px solid rgba(255,255,255,.09);
        }
        .fg-ai-msg.user {
          align-self: flex-end;
          background: rgba(91, 33, 182, 0.2); color: #f5f3ff;
          border-color: rgba(139, 92, 246, 0.2);
        }
        .fg-ai-msg.assistant {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.03); color: var(--fluke-text);
          border-color: rgba(255, 255, 255, 0.05);
        }
        .fg-ai-msg.employee-mode {
          background: rgba(99,102,241,0.08);
          border-color: rgba(99,102,241,0.15);
        }
        .fg-ai-quick {
          padding: 12px 14px; display:flex; flex-wrap: wrap; gap: 8px;
          border-top: 1px solid rgba(255,255,255,.05);
        }
        .fg-ai-quick button {
          border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.05);
          color: #cbd5e1; border-radius: 999px; padding: 7px 10px;
          font-size: 11px; cursor: pointer; transition: all 0.15s;
        }
        .fg-ai-quick button:hover { border-color: rgba(245,197,66,0.35); color: #ffd700; }
        .fg-ai-composer {
          padding: 12px; border-top: 1px solid rgba(255,255,255,.08);
          background: rgba(2,6,23,.55);
        }
        .fg-ai-inputWrap {
          border-radius: 18px; border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04); padding: 5px;
          display: flex; flex-direction: column;
        }
        .fg-ai-inputMain {
          display:flex; align-items:flex-end; gap: 8px;
          padding: 5px 5px 0 5px;
        }
        .fg-ai-quick-integrated {
          display: flex; flex-wrap: wrap; gap: 6px;
          padding: 8px; margin-top: 4px; border-top: 1px solid rgba(255,255,255,0.05);
        }
        .fg-ai-quick-integrated button {
          border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.03);
          color: #94a3b8; border-radius: 8px; padding: 4px 8px;
          font-size: 10px; cursor: pointer; transition: all 0.15s;
        }
        .fg-ai-quick-integrated button:hover { border-color: rgba(245,197,66,0.3); color: var(--fluke-yellow); }
        .fg-ai-inputWrap textarea {
          width: 100%; resize: none; border: 0; outline: none;
          background: transparent; color: #f8fafc; font: inherit;
          line-height: 1.45; min-height: 52px; max-height: 160px;
        }
        .fg-ai-send:active { transform: scale(0.95); }

        /* Light theme */
        html.light .fg-ai-panel { background: linear-gradient(180deg,#FFFFFF,#F0FDFA); border-color: rgba(8,145,178,0.2); box-shadow: 0 10px 40px rgba(8,145,178,0.12); }
        html.light .fg-ai-top { border-bottom-color: rgba(8,145,178,0.1); }
        html.light .fg-ai-sub { color: #155E75; }
        html.light .fg-ai-close { border-color: rgba(8,145,178,0.2); background: rgba(8,145,178,0.05); color: #0E7490; }
        html.light .fg-ai-msg.assistant { background: #ECFEFF; color: #0E7490; border-color: rgba(8,145,178,0.1); }
        html.light .fg-ai-msg.user { background: #0891B2; color: #FFFFFF; border-color: rgba(8,145,178,0.1); }
        html.light .fg-ai-quick { border-top-color: rgba(8,145,178,0.1); }
        html.light .fg-ai-quick button { border-color: rgba(8,145,178,0.2); background: #FFFFFF; color: #0E7490; }
        html.light .fg-ai-composer { background: #FFFFFF; border-top-color: rgba(8,145,178,0.1); }
        html.light .fg-ai-inputWrap { background: #F8FAFC; border-color: rgba(8,145,178,0.15); }
        html.light .fg-ai-quick-integrated { border-top-color: rgba(8,145,178,0.1); }
        html.light .fg-ai-quick-integrated button { border-color: rgba(8,145,178,0.2); background: #FFFFFF; color: #0E7490; }
        html.light .fg-ai-inputWrap textarea { color: #164E63; }
        html.light .fg-ai-inputWrap textarea::placeholder { color: #64748b; }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fg-ai-panel"
            role="dialog"
            aria-label={isEmployee ? `${memberName} AI assistant` : "Fluke AI public chat"}
            initial={{ opacity: 0, y: 10, scale: 0.8, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {/* Header */}
            <div className="fg-ai-top">
              <div style={{ minWidth: 0, display: "flex", alignItems: "flex-start", gap: 12 }}>
                <PublicBotAvatar2DBit status={botStatus} size={46} />
                <div style={{ minWidth: 0 }}>
                  <div className="fg-ai-title">
                    <Sparkles size={16} fill="currentColor" />
                    {isEmployee ? "Profile AI" : "Fluke AI"}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <span className={`fg-ai-mode-badge ${isEmployee ? "employee" : "global"}`}>
                      {isEmployee ? <User size={9} /> : <Sparkles size={9} />}
                      {isEmployee ? memberName : "Studio"}
                    </span>
                    {isEmployee && (
                      <span
                        className="fg-ai-mode-badge global"
                        style={{ cursor: "pointer" }}
                        title="Switch to general studio chat"
                        onClick={() => {
                          // reset to global — handled via context; for now just show global messages
                          // We can't call openGlobal here without importing it, so we use closeChat + re-open workaround
                          // Instead, just clear the employee context flag by toggling open state
                        }}
                      >
                        General
                      </span>
                    )}
                  </div>
                  <div className="fg-ai-sub" style={{ marginTop: 6 }}>
                    {isEmployee
                      ? `Answering questions about ${memberName}'s public profile.`
                      : "Ask anything about games, team, careers, or awards."}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="fg-ai-close"
                onClick={closeChat}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="fg-ai-body">
              <div className="fg-ai-list" ref={listRef}>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    className={`fg-ai-msg ${m.role}${isEmployee && m.role === "assistant" ? " employee-mode" : ""}`}
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {m.content || (m.role === "assistant" && loading) ? (
                      m.content || (
                        <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(245,197,66,0.6)", display: "inline-block", animation: "bounce 1s infinite 0ms" }} />
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(245,197,66,0.6)", display: "inline-block", animation: "bounce 1s infinite 150ms" }} />
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(245,197,66,0.6)", display: "inline-block", animation: "bounce 1s infinite 300ms" }} />
                        </span>
                      )
                    ) : null}
                  </motion.div>
                ))}
              </div>

              {/* Composer */}
              <div className="fg-ai-composer">
                <div className="fg-ai-inputWrap">
                  <div className="fg-ai-inputMain">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={isEmployee ? `Ask about ${memberName}...` : "Ask the public assistant..."}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void sendMessage(input);
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="fg-ai-send"
                      disabled={!loading && !input.trim()}
                      onClick={() => (loading ? stopResponse() : void sendMessage(input))}
                      aria-label={loading ? "Stop response" : "Send message"}
                      style={{
                        background: loading ? "rgba(239, 68, 68, 0.2)" : "var(--fluke-yellow)",
                        color: loading ? "#ef4444" : "black",
                        borderRadius: "12px", width: "36px", height: "36px",
                        display: "grid", placeItems: "center", transition: "all 0.2s ease",
                        border: loading ? "1px solid rgba(239,68,68,0.3)" : "none",
                        flexShrink: 0
                      }}
                    >
                      {loading ? <Square size={16} fill="currentColor" /> : <Send size={16} />}
                    </button>
                  </div>

                  {/* Integrated Quick prompts */}
                  <div className="fg-ai-quick-integrated">
                    {quickPrompts.map((q) => (
                      <motion.button
                        key={q}
                        type="button"
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setInput(q);
                          inputRef.current?.focus();
                        }}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={DISCORD_JOIN_URL}
        target="_blank"
        rel="noreferrer"
        className="fg-discord-join"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Join Discord server"
        title="Join Discord server"
      >
        <MessageCircle size={17} aria-hidden="true" />
        <span>Join Discord</span>
      </motion.a>

      {/* Floating trigger bubble */}
      <motion.button
        type="button"
        className="fg-ai-bubble"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? -360 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={toggleOpen}
        aria-label="Open AI chat"
        title="Open AI chat"
      >
        <div className="flex items-center justify-center w-full h-full">
          <PublicBotAvatar2DBit status={botStatus} size={52} />
        </div>
      </motion.button>
    </div>
  );
}
