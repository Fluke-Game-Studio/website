import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PublicBotAvatar2DBit, { BotStatus } from "./PublicBotAvatar2DBit";

const API_BASE =
  (() => {
    const configured = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();

    if (configured && configured !== "/api") {
      return configured.replace(/\/$/, "");
    }

    return import.meta.env.DEV
      ? "/api"
      : "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";
  })();

const CHAT_URL = `${API_BASE}/ai/chat-sync/flukegames`;
const PROVIDER = "openai";
const MODEL = "gpt-5-mini";
const CONTEXT = "flukegames";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  ts: number;
};

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

export default function FloatingPublicAIChat() {
  const clientIdRef = useRef<string>(getStableClientId());
  const clientId = clientIdRef.current;
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [botStatus, setBotStatus] = useState<BotStatus>("neutral");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        "Hi, I’m Fluke AI for the public website. Ask me about the studio, games, careers, team, awards, or services.",
      ts: Date.now(),
    },
  ]);

  const canSend = !loading && !!input.trim();

  const quickPrompts = useMemo(
    () => [
      "What does Fluke Games make?",
      "Show me the current team.",
      "What are the latest awards?",
      "What careers are open?",
    ],
    []
  );

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, open]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = "0px";
    const next = Math.min(Math.max(inputRef.current.scrollHeight, 52), 160);
    inputRef.current.style.height = `${next}px`;
  }, [input]);

  async function sendMessage(question: string) {
    const trimmed = safeStr(question);
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
      ts: Date.now(),
    };

    const pendingId = uid();
    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        id: pendingId,
        role: "assistant",
        content: "Thinking about the public side of Fluke Games...",
        ts: Date.now(),
      },
    ]);
    setInput("");
    setLoading(true);
    setBotStatus("thinking");
    setError("");

    try {
      const res = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmed,
          clientId,
          context: CONTEXT,
          provider: PROVIDER,
          model: MODEL,
        }),
      });

      const raw = await res.text();
      let payload: any = {};
      try {
        payload = raw ? JSON.parse(raw) : {};
      } catch {
        payload = { reply: raw };
      }

      if (!res.ok) {
        throw new Error(
          safeStr(payload?.error || payload?.message || `Request failed (${res.status})`)
        );
      }

      const reply = safeStr(payload?.reply || payload?.message || raw);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? {
                ...m,
                content: reply || "No answer was returned.",
              }
            : m
        )
      );
      setBotStatus("speaking");
      setTimeout(() => setBotStatus("neutral"), 4000);
    } catch (err: any) {
      setBotStatus("neutral");
      const msg = safeStr(err?.message || "Public AI chat failed.");
      setError(msg);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === pendingId
            ? {
                ...m,
                content: msg,
              }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[1100] flex flex-col items-end">
      <style>{`
        .fg-ai-bubble {
          width: 52px;
          height: 52px;
          border-radius: 999px;
          border: 1px solid rgba(255, 215, 0, 0.1);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(8px);
          color: black;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease;
          position: relative;
          z-index: 2;
        }
        .fg-ai-bubble:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 22px 48px rgba(0,0,0,.34); }
        .fg-ai-panel {
          width: min(380px, calc(100vw - 24px));
          height: 560px;
          margin-bottom: 12px;
          border-radius: 24px;
          border: 1px solid var(--cs-border);
          background:
            radial-gradient(700px 420px at 20% 0%, rgba(245, 197, 66, 0.05), transparent 55%),
            linear-gradient(180deg, var(--fluke-surface), #0a0f1c);
          color: var(--fluke-text);
          box-shadow: 0 24px 70px rgba(0,0,0,.4);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .fg-ai-top {
          padding: 14px 14px 12px;
          border-bottom: 1px solid rgba(255,255,255,.08);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .fg-ai-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          font-weight: 400;
          color: var(--fluke-yellow);
          display:flex;
          align-items:center;
          gap: 8px;
          letter-spacing: 0.05em;
        }
        .fg-ai-sub {
          margin-top: 4px;
          font-size: 12px;
          color: rgba(226,232,240,.75);
          line-height: 1.4;
        }
        .fg-ai-chips {
          display:flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-top: 6px;
        }
        .fg-ai-chip {
          display:inline-flex;
          align-items:center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(245, 197, 66, 0.15);
          background: rgba(245, 197, 66, 0.05);
          color: var(--fluke-yellow);
          font-size: 10px;
          font-weight: 600;
          white-space: nowrap;
          font-family: 'Orbitron', sans-serif;
          letter-spacing: 0.05em;
        }
        .fg-ai-chip strong { color: #fff; }
        .fg-ai-close {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.04);
          color: #dbe7f4;
          display:grid;
          place-items:center;
          cursor:pointer;
        }
        .fg-ai-body {
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }
        .fg-ai-list {
          flex: 1 1 auto;
          min-height: 0;
          overflow:auto;
          padding: 14px;
          display:flex;
          flex-direction: column;
          gap: 10px;
        }
        .fg-ai-msg {
          max-width: 88%;
          border-radius: 18px;
          padding: 11px 12px;
          font-size: 13px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
          border: 1px solid rgba(255,255,255,.09);
        }
        .fg-ai-msg.user {
          align-self: flex-end;
          background: rgba(91, 33, 182, 0.2);
          color: #f5f3ff;
          border-color: rgba(139, 92, 246, 0.2);
        }
        .fg-ai-msg.assistant {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.03);
          color: var(--fluke-text);
          border-color: rgba(255, 255, 255, 0.05);
        }
        .fg-ai-quick {
          padding: 0 14px 12px;
          display:flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .fg-ai-quick button {
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.05);
          color: #cbd5e1;
          border-radius: 999px;
          padding: 7px 10px;
          font-size: 11px;
          cursor: pointer;
        }
        .fg-ai-composer {
          padding: 12px;
          border-top: 1px solid rgba(255,255,255,.08);
          background: rgba(2,6,23,.55);
        }
        .fg-ai-inputWrap {
          display:flex;
          align-items:flex-end;
          gap: 8px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.04);
          padding: 10px;
        }
        .fg-ai-inputWrap textarea {
          width: 100%;
          resize: none;
          border: 0;
          outline: none;
          background: transparent;
          color: #f8fafc;
          font: inherit;
          line-height: 1.45;
          min-height: 52px;
          max-height: 160px;
        }
        .fg-ai-send:active { transform: scale(0.95); }

        /* --- LIGHT THEME OVERRIDES --- */
        html.light .fg-ai-panel {
          background: linear-gradient(180deg, #FFFFFF, #F0FDFA);
          border-color: rgba(8, 145, 178, 0.2);
          box-shadow: 0 10px 40px rgba(8, 145, 178, 0.12);
        }
        html.light .fg-ai-top {
          border-bottom-color: rgba(8, 145, 178, 0.1);
        }
        html.light .fg-ai-sub {
          color: #155E75;
        }
        html.light .fg-ai-close {
          border-color: rgba(8, 145, 178, 0.2);
          background: rgba(8, 145, 178, 0.05);
          color: #0E7490;
        }
        html.light .fg-ai-msg.assistant {
          background: #ECFEFF;
          color: #0E7490;
          border-color: rgba(8, 145, 178, 0.1);
        }
        html.light .fg-ai-msg.user {
          background: #0891B2;
          color: #FFFFFF;
          border-color: rgba(8, 145, 178, 0.1);
        }
        html.light .fg-ai-quick button {
          border-color: rgba(8, 145, 178, 0.2);
          background: #FFFFFF;
          color: #0E7490;
        }
        html.light .fg-ai-composer {
          background: #FFFFFF;
          border-top-color: rgba(8, 145, 178, 0.1);
        }
        html.light .fg-ai-inputWrap {
          background: #F8FAFC;
          border-color: rgba(8, 145, 178, 0.15);
        }
        html.light .fg-ai-inputWrap textarea {
          color: #164E63;
        }
        html.light .fg-ai-inputWrap textarea::placeholder {
          color: #64748b;
        }
      `}</style>

      <AnimatePresence>
        {open && (
          <motion.div 
            className="fg-ai-panel" 
            role="dialog" 
            aria-label="Fluke AI public chat"
            initial={{ opacity: 0, y: 10, scale: 0.8, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="fg-ai-top">
              <div style={{ minWidth: 0, display: "flex", alignItems: "flex-start", gap: 12 }}>
                <PublicBotAvatar2DBit status={botStatus} size={46} />
                <div style={{ minWidth: 0 }}>
                  <div className="fg-ai-title">
                    <Sparkles size={16} fill="currentColor" />
                    Fluke AI
                  </div>
                  <div className="fg-ai-chips">
                     <span className="fg-ai-chip">PUBLIC INSTANCE</span>
                     <span className="fg-ai-chip">SYNCED</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="fg-ai-close"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className="fg-ai-body">
              <div className="fg-ai-list" ref={listRef}>
                {messages.map((m) => (
                  <motion.div 
                    key={m.id} 
                    className={`fg-ai-msg ${m.role}`}
                    initial={{ opacity: 0, x: m.role === 'user' ? 20 : -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {m.content}
                  </motion.div>
                ))}
                {loading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fg-ai-msg assistant" 
                    style={{ fontStyle: "italic", opacity: 0.8 }}
                  >
                    Processing request...
                  </motion.div>
                ) : null}
              </div>

              <div className="fg-ai-quick">
                {quickPrompts.map((q) => (
                  <motion.button
                    key={q}
                    type="button"
                    disabled={loading}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => void sendMessage(q)}
                  >
                    {q}
                  </motion.button>
                ))}
              </div>

              <div className="fg-ai-composer">
                <div className="fg-ai-inputWrap">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask the public assistant..."
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
                    disabled={!canSend}
                    onClick={() => void sendMessage(input)}
                    aria-label="Send message"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className="fg-ai-bubble"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: open ? -360 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={() => setOpen((v) => !v)}
        aria-label="Open public AI chat"
        title="Open public AI chat"
      >
        <div className="flex items-center justify-center w-full h-full">
          <PublicBotAvatar2DBit status={botStatus} size={52} />
        </div>
      </motion.button>
    </div>
  );
}

