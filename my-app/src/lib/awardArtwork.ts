export type AwardArtworkMatch = {
  imageUrl?: string;
  label?: string;
};

const TROPHY_ARTWORKS = [
  { label: "Social Connect", file: encodeURI("/awards/social_connect.png") },
  { label: "Bronze Pro", file: encodeURI("/awards/bronze pro.png") },
  { label: "Bronze 3", file: encodeURI("/awards/bronze 3.png") },
  { label: "Bronze 2", file: encodeURI("/awards/bronze 2.png") },
  { label: "Silver Pro", file: encodeURI("/awards/silver pro.png") },
  { label: "Silver 3", file: encodeURI("/awards/silver 3.png") },
  { label: "Silver 2", file: encodeURI("/awards/silver 2.png") },
  { label: "Gold Pro", file: encodeURI("/awards/gold pro.png") },
  { label: "Gold 3", file: encodeURI("/awards/gold 3.png") },
  { label: "Gold 2", file: encodeURI("/awards/gold 2.png") },
  { label: "3D Artist", file: encodeURI("/awards/3D artist.png") },
  { label: "Absent Minded", file: encodeURI("/awards/Absent Minded.png") },
  { label: "Creative Couch", file: encodeURI("/awards/creative couch.png") },
  { label: "Drives and Delivers Exec", file: encodeURI("/awards/Drives and Delivers Exec.png") },
  { label: "Drives Forward", file: encodeURI("/awards/Drives Forward.png") },
  { label: "Game Programmer", file: encodeURI("/awards/game programmer.png") },
  { label: "Lead By an Example", file: encodeURI("/awards/Lead By an Example.png") },
  { label: "MVC", file: encodeURI("/awards/MVC.png") },
  { label: "Web Programmer", file: encodeURI("/awards/Web Programmer.png") },
] as const;

function safeStr(v: any) {
  return v === null || v === undefined ? "" : String(v).trim();
}

function norm(v: string) {
  return safeStr(v).toLowerCase().replace(/[\s_-]+/g, "");
}

function bestMatch(title: string, tier: string) {
  const nTitle = norm(title);
  const nTier = norm(tier);

  if (!nTitle && !nTier) return null;

  if (nTitle.includes("discord") || nTitle.includes("linkedin") || nTitle.includes("social")) {
    return TROPHY_ARTWORKS.find((x) => norm(x.label).includes("socialconnect")) || TROPHY_ARTWORKS[0];
  }

  if (nTitle.includes("silver") || nTier.includes("silver")) {
    return TROPHY_ARTWORKS.find((x) => norm(x.label).includes("silver")) || null;
  }
  if (nTitle.includes("gold") || nTier.includes("gold")) {
    return TROPHY_ARTWORKS.find((x) => norm(x.label).includes("gold")) || null;
  }
  if (nTitle.includes("bronze") || nTier.includes("bronze")) {
    return TROPHY_ARTWORKS.find((x) => norm(x.label).includes("bronze")) || null;
  }

  const exact = TROPHY_ARTWORKS.find((x) => norm(x.label) === nTitle);
  if (exact) return exact;

  const partial = TROPHY_ARTWORKS.find((x) => nTitle.includes(norm(x.label)) || norm(x.label).includes(nTitle));
  return partial || null;
}

export function resolveAwardArtwork(award: {
  title?: string;
  tier?: string;
  imageUrl?: string;
  type?: string;
}): AwardArtworkMatch {
  const explicit = safeStr(award?.imageUrl);
  if (explicit) return { imageUrl: explicit };

  const match = bestMatch(safeStr(award?.title || award?.type), safeStr(award?.tier));
  if (match) return { imageUrl: match.file, label: match.label };

  return {};
}
