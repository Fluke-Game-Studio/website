import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { resolveApiBase } from "../services/apiBase";
import CommitmentPreviewModal, {
  COMMITMENT_STEPS,
  COMMITMENT_QUESTIONS_PROMPT,
  COMMITMENT_QUESTIONS_FOLLOWUP_PROMPT,
} from "../components/CommitmentPreviewModal";

const API_BASE = resolveApiBase();

// The interview runs in explicit phases. Everything that reacts to the candidate (transcripts,
// tool calls, watchdogs, the Continue button) branches on the current phase, so one phase can
// never leak into another:
//   intro                 greeting + optional overview
//   commitment_narration  (commitment checkbox only) AI narrates the modal steps, mic closed
//   commitment_qa         (commitment checkbox only) spoken Q&A about the commitment model ONLY
//   interview             the context's questions + job-role questions
//   company_qa            (postSessionQAEnabled) Fluke Games Q&A: company + commitment model
//   closing               end note
type Phase = "intro" | "commitment_narration" | "commitment_qa" | "interview" | "company_qa" | "closing";

// Same content the modal displays, flattened for use as LLM grounding when the candidate asks
// about it out loud.
const COMMITMENT_INFO_TEXT = COMMITMENT_STEPS.map((s) => `${s.title}: ${s.details.join(" ")}`).join("\n");

type IntakeContext = {
  key: string;
  label: string;
  description: string;
  questions: string[];
  endNote?: string;
  sessionPrompt?: string;
  backgroundInfo?: string;
  customInstructions?: string;
  followUpInstructions?: string;
  preSessionEnabled?: boolean;
  preSessionNote?: string;
  postSessionQAEnabled?: boolean;
  commitmentModalEnabled?: boolean;
};

// Two clearly separate layers:
// - PROTOCOL_INSTRUCTIONS: the mechanical contract (must call a tool, never free-speak).
//   This is the part that actually fixes question skipping, so it stays code-owned and is
//   never overridable by admin-authored text — that's exactly what broke before.
// - Persona/tone/behavior: comes entirely from the context's own sessionPrompt /
//   customInstructions (admin-editable via the context builder). DEFAULT_PERSONA is only a
//   fallback for contexts that leave sessionPrompt blank.
const PROTOCOL_INSTRUCTIONS = `PROTOCOL — follow exactly, no exceptions:
After every candidate response you MUST call exactly one tool: "advance_interview" (normal case), "flag_off_topic" (candidate made no attempt to address the question), or "ask_follow_up_question" (when the current topic could use more depth — either because you decide that yourself, or because you're told to). Never respond with speech directly at that point — only a tool call.
After a tool call you'll be told what to say next. When told to say something "exactly," use those exact words — no additions, no paraphrasing. When told to "acknowledge naturally," vary your phrasing and sound genuinely human — don't reuse the same stock phrase every time. Never comment on audio quality, interruptions, or whether an answer "sounded cut off" during a natural acknowledgment — that judgment is handled separately; a natural acknowledgment always means the system has already decided to move on, so treat it as a settled transition, not a chance to ask for a repeat.
Respond only in English, regardless of what language the candidate uses.`;

const DEFAULT_PERSONA = "You are a warm, professional AI interviewer for Fluke Games, having a natural conversation — not reading a script robotically.";

// Re-stated in every per-turn instruction that asks the model to freely generate text (rather
// than recite a literal script) — session-opening instructions alone don't reliably hold this
// rule many turns into a conversation, same class of drift the whole tool-calling redesign
// exists to prevent for question order.
const ENGLISH_REMINDER = "(Regardless of what language the candidate just used, write this in English only.)";

const INTERVIEW_TOOLS = [
  {
    type: "function",
    name: "advance_interview",
    description:
      "Call this after the candidate finishes responding to the current question. You do NOT choose the next question — it will be provided to you afterward.",
    parameters: {
      type: "object",
      properties: {
        candidate_answer_seems_incomplete: {
          type: "boolean",
          description:
            "True ONLY if the candidate's answer was clearly cut off mid-sentence, silent, or nonsensical. False for any real attempt at an answer, even a brief one.",
        },
      },
      required: ["candidate_answer_seems_incomplete"],
    },
  },
  {
    type: "function",
    name: "flag_off_topic",
    description:
      "Call this INSTEAD of advance_interview only if the candidate's response made no attempt whatsoever to address the current question (asked something unrelated, went silent, or talked about something else entirely).",
    parameters: { type: "object", properties: {}, required: [] },
  },
  {
    type: "function",
    name: "ask_follow_up_question",
    description:
      "Call this INSTEAD of advance_interview when the candidate's answer to the current topic could use more depth or specifics before moving on — use your own judgment on when a topic has been covered well enough. You may call this multiple times in a row on the same topic to keep drilling in (e.g. ask what they did, then ask to elaborate on a specific part of that answer), but don't overdo it once you have a clear, complete picture. Craft ONE natural, specific follow-up question based directly on what the candidate just said — never generic.",
    parameters: {
      type: "object",
      properties: {
        follow_up_question: {
          type: "string",
          description: "The exact follow-up question to ask, phrased naturally and conversationally, referencing specifics from the candidate's answer.",
        },
      },
      required: ["follow_up_question"],
    },
  },
];

// Tools allowed once the safety-net cap is hit — ask_follow_up_question is removed so the
// model is structurally unable to keep drilling, regardless of what it "wants."
const ADVANCE_AND_OFFTOPIC_TOOLS = INTERVIEW_TOOLS.filter((t) => t.name !== "ask_follow_up_question");

// Post-session open Q&A: only reachable after all fixed questions are done, and only when the
// context has postSessionQAEnabled. Separate tool set from INTERVIEW_TOOLS — never offered
// during the main epic phase, only via an explicit per-response override once open Q&A starts.
const ANSWER_CANDIDATE_QUESTION_TOOL = {
  type: "function",
  name: "answer_candidate_question",
  description:
    "Call this if the candidate asked a real question. Answer it using ONLY the company information you were given in this turn's instructions — if it doesn't cover what they asked, say a team member will follow up with details. Never invent facts.",
  parameters: {
    type: "object",
    properties: {
      answer: {
        type: "string",
        description: "Your answer, natural and conversational, grounded strictly in the provided company information.",
      },
    },
    required: ["answer"],
  },
};
const CONCLUDE_QA_TOOL = {
  type: "function",
  name: "conclude_qa",
  description:
    "Call this if the candidate said they have no questions, declined, or gave any closing/negative response (e.g. \"no\", \"I'm good\", \"that's all\"). A short negative answer here is complete by itself — do not ask them to elaborate.",
  parameters: { type: "object", properties: {}, required: [] },
};
const OPEN_QA_TOOLS = [ANSWER_CANDIDATE_QUESTION_TOOL, CONCLUDE_QA_TOOL];
const OPEN_QA_PROMPT = "Before we wrap up — do you have any questions for me?";
const OPEN_QA_PROMPT_WITH_COMMITMENT = "Before we wrap up — do you have any questions about Fluke Games or the commitment model?";
const OPEN_QA_FOLLOWUP_PROMPT = "Do you have any other questions for me?";
// Circuit breaker only, same philosophy as SAFETY_MAX_FOLLOWUPS_PER_EPIC — open Q&A is meant to
// run as long as the candidate has real questions, this just prevents it running forever.
const MAX_QA_ROUNDS = 5;
const MAX_COMMITMENT_QA_ROUNDS = 3;

// Phase 1 commitment Q&A. Deliberately DIFFERENT tool names from the phase 3 company Q&A, so a
// tool call that finishes generating after its phase has ended is unambiguous: it's stale and
// gets ignored instead of being routed into whatever phase is current.
const ANSWER_COMMITMENT_QUESTION_TOOL = {
  type: "function",
  name: "answer_commitment_question",
  description:
    "Call this if the candidate asked a real question about the commitment/vesting model. Answer it using ONLY the commitment-model information in this turn's instructions. If they asked about anything else (the role, the company, pay, the interview), do not answer it — say briefly that it isn't covered here and will be handled later or by the team. Never invent facts.",
  parameters: {
    type: "object",
    properties: {
      answer: {
        type: "string",
        description: "Your answer, natural and conversational, grounded strictly in the provided commitment-model information (or a brief deflection if the question wasn't about it).",
      },
    },
    required: ["answer"],
  },
};
const CONCLUDE_COMMITMENT_QA_TOOL = {
  type: "function",
  name: "conclude_commitment_qa",
  description:
    "Call this if the candidate said they have no questions about the commitment model, declined, or gave any closing/negative response (e.g. \"no\", \"I'm good\", \"that makes sense\"). A short negative answer is complete by itself — do not ask them to elaborate.",
  parameters: { type: "object", properties: {}, required: [] },
};
const COMMITMENT_QA_TOOLS = [ANSWER_COMMITMENT_QUESTION_TOOL, CONCLUDE_COMMITMENT_QA_TOOL];

const OFF_TOPIC_REDIRECT = "Let's keep focused on the interview.";
const CLARIFY_PROMPT = "It seems your response may have been incomplete — could you say a bit more about that?";
// Under 10s: elaboration is forced. Under 30s: elaboration is nudged but the model still
// chooses freely (it can also choose to elaborate above 30s — there's no hard duration ceiling,
// only the circuit breaker below).
const HARD_ELABORATE_THRESHOLD_MS = 10000;
const SOFT_ELABORATE_THRESHOLD_MS = 30000;
// Not a normal operating limit — the model is meant to decide when a topic ("epic") has been
// covered well enough. This is purely a circuit breaker so a stuck/looping model can't trap a
// candidate on one question forever.
const SAFETY_MAX_FOLLOWUPS_PER_EPIC = 3;

// How long the candidate must stay quiet before their answer counts as finished. The server
// VAD closes a segment after well under a second of silence, which is far too eager for a
// person who is thinking or searching for a word — so the decision waits on top of that.
// A segment that ends like a finished sentence waits less; one that trails off (no closing
// punctuation, a comma/ellipsis, a dangling "and"/"um", or just a filler like "let me think")
// is treated as the candidate still working it out.
const COMPLETE_PAUSE_MS = 2500;
const INCOMPLETE_PAUSE_MS = 5000;
const QA_COMPLETE_PAUSE_MS = 1500;
const FILLER_ONLY = /^(?:(?:um+|uh+|er+|hmm+|well|so|okay|ok|like|let me think|give me a (?:sec|second|moment|minute)|one (?:sec|second|moment)|how do i (?:put|say) (?:this|it))[\s,.…-]*)+$/i;

function answerPauseMs(segmentText: string, shortPause: boolean): number {
  const t = segmentText.trim();
  if (!t || FILLER_ONLY.test(t)) return INCOMPLETE_PAUSE_MS;
  const endsLikeSentence = /[.!?]["')\]]*$/.test(t) && !/(?:\.{2,}|…)["')\]]*$/.test(t);
  return endsLikeSentence ? (shortPause ? QA_COMPLETE_PAUSE_MS : COMPLETE_PAUSE_MS) : INCOMPLETE_PAUSE_MS;
}

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
  const [deviceStep, setDeviceStep] = useState<1 | 2>(1);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDeviceId, setAudioDeviceId] = useState("");
  const [videoDeviceId, setVideoDeviceId] = useState("");
  const [audioOpen, setAudioOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const micRef = useRef<MediaStream | null>(null);
  // Refs (not the React state) because these are read from inside WebRTC event-handler
  // closures created once per connect() call, which would otherwise see stale state.
  const micMutedRef = useRef(false);
  // True while the AI is expected to be speaking. The mic track is physically disabled during
  // this window — not just filtered after the fact — so acoustic echo/background noise can
  // never reach server-side VAD and get misheard as the candidate's answer. This flow is
  // strictly turn-based (no barge-in), so there's no downside to actually cutting the mic.
  const micBlockedForAiRef = useRef(false);
  // The RTCRtpSender for the mic track — used to physically stop transmitting it
  // (replaceTrack(null)) while blocked, not just mark it enabled=false. Belt-and-suspenders:
  // enabled=false SHOULD make WebRTC send silence instead of real audio, but if anything is
  // still leaking through server-side VAD, replaceTrack(null) sends nothing over the wire at
  // all, which is airtight.
  const micSenderRef = useRef<RTCRtpSender | null>(null);
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
  // Mirrors the mic-input analyser, but on the AI's OUTGOING audio track — used to detect when
  // the AI has actually finished speaking (real silence), instead of guessing a fixed delay or
  // trusting response.done (which marks generation complete, not playback complete — these can
  // diverge in either direction depending on how fast audio is generated vs. played back).
  const aiAudioCtxRef = useRef<AudioContext | null>(null);
  const aiAnalyserRef = useRef<AnalyserNode | null>(null);
  const aiAudioLevelRef = useRef(0);
  const aiAudioMonitorFrameRef = useRef<number>(0);
  const previewRef = useRef<HTMLVideoElement | null>(null);
  const previewStreamRef = useRef<MediaStream | null>(null);
  const lobbyCardRef = useRef<HTMLDivElement | null>(null);
  const expectingToolCallRef = useRef(false);
  const followUpCountRef = useRef<Record<number, number>>({});
  const counterQuestionCountRef = useRef<Record<number, number>>({});
  const speechStartedAtRef = useRef<number | null>(null);
  const lastAnswerDurationMsRef = useRef<number | null>(null);
  const closingTextRef = useRef("");
  // The literal text of whatever question is currently "live" — the top-level question, or the
  // most recent follow-up within it. Clarify/off-topic repeats must target THIS, not always the
  // top-level question, since the candidate may be mid-elaboration-chain when either fires.
  const currentAskedQuestionRef = useRef("");
  // What kind of tool call is outstanding, so the watchdog can react correctly instead of
  // always defaulting to "just advance" — that default is wrong when a FORCED follow-up
  // (<10s case) silently fails, since blindly advancing corrupts qIdx/answer attribution
  // mid-epic. null once a response is scripted (no tool call is ever expected then).
  const pendingKindRef = useRef<"decision" | "forced_elaborate" | "decision_retry" | null>(null);
  // THE source of truth for where the interview is — see the Phase type. Always change it via
  // setPhase so transitions are logged (console.debug) and easy to trace in a bad session.
  const phaseRef = useRef<Phase>("intro");
  function setPhase(next: Phase) {
    if (phaseRef.current !== next) console.debug("[intake] phase", phaseRef.current, "→", next);
    phaseRef.current = next;
  }
  const qaRoundsRef = useRef(0);
  const commitmentQaRoundsRef = useRef(0);
  const qaGroundingTextRef = useRef("");
  // Both sides of the call in arrival order, built from the Realtime transcript events —
  // `answersRef` only holds the candidate's replies keyed by question.
  const conversationRef = useRef<{ role: "ai" | "candidate"; text: string; ts: number; phase: Phase }[]>([]);
  // End-of-answer detection: segments recorded but not yet acted on, and the timer waiting
  // for the candidate to actually be done (see answerPauseMs).
  const hasPendingAnswerRef = useRef(false);
  const lastSegmentTextRef = useRef("");
  const pendingTranscriptsRef = useRef<Set<string>>(new Set());
  const evalTimerRef = useRef<number | null>(null);
  // Conversation items created during the commitment phases (narration, spoken Q&A, tool
  // calls). They're deleted from the model's context when the interview starts so nothing in
  // the interview that follows can be "about" the commitment model.
  const commitmentItemIdsRef = useRef<string[]>([]);
  // Generic "run this once the current scripted response finishes, with no candidate input
  // needed" hook — used to auto-advance narration steps without waiting for a mic turn. Actually
  // fired only once waitForAiSilenceThenRun confirms real silence — see there for why a fixed
  // delay estimate doesn't work.
  const postScriptedActionRef = useRef<(() => void) | null>(null);
  const [commitmentUiStep, setCommitmentUiStep] = useState(-1);
  // True while the AI is speaking in the commitment Q&A step (its opening question, or an
  // answer). Continue is disabled the whole time. Set/cleared only at phase boundaries and when
  // that speech finishes.
  const [commitmentBusy, setCommitmentBusy] = useState(false);
  // Bridges the "Continue" button (rendered at component level, outside connect()'s closure)
  // to the actual skip-past-commitment logic, which needs functions only defined inside that
  // closure. Reassigned each connect() call; a no-op otherwise so a stray click can't error.
  const continueFromCommitmentRef = useRef<() => void>(() => {});
  // Set right before a response.cancel that might legitimately have nothing to cancel — see
  // the error handler.
  const suppressNextErrorRef = useRef(false);

  // Keep answersRef in sync
  useEffect(() => { answersRef.current = answers; }, [answers]);

  async function refreshDevices() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      previewStreamRef.current?.getTracks().forEach((t) => t.stop());
      previewStreamRef.current = stream;
      if (previewRef.current) previewRef.current.srcObject = stream;
    } catch {}
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audio = devices.filter((d) => d.kind === "audioinput");
      const video = devices.filter((d) => d.kind === "videoinput");
      setAudioDevices(audio);
      setVideoDevices(video);
      setAudioDeviceId((prev) => prev || audio[0]?.deviceId || "");
      setVideoDeviceId((prev) => prev || video[0]?.deviceId || "");
    } catch {}
  }

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
        qaGroundingTextRef.current = String(data?.qaGroundingText || "");
        if (Array.isArray(data.jobRoleQuestions) && data.jobRoleQuestions.length > 0) {
          setJobRoleQuestions(data.jobRoleQuestions as string[]);
        }
        if (data.jobTitle) setJobTitle(String(data.jobTitle));
      } catch (e: any) {
        setLoadErr(String(e?.message || "Network error. Check your connection and try again."));
      }
    })();
  }, []);

  useEffect(() => {
    refreshDevices();
  }, []);

  useEffect(() => () => {
    previewStreamRef.current?.getTracks().forEach((t) => t.stop());
  }, []);

  useEffect(() => {
    function onDocClick(event: MouseEvent) {
      if (!lobbyCardRef.current?.contains(event.target as Node)) {
        setAudioOpen(false);
        setVideoOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (deviceStep !== 1) return;
    let cancelled = false;
    (async () => {
      if (!audioDeviceId && !videoDeviceId) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
          video: videoDeviceId ? { deviceId: { exact: videoDeviceId } } : true,
        });
        if (cancelled) stream.getTracks().forEach((t) => t.stop());
        else {
          previewStreamRef.current?.getTracks().forEach((t) => t.stop());
          previewStreamRef.current = stream;
          if (previewRef.current) previewRef.current.srcObject = stream;
        }
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [audioDeviceId, videoDeviceId, deviceStep]);

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

  function formatMediaError(err: any) {
    const name = String(err?.name || "");
    const message = String(err?.message || err || "Unknown microphone error");
    if (name === "NotFoundError" || /requested device not found/i.test(message)) {
      return "No microphone was found. Please connect or enable a microphone, then try again.";
    }
    if (name === "NotAllowedError" || name === "SecurityError") {
      return "Microphone access was blocked. Please allow mic permissions for this site and try again.";
    }
    if (name === "NotReadableError") {
      return "Your microphone is already in use by another app or tab. Close other audio apps and try again.";
    }
    return message;
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

  function clearEvalTimer() {
    if (evalTimerRef.current != null) {
      window.clearTimeout(evalTimerRef.current);
      evalTimerRef.current = null;
    }
  }

  function stopMicAnalysis() {
    cancelAnimationFrame(animFrameRef.current);
    try { audioCtxRef.current?.close(); } catch {}
    audioCtxRef.current = null;
    analyserRef.current = null;
    setUserSpeaking(false);
  }

  function startAiAudioMonitor(stream: MediaStream) {
    try {
      const actx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = actx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.6;
      actx.createMediaStreamSource(stream).connect(analyser);
      aiAudioCtxRef.current = actx;
      aiAnalyserRef.current = analyser;
      const data = new Uint8Array(analyser.frequencyBinCount);
      function tick() {
        if (!aiAnalyserRef.current) return;
        aiAnalyserRef.current.getByteFrequencyData(data);
        aiAudioLevelRef.current = data.reduce((a, b) => a + b, 0) / data.length;
        aiAudioMonitorFrameRef.current = requestAnimationFrame(tick);
      }
      tick();
    } catch {}
  }

  function stopAiAudioMonitor() {
    cancelAnimationFrame(aiAudioMonitorFrameRef.current);
    try { aiAudioCtxRef.current?.close(); } catch {}
    aiAudioCtxRef.current = null;
    aiAnalyserRef.current = null;
    aiAudioLevelRef.current = 0;
  }

  const AI_SILENCE_LEVEL_THRESHOLD = 8;
  // Long enough to not mistake a natural inter-sentence pause (a period + breath in a multi-
  // sentence narration can easily run 400-700ms) for the turn actually being over — that was
  // cutting narration off mid-way through and jumping to the next step early.
  const AI_SILENCE_HOLD_MS = 900;
  // Grace period before we start looking for silence at all — otherwise a brief gap before
  // audio actually starts streaming in could read as "already silent" and fire prematurely.
  const AI_SILENCE_MIN_WAIT_MS = 800;
  // Safety cap in case the analyser never reads a clean silence (e.g. background noise on the
  // output device) — never block the interview forever waiting for a signal that might not come.
  const AI_SILENCE_MAX_WAIT_MS = 25000;

  function waitForAiSilenceThenRun(run: () => void) {
    const startedAt = Date.now();
    let quietSince: number | null = null;
    function poll() {
      const now = Date.now();
      const elapsed = now - startedAt;
      if (elapsed >= AI_SILENCE_MIN_WAIT_MS) {
        if (aiAudioLevelRef.current < AI_SILENCE_LEVEL_THRESHOLD) {
          if (quietSince == null) quietSince = now;
          if (now - quietSince >= AI_SILENCE_HOLD_MS) { run(); return; }
        } else {
          quietSince = null;
        }
      }
      if (elapsed > AI_SILENCE_MAX_WAIT_MS) { run(); return; }
      requestAnimationFrame(poll);
    }
    requestAnimationFrame(poll);
  }

  async function connect(audioDeviceId?: string) {
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
      if (!sessionRes.ok) {
        throw new Error(
          `Session ${sessionRes.status}: ${sessionData?.error || sessionData?.message || JSON.stringify(sessionData || {}) || "unknown"}`
        );
      }

      const ephemeralKey = extractEphemeralKey(sessionData);
      if (!ephemeralKey) {
        throw new Error(`Missing realtime key from server: ${JSON.stringify(sessionData || {})}`);
      }

      const pc = new RTCPeerConnection();
      pcRef.current = pc;
      if (seq !== connectSeqRef.current) { pc.close(); return; }

      const audioEl = audioElRef.current!;
      pc.ontrack = (event) => {
        const stream = event.streams?.[0] || new MediaStream([event.track]);
        audioEl.srcObject = stream;
        audioEl.play().catch(() => setErr("Audio blocked by browser. Click anywhere then reconnect."));
        startAiAudioMonitor(stream);
      };

      pc.onconnectionstatechange = () => {
        if (pc.connectionState === "connected") setStatus("connected");
        if (["failed", "closed", "disconnected"].includes(pc.connectionState)) disconnect();
      };

      const ms = await navigator.mediaDevices.getUserMedia({
        audio: audioDeviceId ? { deviceId: { exact: audioDeviceId } } : true,
      });
      if (seq !== connectSeqRef.current) { ms.getTracks().forEach((t) => t.stop()); pc.close(); return; }
      micRef.current = ms;
      micMutedRef.current = false;
      // Start blocked — the greeting fires immediately once the data channel opens, before
      // there's ever a genuine moment to listen.
      micBlockedForAiRef.current = true;
      ms.getTracks().forEach((t) => {
        if (pc.signalingState !== "closed") {
          const sender = pc.addTrack(t, ms);
          if (t.kind === "audio") micSenderRef.current = sender;
        }
      });
      applyMicEnabledState();
      startMicAnalysis(ms);

      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;

      dc.onopen = () => {
        setStatus("connected");
        responseInProgressRef.current = false;
        expectingToolCallRef.current = false;
        followUpCountRef.current = {};
        counterQuestionCountRef.current = {};
        speechStartedAtRef.current = null;
        lastAnswerDurationMsRef.current = null;
        setPhase("intro");
        qaRoundsRef.current = 0;
        commitmentQaRoundsRef.current = 0;
        conversationRef.current = [];
        clearEvalTimer();
        hasPendingAnswerRef.current = false;
        lastSegmentTextRef.current = "";
        pendingTranscriptsRef.current.clear();
        commitmentItemIdsRef.current = [];
        postScriptedActionRef.current = null;
        setCommitmentUiStep(-1);
        setCommitmentBusy(false);
        const qs = allQuestionsRef.current;
        currentAskedQuestionRef.current = qs[0] || "";

        closingTextRef.current =
          ctx?.endNote?.trim() || `Thank the candidate warmly, tell them a human will review their responses, and wish them well.`;

        // Question text/order is never embedded here — it's delivered fresh, per-turn, via
        // scripted tool_choice:"none" responses so the model never has to "remember" a rule
        // buried many turns back.
        // Persona/behavior comes from the context itself (admin-editable) — PROTOCOL_INSTRUCTIONS
        // is the only hardcoded, non-overridable part, and it's appended last.
        const sessionInstructions = [
          ctx?.sessionPrompt?.trim() || DEFAULT_PERSONA,
          ctx?.customInstructions?.trim() ? `\nBehavior rules for this interview:\n${ctx.customInstructions.trim()}` : "",
          ctx?.backgroundInfo?.trim() ? `\nBackground context (for tone only, not to be recited):\n${ctx.backgroundInfo.trim()}` : "",
          ctx?.commitmentModalEnabled
            ? `\nThis session has separate phases. First, an informational walkthrough of the commitment and vesting model is narrated while a panel is shown on screen, followed by a short Q&A about it where you answer only from the commitment-model information you're given in that turn. Then the interview questions. That earlier part is NOT part of the interview: while the interview questions are being asked, never bring up the commitment model, comment on it, or follow up on it, and never treat any of the candidate's interview answers as being about it.`
            : "",
          `\n${PROTOCOL_INSTRUCTIONS}`,
        ].filter(Boolean).join("\n").trim();

        // Session-level: tools are always available and REQUIRED after every candidate turn.
        dc.send(JSON.stringify({
          type: "session.update",
          session: { type: "realtime", instructions: sessionInstructions, tools: INTERVIEW_TOOLS, tool_choice: "required" },
        }));

        // Clear any mic audio buffered during connection to prevent VAD from cancelling the greeting
        dc.send(JSON.stringify({ type: "input_audio_buffer.clear" }));

        // Every distinct thing the AI says opens as its OWN turn, chained via
        // postScriptedActionRef — never combined into one response. Combining them (e.g.
        // greeting + overview + step-1 narration in a single turn) was the actual bug behind
        // the commitment modal appearing to "jump ahead": the UI can only correctly reflect
        // what's currently being said if each thing being said is its own turn boundary.
        const overviewText = ctx?.preSessionEnabled
          ? (ctx?.preSessionNote?.trim() ||
              `This will be a short interview with ${qs.length} question${qs.length === 1 ? "" : "s"} about ${ctx?.label || "a few topics"}, and it should take about ${Math.max(3, qs.length * 2)} minutes.`)
          : "";
        const commitmentEnabled = Boolean(ctx?.commitmentModalEnabled);

        function startCommitmentOrQ1() {
          if (commitmentEnabled) {
            setPhase("commitment_narration");
            narrateCommitmentStep(0);
          } else {
            setPhase("interview");
            currentAskedQuestionRef.current = qs[0] || "";
            sendScriptedResponse(qs[0] || closingTextRef.current);
          }
        }

        postScriptedActionRef.current = overviewText
          ? () => {
              postScriptedActionRef.current = startCommitmentOrQ1;
              sendNaturalResponse(overviewText);
            }
          : startCommitmentOrQ1;

        responseInProgressRef.current = true;
        expectingToolCallRef.current = false;
        dc.send(JSON.stringify({
          type: "response.create",
          response: {
            instructions: `Begin the session now. Greet the candidate warmly, introduce yourself as the Fluke Games AI interviewer, do NOT say your model name or mention ChatGPT. Say only a brief greeting — nothing else yet. ${ENGLISH_REMINDER}`,
            tool_choice: "none",
          },
        }));
      };

      dc.onmessage = (event) => {
        try {
          const msg = JSON.parse(String(event.data || "{}"));
          const type = String(msg?.type || "");

          if (type === "error") {
            // Failed cleanup deletes of walkthrough items are harmless — never a recovery event.
            if (String(msg?.error?.event_id || "").startsWith("commit_del_")) return;
            if (suppressNextErrorRef.current) {
              // We deliberately sent a response.cancel that might legitimately find nothing to
              // cancel (e.g. Continue clicked right as the response was already wrapping up) —
              // the server confirming "no active response" is a harmless race, not a real
              // failure, and shouldn't surface as a scary red banner or trigger recovery.
              suppressNextErrorRef.current = false;
              return;
            }
            // An error event can arrive INSTEAD OF response.done (e.g. a rejected pinned
            // tool_choice during forced elaboration). Without resetting state here,
            // responseInProgressRef stays stuck true forever and the transcription handler's
            // guard silently drops every future candidate turn — the session looks "over"
            // when it's actually just wedged. Recover exactly like the response.done watchdog.
            setErr(String(msg?.error?.message || "Realtime error"));
            const wasExpectingToolCall = expectingToolCallRef.current;
            const kind = pendingKindRef.current;
            responseInProgressRef.current = false;
            expectingToolCallRef.current = false;
            pendingKindRef.current = null;
            if (wasExpectingToolCall) {
              recoverFromMissingToolCall(kind);
            } else if (postScriptedActionRef.current) {
              // A scripted narration turn errored out instead of completing — nothing was
              // actually spoken, so no silence wait is needed; just skip ahead immediately
              // rather than getting stuck silent forever.
              const run = postScriptedActionRef.current;
              postScriptedActionRef.current = null;
              run();
            } else {
              // A plain spoken turn with nothing chained after it errored out instead of
              // completing normally. Nothing else was going to reset state here, which would
              // leave the mic blocked. Recover the same way a normal completion would — except
              // during the commitment narration, where the mic stays closed.
              if (phaseRef.current !== "commitment_narration") {
                micBlockedForAiRef.current = false;
                applyMicEnabledState();
              }
              if (phaseRef.current === "commitment_qa") setCommitmentBusy(false);
            }
            return;
          }
          if (type === "response.created") {
            responseInProgressRef.current = true;
            // The AI is taking its turn, so any answer still waiting on a pause timer is moot.
            clearEvalTimer();
            hasPendingAnswerRef.current = false;
          }
          if (type === "response.cancelled") {
            responseInProgressRef.current = false;
            greetedRef.current = true;
            expectingToolCallRef.current = false;
            micBlockedForAiRef.current = false;
            applyMicEnabledState();
          }
          if (type === "response.done") {
            // Capture BEFORE anything below mutates it: false means the turn that just finished
            // was a spoken one (tool_choice:"none" — sendScriptedResponse/sendNaturalResponse/
            // sendAckThenQuestion all set this false), true means it was a silent tool-decision
            // turn with no audio at all.
            const wasSpokenTurn = !expectingToolCallRef.current;
            responseInProgressRef.current = false;
            greetedRef.current = true;
            // Remember what the commitment phases added to the conversation so it can be dropped
            // from the model's context when the interview starts.
            if ((phaseRef.current === "commitment_narration" || phaseRef.current === "commitment_qa") && Array.isArray(msg?.response?.output)) {
              for (const o of msg.response.output) {
                if (o?.id) commitmentItemIdsRef.current.push(String(o.id));
              }
            }
            if (postScriptedActionRef.current && !expectingToolCallRef.current) {
              // A scripted, no-candidate-input-needed turn just finished generating (e.g.
              // narrating a commitment step) — response.done means generation is complete, not
              // that playback is complete, and the gap between those two can go either way
              // depending on how fast this turn's audio was generated vs. real-time. Wait for
              // the audio to actually go quiet before running the next step.
              const run = postScriptedActionRef.current;
              postScriptedActionRef.current = null;
              waitForAiSilenceThenRun(run);
              return;
            }
            // No more chained scripted turns — genuinely waiting on the candidate next (or about
            // to send a silent tool-decision request). If the AI was just actually speaking
            // (e.g. "do you have any questions?"), re-enabling the mic on response.done alone is
            // too early — audio may still be playing, and the start of the candidate's real
            // answer gets cut off/overlapped with the tail of the AI's own prompt. Wait for real
            // silence first. Silent tool-decision turns never produced audio, so there's nothing
            // to wait for — unblock immediately.
            if (wasSpokenTurn) {
              waitForAiSilenceThenRun(() => {
                // The narration never opens the mic.
                if (phaseRef.current === "commitment_narration") return;
                micBlockedForAiRef.current = false;
                applyMicEnabledState();
                // Whatever was just spoken in the commitment Q&A (the opening question, or an
                // answer) has genuinely finished — Continue is safe to use again now, not before.
                if (phaseRef.current === "commitment_qa") setCommitmentBusy(false);
              });
            } else {
              micBlockedForAiRef.current = false;
              applyMicEnabledState();
            }
            const outputs: any[] = Array.isArray(msg?.response?.output) ? msg.response.output : [];
            const fnCall = outputs.find((o) => o?.type === "function_call");
            if (fnCall) {
              expectingToolCallRef.current = false;
              pendingKindRef.current = null;
              handleFunctionCall(fnCall);
            } else if (expectingToolCallRef.current) {
              expectingToolCallRef.current = false;
              const kind = pendingKindRef.current;
              pendingKindRef.current = null;
              recoverFromMissingToolCall(kind);
            }
          }
          if (type === "response.audio_transcript.delta" || type === "response.output_audio_transcript.delta") setAiSpeaking(true);
          if (type === "response.audio_transcript.done" || type === "response.output_audio_transcript.done") {
            setAiSpeaking(false);
            const aiText = String(msg?.transcript || "").trim();
            if (aiText) conversationRef.current.push({ role: "ai", text: aiText, ts: Date.now(), phase: phaseRef.current });
          }

          // Track how long the candidate actually spoke this turn (first speech_started to
          // last speech_stopped), so "under 30s" is measured, not guessed by the model.
          if (type === "input_audio_buffer.speech_started" && speechStartedAtRef.current == null) {
            speechStartedAtRef.current = Date.now();
          }
          if (type === "input_audio_buffer.speech_stopped" && speechStartedAtRef.current != null) {
            lastAnswerDurationMsRef.current = Date.now() - speechStartedAtRef.current;
          }

          // Turn-taking: a VAD pause is NOT the end of an answer. Each transcribed segment is
          // recorded immediately, but the decision (advance / follow up) only runs once the
          // candidate has stayed quiet long enough for the sentence to look finished —
          // see answerPauseMs.
          if (type === "input_audio_buffer.speech_started") clearEvalTimer();
          if (type === "input_audio_buffer.speech_stopped" && hasPendingAnswerRef.current) {
            armEvaluation(lastSegmentTextRef.current);
          }
          if (type === "input_audio_buffer.committed" && msg?.item_id) {
            pendingTranscriptsRef.current.add(String(msg.item_id));
            // The candidate's spoken turn is a conversation item too — remember it if it
            // belongs to the commitment Q&A so it's removed with the rest of that phase.
            if (phaseRef.current === "commitment_qa") commitmentItemIdsRef.current.push(String(msg.item_id));
          }
          if (type === "conversation.item.input_audio_transcription.failed") {
            pendingTranscriptsRef.current.delete(String(msg?.item_id || ""));
            if (hasPendingAnswerRef.current) armEvaluation(lastSegmentTextRef.current);
          }
          if (type === "conversation.item.input_audio_transcription.completed") {
            pendingTranscriptsRef.current.delete(String(msg?.item_id || ""));
            const text = String(msg?.transcript || "").trim();
            if (text) conversationRef.current.push({ role: "candidate", text, ts: Date.now(), phase: phaseRef.current });
            // Only these phases take candidate speech as an answer. Anything said during the
            // greeting, the commitment narration, or after the interview ends is logged in the
            // conversation above but never recorded or acted on.
            const phase = phaseRef.current;
            if (phase !== "commitment_qa" && phase !== "interview" && phase !== "company_qa") return;
            if (!text || responseInProgressRef.current) {
              // Nothing to record (noise / mid-response) — but a pending answer's timer was
              // cleared by speech_started, so make sure it still gets re-armed.
              if (hasPendingAnswerRef.current) armEvaluation(lastSegmentTextRef.current);
              return;
            }

            if (phase === "commitment_qa" || phase === "company_qa") {
              // What the candidate asked, kept separate from the interview answers.
              const qaKey = phase === "commitment_qa" ? "cqa" : "qa";
              setAnswers((prev) => {
                const next = { ...prev, [qaKey]: (prev[qaKey] ? `${prev[qaKey]} | ` : "") + text };
                answersRef.current = next;
                return next;
              });
            } else {
              const key = `q${qIdxRef.current + 1}`;
              setAnswers((prev) => {
                const next = { ...prev, [key]: (prev[key] ? `${prev[key]} ` : "") + text };
                answersRef.current = next;
                return next;
              });
            }
            hasPendingAnswerRef.current = true;
            lastSegmentTextRef.current = text;
            armEvaluation(text);
          }
        } catch {}
      };

      // Timer lives here (not in onmessage) so it can call the request* helpers below.
      function armEvaluation(lastText: string) {
        clearEvalTimer();
        if (!hasPendingAnswerRef.current) return;
        let retries = 0;
        const fire = () => {
          // Wait for any audio segment still being transcribed (bounded, so a lost event
          // can't wedge the session).
          if (pendingTranscriptsRef.current.size > 0 && retries++ < 5) {
            evalTimerRef.current = window.setTimeout(fire, 800);
            return;
          }
          evalTimerRef.current = null;
          hasPendingAnswerRef.current = false;
          pendingTranscriptsRef.current.clear();
          evaluateAnswer();
        };
        const inQa = phaseRef.current === "commitment_qa" || phaseRef.current === "company_qa";
        evalTimerRef.current = window.setTimeout(fire, answerPauseMs(lastText, inQa));
      }

      // Runs once the candidate has actually finished their answer.
      function evaluateAnswer() {
        if (responseInProgressRef.current) return;
        const phase = phaseRef.current;

        if (phase === "commitment_qa") {
          // Same principle as company Q&A: no duration/elaboration logic — a short "no" ends
          // this phase immediately and moves straight to the interview.
          if (!dcRef.current) return;
          // NOT setting responseInProgressRef here — requestCommitmentQaDecision() sets it
          // itself right after its own overlap guard passes. Pre-setting it here made that
          // guard see "already in progress" on every call and silently no-op, which is
          // exactly what left this stuck on "Waiting for answer…" forever.
          setCommitmentBusy(true);
          // Circuit breaker: whatever the exact failure mode, Continue must never be able to
          // get stuck disabled forever. Harmless no-op if the answer already resolved normally.
          window.setTimeout(() => setCommitmentBusy(false), 20000);
          requestCommitmentQaDecision();
          return;
        }

        if (phase === "company_qa") {
          // Open Q&A: deliberately NO duration/elaboration logic here — a brief "no" is a
          // complete, valid answer by definition, unlike a fixed interview question. This
          // is the actual fix for "AI keeps asking to clarify 'no I don't have questions'".
          if (!dcRef.current) return;
          // requestOpenQaDecision() sets responseInProgressRef itself — see the comment on
          // the commitment-QA branch above for why pre-setting it here is actively harmful.
          requestOpenQaDecision();
          return;
        }

        // Only the interview phase evaluates answers beyond this point.
        if (phase !== "interview") return;

        const currentIdx = qIdxRef.current;
        const channel = dcRef.current;
        if (!channel) return;
        // Not pre-setting responseInProgressRef here — requestForcedFollowUp/
        // requestToolDecision (called below) each set it themselves right after their own
        // overlap guard passes. Pre-setting it here made every call silently no-op, which
        // meant no candidate answer in the main interview was ever actually processed.

        const durationMs = lastAnswerDurationMsRef.current;
        const roundsUsed = counterQuestionCountRef.current[currentIdx] || 0;
        const safetyReached = roundsUsed >= SAFETY_MAX_FOLLOWUPS_PER_EPIC;
        const followUpGuidance = ctx?.followUpInstructions?.trim();
        const qs = allQuestionsRef.current;
        const remaining = qs.length - currentIdx - 1;
        // The model has no innate sense of how many topics are left, so left unchecked it
        // will happily spend the whole interview drilling into one — this is the missing
        // context that keeps its (deliberately uncapped) judgment well-informed.
        const pacingNote = `You are covering topic ${currentIdx + 1} of ${qs.length}${remaining > 0 ? ` (${remaining} more after this one)` : " (the last one)"}. Keep the interview moving — don't over-invest in one topic at the expense of the others.`;

        if (!safetyReached && durationMs != null && durationMs < HARD_ELABORATE_THRESHOLD_MS) {
          // Under 10s: elaboration is forced, not offered.
          requestForcedFollowUp(
            `The candidate's answer was very brief (under 10 seconds). Based specifically on what they just said, call ask_follow_up_question with ONE natural, targeted follow-up asking them to elaborate.${followUpGuidance ? ` Follow these guidelines from the interviewer's configuration: ${followUpGuidance}` : ""} ${pacingNote} ${ENGLISH_REMINDER}`
          );
          return;
        }

        const softNudge = !safetyReached && durationMs != null && durationMs < SOFT_ELABORATE_THRESHOLD_MS;
        const decisionInstructions = [
          softNudge ? `The candidate's answer was somewhat brief (under 30 seconds). Decide whether this topic has enough substance now, or whether one more targeted follow-up (ask_follow_up_question) would get meaningfully more useful information before moving on (advance_interview).` : "",
          pacingNote,
          followUpGuidance ? `Follow-up guidance from the interviewer's configuration: ${followUpGuidance}` : "",
          ENGLISH_REMINDER,
        ].filter(Boolean).join(" ");
        requestToolDecision({ kind: "decision", instructions: decisionInstructions, restrictTools: safetyReached });
      }

      // No embedded per-turn rules beyond what's passed in `instructions` — tool_choice
      // forces the model to choose among the allowed tools; it cannot free-speak past a
      // question. `kind` lets the response.done watchdog react correctly if this call fails.
      function requestToolDecision({ kind, instructions, restrictTools }: { kind: "decision" | "decision_retry"; instructions?: string; restrictTools?: boolean }) {
        const channel = dcRef.current;
        // Hard guard: never send response.create while one is already active. A race here
        // (e.g. a duplicate VAD/transcription event) is exactly what caused the Realtime API's
        // "conversation already has an active response in progress" error and the qIdx/UI
        // desync that followed it — the in-flight response's own chain already handles this.
        if (!channel || responseInProgressRef.current) return;
        responseInProgressRef.current = true;
        expectingToolCallRef.current = true;
        pendingKindRef.current = kind;
        channel.send(JSON.stringify({
          type: "response.create",
          response: {
            ...(instructions ? { instructions } : {}),
            ...(restrictTools ? { tools: ADVANCE_AND_OFFTOPIC_TOOLS } : {}),
            tool_choice: "required",
          },
        }));
      }

      function requestForcedFollowUp(instructions: string) {
        const channel = dcRef.current;
        if (!channel || responseInProgressRef.current) return;
        responseInProgressRef.current = true;
        expectingToolCallRef.current = true;
        pendingKindRef.current = "forced_elaborate";
        channel.send(JSON.stringify({
          type: "response.create",
          response: { instructions, tool_choice: { type: "function", name: "ask_follow_up_question" } },
        }));
      }

      function sendScriptedResponse(text: string) {
        const channel = dcRef.current;
        if (!channel || responseInProgressRef.current) return;
        responseInProgressRef.current = true;
        expectingToolCallRef.current = false;
        pendingKindRef.current = null;
        speechStartedAtRef.current = null;
        micBlockedForAiRef.current = true;
        applyMicEnabledState();
        channel.send(JSON.stringify({
          type: "response.create",
          response: { instructions: `Say exactly and only: "${text}"`, tool_choice: "none" },
        }));
      }

      // Speaks a Q&A answer, then the follow-up prompt. The answer was written by the model in
      // a tool call and is spoken in a second turn; wrapping the combined text in "say exactly
      // and only" proved fragile (quotes, longer answers) — the model could speak just the
      // closing question. Here the answer is the thing to say and the prompt is appended.
      function sendAnswerThenPrompt(answer: string, prompt: string) {
        const channel = dcRef.current;
        if (!channel || responseInProgressRef.current) return;
        responseInProgressRef.current = true;
        expectingToolCallRef.current = false;
        pendingKindRef.current = null;
        speechStartedAtRef.current = null;
        micBlockedForAiRef.current = true;
        applyMicEnabledState();
        channel.send(JSON.stringify({
          type: "response.create",
          response: {
            instructions: `Answer the candidate's question by saying the answer below out loud, in natural spoken words. Keep every fact and number in it — do not shorten it, skip it, or add anything new. Then, right after the answer, say exactly this and nothing more: "${prompt}"\n\nANSWER:\n${answer}\n\n${ENGLISH_REMINDER}`,
            tool_choice: "none",
          },
        }));
      }

      // For content that should be paraphrased, not recited verbatim (e.g. commitment step
      // narration). Never nest this instruction inside sendScriptedResponse's "say exactly and
      // only" wrapper — the two are contradictory and the model's fallback when confused was to
      // ignore the script entirely and improvise an interview question instead.
      function sendNaturalResponse(text: string) {
        const channel = dcRef.current;
        if (!channel || responseInProgressRef.current) return;
        responseInProgressRef.current = true;
        expectingToolCallRef.current = false;
        pendingKindRef.current = null;
        speechStartedAtRef.current = null;
        micBlockedForAiRef.current = true;
        applyMicEnabledState();
        channel.send(JSON.stringify({
          type: "response.create",
          response: {
            instructions: `Say the following, adapted naturally in your own words but keeping the same meaning — do not recite it verbatim, do not add anything else: "${text}" ${ENGLISH_REMINDER}`,
            tool_choice: "none",
          },
        }));
      }

      function sendAckThenQuestion(question: string) {
        const channel = dcRef.current;
        if (!channel || responseInProgressRef.current) return;
        responseInProgressRef.current = true;
        expectingToolCallRef.current = false;
        pendingKindRef.current = null;
        speechStartedAtRef.current = null;
        micBlockedForAiRef.current = true;
        applyMicEnabledState();
        currentAskedQuestionRef.current = question;
        channel.send(JSON.stringify({
          type: "response.create",
          response: {
            instructions: `Briefly and naturally react to what the candidate just said, in one short sentence — reference something specific from their answer, don't just fill space. NEVER use generic filler acknowledgments like "Got it," "Understood," "Noted," "Great," "Awesome," or any close variant — those sound like a canned prompt response, not a person listening. Do NOT comment on audio quality, interruptions, or completeness — that's already been decided; just react normally. Then ask this exact question, word-for-word with no changes: "${question}" ${ENGLISH_REMINDER}`,
            tool_choice: "none",
          },
        }));
      }

      // Phase 3 — Fluke Games Q&A. Grounded ONLY in the public company snapshot, plus the
      // commitment-model info when that phase was enabled for this interview.
      function requestOpenQaDecision() {
        const channel = dcRef.current;
        if (!channel || responseInProgressRef.current) return;
        responseInProgressRef.current = true;
        expectingToolCallRef.current = true;
        pendingKindRef.current = "decision";
        qaRoundsRef.current += 1;
        const safetyReached = qaRoundsRef.current > MAX_QA_ROUNDS;
        const grounding = [
          qaGroundingTextRef.current ? `Company information:\n${qaGroundingTextRef.current}` : "",
          ctx?.commitmentModalEnabled ? `Commitment model information:\n${COMMITMENT_INFO_TEXT}` : "",
        ].filter(Boolean).join("\n\n");
        channel.send(JSON.stringify({
          type: "response.create",
          response: {
            instructions: safetyReached
              ? `The candidate has asked several questions already — it's time to wrap up. Call conclude_qa now regardless of what they just said.`
              : `The candidate just responded to being asked if they have any questions for you. If they asked a real question, call answer_candidate_question and answer it using ONLY this information — never invent facts beyond it: ${grounding || "(No additional company information is available. If you can't answer from general public knowledge of Fluke Games, say politely that a team member will follow up with details.)"} If they asked about something the information doesn't cover, say politely that a team member will follow up with details. If they said no, declined, or gave any closing/negative response, call conclude_qa. ${ENGLISH_REMINDER}`,
            tools: safetyReached ? [CONCLUDE_QA_TOOL] : OPEN_QA_TOOLS,
            tool_choice: "required",
          },
        }));
      }

      // ── Phase 1: commitment model (only when commitmentModalEnabled) ──────────────────────
      function narrateCommitmentStep(idx: number) {
        // A queued step that fires after the phase moved on (e.g. Continue was clicked) must not speak.
        if (phaseRef.current !== "commitment_narration") return;
        setCommitmentUiStep(idx);
        const isLast = idx === COMMITMENT_STEPS.length - 1;
        const narration = COMMITMENT_STEPS[idx].narration;
        postScriptedActionRef.current = isLast ? askCommitmentQuestions : () => narrateCommitmentStep(idx + 1);
        sendNaturalResponse(narration);
      }

      // Narration done: the AI opens the commitment-only Q&A and the mic opens once it finishes.
      function askCommitmentQuestions() {
        if (phaseRef.current !== "commitment_narration") return;
        setPhase("commitment_qa");
        setCommitmentUiStep(COMMITMENT_STEPS.length);
        // Cleared when this prompt has finished being spoken (see the response.done handler);
        // the timeout is only a circuit breaker so Continue can never stay disabled forever.
        setCommitmentBusy(true);
        window.setTimeout(() => setCommitmentBusy(false), 30000);
        currentAskedQuestionRef.current = COMMITMENT_QUESTIONS_PROMPT;
        sendScriptedResponse(COMMITMENT_QUESTIONS_PROMPT);
      }

      function requestCommitmentQaDecision() {
        const channel = dcRef.current;
        if (!channel || responseInProgressRef.current) return;
        responseInProgressRef.current = true;
        expectingToolCallRef.current = true;
        pendingKindRef.current = "decision";
        commitmentQaRoundsRef.current += 1;
        // Capped so the model can't keep answering forever with no forced exit — that is exactly
        // what once left the interview stuck unable to reach the real questions.
        const safetyReached = commitmentQaRoundsRef.current > MAX_COMMITMENT_QA_ROUNDS;
        const elsewhere = ctx?.postSessionQAEnabled
          ? "that they're welcome to ask it at the end of the interview"
          : "that a team member can follow up on it";
        channel.send(JSON.stringify({
          type: "response.create",
          response: {
            instructions: safetyReached
              ? `The candidate has asked several questions about the commitment model already — it's time to move on to the actual interview. Call conclude_commitment_qa now regardless of what they just said.`
              : `The candidate just responded to being asked if they have questions about the commitment/vesting model that was just explained. Stay strictly on the commitment model. If they asked a real question about it, call answer_commitment_question and answer it using ONLY this information — never invent facts beyond it: ${COMMITMENT_INFO_TEXT}\nIf they asked about anything else (the role, the company, pay, the interview, or anything not in the information above), do NOT answer it: call answer_commitment_question with a brief, friendly reply saying that isn't covered here and ${elsewhere}. If they said no, that it makes sense, declined, or gave any closing/negative response, call conclude_commitment_qa. ${ENGLISH_REMINDER}`,
            tools: safetyReached ? [CONCLUDE_COMMITMENT_QA_TOOL] : COMMITMENT_QA_TOOLS,
            tool_choice: "required",
          },
        }));
      }

      // ── Phase 1 → 2 boundary ──────────────────────────────────────────────────────────────
      // Everything from the commitment phases is removed from the model's context and all
      // per-phase state is reset, so nothing in the interview can be "about" the commitment model.
      function enterInterviewPhase() {
        const ids = commitmentItemIdsRef.current;
        commitmentItemIdsRef.current = [];
        const dcNow = dcRef.current;
        if (dcNow) {
          ids.forEach((id, i) => {
            try {
              dcNow.send(JSON.stringify({ type: "conversation.item.delete", item_id: id, event_id: `commit_del_${Date.now()}_${i}` }));
            } catch {}
          });
        }
        setPhase("interview");
        setCommitmentUiStep(-1);
        setCommitmentBusy(false);
        clearEvalTimer();
        hasPendingAnswerRef.current = false;
        lastSegmentTextRef.current = "";
        pendingTranscriptsRef.current.clear();
        speechStartedAtRef.current = null;
        lastAnswerDurationMsRef.current = null;
        followUpCountRef.current = {};
        counterQuestionCountRef.current = {};
        const qs = allQuestionsRef.current;
        qIdxRef.current = 0;
        setQIdx(0);
        currentAskedQuestionRef.current = qs[0] || "";
        sendScriptedResponse(qs[0] || closingTextRef.current);
      }

      function startClosing() {
        setPhase("closing");
        sendScriptedResponse(closingTextRef.current);
      }

      // A tool-decision turn came back with no tool call (or errored). Recover per phase — the
      // interview's own fallback (advance) must never run for a Q&A phase.
      function recoverFromMissingToolCall(kind: "decision" | "forced_elaborate" | "decision_retry" | null) {
        const phase = phaseRef.current;
        if (phase === "commitment_qa") {
          // Nothing asked that could be answered → move on to the interview.
          enterInterviewPhase();
        } else if (phase === "company_qa") {
          startClosing();
        } else if (phase !== "interview") {
          // Stale: that phase already ended while this response was in flight.
        } else if (kind === "forced_elaborate") {
          // A forced ask_follow_up_question call didn't come through. Do NOT advance — qIdx must
          // not move while the candidate is still mid-answer on this topic. Retry once as an
          // open decision instead of a pinned single-function call.
          requestToolDecision({ kind: "decision_retry" });
        } else {
          // An open decision (or its retry) came back empty — safety net so a skip is never
          // silent. Advancing is the right fallback: the model already had the chance to choose
          // ask_follow_up_question and didn't take it.
          performAdvance(false);
        }
      }

      function performAdvance(seemsIncomplete: boolean) {
        if (phaseRef.current !== "interview") return;
        const qs = allQuestionsRef.current;
        const currentIdx = qIdxRef.current;

        if (seemsIncomplete && (followUpCountRef.current[currentIdx] || 0) < 1) {
          followUpCountRef.current[currentIdx] = (followUpCountRef.current[currentIdx] || 0) + 1;
          sendScriptedResponse(`${CLARIFY_PROMPT} ${currentAskedQuestionRef.current}`);
          return;
        }

        const nextIdx = currentIdx + 1;
        counterQuestionCountRef.current[currentIdx] = 0;
        if (nextIdx < qs.length) {
          qIdxRef.current = nextIdx;
          setQIdx(nextIdx);
          sendAckThenQuestion(qs[nextIdx]);
        } else if (ctx?.postSessionQAEnabled) {
          // All fixed questions done — phase 3. An open Q&A, not a rigid "any questions for me?"
          // list item, which is what caused the elaboration/clarify loop on short "no"s.
          setPhase("company_qa");
          qaRoundsRef.current = 0;
          qIdxRef.current = qs.length;
          setQIdx(qs.length);
          const prompt = ctx?.commitmentModalEnabled ? OPEN_QA_PROMPT_WITH_COMMITMENT : OPEN_QA_PROMPT;
          currentAskedQuestionRef.current = prompt;
          sendScriptedResponse(prompt);
        } else {
          qIdxRef.current = qs.length;
          setQIdx(qs.length);
          startClosing();
        }
      }

      function handleFunctionCall(fnCall: any) {
        const name = String(fnCall?.name || "");
        const callId = String(fnCall?.call_id || fnCall?.id || "");
        let args: any = {};
        try { args = JSON.parse(fnCall?.arguments || "{}"); } catch {}

        const channel = dcRef.current;
        if (!channel) return;

        // Acknowledge the tool call so the API doesn't consider the turn dangling. During the
        // commitment phases give our own item an id, so it can be deleted with the rest of them.
        const outputItem: any = { type: "function_call_output", call_id: callId, output: JSON.stringify({ ok: true }) };
        if (phaseRef.current === "commitment_qa") {
          outputItem.id = `fco_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
          commitmentItemIdsRef.current.push(outputItem.id);
        }
        channel.send(JSON.stringify({ type: "conversation.item.create", item: outputItem }));

        const phase = phaseRef.current;

        // Every branch below only acts in the phase it belongs to. A call that finished
        // generating after its phase ended is a stale echo — speaking it now would talk over
        // whatever comes next, so it's dropped rather than guessed into the wrong flow.
        if (name === "answer_commitment_question") {
          if (phase !== "commitment_qa") return;
          console.debug("[intake] commitment answer from model:", args);
          const answer = String(args?.answer || "").trim() || "I'm not able to answer that here, but a team member can follow up with you on it.";
          currentAskedQuestionRef.current = COMMITMENT_QUESTIONS_FOLLOWUP_PROMPT;
          // Busy stays true until this answer has finished being spoken.
          setCommitmentBusy(true);
          sendAnswerThenPrompt(answer, COMMITMENT_QUESTIONS_FOLLOWUP_PROMPT);
          return;
        }

        if (name === "conclude_commitment_qa") {
          if (phase === "commitment_qa") enterInterviewPhase();
          return;
        }

        if (name === "answer_candidate_question") {
          if (phase !== "company_qa") return;
          const answer = String(args?.answer || "").trim() || "I'm not certain about that, but a team member will follow up with you on it.";
          console.debug("[intake] company answer from model:", args);
          currentAskedQuestionRef.current = OPEN_QA_FOLLOWUP_PROMPT;
          sendAnswerThenPrompt(answer, OPEN_QA_FOLLOWUP_PROMPT);
          return;
        }

        if (name === "conclude_qa") {
          if (phase === "company_qa") startClosing();
          return;
        }

        // Interview tools — advance_interview, flag_off_topic, ask_follow_up_question.
        if (phase !== "interview") return;

        if (name === "flag_off_topic") {
          sendScriptedResponse(`${OFF_TOPIC_REDIRECT} ${currentAskedQuestionRef.current}`);
          return;
        }

        if (name === "ask_follow_up_question") {
          const currentIdx = qIdxRef.current;
          counterQuestionCountRef.current[currentIdx] = (counterQuestionCountRef.current[currentIdx] || 0) + 1;
          const followUp = String(args?.follow_up_question || "").trim() || CLARIFY_PROMPT;
          currentAskedQuestionRef.current = followUp;
          sendScriptedResponse(followUp);
          return;
        }

        performAdvance(!!args?.candidate_answer_seems_incomplete);
      }

      // "Continue" button in the commitment modal — only means "I have no more questions". It
      // works regardless of whether the AI is mid-speech (cancels the in-flight response first)
      // and always lands cleanly on Q1, the same destination as a spoken "no".
      continueFromCommitmentRef.current = () => {
        if (phaseRef.current !== "commitment_narration" && phaseRef.current !== "commitment_qa") return;
        const channel = dcRef.current;
        if (channel && responseInProgressRef.current) {
          suppressNextErrorRef.current = true;
          try { channel.send(JSON.stringify({ type: "response.cancel" })); } catch {}
        }
        responseInProgressRef.current = false;
        expectingToolCallRef.current = false;
        pendingKindRef.current = null;
        postScriptedActionRef.current = null;
        enterInterviewPhase();
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
      setErr(formatMediaError(e));
      setStatus("idle");
    }
  }

  function disconnect(invalidate = true) {
    if (invalidate) connectSeqRef.current += 1;
    clearEvalTimer();
    hasPendingAnswerRef.current = false;
    try { dcRef.current?.close(); } catch {}
    try { pcRef.current?.close(); } catch {}
    micRef.current?.getTracks().forEach((t) => t.stop());
    const el = audioElRef.current;
    if (el) { try { el.pause(); } catch {}; el.srcObject = null; }
    dcRef.current = null; pcRef.current = null; micRef.current = null;
    micSenderRef.current = null;
    continueFromCommitmentRef.current = () => {};
    suppressNextErrorRef.current = false;
    setAiSpeaking(false);
    stopMicAnalysis();
    stopAiAudioMonitor();
    if (invalidate) setStatus("idle");
  }

  function applyMicEnabledState() {
    const enabled = !micMutedRef.current && !micBlockedForAiRef.current;
    micRef.current?.getTracks().forEach((t) => { t.enabled = enabled; });
    // Physically stop transmitting the track while blocked, rather than trusting enabled=false
    // alone to suppress it server-side.
    const sender = micSenderRef.current;
    if (sender) {
      const micTrack = micRef.current?.getAudioTracks()[0] || null;
      try { sender.replaceTrack(enabled ? micTrack : null); } catch {}
    }
  }

  function toggleMic() {
    const newMuted = !micMuted;
    micMutedRef.current = newMuted;
    applyMicEnabledState();
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
        body: JSON.stringify({ token: intakeToken, answers: answersRef.current, conversation: conversationRef.current, ...(fb ? { feedback: fb } : {}) }),
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
    <div style={{ ...page, alignItems: "center", justifyContent: "center", gap: 16, padding: 24, overflowY: "auto", position: "relative" }}>
      {err && (
        <div style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 9999,
          maxWidth: "min(900px, calc(100vw - 24px))",
          padding: "10px 16px",
          borderRadius: 12,
          background: "rgba(220,38,38,0.95)",
          color: "#fff",
          boxShadow: "0 14px 32px rgba(0,0,0,0.35)",
          textAlign: "center",
          fontSize: 13,
          lineHeight: 1.4,
        }}>
          {err}
        </div>
      )}
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
    const panelStyle: React.CSSProperties = {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: 14,
    };
    const selectStyle: React.CSSProperties = {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 12,
      background: "#f7f7fb",
      color: "#111827",
      border: "1px solid rgba(255,255,255,0.2)",
      fontSize: 13,
    };
    return (
      <div style={{ ...page, overflowY: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
          <img src="https://flukegameassets.s3.amazonaws.com/logo.png" alt="Fluke Games" style={{ height: 28 }} />
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{ctx.label}{jobTitle && ` · ${jobTitle}`}</span>
          <div style={{ width: 60 }} />
        </div>

        {deviceStep === 1 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", gap: 16, minHeight: "calc(100vh - 128px)" }}>
            <div style={{ width: "100%", maxWidth: 760, ...panelStyle, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.8px", color: "rgba(255,255,255,0.62)" }}>Device Setup</div>
                  <div style={{ marginTop: 4, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Pick your mic and camera before continuing.</div>
                </div>
                <button
                  onClick={() => refreshDevices()}
                  style={{ width: 36, height: 36, borderRadius: 12, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.06)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  title="Refresh devices"
                >
                  ↻
                </button>
              </div>

            <div style={{ borderRadius: 18, overflow: "hidden", background: "#111", minHeight: 260, position: "relative", border: "1px solid rgba(255,255,255,0.06)" }}>
              <video ref={previewRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 260, background: "linear-gradient(180deg,#111,#1b1b24)", transform: "scaleX(-1)" }} />
              <div style={{ position: "absolute", left: 12, top: 12, padding: "5px 9px", borderRadius: 999, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 10, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                Device preview
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
              <div style={panelStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.8px", color: "rgba(255,255,255,0.65)", marginBottom: 8 }}>🎙️ Microphone</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.58)", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Current: {audioDevices.find((d) => d.deviceId === audioDeviceId)?.label || "Choose microphone"}
                </div>
                <select
                  value={audioDeviceId}
                  onChange={(e) => setAudioDeviceId(e.target.value)}
                  style={{ ...selectStyle, width: "100%", appearance: "auto" }}
                >
                  {audioDevices.length === 0 && <option value="">No microphone listed yet</option>}
                  {audioDevices.map((d) => (
                    <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
                  ))}
                </select>
              </div>
              <div style={panelStyle}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.8px", color: "rgba(255,255,255,0.65)", marginBottom: 8 }}>📷 Camera</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.58)", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Current: {videoDevices.find((d) => d.deviceId === videoDeviceId)?.label || "Choose camera"}
                </div>
                <select
                  value={videoDeviceId}
                  onChange={(e) => setVideoDeviceId(e.target.value)}
                  style={{ ...selectStyle, width: "100%", appearance: "auto" }}
                >
                  {videoDevices.length === 0 && <option value="">No camera listed yet</option>}
                  {videoDevices.map((d) => (
                    <option key={d.deviceId} value={d.deviceId}>{d.label}</option>
                  ))}
                </select>
              </div>
            </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <button onClick={() => setDeviceStep(2)} style={{ padding: "11px 18px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 6px 18px rgba(99,102,241,0.3)" }}>
                  Next →
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", gap: 28 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 16px" }}>🤖</div>
              <h2 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, color: "#fff" }}>
                {ctx.label}{jobTitle && <span style={{ color: "#a78bfa" }}> · {jobTitle}</span>}
              </h2>
              {ctx.description && <p style={{ margin: "0 0 10px", color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.5, maxWidth: 380 }}>{ctx.description}</p>}
              {allQuestions.length > 0 && <span style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: "rgba(99,102,241,0.18)", border: "1px solid rgba(99,102,241,0.3)", color: "#a5b4fc", fontSize: 12, fontWeight: 700 }}>{allQuestions.length} question{allQuestions.length !== 1 ? "s" : ""}</span>}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, width: "100%", maxWidth: 520 }}>
              {tips.map((tip, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>{tip.icon}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{tip.text}</span>
                </div>
              ))}
            </div>

            <button onClick={() => connect(audioDeviceId)} style={{ padding: "14px 48px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.4)", letterSpacing: "0.3px" }}>
              Join Call →
            </button>

            {err && (
              <div style={{ width: "100%", maxWidth: 520, padding: "10px 16px", borderRadius: 10, background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.25)", color: "#fca5a5", fontSize: 13, textAlign: "center", lineHeight: 1.5 }}>
                {err}
              </div>
            )}
          </div>
        )}
        <style>{`@keyframes ripple-out{0%{transform:scale(1);opacity:.65}100%{transform:scale(3.2);opacity:0}}`}</style>
      </div>
    );
  }

  return (
    <div style={page}>
      {connected && (
        <CommitmentPreviewModal
          activeStep={commitmentUiStep}
          onContinue={() => continueFromCommitmentRef.current()}
          busy={commitmentBusy}
        />
      )}

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
      <div className="vi-call-row" style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

        {/* AI tile */}
        <div className="vi-ai-tile" style={{
          flex: 1, aspectRatio: "16/9",
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
        <div className="vi-user-tile" style={{ aspectRatio: "4/3", background: "#111", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
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
