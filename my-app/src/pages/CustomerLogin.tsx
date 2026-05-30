import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCustomerAuth } from "../auth/CustomerAuthContext";
import { useTheme } from "../lib/ThemeContext";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff, User, Lock, AlertCircle } from "lucide-react";

export default function CustomerLogin() {
  const { login, status } = useCustomerAuth();
  const { theme } = useTheme();
  const isLight = theme === "light";
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
    const ok = await login(email, password);
    if (!ok) {
      setErr("Invalid email or password.");
      return;
    }
    nav(next, { replace: true });
  }

  const glassClass = isLight ? "glass-light" : "glass-dark";
  const inputBgClass = isLight ? "bg-white/50 border-fluke-yellow/30" : "bg-black/20 border-white/10";

  return (
    <div className="min-h-screen bg-fluke-bg relative overflow-hidden flex items-center justify-center py-20 pt-40 px-6">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-fluke-yellow/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-fluke-yellow/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-10">
          <p className="font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3">
            Client Portal
          </p>
          <h1 className="font-bebas text-6xl text-fluke-text yellow-line inline-block mb-4">
            LOGIN
          </h1>
          <p className="font-sora text-sm text-fluke-muted max-w-xs mx-auto">
            Sign in to access your purchased games and exclusive builds.
          </p>
        </div>

        <div className={`${glassClass} rounded-3xl p-8 sm:p-10 border ${isLight ? 'border-fluke-yellow/30' : 'border-white/5'} shadow-2xl`}>
          {err && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm font-sora"
            >
              <AlertCircle size={18} />
              {err}
            </motion.div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-orbitron text-fluke-yellow tracking-widest uppercase ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-fluke-muted group-focus-within:text-fluke-yellow transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@example.com"
                  className={`w-full ${inputBgClass} rounded-2xl py-4 pl-12 pr-4 font-sora text-sm text-fluke-text placeholder:text-fluke-muted/40 focus:outline-none focus:border-fluke-yellow focus:ring-1 focus:ring-fluke-yellow/30 transition-all`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-orbitron text-fluke-yellow tracking-widest uppercase ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-fluke-muted group-focus-within:text-fluke-yellow transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full ${inputBgClass} rounded-2xl py-4 pl-12 pr-12 font-sora text-sm text-fluke-text placeholder:text-fluke-muted/40 focus:outline-none focus:border-fluke-yellow focus:ring-1 focus:ring-fluke-yellow/30 transition-all`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-fluke-muted hover:text-fluke-yellow transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "checking"}
              className="btn-primary w-full py-4 rounded-2xl font-orbitron text-sm font-bold tracking-[0.2em] flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(245,197,66,0.3)] hover:shadow-[0_0_40px_rgba(245,197,66,0.5)] transition-all disabled:opacity-50"
            >
              {status === "checking" ? (
                <div className="w-5 h-5 border-2 border-fluke-bg/30 border-t-fluke-bg rounded-full animate-spin" />
              ) : (
                <>
                  SIGN IN
                  <LogIn size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-fluke-yellow/10 text-center">
            <p className="text-[10px] font-orbitron text-fluke-muted tracking-widest uppercase">
              Secure Access provided by Fluke Studio
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
