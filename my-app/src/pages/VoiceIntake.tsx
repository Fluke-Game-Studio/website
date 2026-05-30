import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resolveApiBase } from "../services/apiBase";

const API_BASE = resolveApiBase();

type IntakeContext = {
  key: string;
  label: string;
  description: string;
  questions: string[];
  endNote?: string;
};

export default function VoiceIntake() {
  const [searchParams] = useSearchParams();
  const intakeToken = searchParams.get("token") || "";
  const bindEmail = searchParams.get("email") || "";

  const [ctx, setCtx] = useState<IntakeContext | null>(null);
  const [loadErr, setLoadErr] = useState("");
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "submitted">("idle");
  const [err, setErr] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const micRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const greetedRef = useRef(false);
  const connectSeqRef = useRef(0);
  const qIdxRef = useRef(0);

  // Load context from token on mount
  useEffect(() => {
    if (!intakeToken) {
      setLoadErr("No intake token found in URL. Please use the link from your email.");
      return;
    }
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/public/ai/intake/open`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: intakeToken,
            ...(bindEmail ? { email: bindEmail } : {}),
          }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          const msg = data?.error === "token-expired"
            ? "This interview link has expired. Please contact your recruiter for a new one."
            : data?.error === "token-already-used"
            ? "This interview link has already been used. If this is an error, contact your recruiter."
            : data?.error === "token-binding-mismatch"
            ? "This link is not valid for your email address."
            : (data?.error || "Unable to open interview session.");
          setLoadErr(msg);
          return;
        }
        setCtx(data.context as IntakeContext);
      } catch (e: any) {
        setLoadErr(String(e?.message || "Network error. Please check your connection and try again."));
      }
    })();
  }, []);

  // Persistent audio element
  useEffect(() => {
    const el = document.createElement("audio");
    el.autoplay = true;
    el.setAttribute("playsinline", "true");
    el.style.display = "none";
    document.body.appendChild(el);
    audioElRef.current = el;
    return () => {
      try { el.pause(); } catch {}
      try { document.body.removeChild(el); } catch {}
    };
  }, []);

  function addLog(msg: string) {
    setLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 20));
  }

  function extractEphemeralKey(payload: any): string {
    return String(
      payload?.client_secret?.value ||
      payload?.client_secret?.secret ||
      payload?.client_secret ||
      payload?.session?.client_secret?.value ||
      payload?.session?.client_secret?.secret ||
      payload?.value || ""
    );
  }

  async function connect() {
    if (!ctx) return;
    const seq = ++connectSeqRef.current;
    qIdxRef.current = 0;
    setQIdx(0);
    greetedRef.current = false;
    disconnect(false);
    setErr("");
    setStatus("connecting");
    addLog("Requesting session...");

    try {
      const sessionRes = await fetch(`${API_BASE}/public/ai/intake/realtime-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: intakeToken, model: "gpt-realtime-mini", voice: "alloy" }),
      });
      const sessionData = await sessionRes.json().catch(() => ({}));
      if (!sessionRes.ok) throw new Error(sessionData?.error || `Session error ${sessionRes.status}`);

      const ephemeralKey = extractEphemeralKey(sessionData);
      if (!ephemeralKey) throw new Error("Missing realtime key from server.");

      const pc = new RTCPeerConnection();
      pcRef.current = pc;
      if (seq !== connectSeqRef.current) { pc.close(); return; }

      const audioEl = audioElRef.current!;
      pc.ontrack = (event) => {
        const stream = event.streams?.[0] || new MediaStream([event.track]);
        audioEl.srcObject = stream;
        audioEl.play().catch((e) => {
          addLog(`Audio blocked: ${e?.message} — click anywhere to unblock.`);
          setErr("Audio blocked by browser. Click anywhere on the page, then reconnect.");
        });
      };

      pc.onconnectionstatechange = () => {
        addLog(`Connection: ${pc.connectionState}`);
        if (pc.connectionState === "connected") setStatus("connected");
        if (["failed", "closed", "disconnected"].includes(pc.connectionState)) {
          setErr(`Connection ${pc.connectionState}. Try reconnecting.`);
          disconnect();
        }
      };

      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (seq !== connectSeqRef.current) { ms.getTracks().forEach((t) => t.stop()); pc.close(); return; }
      micRef.current = ms;
      ms.getTracks().forEach((t) => { if (pc.signalingState !== "closed") pc.addTrack(t, ms); });

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.onopen = () => {
        setStatus("connected");
        addLog("Connected — starting interview.");

        const allQs = ctx.questions.map((q, i) => `${i + 1}. ${q}`).join(" | ");
        const instructions = [
          `You are a friendly AI interviewer for Fluke Games conducting a voice interview.`,
          `Guide the candidate through these ${ctx.questions.length} questions one at a time: ${allQs}.`,
          `Ask each question clearly, wait for the answer, then move on. Keep replies short and natural.`,
          `Do not skip questions. Do not reveal all questions at once.`,
        ].join(" ");

        dc.send(JSON.stringify({
          type: "session.update",
          session: {
            modalities: ["audio", "text"],
            input_audio_transcription: { model: "whisper-1" },
            turn_detection: { type: "server_vad" },
            instructions,
          },
        }));

        const opening = JSON.stringify({
          type: "response.create",
          response: { instructions: `Greet the candidate warmly, introduce yourself as the Fluke Games AI interviewer, then ask question 1: "${ctx.questions[0]}"` },
        });
        dc.send(opening);

        window.setTimeout(() => {
          if (!greetedRef.current && dc.readyState === "open") dc.send(opening);
        }, 2500);
      };

      dc.onmessage = (event) => {
        try {
          const msg = JSON.parse(String(event.data || "{}"));
          const type = String(msg?.type || "");

          if (type === "error") {
            setErr(String(msg?.error?.message || "Realtime error"));
            return;
          }
          if (type === "response.audio_transcript.done" || type === "response.output_audio_transcript.done") {
            greetedRef.current = true;
            return;
          }
          if (type === "conversation.item.input_audio_transcription.completed") {
            const text = String(msg?.transcript || "").trim();
            if (!text) return;
            addLog(`Answer: "${text.slice(0, 60)}"`);

            const currentIdx = qIdxRef.current;
            const key = `q${currentIdx + 1}`;
            setAnswers((prev) => ({ ...prev, [key]: (prev[key] ? `${prev[key]} ` : "") + text }));

            const nextIdx = currentIdx + 1;
            if (nextIdx < ctx.questions.length) {
              qIdxRef.current = nextIdx;
              setQIdx(nextIdx);
              dc.send(JSON.stringify({
                type: "response.create",
                response: { instructions: `Acknowledge briefly, then ask question ${nextIdx + 1}: "${ctx.questions[nextIdx]}"` },
              }));
            } else {
              qIdxRef.current = ctx.questions.length;
              setQIdx(ctx.questions.length);
              const closing = ctx.endNote?.trim() || "All questions answered. Thank the candidate warmly and let them know their responses will be submitted shortly.";
              dc.send(JSON.stringify({ type: "response.create", response: { instructions: closing } }));
            }
          }
        } catch {}
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      addLog("Connecting to OpenAI...");

      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        headers: { Authorization: `Bearer ${ephemeralKey}`, "Content-Type": "application/sdp" },
        body: offer.sdp || "",
      });
      const answerSdp = await sdpRes.text();
      if (!sdpRes.ok) throw new Error(`OpenAI SDP ${sdpRes.status}`);
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
      addLog("ICE negotiating...");
    } catch (e: any) {
      addLog(`Error: ${e?.message || e}`);
      setErr(String(e?.message || e));
      setStatus("idle");
    }
  }

  function disconnect(invalidate = true) {
    if (invalidate) connectSeqRef.current += 1;
    try { dcRef.current?.close(); } catch {}
    try { pcRef.current?.close(); } catch {}
    micRef.current?.getTracks().forEach((t) => t.stop());
    const el = audioElRef.current;
    if (el) { try { el.pause(); } catch {}; el.srcObject = null; }
    dcRef.current = null;
    pcRef.current = null;
    micRef.current = null;
    if (invalidate) setStatus("idle");
  }

  async function submit() {
    setBusy(true);
    setErr("");
    try {
      const r = await fetch(`${API_BASE}/public/ai/intake/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: intakeToken, answers }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || `Submit failed (${r.status})`);
      disconnect(true);
      setStatus("submitted");
    } catch (e: any) {
      setErr(String(e?.message || e));
    } finally {
      setBusy(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  if (status === "submitted") {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
          <h2 style={{ marginBottom: 8 }}>Interview Complete</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Your responses have been submitted. Our team will be in touch soon. Thank you for your time!
          </p>
        </div>
      </div>
    );
  }

  if (loadErr) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ marginBottom: 8 }}>Unable to Open Interview</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{loadErr}</p>
        </div>
      </div>
    );
  }

  if (!ctx) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>Loading your interview session…</p>
      </div>
    );
  }

  const allDone = qIdx >= ctx.questions.length;

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px 80px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: "center" }}>
        <img
          src="https://flukegameassets.s3.amazonaws.com/logo.png"
          alt="Fluke Games"
          style={{ height: 36, marginBottom: 16 }}
        />
        <h2 style={{ margin: "0 0 6px" }}>{ctx.label}</h2>
        <p style={{ color: "rgba(255,255,255,0.55)", margin: 0, fontSize: 14 }}>{ctx.description}</p>
      </div>

      {/* Progress */}
      <div style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: "20px 24px",
        marginBottom: 20,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontWeight: 700, fontSize: 13, opacity: 0.6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {allDone ? "All questions answered" : `Question ${qIdx + 1} of ${ctx.questions.length}`}
          </span>
          <span style={{
            fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
            background: status === "connected" ? "rgba(22,163,74,0.2)" : status === "connecting" ? "rgba(29,78,216,0.2)" : "rgba(255,255,255,0.06)",
            color: status === "connected" ? "#4ade80" : status === "connecting" ? "#93c5fd" : "rgba(255,255,255,0.4)",
            border: `1px solid ${status === "connected" ? "rgba(74,222,128,0.3)" : status === "connecting" ? "rgba(147,197,253,0.3)" : "rgba(255,255,255,0.1)"}`,
          }}>
            {status === "connected" ? "● Live" : status === "connecting" ? "Connecting…" : "Not connected"}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.08)", marginBottom: 14 }}>
          <div style={{
            height: "100%", borderRadius: 999,
            background: "linear-gradient(90deg, #6366f1, #a78bfa)",
            width: `${Math.min(100, (qIdx / ctx.questions.length) * 100)}%`,
            transition: "width 0.4s ease",
          }} />
        </div>

        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, fontWeight: 500 }}>
          {allDone ? "✅ Done — click Submit below." : ctx.questions[qIdx]}
        </p>
      </div>

      {/* Captured answers */}
      {Object.keys(answers).length > 0 && (
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14,
          padding: "16px 20px",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>
            Captured Responses
          </div>
          {Object.entries(answers).map(([k, v]) => (
            <div key={k} style={{ marginBottom: 8, fontSize: 13 }}>
              <span style={{ opacity: 0.45, marginRight: 8 }}>{k.toUpperCase()}</span>
              <span style={{ opacity: 0.8 }}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
        <button
          onClick={connect}
          disabled={status === "connected" || status === "connecting"}
          style={{
            padding: "11px 22px", borderRadius: 12, border: "none", cursor: "pointer",
            fontWeight: 700, fontSize: 14,
            background: status === "connected" ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: status === "connected" ? "rgba(255,255,255,0.4)" : "#fff",
            opacity: status === "connecting" ? 0.7 : 1,
          }}
        >
          {status === "connecting" ? "Connecting…" : status === "connected" ? "Connected ✓" : "Start Interview"}
        </button>

        {status === "connected" && (
          <button
            onClick={() => disconnect(true)}
            style={{
              padding: "11px 18px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontWeight: 600, fontSize: 14,
            }}
          >
            Disconnect
          </button>
        )}

        {allDone && (
          <button
            onClick={submit}
            disabled={busy}
            style={{
              padding: "11px 22px", borderRadius: 12, border: "none", cursor: busy ? "not-allowed" : "pointer",
              fontWeight: 700, fontSize: 14,
              background: busy ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#16a34a,#22c55e)",
              color: busy ? "rgba(255,255,255,0.4)" : "#fff",
            }}
          >
            {busy ? "Submitting…" : "Submit Responses"}
          </button>
        )}
      </div>

      {err && (
        <div style={{
          padding: "12px 16px", borderRadius: 12, marginBottom: 12,
          background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)",
          color: "#fca5a5", fontSize: 14,
        }}>
          {err}
        </div>
      )}

      {/* Debug log */}
      {log.length > 0 && (
        <details style={{ marginTop: 24 }}>
          <summary style={{ fontSize: 12, opacity: 0.35, cursor: "pointer", userSelect: "none" }}>
            Session log ({log.length})
          </summary>
          <div style={{ marginTop: 8, fontSize: 11, opacity: 0.4, lineHeight: 1.7, fontFamily: "monospace" }}>
            {log.map((l, i) => <div key={i}>{l}</div>)}
          </div>
        </details>
      )}
    </div>
  );
}
