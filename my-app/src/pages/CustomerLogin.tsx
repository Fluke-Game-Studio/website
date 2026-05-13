import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../auth/CustomerAuthContext";

export default function CustomerLogin() {
  const { login, status } = useCustomerAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const next = (loc.state as any)?.from || "/download";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const formEmail = String(fd.get("email") || email || "").trim();
    const formPassword = String(fd.get("password") || password || "");
    if (!formEmail || !formPassword) {
      setErr("Email and password are required.");
      return;
    }
    const ok = await login(formEmail, formPassword);
    if (!ok) {
      setErr("Invalid email or password.");
      return;
    }
    nav(next, { replace: true });
  }

  return (
    <section className="max-w-xl mx-auto px-6 py-28">
      <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
        <h1 className="text-2xl font-bold mb-2">Customer Login</h1>
        <p className="text-sm text-fluke-muted mb-5">Sign in to access your downloads.</p>
        {err ? <div className="text-sm text-red-400 mb-3">{err}</div> : null}
        <form onSubmit={onSubmit} className="grid gap-3">
          <input
            name="email"
            autoComplete="email"
            required
            className="rounded-lg border border-white/15 bg-black/20 px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
            <input
              name="password"
              autoComplete="current-password"
              required
              type={showPassword ? "text" : "password"}
              className="rounded-lg border border-white/15 bg-black/20 px-3 py-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="rounded-lg border border-white/20 px-3 py-2 text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" disabled={status === "checking"} className="btn-primary rounded-lg px-4 py-2 mt-2 disabled:opacity-50">
            {status === "checking" ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}
