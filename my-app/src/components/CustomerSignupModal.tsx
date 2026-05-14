import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { customerApi } from "../services/customerApi";
import { googlePrefillService } from "../services/googlePrefillService";
import { useCustomerAuth } from "../auth/CustomerAuthContext";

declare global {
  interface Window {
    google?: any;
  }
}

type Props = { open: boolean; onClose: () => void };

export default function CustomerSignupModal({ open, onClose }: Props) {
  const { login } = useCustomerAuth();
  const googleRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState<"form" | "otp" | "done">("form");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [googleSub, setGoogleSub] = useState("");
  const [form, setForm] = useState({
    full_name: "",
    mobile: "",
    email: "",
    password: "",
    confirm_password: "",
    consent_marketing: false,
    consent_newsletter: false,
  });
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!open || !googleRef.current) return;
    if (!window.google?.accounts?.id) return;
    window.google.accounts.id.initialize({
      client_id: googlePrefillService.getClientId(),
      callback: (resp: any) => {
        const user = googlePrefillService.userFromCredential(resp?.credential || "");
        const payload = (() => {
          try {
            const p = String(resp?.credential || "").split(".")[1] || "";
            return JSON.parse(atob(p.replace(/-/g, "+").replace(/_/g, "/")));
          } catch {
            return null;
          }
        })();
        if (user) {
          setForm((s) => ({ ...s, full_name: user.name || s.full_name, email: user.email || s.email }));
        }
        setGoogleSub(String(payload?.sub || ""));
      },
    });
    googleRef.current.innerHTML = "";
    window.google.accounts.id.renderButton(googleRef.current, { theme: "outline", size: "large", text: "signup_with" });
  }, [open]);

  async function submitEmailOtp(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setMsg("");
    if (form.password !== form.confirm_password) {
      setErr("Password and confirm password do not match.");
      return;
    }
    try {
      await customerApi.signupStart({
        full_name: form.full_name,
        mobile: form.mobile,
        email: form.email,
        password: form.password,
        consent_marketing: form.consent_marketing,
        consent_newsletter: form.consent_newsletter,
      });
      setStep("otp");
      setMsg("Verification code sent to your email.");
    } catch (e: any) {
      setErr(e?.message || "Failed to start signup");
    }
  }

  async function submitOtp(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    try {
      await customerApi.signupVerify({ email: form.email, otp });
      await login(form.email, form.password);
      setStep("done");
      setMsg("Email verified. Your customer profile is created.");
      setTimeout(() => onClose(), 700);
    } catch (e: any) {
      setErr(e?.message || "OTP verification failed");
    }
  }

  async function submitGoogle() {
    setErr("");
    if (!googleSub) {
      setErr("Sign in with Google first.");
      return;
    }
    if (form.password !== form.confirm_password) {
      setErr("Password and confirm password do not match.");
      return;
    }
    try {
      await customerApi.signupGoogle({
        full_name: form.full_name,
        mobile: form.mobile,
        email: form.email,
        password: form.password,
        google_sub: googleSub,
        consent_marketing: form.consent_marketing,
        consent_newsletter: form.consent_newsletter,
      });
      await login(form.email, form.password);
      setStep("done");
      setMsg("Google verified. Your customer profile is created.");
      setTimeout(() => onClose(), 700);
    } catch (e: any) {
      setErr(e?.message || "Google signup failed");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75" onClick={onClose} />
      <div className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#0b0f14] p-5">
        <button onClick={onClose} className="absolute right-3 top-3 rounded-lg border border-white/20 p-1"><X size={16} /></button>
        <h2 className="text-xl font-bold">Customer Sign Up</h2>
        {msg ? <div className="text-green-400 text-sm mt-2">{msg}</div> : null}
        {err ? <div className="text-red-400 text-sm mt-2">{err}</div> : null}

        {step === "form" && (
          <form onSubmit={submitEmailOtp} className="grid gap-3 mt-4">
            <input required placeholder="Full name" className="rounded-lg border border-white/20 bg-black/30 px-3 py-2" value={form.full_name} onChange={(e) => setForm((s) => ({ ...s, full_name: e.target.value }))} />
            <input required placeholder="Mobile number" className="rounded-lg border border-white/20 bg-black/30 px-3 py-2" value={form.mobile} onChange={(e) => setForm((s) => ({ ...s, mobile: e.target.value }))} />
            <input required type="email" placeholder="Email" className="rounded-lg border border-white/20 bg-black/30 px-3 py-2" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
            <input required type="password" placeholder="Create password" className="rounded-lg border border-white/20 bg-black/30 px-3 py-2" value={form.password} onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))} />
            <input required type="password" placeholder="Confirm password" className="rounded-lg border border-white/20 bg-black/30 px-3 py-2" value={form.confirm_password} onChange={(e) => setForm((s) => ({ ...s, confirm_password: e.target.value }))} />
            <label className="text-sm flex items-start gap-2"><input type="checkbox" checked={form.consent_marketing} onChange={(e) => setForm((s) => ({ ...s, consent_marketing: e.target.checked }))} style={{width: "1.2rem", height: "1.2rem", cursor: "pointer", accentColor: "var(--fluke-yellow)"}} /> Consent to send marketing announcements and opportunities on email and WhatsApp</label>
            <label className="text-sm flex items-start gap-2"><input type="checkbox" checked={form.consent_newsletter} onChange={(e) => setForm((s) => ({ ...s, consent_newsletter: e.target.checked }))} style={{width: "1.2rem", height: "1.2rem", cursor: "pointer", accentColor: "var(--fluke-yellow)"}} /> Consent to send newsletter through email</label>
            <button type="submit" className="btn-primary rounded-lg px-4 py-2">Send OTP</button>
            <div className="text-xs text-fluke-muted mt-1">or sign up with Google</div>
            <div ref={googleRef} />
            <button type="button" onClick={submitGoogle} className="btn-outline rounded-lg px-4 py-2">Continue with Google</button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={submitOtp} className="grid gap-3 mt-4">
            <input required placeholder="Enter 6-digit OTP" className="rounded-lg border border-white/20 bg-black/30 px-3 py-2" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <button type="submit" className="btn-primary rounded-lg px-4 py-2">Verify Email</button>
          </form>
        )}

        {step === "done" && (
          <div className="mt-4 text-sm text-fluke-muted">Signup completed. Admin can now assign your access entitlements.</div>
        )}
      </div>
    </div>
  );
}
