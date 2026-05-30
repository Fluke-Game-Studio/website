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
  sessionPrompt?: string;
  backgroundInfo?: string;
};

const DEFAULT_SESSION_PROMPT = `You are a structured AI interviewer for Fluke Games. You have ONE job: conduct this interview by asking the listed questions in order.

=== ABSOLUTE RULES — no exceptions ===
1. OFF-TOPIC RESPONSE: If the candidate says ANYTHING not related to answering the current interview question, do NOT engage with it. Say exactly: "Let's keep focused on the interview." then immediately repeat the current question word-for-word. Do not acknowledge, comment on, or explore the off-topic content in any way.
2. QUESTION ORDER: Ask questions strictly in the listed order. Never skip, reorder, or paraphrase. Use the exact wording provided.
3. INCOMPLETE ANSWERS: If an answer is vague or very short, ask one targeted follow-up before moving on.
4. MIC INTERRUPTION: If a response seems cut off or too short, say "It seems your response may have been incomplete — could you complete your answer?" Do not advance.
5. ENGLISH ONLY: Respond only in English, regardless of what language the candidate uses.
6. BREVITY: Keep your own responses short — one or two sentences maximum before asking or repeating the question.`;

export default function VoiceIntake() {
  const [searchParams] = useSearchParams();
  const intakeToken = searchParams.get("token") || "";
  const bindEmail = searchParams.get("email") || "";

  const [ctx, setCtx] = useState<IntakeContext | null>(null);
  const [jobRoleQuestions, setJobRoleQuestions] = useState<string[]>([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loadErr, setLoadErr] = useState("");
  const [status, setStatus] = useState<"idle" | "connecting" | "connected" | "awaiting_feedback" | "submitting" | "submitted">("idle");
  const [micMuted, setMicMuted] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [err, setErr] = useState("");
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [feedback, setFeedback] = useState<{ stars: number; completedQs: boolean | null; listenedFully: string | null; stuckToTopic: string | null }>({ stars: 0, completedQs: null, listenedFully: null, stuckToTopic: null });
  const [hoveredStar, setHoveredStar] = useState(0);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const micRef = useRef<MediaStream | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const greetedRef = useRef(false);
  const connectSeqRef = useRef(0);
  const qIdxRef = useRef(0);
  const answersRef = useRef<Record<string, string>>({});
  const allQuestionsRef = useRef<string[]>([]);
  const responseInProgressRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);

  // Keep answersRef in sync
  useEffect(() => { answersRef.current = answers; }, [answers]);

  // Load context from token
  useEffect(() => {
    if (!intakeToken) {
      setLoadErr("No intake token found. Please use the link from your email.");
      return;
    }
    (async () => {
      try {
        const r = await fetch(`${API_BASE}/public/ai/intake/open`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: intakeToken, ...(bindEmail ? { email: bindEmail } : {}) }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) {
          const msg =
            data?.error === "token-expired" ? "This interview link has expired. Please contact your recruiter for a new one." :
            data?.error === "token-already-used" ? "This interview link has already been used." :
            data?.error === "token-binding-mismatch" ? "This link is not valid for your email address." :
            (data?.error || "Unable to open interview session.");
          setLoadErr(msg);
          return;
        }
        setCtx(data.context as IntakeContext);
        if (Array.isArray(data.jobRoleQuestions) && data.jobRoleQuestions.length > 0) {
          setJobRoleQuestions(data.jobRoleQuestions as string[]);
        }
        if (data.jobTitle) setJobTitle(String(data.jobTitle));
      } catch (e: any) {
        setLoadErr(String(e?.message || "Network error. Check your connection and try again."));
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

  function extractEphemeralKey(payload: any): string {
    return String(
      payload?.client_secret?.value || payload?.client_secret?.secret ||
      payload?.client_secret || payload?.session?.client_secret?.value ||
      payload?.session?.client_secret?.secret || payload?.value || ""
    );
  }

  function startMicAnalysis(stream: MediaStream) {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.85;
      ctx.createMediaStreamSource(stream).connect(analyser);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      const data = new Uint8Array(analyser.frequencyBinCount);
      function tick() {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(data);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        setUserSpeaking(avg > 10);
        animFrameRef.current = requestAnimationFrame(tick);
      }
      tick();
    } catch {}
  }

  function stopMicAnalysis() {
    cancelAnimationFrame(animFrameRef.current);
    try { audioCtxRef.current?.close(); } catch {}
    audioCtxRef.current = null;
    analyserRef.current = null;
    setUserSpeaking(false);
  }

  async function connect() {
    if (!ctx) return;
    const seq = ++connectSeqRef.current;
    qIdxRef.current = 0;
    setQIdx(0);
    greetedRef.current = false;
    setAiSpeaking(false);
    disconnect(false);
    setErr("");
    setStatus("connecting");

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
        audioEl.play().catch(() => setErr("Audio blocked by browser. Click anywhere then reconnect."));
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") setStatus("connected");
        if (["failed", "closed", "disconnected"].includes(pc.connectionState)) disconnect();
      };

      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (seq !== connectSeqRef.current) { ms.getTracks().forEach((t) => t.stop()); pc.close(); return; }
      micRef.current = ms;
      ms.getTracks().forEach((t) => { if (pc.signalingState !== "closed") pc.addTrack(t, ms); });
      startMicAnalysis(ms);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.onopen = () => {
        setStatus("connected");
        responseInProgressRef.current = false;
        const qs = allQuestionsRef.current;

        const baseRules = ctx?.sessionPrompt?.trim() || DEFAULT_SESSION_PROMPT;

        const sessionInstructions = [
          baseRules,
          ``,
          `=== INTERVIEW QUESTIONS (ask in this exact order) ===`,
          ...qs.map((q, i) => `Q${i + 1}: ${q}`),
          ctx?.backgroundInfo?.trim() ? `\n=== BACKGROUND CONTEXT ===\n${ctx.backgroundInfo.trim()}` : "",
          ``,
          `=== CLOSING (after all ${qs.length} questions) ===`,
          ctx?.endNote?.trim() || `Thank the candidate warmly, tell them a human will review their responses, and wish them well.`,
        ].filter(Boolean).join("\n").trim();

        dc.send(JSON.stringify({
          type: "session.update",
          session: { type: "realtime", instructions: sessionInstructions },
        }));

        responseInProgressRef.current = true;
        dc.send(JSON.stringify({
          type: "response.create",
          response: { instructions: `Greet the candidate warmly, introduce yourself as the Fluke Games AI interviewer, then ask Q1: "${qs[0]}"` },
        }));
      };

      dc.onmessage = (event) => {
        try {
          const msg = JSON.parse(String(event.data || "{}"));
          const type = String(msg?.type || "");

          if (type === "error") { setErr(String(msg?.error?.message || "Realtime error")); return; }
          if (type === "response.created") responseInProgressRef.current = true;
          if (type === "response.done" || type === "response.cancelled") {
            responseInProgressRef.current = false;
            greetedRef.current = true;
          }
          if (type === "response.audio_transcript.delta" || type === "response.output_audio_transcript.delta") setAiSpeaking(true);
          if (type === "response.audio_transcript.done" || type === "response.output_audio_transcript.done") setAiSpeaking(false);

          if (type === "conversation.item.input_audio_transcription.completed") {
            const text = String(msg?.transcript || "").trim();
            if (!text || responseInProgressRef.current) return;
            const wordCount = text.split(/\s+/).filter(Boolean).length;
            const qs = allQuestionsRef.current;
            const currentIdx = qIdxRef.current;
            const key = `q${currentIdx + 1}`;
            setAnswers((prev) => {
              const next = { ...prev, [key]: (prev[key] ? `${prev[key]} ` : "") + text };
              answersRef.current = next;
              return next;
            });

            const dc = dcRef.current;
            if (!dc) return;
            responseInProgressRef.current = true;

            if (wordCount < 4) {
              dc.send(JSON.stringify({
                type: "conversation.item.create",
                item: { type: "message", role: "system", content: [{ type: "input_text",
                  text: `[HARD RULE] The candidate's last response was too short to be a real answer. Do NOT advance. Politely say their response may have been incomplete, then repeat this question VERBATIM: "${qs[currentIdx]}"`
                }] },
              }));
              dc.send(JSON.stringify({
                type: "response.create",
                response: { instructions: `Short/incomplete response detected. Do NOT move on. Politely check in and repeat the current question word-for-word: "${qs[currentIdx]}"` },
              }));
              return;
            }

            const nextIdx = currentIdx + 1;
            if (nextIdx < qs.length) {
              qIdxRef.current = nextIdx;
              setQIdx(nextIdx);
              dc.send(JSON.stringify({
                type: "conversation.item.create",
                item: { type: "message", role: "system", content: [{ type: "input_text",
                  text: `[HARD RULE] You MUST now ask Q${nextIdx + 1} using EXACTLY these words: "${qs[nextIdx]}" — do not paraphrase, skip, or discuss anything else first.`
                }] },
              }));
              dc.send(JSON.stringify({
                type: "response.create",
                response: { instructions: `Acknowledge the answer in ONE sentence only. Then ask this exact question, word-for-word — no paraphrasing allowed: "${qs[nextIdx]}"` },
              }));
            } else {
              qIdxRef.current = qs.length;
              setQIdx(qs.length);
              dc.send(JSON.stringify({
                type: "conversation.item.create",
                item: { type: "message", role: "system", content: [{ type: "input_text",
                  text: `[HARD RULE] All ${qs.length} questions are complete. Deliver ONLY the closing message. Do not ask any more questions.`
                }] },
              }));
              dc.send(JSON.stringify({
                type: "response.create",
                response: { instructions: `All questions done. Deliver closing message from session instructions. Nothing else.` },
              }));
            }
          }
        } catch {}
      };

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      const sdpRes = await fetch("https://api.openai.com/v1/realtime/calls", {
        method: "POST",
        headers: { Authorization: `Bearer ${ephemeralKey}`, "Content-Type": "application/sdp" },
        body: offer.sdp || "",
      });
      const answerSdp = await sdpRes.text();
      if (!sdpRes.ok) throw new Error(`OpenAI SDP ${sdpRes.status}`);
      await pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
    } catch (e: any) {
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
    dcRef.current = null; pcRef.current = null; micRef.current = null;
    setAiSpeaking(false);
    stopMicAnalysis();
    if (invalidate) setStatus("idle");
  }

  function toggleMic() {
    const newMuted = !micMuted;
    micRef.current?.getTracks().forEach((t) => { t.enabled = !newMuted; });
    setMicMuted(newMuted);
  }

  function endAndSubmit() {
    disconnect(true);
    setStatus("awaiting_feedback");
    setErr("");
  }

  async function finalSubmit(fb: typeof feedback | null) {
    setStatus("submitting");
    try {
      const r = await fetch(`${API_BASE}/public/ai/intake/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: intakeToken, answers: answersRef.current, ...(fb ? { feedback: fb } : {}) }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data?.error || `Submit failed (${r.status})`);
      setStatus("submitted");
    } catch (e: any) {
      setErr(String(e?.message || "Submission failed. Try again."));
      setStatus("awaiting_feedback");
    }
  }

  // ── Shared style helpers ────────────────────────────────────────────────────

  const page: React.CSSProperties = {
    minHeight: "100vh", background: "#0d0d0d", color: "#fff",
    display: "flex", flexDirection: "column", fontFamily: "system-ui, sans-serif",
  };

  // ── Loading / error / submitted screens ────────────────────────────────────

  if (loadErr) return (
    <div style={{ ...page, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <img src="https://flukegameassets.s3.amazonaws.com/logo.png" alt="Fluke Games" style={{ height: 36, marginBottom: 32 }} />
      <div style={{ fontSize: 40, marginBottom: 16 }}>⚠️</div>
      <h2 style={{ margin: "0 0 10px", textAlign: "center" }}>Unable to Open Interview</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: 380, margin: 0, lineHeight: 1.6 }}>{loadErr}</p>
    </div>
  );

  if (!ctx || status === "submitting") return (
    <div style={{ ...page, alignItems: "center", justifyContent: "center", gap: 16 }}>
      <img src="https://flukegameassets.s3.amazonaws.com/logo.png" alt="Fluke Games" style={{ height: 36 }} />
      <p style={{ color: "rgba(255,255,255,0.45)", margin: 0 }}>
        {status === "submitting" ? "Submitting your responses…" : "Loading your interview session…"}
      </p>
    </div>
  );

  if (status === "awaiting_feedback") return (
    <div style={{ ...page, alignItems: "center", justifyContent: "center", gap: 16, padding: 24, overflowY: "auto" }}>
      <img src="https://flukegameassets.s3.amazonaws.com/logo.png" alt="Fluke Games" style={{ height: 36, flexShrink: 0 }} />
      <div style={{ fontSize: 52, flexShrink: 0 }}>🎉</div>
      <h2 style={{ margin: 0 }}>Interview Complete</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, textAlign: "center", maxWidth: 380, lineHeight: 1.6 }}>
        Your responses have been recorded. Share your experience below — it will be included with your submission.
      </p>

      {err && (
        <div style={{ width: "100%", maxWidth: 420, padding: "10px 16px", borderRadius: 10, background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.25)", color: "#fca5a5", fontSize: 13 }}>
          {err}
        </div>
      )}

      <div style={{ width: "100%", maxWidth: 420, background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: "24px 24px 20px", border: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20, color: "#fff" }}>How was your experience?</div>

        {/* Overall quality — star rating */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.6px" }}>Overall quality</div>
          <div style={{ display: "flex", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n}
                onClick={() => setFeedback((f) => ({ ...f, stars: n }))}
                onMouseEnter={() => setHoveredStar(n)}
                onMouseLeave={() => setHoveredStar(0)}
                style={{ fontSize: 34, cursor: "pointer", lineHeight: 1, color: n <= (hoveredStar || feedback.stars) ? "#f59e0b" : "rgba(255,255,255,0.15)", transition: "color 0.1s ease" }}>
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Q2: completed questions? */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 8, lineHeight: 1.5 }}>Did the interviewer agent complete the questions?</div>
          <div style={{ display: "flex", gap: 8 }}>
            {(["Yes", "No"] as const).map((opt) => {
              const val = opt === "Yes";
              const active = feedback.completedQs === val;
              return (
                <button key={opt} onClick={() => setFeedback((f) => ({ ...f, completedQs: val }))}
                  style={{ padding: "7px 20px", borderRadius: 8, border: `1px solid ${active ? "#6366f1" : "rgba(255,255,255,0.1)"}`, background: active ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.05)", color: active ? "#a5b4fc" : "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Q3: listened fully before moving on? */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 8, lineHeight: 1.5 }}>Did the agent listen to your answers completely before moving forward?</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {(["Yes", "Partially", "No"] as const).map((opt) => {
              const active = feedback.listenedFully === opt.toLowerCase();
              return (
                <button key={opt} onClick={() => setFeedback((f) => ({ ...f, listenedFully: opt.toLowerCase() }))}
                  style={{ padding: "7px 20px", borderRadius: 8, border: `1px solid ${active ? "#6366f1" : "rgba(255,255,255,0.1)"}`, background: active ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.05)", color: active ? "#a5b4fc" : "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {/* Q4: stuck to topic? */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 8, lineHeight: 1.5 }}>Did the agent stick to the interview topic?</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
            {(["Yes", "Partially", "No"] as const).map((opt) => {
              const active = feedback.stuckToTopic === opt.toLowerCase();
              return (
                <button key={opt} onClick={() => setFeedback((f) => ({ ...f, stuckToTopic: opt.toLowerCase() }))}
                  style={{ padding: "7px 20px", borderRadius: 8, border: `1px solid ${active ? "#6366f1" : "rgba(255,255,255,0.1)"}`, background: active ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.05)", color: active ? "#a5b4fc" : "rgba(255,255,255,0.45)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            disabled={feedback.stars === 0}
            onClick={() => finalSubmit(feedback)}
            style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: feedback.stars > 0 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "rgba(255,255,255,0.06)", color: feedback.stars > 0 ? "#fff" : "rgba(255,255,255,0.2)", fontWeight: 700, fontSize: 14, cursor: feedback.stars > 0 ? "pointer" : "not-allowed", transition: "background 0.2s ease, color 0.2s ease" }}>
            Submit with Feedback
          </button>
          <button
            onClick={() => finalSubmit(null)}
            style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.12)", background: "transparent", color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );

  if (status === "submitted") return (
    <div style={{ ...page, alignItems: "center", justifyContent: "center", gap: 16, padding: 24 }}>
      <img src="https://flukegameassets.s3.amazonaws.com/logo.png" alt="Fluke Games" style={{ height: 36 }} />
      <div style={{ fontSize: 52 }}>🎉</div>
      <h2 style={{ margin: 0 }}>All Done!</h2>
      <p style={{ color: "rgba(255,255,255,0.5)", margin: 0, textAlign: "center", maxWidth: 380, lineHeight: 1.6 }}>
        Your responses have been submitted. Our team will be in touch soon. Thank you for your time!
      </p>
      {feedback.stars > 0 && (
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Feedback included — thank you!</div>
      )}
    </div>
  );

  // ── Main voice-call UI ──────────────────────────────────────────────────────

  const connected = status === "connected";
  const allQuestions = [...(ctx?.questions || []), ...jobRoleQuestions];
  allQuestionsRef.current = allQuestions;
  const allDone = qIdx >= allQuestions.length;

  // ── Pre-call landing ──────────────────────────────────────────────────────
  if (status === "idle") {
    const tips = [
      { icon: "🎙️", text: "Find a quiet spot — background noise affects transcription" },
      { icon: "💬", text: "Speak clearly and take your time with each answer" },
      { icon: "⏸️", text: "The AI will prompt you if your response seems incomplete" },
      { icon: "✅", text: "Your responses are saved automatically when you end the call" },
    ];
    return (
      <div style={{ ...page, overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <img src="https://flukegameassets.s3.amazonaws.com/logo.png" alt="Fluke Games" style={{ height: 28 }} />
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{ctx.label}{jobTitle && ` · ${jobTitle}`}</span>
          <div style={{ width: 60 }} />
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", gap: 28 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 16px" }}>🤖</div>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#fff" }}>
              {ctx.label}{jobTitle && <span style={{ color: "#a78bfa" }}> · {jobTitle}</span>}
            </h2>
            {ctx.description && <p style={{ margin: "0 0 10px", color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.5, maxWidth: 380 }}>{ctx.description}</p>}
            {allQuestions.length > 0 && (
              <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontSize: 12, fontWeight: 700 }}>
                {allQuestions.length} question{allQuestions.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 480 }}>
            {tips.map((tip, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20, lineHeight: 1 }}>{tip.icon}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{tip.text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={connect}
            style={{ padding: "14px 48px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.4)", letterSpacing: "0.3px" }}
          >
            Join Call →
          </button>
        </div>
        <style>{`@keyframes ripple-out{0%{transform:scale(1);opacity:.65}100%{transform:scale(3.2);opacity:0}}`}</style>
      </div>
    );
  }

  return (
    <div style={page}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <img src="https://flukegameassets.s3.amazonaws.com/logo.png" alt="Fluke Games" style={{ height: 28 }} />

        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>
            {ctx.label}
            {jobTitle && <span style={{ color: "#a78bfa", fontWeight: 500 }}> · {jobTitle}</span>}
          </div>
          {connected && (
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
              Question {Math.min(qIdx + 1, allQuestions.length)} of {allQuestions.length}
              {jobRoleQuestions.length > 0 && (
                <span style={{ color: "rgba(167,139,250,0.55)" }}> ({ctx.questions.length} general + {jobRoleQuestions.length} role)</span>
              )}
            </div>
          )}
        </div>

        <div style={{
          padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700,
          background: connected ? "rgba(22,163,74,0.15)" : status === "connecting" ? "rgba(29,78,216,0.15)" : "rgba(255,255,255,0.06)",
          color: connected ? "#4ade80" : status === "connecting" ? "#93c5fd" : "rgba(255,255,255,0.35)",
          border: `1px solid ${connected ? "rgba(74,222,128,0.2)" : status === "connecting" ? "rgba(147,197,253,0.2)" : "rgba(255,255,255,0.08)"}`,
        }}>
          {connected ? "● Live" : status === "connecting" ? "Connecting…" : "● Not connected"}
        </div>
      </div>

      {/* Call area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 20px 0", gap: 16 }}>

        {/* AI tile */}
        <div style={{
          flex: 1, maxWidth: 640, aspectRatio: "16/9",
          background: "#1a1a2e", borderRadius: 20,
          border: `2px solid ${aiSpeaking ? "#6366f1" : connected ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.08)"}`,
          boxShadow: aiSpeaking ? "0 0 32px rgba(99,102,241,0.35)" : "none",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, zIndex: 1 }}>
            {aiSpeaking && [0, 0.5, 1.0].map((delay, i) => (
              <div key={i} style={{
                position: "absolute", width: 72, height: 72, borderRadius: "50%",
                border: "2px solid rgba(139,92,246,0.65)",
                animation: `ripple-out 1.8s ease-out ${delay}s infinite`,
                pointerEvents: "none",
              }} />
            ))}
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, position: "relative", zIndex: 1,
              boxShadow: aiSpeaking ? "0 0 0 4px rgba(99,102,241,0.25)" : "none",
              transition: "box-shadow 0.3s ease",
            }}>
              🤖
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: 16, position: "relative", zIndex: 1 }}>Fluke AI</div>
          <div style={{ fontSize: 12, color: aiSpeaking ? "#a5b4fc" : "rgba(255,255,255,0.4)", marginTop: 4, position: "relative", zIndex: 1, transition: "color 0.2s" }}>
            {aiSpeaking ? "Speaking…" : connected ? "Listening" : "Waiting"}
          </div>

          {/* Question overlay */}
          {connected && !allDone && (
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.88))", padding: "24px 20px 16px", borderRadius: "0 0 18px 18px" }}>
              <div style={{ height: 2, background: "rgba(255,255,255,0.1)", borderRadius: 999, marginBottom: 10 }}>
                <div style={{
                  height: "100%", borderRadius: 999,
                  background: qIdx >= ctx.questions.length ? "linear-gradient(90deg,#a78bfa,#8b5cf6)" : "linear-gradient(90deg,#6366f1,#a78bfa)",
                  width: `${(qIdx / allQuestions.length) * 100}%`,
                  transition: "width 0.4s ease",
                }} />
              </div>
              {qIdx >= ctx.questions.length && (
                <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>
                  Role question · {jobTitle}
                </div>
              )}
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{allQuestions[qIdx]}</div>
            </div>
          )}

          {connected && allDone && (
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 20px", background: "linear-gradient(transparent, rgba(0,0,0,0.85))", borderRadius: "0 0 18px 18px", textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>✅ All questions answered</div>
            </div>
          )}

          {status === "connecting" && (
            <div style={{ marginTop: 16, fontSize: 13, color: "rgba(147,197,253,0.8)", position: "relative", zIndex: 1 }}>Connecting…</div>
          )}
        </div>

        {/* User tile */}
        <div style={{ width: 160, aspectRatio: "4/3", background: "#111", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, alignSelf: "flex-end", flexShrink: 0 }}>
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {userSpeaking && !micMuted && [0, 0.55].map((delay, i) => (
              <div key={i} style={{
                position: "absolute", width: 40, height: 40, borderRadius: "50%",
                border: "2px solid rgba(74,222,128,0.6)",
                animation: `ripple-out 1.6s ease-out ${delay}s infinite`,
                pointerEvents: "none",
              }} />
            ))}
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: userSpeaking && !micMuted ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.1)",
              border: userSpeaking && !micMuted ? "1px solid rgba(74,222,128,0.3)" : "1px solid transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.7)",
              position: "relative", zIndex: 1, transition: "background 0.2s ease",
            }}>
              {bindEmail ? bindEmail.slice(0, 1).toUpperCase() : "?"}
            </div>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textAlign: "center", padding: "0 8px", wordBreak: "break-all" }}>
            {bindEmail || "You"}
          </div>
          {connected && <div style={{ fontSize: 11, color: micMuted ? "#f87171" : userSpeaking ? "#4ade80" : "rgba(255,255,255,0.3)" }}>{micMuted ? "🔇 Muted" : userSpeaking ? "🎤 Speaking" : "🎤 Live"}</div>}
        </div>
      </div>

      {/* Error */}
      {err && (
        <div style={{ margin: "8px 20px 0", padding: "10px 16px", borderRadius: 10, background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.25)", color: "#fca5a5", fontSize: 13, flexShrink: 0 }}>
          {err}
        </div>
      )}

      {/* Control bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, padding: "20px 20px 28px", flexShrink: 0 }}>
        {connected && (
          <button onClick={toggleMic} title={micMuted ? "Unmute" : "Mute"} style={{ width: 52, height: 52, borderRadius: "50%", border: "none", background: micMuted ? "rgba(220,38,38,0.8)" : "rgba(255,255,255,0.12)", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {micMuted ? "🔇" : "🎤"}
          </button>
        )}

        {connected && (
          <button onClick={endAndSubmit} title="End call & submit" style={{ width: 52, height: 52, borderRadius: "50%", border: "none", background: "#dc2626", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            📞
          </button>
        )}
      </div>

      <style>{`@keyframes ripple-out{0%{transform:scale(1);opacity:.65}100%{transform:scale(3.2);opacity:0}}`}</style>
    </div>
  );
}
