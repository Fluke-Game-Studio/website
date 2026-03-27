(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/data/content.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "devlogs",
    ()=>devlogs,
    "portfolio",
    ()=>portfolio,
    "team",
    ()=>team
]);
const team = [
    {
        id: "1",
        name: "Alex Rivera",
        role: "Founder & Game Director",
        bio: "Visionary behind Fluke Game Studio. 8+ years in indie game development with a passion for immersive worlds.",
        avatar: "/team/alex.jpg",
        skills: [
            "Game Design",
            "Unity",
            "Unreal",
            "Team Leadership"
        ],
        socials: [
            {
                platform: "twitter",
                url: "#"
            },
            {
                platform: "github",
                url: "#"
            }
        ]
    },
    {
        id: "2",
        name: "Maya Chen",
        role: "Lead Artist & 3D Designer",
        bio: "Creates the stunning visuals and 3D assets that define Fluke's visual identity.",
        avatar: "/team/maya.jpg",
        skills: [
            "3D Modeling",
            "Blender",
            "Substance Painter",
            "Concept Art"
        ],
        socials: [
            {
                platform: "instagram",
                url: "#"
            },
            {
                platform: "twitter",
                url: "#"
            }
        ]
    },
    {
        id: "3",
        name: "Jordan Blake",
        role: "Lead Developer",
        bio: "Full-stack game developer specializing in Unity, Unreal, and multiplayer systems.",
        avatar: "/team/jordan.jpg",
        skills: [
            "Unity",
            "Unreal Engine 5",
            "C#",
            "Networking"
        ],
        socials: [
            {
                platform: "github",
                url: "#"
            },
            {
                platform: "twitter",
                url: "#"
            }
        ]
    },
    {
        id: "4",
        name: "Sam Park",
        role: "Sound Designer & Composer",
        bio: "Crafts the immersive audio landscapes and original soundtracks for Fluke's productions.",
        avatar: "/team/sam.jpg",
        skills: [
            "Sound Design",
            "Composition",
            "FMOD",
            "Wwise"
        ],
        socials: [
            {
                platform: "youtube",
                url: "#"
            },
            {
                platform: "instagram",
                url: "#"
            }
        ]
    }
];
const devlogs = [
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
        tags: [
            "Unity",
            "Procedural",
            "Performance"
        ]
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
        tags: [
            "Art",
            "Design",
            "Neon Drift"
        ]
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
        tags: [
            "Studio",
            "Retrospective",
            "2024"
        ]
    }
];
const portfolio = [
    {
        id: "1",
        title: "Neon Drift — Full Game",
        category: "Games",
        description: "A neon racing arcade game shipped on Steam.",
        tools: [
            "Unity",
            "Blender",
            "FMOD"
        ],
        image: "/portfolio/neon-drift.jpg",
        year: 2024
    },
    {
        id: "2",
        title: "Sci-Fi Asset Pack Vol.1",
        category: "Assets",
        description: "100+ sci-fi props for Unity Asset Store.",
        tools: [
            "Blender",
            "Substance",
            "Unity"
        ],
        image: "/portfolio/scifi-pack.jpg",
        year: 2024
    },
    {
        id: "3",
        title: "Shadow Realm Reveal Trailer",
        category: "Trailers",
        description: "Cinematic reveal trailer with VFX.",
        tools: [
            "Unreal",
            "After Effects",
            "DaVinci"
        ],
        image: "/portfolio/shadow-reveal.jpg",
        year: 2025
    },
    {
        id: "4",
        title: "Indie Studio Landing Page",
        category: "Websites",
        description: "Full-stack Next.js website for an indie studio.",
        tools: [
            "Next.js",
            "GSAP",
            "Three.js"
        ],
        image: "/portfolio/studio-site.jpg",
        year: 2024
    },
    {
        id: "5",
        title: "Character Concept Art Series",
        category: "Art",
        description: "10-piece concept art series for Shadow Realm.",
        tools: [
            "Photoshop",
            "Procreate"
        ],
        image: "/portfolio/concepts.jpg",
        year: 2025
    },
    {
        id: "6",
        title: "Pixel Warriors Mobile",
        category: "Games",
        description: "Retro platformer for iOS and Android.",
        tools: [
            "Unity",
            "Aseprite"
        ],
        image: "/portfolio/pixel-warriors.jpg",
        year: 2023
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/portfolio/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PortfolioPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript) <export default as Gamepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clapperboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clapperboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clapperboard.js [app-client] (ecmascript) <export default as Clapperboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$joystick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Joystick$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/joystick.js [app-client] (ecmascript) <export default as Joystick>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const icons = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clapperboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clapperboard$3e$__["Clapperboard"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$joystick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Joystick$3e$__["Joystick"]
];
const categories = [
    "All",
    "Games",
    "Assets",
    "Trailers",
    "Websites",
    "Art"
];
const categoryColors = {
    Games: "#4ade80",
    Assets: "#60a5fa",
    Trailers: "#f472b6",
    Websites: "#a78bfa",
    Art: "#fb923c"
};
function PortfolioPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(32);
    if ($[0] !== "f38a1431e10c8b5b79f5f14c7ccff5980852e275e397ff4216faed72fc56e827") {
        for(let $i = 0; $i < 32; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f38a1431e10c8b5b79f5f14c7ccff5980852e275e397ff4216faed72fc56e827";
    }
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    let T0;
    let T1;
    let t0;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    if ($[1] !== active) {
        const filtered = active === "All" ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolio"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolio"].filter({
            "PortfolioPage[portfolio.filter()]": (p)=>p.category === active
        }["PortfolioPage[portfolio.filter()]"]);
        t7 = "min-h-screen bg-fluke-bg pt-28 pb-20";
        t4 = "max-w-7xl mx-auto px-6";
        if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
            t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-16",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
                        children: "Proof of Work"
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 43,
                        columnNumber: 35
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-bebas text-6xl sm:text-8xl text-fluke-text yellow-line mb-4",
                        children: "Portfolio"
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 43,
                        columnNumber: 139
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-sora text-fluke-muted max-w-xl mt-6",
                        children: "A curated look at our best work across games, art, trailers, websites, and asset packs."
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 43,
                        columnNumber: 234
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portfolio/page.tsx",
                lineNumber: 43,
                columnNumber: 12
            }, this);
            $[12] = t5;
        } else {
            t5 = $[12];
        }
        const t8 = categories.map({
            "PortfolioPage[categories.map()]": (cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: {
                        "PortfolioPage[categories.map() > <button>.onClick]": ()=>setActive(cat)
                    }["PortfolioPage[categories.map() > <button>.onClick]"],
                    className: `px-5 py-2 rounded-full font-sora text-sm border transition-all duration-300 ${active === cat ? "bg-fluke-yellow border-fluke-yellow text-fluke-bg font-semibold" : "border-fluke-yellow/20 text-fluke-muted hover:border-fluke-yellow/40"}`,
                    children: cat
                }, cat, false, {
                    fileName: "[project]/app/portfolio/page.tsx",
                    lineNumber: 49,
                    columnNumber: 49
                }, this)
        }["PortfolioPage[categories.map()]"]);
        if ($[13] !== t8) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 mb-10",
                children: t8
            }, void 0, false, {
                fileName: "[project]/app/portfolio/page.tsx",
                lineNumber: 54,
                columnNumber: 12
            }, this);
            $[13] = t8;
            $[14] = t6;
        } else {
            t6 = $[14];
        }
        T1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div;
        t2 = true;
        t3 = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";
        T0 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"];
        t0 = "popLayout";
        t1 = filtered.map(_PortfolioPageFilteredMap);
        $[1] = active;
        $[2] = T0;
        $[3] = T1;
        $[4] = t0;
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
        $[8] = t4;
        $[9] = t5;
        $[10] = t6;
        $[11] = t7;
    } else {
        T0 = $[2];
        T1 = $[3];
        t0 = $[4];
        t1 = $[5];
        t2 = $[6];
        t3 = $[7];
        t4 = $[8];
        t5 = $[9];
        t6 = $[10];
        t7 = $[11];
    }
    let t8;
    if ($[15] !== T0 || $[16] !== t0 || $[17] !== t1) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            mode: t0,
            children: t1
        }, void 0, false, {
            fileName: "[project]/app/portfolio/page.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[15] = T0;
        $[16] = t0;
        $[17] = t1;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    let t9;
    if ($[19] !== T1 || $[20] !== t2 || $[21] !== t3 || $[22] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T1, {
            layout: t2,
            className: t3,
            children: t8
        }, void 0, false, {
            fileName: "[project]/app/portfolio/page.tsx",
            lineNumber: 101,
            columnNumber: 10
        }, this);
        $[19] = T1;
        $[20] = t2;
        $[21] = t3;
        $[22] = t8;
        $[23] = t9;
    } else {
        t9 = $[23];
    }
    let t10;
    if ($[24] !== t4 || $[25] !== t5 || $[26] !== t6 || $[27] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t4,
            children: [
                t5,
                t6,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/app/portfolio/page.tsx",
            lineNumber: 112,
            columnNumber: 11
        }, this);
        $[24] = t4;
        $[25] = t5;
        $[26] = t6;
        $[27] = t9;
        $[28] = t10;
    } else {
        t10 = $[28];
    }
    let t11;
    if ($[29] !== t10 || $[30] !== t7) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t7,
            children: t10
        }, void 0, false, {
            fileName: "[project]/app/portfolio/page.tsx",
            lineNumber: 123,
            columnNumber: 11
        }, this);
        $[29] = t10;
        $[30] = t7;
        $[31] = t11;
    } else {
        t11 = $[31];
    }
    return t11;
}
_s(PortfolioPage, "BmrN4OIGrrMiAmFjPaJAG0l6ZTM=");
_c = PortfolioPage;
function _PortfolioPageFilteredMap(item, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        layout: true,
        initial: {
            opacity: 0,
            scale: 0.9
        },
        animate: {
            opacity: 1,
            scale: 1
        },
        exit: {
            opacity: 0,
            scale: 0.9
        },
        transition: {
            duration: 0.35,
            delay: i * 0.05
        },
        className: "group rounded-2xl overflow-hidden bg-fluke-surface border border-fluke-yellow/10 card-hover cursor-pointer",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-52 flex items-center justify-center text-6xl relative",
                style: {
                    background: `linear-gradient(135deg, hsl(${i * 55}, 30%, 8%), hsl(${i * 55 + 40}, 50%, 14%))`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 text-fluke-yellow",
                        children: (()=>{
                            const Icon = icons[i % 6];
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                size: 56,
                                strokeWidth: 1.5
                            }, void 0, false, {
                                fileName: "[project]/app/portfolio/page.tsx",
                                lineNumber: 149,
                                columnNumber: 18
                            }, this);
                        })()
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 147,
                        columnNumber: 8
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 left-3 text-xs font-orbitron tracking-widest px-3 py-1 rounded-full",
                        style: {
                            background: `${categoryColors[item.category]}22`,
                            color: categoryColors[item.category],
                            border: `1px solid ${categoryColors[item.category]}44`
                        },
                        children: item.category
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 150,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 right-3 text-xs font-sora text-fluke-muted bg-fluke-bg/60 px-2 py-0.5 rounded",
                        children: item.year
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 154,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portfolio/page.tsx",
                lineNumber: 145,
                columnNumber: 125
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-sora font-semibold text-sm text-fluke-text group-hover:text-fluke-yellow transition-colors mb-1",
                        children: item.title
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 154,
                        columnNumber: 185
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-sora text-xs text-fluke-muted mb-3 line-clamp-2",
                        children: item.description
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 154,
                        columnNumber: 319
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5",
                        children: item.tools.map(_PortfolioPageFilteredMapItemToolsMap)
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 154,
                        columnNumber: 409
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portfolio/page.tsx",
                lineNumber: 154,
                columnNumber: 164
            }, this)
        ]
    }, item.id, true, {
        fileName: "[project]/app/portfolio/page.tsx",
        lineNumber: 133,
        columnNumber: 10
    }, this);
}
function _PortfolioPageFilteredMapItemToolsMap(tool) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[10px] font-sora px-2 py-0.5 rounded bg-fluke-bg text-fluke-muted border border-fluke-yellow/10",
        children: tool
    }, tool, false, {
        fileName: "[project]/app/portfolio/page.tsx",
        lineNumber: 157,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "PortfolioPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Gamepad2
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "line",
        {
            x1: "6",
            x2: "10",
            y1: "11",
            y2: "11",
            key: "1gktln"
        }
    ],
    [
        "line",
        {
            x1: "8",
            x2: "8",
            y1: "9",
            y2: "13",
            key: "qnk9ow"
        }
    ],
    [
        "line",
        {
            x1: "15",
            x2: "15.01",
            y1: "12",
            y2: "12",
            key: "krot7o"
        }
    ],
    [
        "line",
        {
            x1: "18",
            x2: "18.01",
            y1: "10",
            y2: "10",
            key: "1lcuu1"
        }
    ],
    [
        "path",
        {
            d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
            key: "mfqc10"
        }
    ]
];
const Gamepad2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("gamepad-2", __iconNode);
;
 //# sourceMappingURL=gamepad-2.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript) <export default as Gamepad2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Gamepad2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Package
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
            key: "1a0edw"
        }
    ],
    [
        "path",
        {
            d: "M12 22V12",
            key: "d0xqtd"
        }
    ],
    [
        "polyline",
        {
            points: "3.29 7 12 12 20.71 7",
            key: "ousv84"
        }
    ],
    [
        "path",
        {
            d: "m7.5 4.27 9 5.15",
            key: "1c824w"
        }
    ]
];
const Package = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("package", __iconNode);
;
 //# sourceMappingURL=package.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Package",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clapperboard.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Clapperboard
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m12.296 3.464 3.02 3.956",
            key: "qash78"
        }
    ],
    [
        "path",
        {
            d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z",
            key: "1h7j8b"
        }
    ],
    [
        "path",
        {
            d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
            key: "4lm6w1"
        }
    ],
    [
        "path",
        {
            d: "m6.18 5.276 3.1 3.899",
            key: "zjj9t3"
        }
    ]
];
const Clapperboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("clapperboard", __iconNode);
;
 //# sourceMappingURL=clapperboard.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/clapperboard.js [app-client] (ecmascript) <export default as Clapperboard>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Clapperboard",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clapperboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clapperboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clapperboard.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Globe
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
            key: "13o1zl"
        }
    ],
    [
        "path",
        {
            d: "M2 12h20",
            key: "9i4pu4"
        }
    ]
];
const Globe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("globe", __iconNode);
;
 //# sourceMappingURL=globe.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Globe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Palette
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
            key: "e79jfc"
        }
    ],
    [
        "circle",
        {
            cx: "13.5",
            cy: "6.5",
            r: ".5",
            fill: "currentColor",
            key: "1okk4w"
        }
    ],
    [
        "circle",
        {
            cx: "17.5",
            cy: "10.5",
            r: ".5",
            fill: "currentColor",
            key: "f64h9f"
        }
    ],
    [
        "circle",
        {
            cx: "6.5",
            cy: "12.5",
            r: ".5",
            fill: "currentColor",
            key: "qy21gx"
        }
    ],
    [
        "circle",
        {
            cx: "8.5",
            cy: "7.5",
            r: ".5",
            fill: "currentColor",
            key: "fotxhn"
        }
    ]
];
const Palette = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("palette", __iconNode);
;
 //# sourceMappingURL=palette.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Palette",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/joystick.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Joystick
]);
/**
 * @license lucide-react v0.577.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z",
            key: "jg2n2t"
        }
    ],
    [
        "path",
        {
            d: "M6 15v-2",
            key: "gd6mvg"
        }
    ],
    [
        "path",
        {
            d: "M12 15V9",
            key: "8c7uyn"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "6",
            r: "3",
            key: "1gm2ql"
        }
    ]
];
const Joystick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("joystick", __iconNode);
;
 //# sourceMappingURL=joystick.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/joystick.js [app-client] (ecmascript) <export default as Joystick>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Joystick",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$joystick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$joystick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/joystick.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_a39740e2._.js.map