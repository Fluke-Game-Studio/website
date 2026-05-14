import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { MessageCircle, Send, Sparkles, X, Square, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import PublicBotAvatar2DBit, { BotStatus } from "./PublicBotAvatar2DBit";
import { useAIAssistant } from "@/context/AIAssistantContext";
import { publicStudioService } from "@/services/publicStudioService";
import { resolveApiBase } from "@/services/apiBase";

const API_BASE = resolveApiBase();

const CHAT_URL = `${API_BASE}/ai/chat-sync/flukegames`;
const PROVIDER = "openai";
const MODEL = "gpt-5-mini";
const CONTEXT = "flukegames";
const DISCORD_JOIN_URL = "https://discord.gg/xDQPgXkj5X";

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
  const location = useLocation();
  const { isOpen, mode, employeeCtx, pendingQuestion, closeChat, consumePendingQuestion, toggleOpen } =
    useAIAssistant();

  // Team member profile uses its own dedicated AI sheet; hide the floating global chat there.
  if (location.pathname.startsWith("/about/team/")) {
    return null;
  }

  const clientIdRef = useRef<string>(getStableClientId());
  const clientId = clientIdRef.current;
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const [loading, setLoading] = useState(false);
  const [botStatus, setBotStatus] = useState<BotStatus>("neutral");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [discordModalOpen, setDiscordModalOpen] = useState(false);

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
    <div className="fixed bottom-5 right-5 z-1100 flex flex-col items-end">
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
          margin-bottom: 12px;
          height: 48px;
          border-radius: 16px;
          border: 1px solid rgba(88, 101, 242, 0.4);
          background: linear-gradient(135deg, #5865F2, #4752C4);
          color: #fff;
          box-shadow: 0 10px 25px rgba(88, 101, 242, 0.3);
          padding: 0 18px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          overflow: hidden;
        }
        .fg-discord-join::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .fg-discord-join:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 15px 35px rgba(88, 101, 242, 0.5);
          border-color: rgba(255,255,255,0.3);
        }
        .fg-discord-join:hover::before {
          transform: translateX(100%);
        }
        .fg-discord-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1099;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .fg-discord-modal {
          width: min(440px, 100%);
          border-radius: 32px;
          border: 1px solid rgba(88, 101, 242, 0.2);
          background: #0A0A0A;
          color: #f8fafc;
          box-shadow: 0 30px 100px rgba(0, 0, 0, 0.8);
          overflow: hidden;
          position: relative;
        }
        .fg-discord-modal::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(88, 101, 242, 0.15) 0%, transparent 50%);
          pointer-events: none;
        }
        .fg-discord-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .fg-discord-modal-body {
          padding: 40px 32px;
          text-align: center;
        }
        .fg-discord-primary {
          height: 56px;
          border-radius: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 0 32px;
          font-family: 'Orbitron', sans-serif;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-decoration: none;
          background: #5865F2;
          color: #fff;
          box-shadow: 0 15px 35px rgba(88, 101, 242, 0.4);
          transition: all 0.3s ease;
          border: none;
          width: 100%;
        }
        .fg-discord-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 20px 45px rgba(88, 101, 242, 0.6);
          filter: brightness(1.1);
        }
        .fg-discord-secondary {
          margin-top: 16px;
          height: 48px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
          font-family: 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }
        .fg-discord-secondary:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        @media (max-width: 420px) {
          .fg-discord-join {
            width: 48px;
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

      <AnimatePresence>
        {discordModalOpen ? (
          <motion.div
            className="fg-discord-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDiscordModalOpen(false)}
          >
            <motion.div
              className="fg-discord-modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="fg-discord-modal-header">
                <div className="font-orbitron text-xs font-bold tracking-[0.2em] uppercase text-fluke-yellow">
                  Community Hub
                </div>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
                  onClick={() => setDiscordModalOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="fg-discord-modal-body">
                <div className="w-20 h-20 rounded-3xl bg-[#5865F2]/10 flex items-center justify-center mx-auto mb-6 border border-[#5865F2]/20">
                  <svg viewBox="0 0 20 19" className="w-10 h-10 fill-[#5865F2]" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
                  </svg>
                </div>
                <h2 className="font-bebas text-4xl text-white mb-2 tracking-wide">JOIN THE STUDIO</h2>
                <p className="font-sora text-sm text-fluke-muted mb-8 max-w-[280px] mx-auto">
                  Get exclusive updates, early access, and chat with the developers.
                </p>
                <div className="space-y-3">
                  <a
                    href={DISCORD_JOIN_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="fg-discord-primary"
                    onClick={() => setDiscordModalOpen(false)}
                  >
                    JOIN OUR DISCORD
                  </a>
                  <button
                    type="button"
                    className="fg-discord-secondary"
                    onClick={() => {
                      void navigator.clipboard?.writeText(DISCORD_JOIN_URL);
                    }}
                  >
                    COPY INVITE LINK
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {DISCORD_JOIN_URL ? (
        <motion.button
          type="button"
          className="fg-discord-join"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDiscordModalOpen(true)}
        >
          <svg viewBox="0 0 20 19" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
          </svg>
          <span>JOIN DISCORD</span>
        </motion.button>
      ) : null}

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
