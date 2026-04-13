import { LucideIcon, Gamepad2, Brain, Wrench, Cuboid, Palette, Music, Rocket, Clapperboard, Package, Users, Scissors, Globe } from "lucide-react";
import React from "react";

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  icon: LucideIcon;
  category: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "1",
    slug: "indie-game-development",
    title: "Indie Game Development",
    description: "Full-cycle game development from concept to launch.",
    longDescription: "We handle every stage of game development — from initial concept and game design to programming, art, audio, and QA. We ship polished, fun experiences.",
    icon: Gamepad2,
    category: "Development",
    features: ["Concept Design", "Gameplay Programming", "Multiplayer Systems", "QA & Optimization"],
  },
  {
    id: "2",
    slug: "game-design-consulting",
    title: "Game Design Consulting",
    description: "Expert advice on mechanics, systems, and player experience.",
    longDescription: "Our experienced game designers review your project and provide actionable feedback on game feel, balance, progression, and player retention.",
    icon: Brain,
    category: "Consulting",
    features: ["Game Feel Analysis", "Balance Reviews", "Monetization Strategy", "UX Flow"],
  },
  {
    id: "3",
    slug: "unity-unreal-development",
    title: "Unity / Unreal Development",
    description: "Professional game development on industry-standard engines.",
    longDescription: "Expert Unity and Unreal Engine developers delivering optimized, scalable game builds for any platform.",
    icon: Wrench,
    category: "Development",
    features: ["Unity 6", "Unreal Engine 5", "Cross-platform builds", "Performance profiling"],
  },
  {
    id: "4",
    slug: "3d-modeling",
    title: "3D Modeling",
    description: "High-quality 3D assets for games, cinematics, and VR/AR.",
    longDescription: "From low-poly stylized characters to hyper-realistic environments, our 3D team delivers assets optimized for your target platform.",
    icon: Cuboid,
    category: "Art",
    features: ["Characters & Props", "Environment Art", "Rigging & Skinning", "LOD Setup"],
  },
  {
    id: "5",
    slug: "game-art-animation",
    title: "Game Art & Animation",
    description: "Stunning 2D/3D art and smooth animations for your game.",
    longDescription: "Concept art, sprites, UI design, and character animation — we create cohesive visual identities that bring your game world to life.",
    icon: Palette,
    category: "Art",
    features: ["Concept Art", "2D Sprites", "UI/UX Design", "Character Animation"],
  },
  {
    id: "6",
    slug: "sound-design-music",
    title: "Sound Design / Music",
    description: "Immersive audio that elevates your game's atmosphere.",
    longDescription: "Original soundtracks, SFX, dynamic audio systems — our sound team crafts audio experiences that make your world feel alive.",
    icon: Music,
    category: "Audio",
    features: ["Original OST", "SFX Library", "Adaptive Audio", "Voice Direction"],
  },
  {
    id: "7",
    slug: "publishing-support",
    title: "Publishing Support",
    description: "Get your game in front of the right audiences.",
    longDescription: "From store page optimization to trailer production, we help indie devs navigate publishing on Steam, mobile, and console.",
    icon: Rocket,
    category: "Publishing",
    features: ["Store Page Setup", "Trailer Production", "Marketing Strategy", "Launch Support"],
  },
  {
    id: "8",
    slug: "game-trailers-cinematics",
    title: "Game Trailers / Cinematics",
    description: "Cinematic trailers that sell your game on first view.",
    longDescription: "We produce gameplay trailers, story cinematic trailers, and announcement teasers that capture the essence of your game.",
    icon: Clapperboard,
    category: "Video",
    features: ["Gameplay Capture", "Cinematic Editing", "Motion Graphics", "Color Grading"],
  },
  {
    id: "9",
    slug: "asset-store-content",
    title: "Asset Store Content",
    description: "Professional assets for Unity Asset Store & Fab.",
    longDescription: "We create and publish premium asset packs for Unity and Unreal marketplaces — models, shaders, templates, and tools.",
    icon: Package,
    category: "Assets",
    features: ["Unity Assets", "Unreal Fab", "Shader Packs", "Environment Kits"],
  },
  {
    id: "10",
    slug: "contract-development",
    title: "Contract Development",
    description: "Dedicated dev resources for your studio or project.",
    longDescription: "Need extra firepower? We embed skilled engineers, artists, and designers into your team on a contract basis.",
    icon: Users,
    category: "Development",
    features: ["Dedicated Engineers", "Remote Team Integration", "Flexible Hours", "NDA Protected"],
  },
  {
    id: "11",
    slug: "video-editing",
    title: "Video Editing",
    description: "Professional editing for devlogs, trailers, and social content.",
    longDescription: "From raw footage to polished social clips, reels, and YouTube content — we handle it all.",
    icon: Scissors,
    category: "Video",
    features: ["Devlog Editing", "Social Reels", "Gameplay Highlights", "Subtitle & Captions"],
  },
  {
    id: "12",
    slug: "web-development",
    title: "Web Development",
    description: "Stunning game studio websites, landing pages, and portals.",
    longDescription: "We build immersive game studio websites, game landing pages, and fan portals using modern web tech.",
    icon: Globe,
    category: "Web",
    features: ["Next.js / React", "3D Web Experiences", "CMS Integration", "SEO Optimization"],
  },
];
