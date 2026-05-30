import { resolveApiBase } from "./apiBase";

const API_BASE = resolveApiBase();

function safe(v: any) {
  return String(v ?? "").trim();
}

async function readJson(res: Response) {
  const txt = await res.text().catch(() => "");
  if (!txt) return {};
  try {
    return JSON.parse(txt);
  } catch {
    return { raw: txt };
  }
}

export type CustomerSession = {
  token: string;
  customer_id: string;
  user_id: string;
  customer_type: string;
};

export type CustomerMeResponse = {
  user: { user_id: string; email: string; role: string };
  customer: any;
  entitlements: any[];
};

export type CustomerDownloadItem = {
  product_id: string;
  project_id: string;
  name: string;
  entitlement: { env: string; tier: string; status: string };
  scopes?: string[];
  releasesByScope?: Record<
    string,
    Array<{
      release_status: string;
      version: string;
      platform: string;
      updated_at?: string;
    }>
  >;
};

export class CustomerApiClient {
  token: string | null = null;
  setToken(token: string | null) {
    this.token = token;
  }
  private headers(isJson = true): HeadersInit {
    const h: Record<string, string> = { Accept: "*/*" };
    if (isJson) h["Content-Type"] = "application/json";
    if (this.token) h["Authorization"] = `Bearer ${this.token}`;
    return h;
  }
  async login(email: string, password: string): Promise<CustomerSession> {
    const r = await fetch(`${API_BASE}/customer/auth/login`, {
      method: "POST",
      headers: this.headers(true),
      body: JSON.stringify({ email: safe(email).toLowerCase(), password }),
    });
    const payload = await readJson(r);
    if (!r.ok || !payload?.token) throw new Error(payload?.error || `login failed (${r.status})`);
    const out: CustomerSession = {
      token: String(payload.token),
      customer_id: safe(payload.customer_id),
      user_id: safe(payload.user_id),
      customer_type: safe(payload.customer_type),
    };
    this.setToken(out.token);
    return out;
  }
  async me(): Promise<CustomerMeResponse> {
    const r = await fetch(`${API_BASE}/customer/auth/me`, {
      method: "GET",
      headers: this.headers(false),
    });
    const payload = await readJson(r);
    if (!r.ok) throw new Error(payload?.error || `me failed (${r.status})`);
    return payload as CustomerMeResponse;
  }
  async downloads(): Promise<{ customer: any; entitlements: any[]; items: CustomerDownloadItem[] }> {
    const r = await fetch(`${API_BASE}/customer/auth/downloads`, {
      method: "GET",
      headers: this.headers(false),
    });
    const payload = await readJson(r);
    if (!r.ok) throw new Error(payload?.error || `downloads failed (${r.status})`);
    return payload as { customer: any; entitlements: any[]; items: CustomerDownloadItem[] };
  }
  async signupStart(body: {
    full_name: string;
    mobile: string;
    email: string;
    password: string;
    consent_marketing: boolean;
    consent_newsletter: boolean;
  }): Promise<{ ok: true; requires_otp: boolean; email: string }> {
    const r = await fetch(`${API_BASE}/customer/auth/signup/start`, {
      method: "POST",
      headers: this.headers(true),
      body: JSON.stringify(body),
    });
    const payload = await readJson(r);
    if (!r.ok) throw new Error(payload?.error || `signup start failed (${r.status})`);
    return payload as { ok: true; requires_otp: boolean; email: string };
  }
  async signupVerify(body: { email: string; otp: string }): Promise<{ ok: true; customer_id: string; email_verified: boolean }> {
    const r = await fetch(`${API_BASE}/customer/auth/signup/verify`, {
      method: "POST",
      headers: this.headers(true),
      body: JSON.stringify(body),
    });
    const payload = await readJson(r);
    if (!r.ok) throw new Error(payload?.error || `signup verify failed (${r.status})`);
    return payload as { ok: true; customer_id: string; email_verified: boolean };
  }
  async signupGoogle(body: {
    full_name: string;
    mobile: string;
    email: string;
    password: string;
    google_sub: string;
    consent_marketing: boolean;
    consent_newsletter: boolean;
  }): Promise<{ ok: true; customer_id: string; email_verified: boolean }> {
    const r = await fetch(`${API_BASE}/customer/auth/signup/google`, {
      method: "POST",
      headers: this.headers(true),
      body: JSON.stringify(body),
    });
    const payload = await readJson(r);
    if (!r.ok) throw new Error(payload?.error || `google signup failed (${r.status})`);
    return payload as { ok: true; customer_id: string; email_verified: boolean };
  }
}

export const customerApi = new CustomerApiClient();
