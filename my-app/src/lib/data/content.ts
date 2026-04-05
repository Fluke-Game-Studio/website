export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  socials: { platform: string; url: string }[];
}

export const team: TeamMember[] = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Founder & Game Director",
    bio: "Visionary behind Fluke Game Studio. 8+ years in indie game development with a passion for immersive worlds.",
    avatar: "/team/alex.jpg",
    skills: ["Game Design", "Unity", "Unreal", "Team Leadership"],
    socials: [
      { platform: "twitter", url: "#" },
      { platform: "github", url: "#" },
    ],
  },
  {
    id: "2",
    name: "Maya Chen",
    role: "Lead Artist & 3D Designer",
    bio: "Creates the stunning visuals and 3D assets that define Fluke's visual identity.",
    avatar: "/team/maya.jpg",
    skills: ["3D Modeling", "Blender", "Substance Painter", "Concept Art"],
    socials: [
      { platform: "instagram", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "3",
    name: "Jordan Blake",
    role: "Lead Developer",
    bio: "Full-stack game developer specializing in Unity, Unreal, and multiplayer systems.",
    avatar: "/team/jordan.jpg",
    skills: ["Unity", "Unreal Engine 5", "C#", "Networking"],
    socials: [
      { platform: "github", url: "#" },
      { platform: "twitter", url: "#" },
    ],
  },
  {
    id: "4",
    name: "Sam Park",
    role: "Sound Designer & Composer",
    bio: "Crafts the immersive audio landscapes and original soundtracks for Fluke's productions.",
    avatar: "/team/sam.jpg",
    skills: ["Sound Design", "Composition", "FMOD", "Wwise"],
    socials: [
      { platform: "youtube", url: "#" },
      { platform: "instagram", url: "#" },
    ],
  },
];

export interface Devlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
  coverImage: string;
  tags: string[];
}

export const devlogs: Devlog[] = [
  {
    id: "1",
    slug: "building-procedural-worlds",
    title: "Building Procedural Worlds in Unity",
    excerpt: "How we created infinitely varied environments for Star Forge using Unity's Job System and Burst Compiler.",
    content: "",
    author: "Jordan Blake",
    date: "2025-02-15",
    category: "Unity",
    readTime: 8,
    coverImage: "/devlogs/procedural.jpg",
    tags: ["Unity", "Procedural", "Performance"],
  },
  {
    id: "2",
    slug: "art-direction-neon-drift",
    title: "Art Direction: The Neon Drift Visual Style",
    excerpt: "A deep dive into how we developed the neon cyberpunk aesthetic for our racing game.",
    content: "",
    author: "Maya Chen",
    date: "2025-01-28",
    category: "Design",
    readTime: 6,
    coverImage: "/devlogs/art-direction.jpg",
    tags: ["Art", "Design", "Neon Drift"],
  },
  {
    id: "3",
    slug: "studio-year-one",
    title: "Fluke Studio: Year One in Review",
    excerpt: "What we shipped, what we learned, and where we're going in 2025.",
    content: "",
    author: "Alex Rivera",
    date: "2025-01-10",
    category: "Studio Updates",
    readTime: 5,
    coverImage: "/devlogs/year-one.jpg",
    tags: ["Studio", "Retrospective", "2024"],
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: "Games" | "Assets" | "Trailers" | "Websites" | "Art";
  description: string;
  tools: string[];
  image: string;
  year: number;
}

export const portfolio: PortfolioItem[] = [
  { id: "1", title: "Neon Drift — Full Game", category: "Games", description: "A neon racing arcade game shipped on Steam.", tools: ["Unity", "Blender", "FMOD"], image: "/portfolio/neon-drift.jpg", year: 2024 },
  { id: "2", title: "Sci-Fi Asset Pack Vol.1", category: "Assets", description: "100+ sci-fi props for Unity Asset Store.", tools: ["Blender", "Substance", "Unity"], image: "/portfolio/scifi-pack.jpg", year: 2024 },
  { id: "3", title: "Shadow Realm Reveal Trailer", category: "Trailers", description: "Cinematic reveal trailer with VFX.", tools: ["Unreal", "After Effects", "DaVinci"], image: "/portfolio/shadow-reveal.jpg", year: 2025 },
  { id: "4", title: "Indie Studio Landing Page", category: "Websites", description: "Full-stack Next.js website for an indie studio.", tools: ["Next.js", "GSAP", "Three.js"], image: "/portfolio/studio-site.jpg", year: 2024 },
  { id: "5", title: "Character Concept Art Series", category: "Art", description: "10-piece concept art series for Shadow Realm.", tools: ["Photoshop", "Procreate"], image: "/portfolio/concepts.jpg", year: 2025 },
  { id: "6", title: "Pixel Warriors Mobile", category: "Games", description: "Retro platformer for iOS and Android.", tools: ["Unity", "Aseprite"], image: "/portfolio/pixel-warriors.jpg", year: 2023 },
];
