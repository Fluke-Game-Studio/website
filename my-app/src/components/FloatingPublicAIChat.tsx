import { useEffect, useMemo, useRef, useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import PublicBotAvatar2DBit from "./PublicBotAvatar2DBit";

const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";

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
    } catch (err: any) {
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
    <div className="fixed bottom-5 right-5 z-[1100]">
      <style>{`
        .fg-ai-bubble {
          width: 62px;
          height: 62px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.12);
          background: linear-gradient(180deg, rgba(16,185,129,.95), rgba(14,116,144,.95));
          color: white;
          box-shadow: 0 18px 40px rgba(0,0,0,.28);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: transform 140ms ease, box-shadow 140ms ease, opacity 140ms ease;
        }
        .fg-ai-bubble:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 22px 48px rgba(0,0,0,.34); }
        .fg-ai-panel {
          width: min(360px, calc(100vw - 24px));
          height: 520px;
          margin-bottom: 12px;
          border-radius: 24px;
          border: 1px solid rgba(148,163,184,.22);
          background:
            radial-gradient(700px 420px at 20% 0%, rgba(56,189,248,.10), transparent 55%),
            linear-gradient(180deg, rgba(7,17,32,.98), rgba(11,22,40,.98));
          color: #e5eef8;
          box-shadow: 0 24px 70px rgba(0,0,0,.38);
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
          font-size: 15px;
          font-weight: 900;
          color: #f8fafc;
          display:flex;
          align-items:center;
          gap: 8px;
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
          margin-top: 10px;
        }
        .fg-ai-chip {
          display:inline-flex;
          align-items:center;
          gap: 6px;
          padding: 5px 9px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.05);
          color: #dbe7f4;
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
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
          background: rgba(59,130,246,.14);
          color: #eff6ff;
        }
        .fg-ai-msg.assistant {
          align-self: flex-start;
          background: rgba(255,255,255,.04);
          color: #e5eef8;
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
        .fg-ai-send {
          width: 38px;
          height: 38px;
          flex: 0 0 auto;
          border-radius: 14px;
          border: 0;
          background: linear-gradient(180deg, #38bdf8, #2563eb);
          color: white;
          display:grid;
          place-items:center;
          cursor:pointer;
        }
        .fg-ai-send:disabled,
        .fg-ai-quick button:disabled {
          opacity: .55;
          cursor: not-allowed;
        }
        .fg-ai-foot {
          margin-top: 8px;
          display:flex;
          justify-content:space-between;
          gap: 8px;
          align-items:center;
          font-size: 11px;
          color: rgba(148,163,184,.9);
        }
      `}</style>

      {open ? (
        <div className="fg-ai-panel" role="dialog" aria-label="Fluke AI public chat">
          <div className="fg-ai-top">
            <div style={{ minWidth: 0, display: "flex", alignItems: "flex-start", gap: 12 }}>
              <PublicBotAvatar2DBit status={loading ? "thinking" : "speaking"} size={46} />
              <div style={{ minWidth: 0 }}>
              <div className="fg-ai-title">
                <Sparkles size={15} />
                Fluke AI
              </div>
              <div className="fg-ai-sub">
                Ask about the studio, team, careers, awards, or games.
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
                <div key={m.id} className={`fg-ai-msg ${m.role}`}>
                  {m.content}
                </div>
              ))}
              {loading ? (
                <div className="fg-ai-msg assistant">Thinking...</div>
              ) : null}
            </div>

            <div className="fg-ai-quick">
              {quickPrompts.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={loading}
                  onClick={() => void sendMessage(q)}
                >
                  {q}
                </button>
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
              <div className="fg-ai-foot">
                <span>{error ? error : "Public assistant ready."}</span>
                <span>{clientId}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="fg-ai-bubble"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open public AI chat"
        title="Open public AI chat"
      >
        <PublicBotAvatar2DBit status={loading ? "thinking" : "neutral"} size={42} />
      </button>
    </div>
  );
}

