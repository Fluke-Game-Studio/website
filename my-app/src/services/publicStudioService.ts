const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  "https://xtipeal88c.execute-api.us-east-1.amazonaws.com";

export type PublicTeamMember = {
  employee_name?: string;
  employee_title?: string;
  employee_role?: string;
  employee_profilepicture?: string;
  employee_picture?: string;
  department?: string;
  location?: string;
  employment_type?: string;
  linkedin_connected?: boolean;
  discord_connected?: boolean;
  linkedin_member_id?: string;
  linkedin_name?: string;
  linkedin_url?: string;
  discord_member_id?: string;
  discord_name?: string;
  discord_url?: string;
  [key: string]: any;
};

export type PublicAwardItem = {
  id?: string;
  type?: string;
  title?: string;
  description?: string;
  tier?: string;
  imageUrl?: string;
  artworkLabel?: string;
  awardedAt?: string;
  person?: {
    name?: string;
    pictureUrl?: string;
  };
  [key: string]: any;
};

export type PublicMediaAsset = {
  name?: string;
  mimeType?: string;
  size?: number;
  publicUrl?: string;
  youtubeUrl?: string;
  youtubeVideoId?: string;
  [key: string]: any;
};

export type PublicUpdateItem = {
  weekStart?: string;
  projectId?: string;
  createdAt?: string;
  employee_name?: string;
  employee_picture?: string;
  department?: string;
  location?: string;
  employment_type?: string;
  attachments?: PublicMediaAsset[];
  media?: PublicMediaAsset[];
  totalEntries?: number;
  totalHours?: number;
  [key: string]: any;
};

export type PublicAnalyticsDashboard = {
  weekStart?: string;
  projectId?: string;
  overview?: Record<string, any>;
  compliance?: Record<string, any>;
  charts?: {
    weeklySeries?: Array<Record<string, any>>;
    dailySeries?: Array<Record<string, any>>;
    projectSeries?: Array<Record<string, any>>;
    contributorSeries?: Array<Record<string, any>>;
  };
  projectBreakdown?: Array<Record<string, any>>;
  contributorBreakdown?: Array<Record<string, any>>;
  attention?: Record<string, any>;
  rows?: Array<Record<string, any>>;
  [key: string]: any;
};

type ApiResponse<T> = {
  items?: T[];
  data?: T[];
  summaries?: T[];
  count?: number;
  summaryCount?: number;
  weekStart?: string | null;
  public?: boolean;
  ok?: boolean;
  [key: string]: any;
};

function safeStr(v: any) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function unwrapPayload<T>(payload: any): ApiResponse<T> {
  if (!payload) return {};
  if (typeof payload === "string") {
    try {
      return unwrapPayload<T>(JSON.parse(payload));
    } catch {
      return {};
    }
  }
  if (payload && typeof payload.body === "string") {
    try {
      return unwrapPayload<T>(JSON.parse(payload.body));
    } catch {
      return payload;
    }
  }
  return payload;
}

function normalizeTeamMember(item: any): PublicTeamMember {
  return {
    ...item,
    employee_name: safeStr(item?.employee_name || item?.name),
    employee_title: safeStr(item?.employee_title || item?.title),
    employee_role: safeStr(item?.employee_role || item?.role),
    employee_profilepicture: safeStr(item?.employee_profilepicture),
    employee_picture: safeStr(item?.employee_picture),
    department: safeStr(item?.department),
    location: safeStr(item?.location),
    employment_type: safeStr(item?.employment_type),
    linkedin_connected: Boolean(item?.linkedin_connected),
    discord_connected: Boolean(item?.discord_connected),
    linkedin_member_id: safeStr(item?.linkedin_member_id),
    linkedin_name: safeStr(item?.linkedin_name),
    linkedin_url: safeStr(item?.linkedin_url),
    discord_member_id: safeStr(item?.discord_member_id),
    discord_name: safeStr(item?.discord_name),
    discord_url: safeStr(item?.discord_url),
  };
}

function rolePriority(member: PublicTeamMember) {
  const role = safeStr(member.employee_role || member.employee_title || "").toLowerCase();
  if (role.includes("super")) return 0;
  if (role.includes("admin")) return 1;
  return 2;
}

function normalizeAward(item: any): PublicAwardItem {
  return {
    ...item,
    id: safeStr(item?.id),
    type: safeStr(item?.type),
    title: safeStr(item?.title),
    description: safeStr(item?.description),
    tier: safeStr(item?.tier),
    imageUrl: safeStr(item?.imageUrl),
    artworkLabel: safeStr(item?.artworkLabel),
    awardedAt: safeStr(item?.awardedAt || item?.at),
    person: {
      name: safeStr(item?.person?.name || item?.employee_name || item?.username),
      pictureUrl: safeStr(item?.person?.pictureUrl || item?.employee_picture),
    },
  };
}

function normalizeMediaAsset(item: any): PublicMediaAsset {
  return {
    ...item,
    name: safeStr(item?.name || item?.fileName || item?.title),
    mimeType: safeStr(item?.mimeType),
    publicUrl: safeStr(item?.publicUrl || item?.url),
    youtubeUrl: safeStr(item?.youtubeUrl),
    youtubeVideoId: safeStr(item?.youtubeVideoId),
    size: Number(item?.size || 0) || 0,
  };
}

function normalizeUpdate(item: any): PublicUpdateItem {
  const attachments = Array.isArray(item?.attachments)
    ? item.attachments.map(normalizeMediaAsset)
    : [];
  const media = Array.isArray(item?.media)
    ? item.media.map(normalizeMediaAsset)
    : attachments;

  return {
    ...item,
    weekStart: safeStr(item?.weekStart),
    projectId: safeStr(item?.projectId),
    createdAt: safeStr(item?.createdAt),
    employee_name: safeStr(item?.employee_name || item?.userName || item?.name),
    employee_picture: safeStr(item?.employee_picture || item?.employee_profilepicture),
    department: safeStr(item?.department),
    location: safeStr(item?.location),
    employment_type: safeStr(item?.employment_type),
    attachments,
    media,
    totalEntries: Number(item?.totalEntries || 0) || 0,
    totalHours: Number(item?.totalHours || 0) || 0,
  };
}

async function readJson<T>(response: Response): Promise<ApiResponse<T>> {
  const text = await response.text();
  try {
    return unwrapPayload<T>(JSON.parse(text));
  } catch {
    return unwrapPayload<T>(text);
  }
}

export const publicStudioService = {
  async fetchTeam() {
    const response = await fetch(`${API_BASE}/directory`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const payload = await readJson<PublicTeamMember>(response);

    if (!response.ok) {
      throw new Error(
        safeStr((payload as any)?.error || (payload as any)?.message || `Failed to fetch team (${response.status})`)
      );
    }

    const items = Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload?.data)
      ? payload.data
      : [];

    return items
      .map(normalizeTeamMember)
      .sort((a, b) => {
        const rank = rolePriority(a) - rolePriority(b);
        if (rank !== 0) return rank;
        return safeStr(a.employee_name).localeCompare(safeStr(b.employee_name));
      });
  },

  async fetchRecentAwards(limit = 200) {
    const qs = new URLSearchParams();
    qs.set("limit", String(limit));

    const response = await fetch(`${API_BASE}/awards/recent?${qs.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const payload = await readJson<PublicAwardItem>(response);

    if (!response.ok) {
      throw new Error(
        safeStr((payload as any)?.error || (payload as any)?.message || `Failed to fetch awards (${response.status})`)
      );
    }

    const items = Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload?.data)
      ? payload.data
      : [];

    return items.map(normalizeAward);
  },

  async fetchPublicUpdates(limit = 200) {
    const qs = new URLSearchParams();
    qs.set("limit", String(limit));

    const response = await fetch(`${API_BASE}/updates?${qs.toString()}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const payload = await readJson<PublicUpdateItem>(response);

    if (!response.ok) {
      throw new Error(
        safeStr((payload as any)?.error || (payload as any)?.message || `Failed to fetch updates (${response.status})`)
      );
    }

    const items = Array.isArray(payload?.items)
      ? payload.items
      : Array.isArray(payload?.data)
      ? payload.data
      : [];
    const summaries = Array.isArray(payload?.summaries) ? payload.summaries : [];

    return {
      items: items.map(normalizeUpdate),
      summaries: summaries.map(normalizeUpdate),
      count: Number(payload?.count || items.length) || 0,
      summaryCount: Number(payload?.summaryCount || summaries.length) || 0,
    };
  },

  async fetchPublicAnalyticsDashboard(weekStart?: string) {
    const qs = new URLSearchParams();
    if (weekStart) qs.set("weekStart", weekStart);

    const suffix = qs.toString() ? `?${qs.toString()}` : "";
    const response = await fetch(`${API_BASE}/analytics/dashboard${suffix}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const payload = await readJson<PublicAnalyticsDashboard>(response);

    if (!response.ok) {
      throw new Error(
        safeStr((payload as any)?.error || (payload as any)?.message || `Failed to fetch analytics (${response.status})`)
      );
    }

    return payload as PublicAnalyticsDashboard;
  },

  async askPublicAssistant(
    question: string,
    context: string,
    options?: { agentEmployeeId?: string; agentRole?: string; username?: string }
  ) {
    const agentEmployeeId = safeStr(options?.agentEmployeeId);
    const agentRole = safeStr(options?.agentRole);
    const username = safeStr(options?.username);
    const response = await fetch(`${API_BASE}/ai/chat-sync/flukegames`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        context: "flukegames",
        provider: "openai",
        model: "gpt-5-mini",
        assistantContext: context,
        ...(username ? { username } : {}),
        ...(agentEmployeeId ? { agentEmployeeId } : {}),
        ...(agentRole ? { agentRole } : {}),
      }),
    });

    const payload = await readJson<any>(response);
    if (!response.ok) {
      throw new Error(
        safeStr((payload as any)?.error || (payload as any)?.message || `Failed to ask public assistant (${response.status})`)
      );
    }

    return safeStr((payload as any)?.reply || (payload as any)?.message || "");
  },
};
