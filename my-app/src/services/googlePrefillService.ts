const GOOGLE_USER_KEY = "fg_google_user_v1";
const GOOGLE_POPUP_KEY = "fg_google_popup_dismissed_v3";
const FALLBACK_CLIENT_ID = "795367262906-dk93nfkpo7v5fnnlt1g8nh0iralh8i8m.apps.googleusercontent.com";

export type GooglePrefillUser = {
  name: string;
  email: string;
  imageUrl: string;
};

function safeJsonParse(value: string | null) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function normalizeUser(user: any): GooglePrefillUser | null {
  if (!user || !user.email) return null;
  return {
    name: String(user.name || ""),
    email: String(user.email || ""),
    imageUrl: String(user.imageUrl || user.picture || ""),
  };
}

function decodeJwtPayload(credential: string) {
  try {
    const payload = credential.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export const googlePrefillService = {
  userKey: GOOGLE_USER_KEY,
  popupKey: GOOGLE_POPUP_KEY,

  getClientId() {
    return (
      (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined)?.trim() ||
      FALLBACK_CLIENT_ID
    );
  },

  readUser(): GooglePrefillUser | null {
    if (typeof window === "undefined") return null;
    return normalizeUser(safeJsonParse(window.localStorage.getItem(GOOGLE_USER_KEY)));
  },

  writeUser(user: any) {
    if (typeof window === "undefined") return null;
    const normalized = normalizeUser(user);
    if (!normalized) return null;
    window.localStorage.setItem(GOOGLE_USER_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent("fg-google-user", { detail: normalized }));
    return normalized;
  },

  clearUser() {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(GOOGLE_USER_KEY);
    window.dispatchEvent(new CustomEvent("fg-google-user", { detail: null }));
  },

  isPopupDismissed() {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(GOOGLE_POPUP_KEY) === "1";
  },

  dismissPopup() {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(GOOGLE_POPUP_KEY, "1");
  },

  userFromCredential(credential: string): GooglePrefillUser | null {
    const payload = decodeJwtPayload(credential);
    return normalizeUser({
      name: payload?.name,
      email: payload?.email,
      imageUrl: payload?.picture,
    });
  },
};
