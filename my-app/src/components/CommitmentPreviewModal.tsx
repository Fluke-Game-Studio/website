export type CommitmentStepData = {
  title: string;
  narration: string;
  details: string[];
};

// Read-only preview of the same commitment/vesting model explained in arcade's onboarding
// CommitmentStep.tsx — deliberately no payment/wallet step here. That only happens after
// someone is actually hired, during onboarding, never during the interview.
export const COMMITMENT_STEPS: CommitmentStepData[] = [
  {
    title: "Why we collect commitment funds",
    narration:
      "First, let's talk about why we collect commitment funds. The commitment creates a starting frozen balance that's tied to real participation. It's a one-to-one starting record in your wallet, before weekly release math kicks in. Diligent weekly updates let that released value grow over time, so your original commitment can be earned back, and more.",
    details: [
      "Commitment money is the starting pool held back as Frozen FGC.",
      "It's a 1:1 starting record in the wallet model, before weekly release math is applied.",
      "Diligent weekly updates can let the released value grow over time, so the original commitment can be earned back and more.",
    ],
  },
  {
    title: "How money becomes credits",
    narration:
      "Next, here's how that money becomes spendable credits. At intake, your commitment is recorded as Frozen FGC. Weekly release starts at 5% of the remaining frozen balance, and increases by 2.5% each successful streak week. So a 1,000 commitment releases 50 FGC in week one, then about 71 in week two, then about 93 in week three, if the streak continues.",
    details: [
      "At intake, the commitment amount is recorded as Frozen FGC in the wallet ledger.",
      "Weekly release starts at 5% of the remaining frozen balance and increases by 2.5% each successful streak week.",
      "Example: a 1,000 commitment releases 50 FGC in week 1, 71.25 FGC in week 2, and 92.87 FGC in week 3 if the streak continues.",
    ],
  },
  {
    title: "Earn and spend path",
    narration:
      "Finally, the earn and spend path. Weekly updates add Frozen FGC first — 20 for the update, 20 for retro, and 10 for timesheet. Awards and bonuses also go to Frozen FGC by default. Spendable FGC is the released balance you can use in the Fluke Store, while Frozen FGC stays locked until vesting rules release it. And to be clear — the actual commitment payment itself only happens after you're hired, during onboarding, never during this interview.",
    details: [
      "Weekly update credits create Frozen FGC first: 20 FGC for the update, 20 FGC for retro, and 10 FGC for timesheet.",
      "Awards, achievements, and onboarding bonuses also go to Frozen FGC unless stated otherwise.",
      "Spendable FGC is used in the Fluke Store; Frozen FGC stays locked until vesting or program completion rules apply.",
      "The actual commitment payment only happens after you're hired, during onboarding.",
    ],
  },
];

// Talk-mode only — no typed chat. Candidate asks out loud, or clicks Continue.
export const COMMITMENT_QUESTIONS_PROMPT =
  "Does that make sense so far? Do you have any questions about how commitment and vesting work — feel free to ask me out loud.";
export const COMMITMENT_QUESTIONS_FOLLOWUP_PROMPT = "Any other questions about the commitment model?";

type Props = {
  // -1 hidden, 0..COMMITMENT_STEPS.length-1 = currently-narrating step, length = "questions" phase
  activeStep: number;
  onContinue: () => void;
  // True while a question the candidate just asked is being processed/answered. Continue is
  // disabled the whole time — it's only ever meant to mean "I have no more questions," not "skip
  // whatever's being answered right now."
  busy: boolean;
};

export default function CommitmentPreviewModal({ activeStep, onContinue, busy }: Props) {
  if (activeStep < 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 5000,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 640,
          maxHeight: "88vh",
          overflowY: "auto",
          background: "#111",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 24,
          color: "#eaeaea",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Commitment &amp; Vesting Model</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20, lineHeight: 1.5 }}>
          A quick walkthrough before we continue the interview — this is informational only, no payment happens here.
        </div>

        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          {COMMITMENT_STEPS.map((step, i) => {
            const isActive = activeStep === i;
            const isPast = activeStep > i;
            return (
              <div
                key={step.title}
                style={{
                  borderRadius: 14,
                  border: isActive ? "1px solid rgba(99,102,241,0.5)" : "1px solid rgba(255,255,255,0.08)",
                  background: isActive ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.03)",
                  padding: 14,
                  opacity: isPast || isActive ? 1 : 0.45,
                  transition: "opacity 0.3s ease, border-color 0.3s ease, background 0.3s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isActive ? "#6366f1" : "rgba(255,255,255,0.1)",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{step.title}</div>
                  {isActive && <span style={{ marginLeft: "auto", fontSize: 11, color: "#a5b4fc" }}>● speaking</span>}
                </div>
                {(isActive || isPast) && (
                  <div style={{ marginTop: 10, paddingLeft: 36, display: "grid", gap: 6 }}>
                    {step.details.map((d) => (
                      <div key={d} style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>
                        • {d}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {activeStep >= COMMITMENT_STEPS.length && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 12, lineHeight: 1.5 }}>
              {busy
                ? "Answering your question…"
                : "Ask out loud if you have any questions, or continue once you have none left."}
            </div>
            <button
              onClick={onContinue}
              disabled={busy}
              style={{
                width: "100%",
                padding: "12px 0",
                borderRadius: 10,
                border: "none",
                background: busy ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                color: busy ? "rgba(255,255,255,0.35)" : "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: busy ? "not-allowed" : "pointer",
              }}
            >
              {busy ? "Waiting for answer…" : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
