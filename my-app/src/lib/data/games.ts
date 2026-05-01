export interface Game {
  id: string;
  slug: string;
  title: string;
  externalUrl?: string;
  genre: string;
  platforms: string[];
  status: "Released" | "In Development" | "Coming Soon";
  releaseYear: number;
  description: string;
  longDescription: string;
  coverImage: string;
  screenshots: string[];
  features: string[];
  tags: string[];
}

import { getProjectCarousel, getStudioProjects, StudioProject, toStudioPortfolioItems } from "@/lib/studioProjects";

function safeStr(v: unknown) {
  if (v === null || v === undefined) return "";
  return String(v).trim();
}

function normalizePlatform(p: string) {
  const token = safeStr(p).toLowerCase();
  if (!token) return "";
  if (token.includes("web")) return "Web";
  if (token.includes("android") || token.includes("ios") || token.includes("mobile")) return "Mobile";
  if (token.includes("ps") || token.includes("xbox") || token.includes("switch") || token.includes("console")) return "Console";
  if (token.includes("mac") || token.includes("windows") || token.includes("pc")) return "PC";
  return "PC";
}

function deriveStatus(project: StudioProject): Game["status"] {
  const names = Array.isArray(project.milestones)
    ? project.milestones.map((m) => safeStr(m?.name).toLowerCase()).filter(Boolean)
    : [];

  if (names.some((n) => n.includes("release") || n.includes("shipped"))) return "Released";
  if (names.some((n) => n.includes("polish"))) return "Released";
  if (names.length) return "In Development";
  return "Coming Soon";
}

function deriveFeatures(project: StudioProject) {
  const list: string[] = [];
  const pushAll = (items: unknown) => {
    if (!Array.isArray(items)) return;
    for (const item of items) {
      const t = safeStr(item);
      if (t) list.push(t);
    }
  };

  pushAll(project.highlights);
  pushAll(project.scope);
  pushAll(project.systems);

  return Array.from(new Set(list)).slice(0, 10);
}

function deriveTags(project: StudioProject) {
  const tags: string[] = [];
  const pushAll = (items: unknown) => {
    if (!Array.isArray(items)) return;
    for (const item of items) {
      const t = safeStr(item);
      if (t) tags.push(t);
    }
  };
  pushAll(project.tags);
  pushAll(project.stack);
  return Array.from(new Set(tags)).slice(0, 12);
}

export const games: Game[] = (() => {
  const items = toStudioPortfolioItems(getStudioProjects()).filter((p) => p.category === "Games");

  return items.map((item, idx) => {
    const project = item.raw;
    const carousel = getProjectCarousel(project);
    const cover = safeStr(project.cover) || safeStr(project.previewImage) || safeStr(project.mainImage) || safeStr(carousel[0]?.url);
    const screenshots = carousel.map((c) => safeStr(c.url)).filter(Boolean);

    const platforms = Array.isArray(project.platforms)
      ? Array.from(new Set(project.platforms.map((p) => normalizePlatform(p)).filter(Boolean)))
      : [];

    const status = deriveStatus(project);
    const releaseYear = new Date().getFullYear();
    const genre = safeStr(project.projectType) || "Game";
    const description = safeStr(project.tagline || project.summary);

    const longDescription = [safeStr(project.summary), safeStr(project.tagline)]
      .filter(Boolean)
      .filter((v, i, self) => self.indexOf(v) === i)
      .join("\n\n");

    return {
      id: `${item.id}`,
      slug: safeStr(project.slug) || `${item.id}`,
      title: safeStr(project.title) || item.title,
      externalUrl: safeStr(project.externalUrl) || undefined,
      genre,
      platforms: platforms.length ? platforms : ["PC"],
      status,
      releaseYear,
      description,
      longDescription: longDescription || description,
      coverImage: cover || "",
      screenshots,
      features: deriveFeatures(project),
      tags: deriveTags(project),
    };
  });
})();
