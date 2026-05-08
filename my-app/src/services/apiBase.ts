const DEFAULT_REMOTE_API_BASE = "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";

function normalizeBase(base: string) {
  return base.replace(/\/$/, "");
}

function isLocalHost(hostname: string) {
  const host = hostname.toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host === "::1";
}

export function resolveApiBase(): string {
  const configured = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
  if (configured) {
    return normalizeBase(configured);
  }

  if (typeof window !== "undefined" && !isLocalHost(window.location.hostname)) {
    return DEFAULT_REMOTE_API_BASE;
  }

  return "/api";
}

