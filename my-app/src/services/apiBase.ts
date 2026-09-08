export function resolveApiBase() {
  const explicit = (import.meta.env.VITE_API_BASE as string | undefined)?.trim();
  if (explicit) return explicit;

  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1") {
      return "/api";
    }
  }

  if (import.meta.env.DEV) {
    return "/api";
  }

  return "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";
}
