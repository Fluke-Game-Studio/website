// src/pages/CareersApply.tsx
import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Controller (Business Logic)
import { useApplicationController } from "../controllers/applicationController";
import PremiumLoader from "../components/PremiumLoader";
import { googlePrefillService, type GooglePrefillUser } from "../services/googlePrefillService";
import "../styles/careers.css";

declare global {
  interface Window {
    google?: any;
    onSignIn?: (googleUser: any) => void;
    fgGoogleSignIn?: () => void;
  }
}

// --- Field Renderers --------------------------------------------------------

interface FieldInputProps {
  field: any;
  value: any;
  onChange: (key: string, value: any) => void;
  hasError?: boolean;
  answers: Record<string, any>;
  disabled?: boolean;
}

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia", "DR Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Other"
];

const REGIONAL_STATES: Record<string, string[]> = {
  "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
  "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
  "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"],
  "Australia": ["New South Wales", "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"]
};

const FieldInput: React.FC<FieldInputProps> = ({ field, value, onChange, hasError, answers, disabled }) => {
  const className = `careers-apply-form-input ${hasError ? "has-error" : ""}`;

  if (field.type === "textarea") {
    return (
      <textarea
        className={className}
        id={field.id}
        value={value || ""}
        onChange={(e) => onChange(field.id, e.target.value)}
        placeholder={field.placeholder}
        required={field.required}
        disabled={disabled}
        rows={5}
        style={{ resize: "none", display: "block", width: "100%" }}
      />
    );
  }

  if (field.type === "country") {
    return (
      <div style={{ position: "relative" }}>
        <select
          className={className}
          id={field.id}
          value={value || ""}
          onChange={(e) => onChange(field.id, e.target.value)}
          required={field.required}
          disabled={disabled}
          autoComplete="country-name"
          style={{
            width: "100%",
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23F5C542' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "calc(100% - 1rem)",
            backgroundPositionY: "center",
            paddingRight: "2.5rem"
          }}
        >
          <option value="">Select {field.label || "Country"}</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "state") {
    // Look for any field that might be 'country' to filter states
    const selectedCountry = Object.entries(answers).find(([k]) => k.toLowerCase().includes("country"))?.[1];
    const states = selectedCountry ? REGIONAL_STATES[selectedCountry] : null;

    if (states) {
      return (
        <div style={{ position: "relative" }}>
          <select
            className={className}
            id={field.id}
            value={value || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            required={field.required}
            disabled={disabled}
            autoComplete="address-level1"
            style={{
              width: "100%",
              appearance: "none",
              backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='%23F5C542' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`,
              backgroundRepeat: "no-repeat",
              backgroundPositionX: "calc(100% - 1rem)",
              backgroundPositionY: "center",
              paddingRight: "2.5rem"
            }}
          >
            <option value="">Select {field.label || "State/Province"}</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }

  if (field.type === "radio" && field.options?.length) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {field.options.map((opt: string) => (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              cursor: "pointer",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid var(--cs-border)",
              background:
                value === opt ? "rgba(255, 215, 0, 0.05)" : "transparent",
              borderColor:
                value === opt ? "var(--gold-primary)" : "var(--cs-border)",
              color: "var(--cs-text)",
              transition: "all 0.2s ease",
            }}
          >
            <input
              type="radio"
              name={field.id}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(field.id, opt)}
              required={field.required}
              disabled={disabled}
              style={{ accentColor: "var(--gold-primary)" }}
            />
            <span
              style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
    );
  }

  if (field.type === "checkbox" && field.options?.length) {
    const checked = Array.isArray(value) ? value : [];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        {field.options.map((opt: string) => (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.8rem",
              cursor: "pointer",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid var(--cs-border)",
              background: checked.includes(opt)
                ? "rgba(255, 215, 0, 0.05)"
                : "transparent",
              borderColor: checked.includes(opt)
                ? "var(--gold-primary)"
                : "var(--cs-border)",
              color: "var(--cs-text)",
              transition: "all 0.2s ease",
            }}
          >
            <input
              type="checkbox"
              value={opt}
              checked={checked.includes(opt)}
              onChange={(e) => {
                const next = e.target.checked
                  ? [...checked, opt]
                  : checked.filter((v) => v !== opt);
                onChange(field.id, next);
              }}
              disabled={disabled}
              style={{ accentColor: "var(--gold-primary)" }}
            />
            <span
              style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem" }}
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
    );
  }

  return (
    <input
      className={className}
      id={field.id}
      type={field.type === "tel" ? "tel" : field.type === "email" ? "email" : "text"}
      value={value || ""}
      onChange={(e) => onChange(field.id, e.target.value)}
      placeholder={field.placeholder}
      required={field.required}
      disabled={disabled}
      autoComplete={
        field.type === "address" ? "street-address" :
        field.type === "city" ? "address-level2" :
        field.type === "email" ? "email" :
        field.type === "tel" ? "tel" :
        field.id.toLowerCase().includes("name") ? "name" :
        undefined
      }
      style={{ width: "100%" }}
    />
  );
};

interface ApplyFieldProps {
  field: any;
  value: any;
  onChange: (key: string, value: any) => void;
  answers: Record<string, any>;
  error?: string;
  whatsappError?: string;
  locked?: boolean;
}

function isPhoneField(field: any) {
  const key = String(field?.key || field?.id || "").toLowerCase();
  return field?.type === "tel" || key.includes("phone") || key.includes("mobile");
}

const ApplyField: React.FC<ApplyFieldProps> = ({ field, value, onChange, answers, error, whatsappError, locked }) => {
  const isVolunteerAck = field.id === 'ackVolunteer';

  if (isVolunteerAck) {
    return (
      <div className="careers-form-note">
        <span className="note-label">Acknowledgment & Stipend Policy</span>
        <p>{field.label}</p>
        <div style={{ marginTop: "1.5rem" }}>
          <FieldInput field={field} value={value} onChange={onChange} answers={answers} hasError={!!error} disabled={locked} />
          {error && (
            <div className="careers-form-error-msg">{error}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <label className="careers-apply-label" htmlFor={field.id}>
        {field.label}
        {field.required && (
          <span style={{ color: "var(--gold-primary)" }}> *</span>
        )}
      </label>
      {field.helpText && (
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--cs-muted)",
            marginBottom: "0.8rem",
            fontFamily: "var(--font-body)",
          }}
        >
          {field.helpText}
        </p>
      )}
      <FieldInput field={field} value={value} onChange={onChange} answers={answers} hasError={!!error} />
      {locked && (
        <p style={{ marginTop: "0.55rem", color: "var(--cs-muted)", fontSize: "0.82rem", fontFamily: "var(--font-body)" }}>
          Filled from Google sign-in.
        </p>
      )}
      {isPhoneField(field) && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            borderRadius: "8px",
            border: "1px solid var(--cs-border)",
            background: "rgba(255, 255, 255, 0.03)",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "0.8rem",
              cursor: "pointer",
              color: "var(--cs-text)",
              fontFamily: "var(--font-body)",
              lineHeight: 1.45,
            }}
          >
            <input
              type="checkbox"
              checked={!!answers.whatsappOptIn}
              onChange={(e) => onChange("whatsappOptIn", e.target.checked)}
              style={{ accentColor: "var(--gold-primary)", marginTop: "0.2rem" }}
            />
            <span>
              I consent to receiving application updates and communication on WhatsApp.
              <small
                style={{
                  display: "block",
                  marginTop: "0.45rem",
                  color: "var(--cs-muted)",
                  fontSize: "0.82rem",
                }}
              >
                We will only use your number for updates related to this application, such as interview scheduling or status.
              </small>
            </span>
          </label>
          {whatsappError && (
            <div className="careers-form-error-msg">{whatsappError}</div>
          )}
        </div>
      )}
      {error && (
        <div className="careers-form-error-msg">{error}</div>
      )}
    </div>
  );
};

// --- Chapter ----------------------------------------------------------------

interface ChapterProps {
  chapter: any;
  answers: any;
  setAnswer: (key: string, value: any) => void;
  chapterIndex: number;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  locked: Record<string, boolean>;
}

const Chapter: React.FC<ChapterProps> = ({
  chapter,
  answers,
  setAnswer,
  chapterIndex,
  errors,
  touched,
  locked,
}) => (
  <motion.div
    key={chapterIndex}
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
  >
    <h2
      style={{
        fontSize: "1.8rem",
        color: "var(--cs-text)",
        marginBottom: "1rem",
        fontFamily: "var(--font-heading)",
      }}
    >
      {chapter.title}
    </h2>
    <p
      style={{
        color: "var(--cs-muted)",
        marginBottom: "2.5rem",
        fontFamily: "var(--font-body)",
        lineHeight: 1.6,
      }}
    >
      {chapter.description}
    </p>

    {chapter.fields.map((field: any) => {
      const isTouched = touched[field.id];
      const hasValue = answers[field.id] !== undefined && answers[field.id] !== "" && !(Array.isArray(answers[field.id]) && answers[field.id].length === 0);
      const shouldShowError = errors[field.id] && (isTouched || hasValue);
      return (
        <ApplyField
          key={field.id}
          field={field}
          value={answers[field.id]}
          onChange={setAnswer}
          answers={answers}
          error={shouldShowError ? errors[field.id] : undefined}
          whatsappError={isPhoneField(field) ? errors.whatsappOptIn : undefined}
          locked={!!locked[field.id]}
        />
      );
    })}
  </motion.div>
);

function GooglePrefillGate({
  open,
  googleUser,
  onSignedIn,
  onSkip,
}: {
  open: boolean;
  googleUser: GooglePrefillUser | null;
  onSignedIn: (user: GooglePrefillUser) => void;
  onSkip: () => void;
}) {
  const buttonRef = React.useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    window.onSignIn = (legacyGoogleUser: any) => {
      try {
        const profile = legacyGoogleUser?.getBasicProfile?.();
        const user = profile
          ? {
              name: profile.getName?.() || "",
              email: profile.getEmail?.() || "",
              imageUrl: profile.getImageUrl?.() || "",
            }
          : null;
        if (user?.email) onSignedIn(user);
      } catch {}
    };

    window.fgGoogleSignIn = () => {
      const container = buttonRef.current?.querySelector("div[role='button']") as HTMLElement | null;
      container?.click();
    };
  }, [onSignedIn]);

  React.useEffect(() => {
    if (!open || googleUser?.email) return;

    let cancelled = false;
    let tries = 0;
    const clientId = googlePrefillService.getClientId();

    const render = () => {
      if (cancelled) return;
      if (!clientId) {
        setError("Google sign-in is not configured.");
        return;
      }

      if (!window.google?.accounts?.id || !buttonRef.current) {
        tries += 1;
        if (tries > 40) {
          setError("Google sign-in could not load. You can still continue without it.");
          return;
        }
        window.setTimeout(render, 150);
        return;
      }

      try {
        buttonRef.current.innerHTML = "";
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: any) => {
            const user = googlePrefillService.userFromCredential(response?.credential || "");
            if (user?.email) onSignedIn(user);
          },
        });
        window.google.accounts.id.renderButton(buttonRef.current, {
          theme: "outline",
          size: "large",
          type: "standard",
          text: "signin_with",
          shape: "rectangular",
          logo_alignment: "left",
        });
        setReady(true);
        setError("");
      } catch {
        setError("Google sign-in could not initialize. You can still continue without it.");
      }
    };

    render();
    return () => {
      cancelled = true;
    };
  }, [open, googleUser?.email, onSignedIn]);

  if (!open || googleUser?.email) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Prefill your application"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        display: "grid",
        placeItems: "center",
        padding: "1.5rem",
        background: "rgba(0,0,0,0.68)",
        backdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        style={{
          width: "min(520px, 100%)",
          borderRadius: "16px",
          border: "1px solid var(--cs-border)",
          background: "var(--cs-surface)",
          color: "var(--cs-text)",
          padding: "1.5rem",
          boxShadow: "0 24px 80px rgba(0,0,0,0.42)",
        }}
      >
        <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.35rem" }}>
          Prefill your application
        </h2>
        <p style={{ marginTop: "0.8rem", color: "var(--cs-muted)", lineHeight: 1.65, fontFamily: "var(--font-body)" }}>
          Sign in with Google to auto-fill your name and email. You can still proceed without signing in.
        </p>

        <div style={{ marginTop: "1.25rem", minHeight: 44, display: "flex", alignItems: "center" }}>
          <div ref={buttonRef} />
          {!ready && !error && (
            <span style={{ color: "var(--cs-muted)", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
              Loading Google sign-in...
            </span>
          )}
        </div>

        {error && (
          <p style={{ color: "#ff8a80", marginTop: "0.9rem", fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>
            {error}
          </p>
        )}

        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end", gap: "0.8rem", flexWrap: "wrap" }}>
          <button type="button" className="btn-outline" onClick={onSkip}>
            Skip for now
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// --- Main Component ---------------------------------------------------------

const CareersApply: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roleTitle = searchParams.get("roleTitle");

  const {
    flow,
    loading,
    error,
    currentChapter,
    nextChapter,
    prevChapter,
    answers,
    setAnswer,
    validateChapter,
    getFieldErrors,
    touched,
    locked,
    googleUser,
    applyGoogleUser,
    skipGooglePrefill,
    isGooglePopupDismissed,
    isSubmitting,
    isSubmitted,
    submitError,
    submit,
  } = useApplicationController(roleTitle);

  const [googleGateOpen, setGoogleGateOpen] = React.useState(() => !googlePrefillService.isPopupDismissed());

  React.useEffect(() => {
    if (googleUser?.email) setGoogleGateOpen(false);
  }, [googleUser?.email]);

  React.useEffect(() => {
    if (!googleUser?.email && !isGooglePopupDismissed()) setGoogleGateOpen(true);
  }, [googleUser?.email, isGooglePopupDismissed]);

  if (loading) {
    return (
      <div className="careers-standalone-wrapper flex items-center justify-center" style={{ minHeight: "60vh" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-fluke-yellow border-t-transparent rounded-full animate-spin" />
          <p className="text-fluke-muted animate-pulse font-medium tracking-widest uppercase text-xs">Loading Application...</p>
        </div>
      </div>
    );
  }

  if (error || !flow) {
    return (
      <div className="careers-standalone-wrapper">
        <div className="careers-error" style={{ height: "60vh" }}>
          <p>{error || "Application flow could not be created."}</p>
          <Link to="/careers" className="btn-gold" style={{ marginTop: "2rem" }}>
            Return to Careers
          </Link>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="careers-standalone-wrapper py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h1
              style={{
                fontSize: "3.5rem",
                marginBottom: "1.5rem",
                color: "var(--gold-primary)",
              }}
            >
              Application Received
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--cs-text)",
                marginBottom: "3rem",
                fontFamily: "var(--font-body)",
              }}
            >
              Thank you for your interest in joining Fluke Games. We've received
              your application and will review it shortly.
            </p>
            <Link to="/careers" className="btn-gold">
              Full Circle — Return Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const chapter = flow.chapters[currentChapter];
  const isFirst = currentChapter === 0;
  const isLast = currentChapter === flow.chapters.length - 1;
  const isValid = validateChapter(chapter);

  return (
    <div className="careers-standalone-wrapper py-32">
      <GooglePrefillGate
        open={googleGateOpen && !googleUser?.email}
        googleUser={googleUser}
        onSignedIn={(user) => {
          applyGoogleUser(user);
          setGoogleGateOpen(false);
        }}
        onSkip={() => {
          skipGooglePrefill();
          setGoogleGateOpen(false);
        }}
      />
      <div className="max-w-3xl mx-auto px-6">
        <header style={{ marginBottom: "4rem" }}>
          <span className="phi-label">
            Portal — Step {currentChapter + 1} of {flow.chapters.length}
          </span>
          <h1 className="job-detail__title text-5xl mb-4">
            Applying for
            <br />
            {flow.roleTitle}
          </h1>
        </header>

        <div style={{ position: "relative" }}>
          <AnimatePresence mode="wait">
            <Chapter
              key={currentChapter}
              chapter={chapter}
              chapterIndex={currentChapter}
              answers={answers}
              setAnswer={setAnswer}
              errors={getFieldErrors(chapter)}
              touched={touched}
              locked={locked}
            />
          </AnimatePresence>

          {submitError && (
            <p
              style={{
                color: "#ff4d4d",
                marginTop: "2rem",
                textAlign: "center",
                fontFamily: "var(--font-body)",
              }}
            >
              {submitError}
            </p>
          )}

          <footer
            style={{
              marginTop: "4rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1.5rem",
              borderTop: "1px solid var(--cs-border)",
              paddingTop: "2rem",
            }}
          >
            {!isFirst ? (
              <button
                onClick={prevChapter}
                className="btn-outline"
                style={{ flex: 1 }}
              >
                ? Previous
              </button>
            ) : (
              <div style={{ flex: 1 }} />
            )}

            {!isLast ? (
              <button
                onClick={nextChapter}
                disabled={!isValid}
                className="btn-gold"
                style={{ flex: 1, opacity: isValid ? 1 : 0.4 }}
              >
                Continue ?
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={!isValid || isSubmitting}
                className="btn-gold"
                style={{
                  flex: 1,
                  opacity: isValid && !isSubmitting ? 1 : 0.4,
                }}
              >
                {isSubmitting ? "Transmitting…" : "Submit Application ?"}
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
};

export default CareersApply;


