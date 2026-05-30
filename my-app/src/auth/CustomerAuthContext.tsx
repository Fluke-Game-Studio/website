import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { customerApi, type CustomerMeResponse, type CustomerSession } from "../services/customerApi";

type AuthStatus = "checking" | "authenticated" | "unauthenticated";
type Ctx = {
  session: CustomerSession | null;
  profile: CustomerMeResponse | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const LS_KEY = "customer_auth_user";
const Ctx = createContext<Ctx | null>(null);

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<CustomerSession | null>(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as CustomerSession;
      customerApi.setToken(parsed.token);
      return parsed;
    } catch {
      return null;
    }
  });
  const [profile, setProfile] = useState<CustomerMeResponse | null>(null);
  const [status, setStatus] = useState<AuthStatus>(() => (session ? "checking" : "unauthenticated"));

  function setAuth(next: CustomerSession | null) {
    setSession(next);
    if (next) {
      customerApi.setToken(next.token);
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      setStatus("authenticated");
    } else {
      customerApi.setToken(null);
      localStorage.removeItem(LS_KEY);
      setProfile(null);
      setStatus("unauthenticated");
    }
  }

  async function refresh() {
    if (!session?.token) {
      setStatus("unauthenticated");
      return;
    }
    const me = await customerApi.me();
    setProfile(me);
    setStatus("authenticated");
  }

  async function login(email: string, password: string) {
    try {
      setStatus("checking");
      const s = await customerApi.login(email, password);
      setAuth(s);
      const me = await customerApi.me();
      setProfile(me);
      return true;
    } catch {
      setAuth(null);
      return false;
    }
  }

  function logout() {
    setAuth(null);
  }

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!session?.token) {
        if (!cancelled) setStatus("unauthenticated");
        return;
      }
      if (!cancelled) setStatus("checking");
      try {
        const me = await customerApi.me();
        if (cancelled) return;
        setProfile(me);
        setStatus("authenticated");
      } catch {
        if (cancelled) return;
        setAuth(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session?.token]);

  const value = useMemo(() => ({ session, profile, status, login, logout, refresh }), [session, profile, status]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCustomerAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCustomerAuth must be used within CustomerAuthProvider");
  return ctx;
}
