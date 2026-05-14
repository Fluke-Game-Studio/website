export function resolveApiBase() {
  // Use the proxy in development, or the production URL
  if (import.meta.env.DEV) {
    return "/api";
  }
  return "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";
}
