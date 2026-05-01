const API_BASE = (() => {
  const configured = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();

  if (configured && configured !== "/api") {
    return configured.replace(/\/$/, "");
  }

  return "/api";
})();

type ContactPayload = {
  context?: string;
  name: string;
  email: string;
  company?: string;
  budget?: string;
  type?: string;
  message: string;
  pageUrl?: string;
  website?: string; // honeypot
};

export async function submitPublicContact(payload: ContactPayload) {
  const res = await fetch(`${API_BASE}/public/contact`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const raw = await res.text();
  let data: any = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch {
    data = { reply: raw };
  }

  if (!res.ok) {
    throw new Error(data?.error || data?.message || `Request failed (${res.status})`);
  }

  return data;
}

