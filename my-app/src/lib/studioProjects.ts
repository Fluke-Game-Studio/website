import studioProjectsRaw from "../data/studioProjects.json";

export type StudioProjectImage = {
  img: string;
  headline?: string;
  description?: string;
};

export type StudioProjectMilestone = {
  name: string;
  objectives?: number;
  done?: number;
  qa?: number;
  backlog?: number;
  bugs?: number;
  highlights?: string[];
};

export type StudioProject = {
  key: string;
  slug: string;
  title: string;
  externalUrl?: string;
  projectType?: string;
  tagline?: string;
  summary?: string;
  role?: string;
  cover?: string;
  previewImage?: string;
  mainImage?: string;
  screenshotpath?: string;
  visible?: boolean;
  stack?: string[];
  tags?: string[];
  platforms?: string[];
  teamSize?: number;
  cadence?: string;
  scope?: string[];
  tech?: string[];
  systems?: string[];
  highlights?: string[];
  images?: StudioProjectImage[];
  milestones?: StudioProjectMilestone[];
  github?: string;
  video?: string;
  videoId?: string;
  company?: string;
  companyLogo?: string;
};

type StudioProjectMap = Record<string, StudioProject>;

export type PortfolioCategory = "Games" | "Assets" | "Trailers" | "Websites" | "Art";

export type StudioPortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  tools: string[];
  yearLabel: string;
  raw: StudioProject;
};

function safeStr(v: unknown) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function toCategory(project: StudioProject): PortfolioCategory {
  const type = safeStr(project.projectType).toLowerCase();
  const tags = Array.isArray(project.tags) ? project.tags.map((t) => safeStr(t).toLowerCase()) : [];

  if (type.includes("web") || tags.includes("web") || tags.includes("website")) return "Websites";
  if (type.includes("asset") || tags.includes("asset") || tags.includes("assets")) return "Assets";
  if (type.includes("trailer") || tags.includes("trailer")) return "Trailers";
  if (type.includes("art") || tags.includes("art")) return "Art";
  return "Games";
}

export function getStudioProjects(): StudioProject[] {
  const map = studioProjectsRaw as unknown as StudioProjectMap;
  return Object.values(map || {})
    .filter((p) => p && typeof p === "object")
    .filter((p) => p.visible !== false)
    .sort((a, b) => safeStr(a.title).localeCompare(safeStr(b.title)));
}

export function toStudioPortfolioItems(projects: StudioProject[]): StudioPortfolioItem[] {
  return projects.map((project) => {
    const tools = Array.isArray(project.stack)
      ? project.stack.map((t) => safeStr(t)).filter(Boolean).slice(0, 6)
      : Array.isArray(project.tags)
        ? project.tags.map((t) => safeStr(t)).filter(Boolean).slice(0, 6)
        : [];

    return {
      id: safeStr(project.key || project.slug || project.title),
      title: safeStr(project.title) || "Untitled Project",
      category: toCategory(project),
      description: safeStr(project.tagline || project.summary),
      tools,
      yearLabel: "Ongoing",
      raw: project,
    };
  });
}

export function resolveProjectImageUrl(project: StudioProject, img: string) {
  const name = safeStr(img);
  if (!name) return "";
  if (name.startsWith("/")) return name;

  const base = safeStr(project.screenshotpath);
  if (base) {
    const normalized = base.endsWith("/") ? base : `${base}/`;
    return `${normalized}${name}`;
  }

  return `/data/content/screenshots/${name}`;
}

export function getProjectCarousel(project: StudioProject): { url: string; headline?: string; description?: string }[] {
  const items: { url: string; headline?: string; description?: string }[] = [];

  const add = (url: string, headline?: string, description?: string) => {
    const nextUrl = safeStr(url);
    if (!nextUrl) return;
    if (items.some((i) => i.url === nextUrl)) return;
    items.push({ url: nextUrl, headline, description });
  };

  add(safeStr(project.cover));
  add(safeStr(project.previewImage));
  add(safeStr(project.mainImage));

  if (Array.isArray(project.images)) {
    for (const image of project.images) {
      const url = resolveProjectImageUrl(project, safeStr(image?.img));
      add(url, safeStr(image?.headline) || undefined, safeStr(image?.description) || undefined);
    }
  }

  return items;
}
