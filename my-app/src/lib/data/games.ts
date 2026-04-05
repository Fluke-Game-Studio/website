export interface Game {
  id: string;
  slug: string;
  title: string;
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

export const games: Game[] = [
  {
    id: "1",
    slug: "neon-drift",
    title: "Neon Drift",
    genre: "Racing / Arcade",
    platforms: ["PC", "Mobile"],
    status: "Released",
    releaseYear: 2024,
    description: "A high-octane neon racing experience through cyberpunk cityscapes.",
    longDescription:
      "Neon Drift is a fast-paced arcade racing game set in a sprawling cyberpunk metropolis. Drift through neon-lit streets, dodge obstacles, and race to the top of the leaderboard.",
    coverImage: "/games/neon-drift.jpg",
    screenshots: [],
    features: ["40+ tracks", "Online leaderboards", "Procedural city generation", "Custom car skins"],
    tags: ["Racing", "Neon", "Arcade", "Cyberpunk"],
  },
  {
    id: "2",
    slug: "shadow-realm",
    title: "Shadow Realm",
    genre: "Action RPG",
    platforms: ["PC", "Console"],
    status: "In Development",
    releaseYear: 2025,
    description: "Descend into a dark fantasy realm where shadows are your greatest weapon.",
    longDescription:
      "Shadow Realm is an action RPG where you play as a Shade Hunter navigating a world consumed by darkness. Master shadow magic, craft powerful gear, and unravel ancient mysteries.",
    coverImage: "/games/shadow-realm.jpg",
    screenshots: [],
    features: ["Open world", "Dynamic shadow mechanics", "Deep crafting system", "Co-op mode"],
    tags: ["RPG", "Dark Fantasy", "Action", "Open World"],
  },
  {
    id: "3",
    slug: "pixel-warriors",
    title: "Pixel Warriors",
    genre: "Platformer",
    platforms: ["PC", "Mobile", "Web"],
    status: "Released",
    releaseYear: 2023,
    description: "A retro pixel platformer with modern gameplay twists.",
    longDescription:
      "Pixel Warriors blends classic platformer nostalgia with modern design philosophy. Fight through 80+ levels of increasing challenge with tight controls and satisfying combat.",
    coverImage: "/games/pixel-warriors.jpg",
    screenshots: [],
    features: ["80+ levels", "Boss fights", "Unlockable characters", "Speedrun mode"],
    tags: ["Platformer", "Pixel Art", "Retro", "Action"],
  },
  {
    id: "4",
    slug: "star-forge",
    title: "Star Forge",
    genre: "Strategy / Survival",
    platforms: ["PC"],
    status: "Coming Soon",
    releaseYear: 2025,
    description: "Build your galactic empire from nothing but cosmic dust.",
    longDescription:
      "Star Forge is a space survival strategy game where you mine asteroids, build space stations, recruit crew members, and expand your empire across the galaxy.",
    coverImage: "/games/star-forge.jpg",
    screenshots: [],
    features: ["Procedural galaxy", "Base building", "Resource management", "Multiplayer"],
    tags: ["Strategy", "Survival", "Space", "Building"],
  },
];
