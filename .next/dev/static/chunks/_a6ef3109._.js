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
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
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
    if ($[0] !== "ac3ac6061dcac7982ff5a3dc9045c1cd3ae40a7138de146349690f909547f7a0") {
        for(let $i = 0; $i < 32; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ac3ac6061dcac7982ff5a3dc9045c1cd3ae40a7138de146349690f909547f7a0";
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
                        lineNumber: 41,
                        columnNumber: 35
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-bebas text-6xl sm:text-8xl text-fluke-text yellow-line mb-4",
                        children: "Portfolio"
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 41,
                        columnNumber: 139
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-sora text-fluke-muted max-w-xl mt-6",
                        children: "A curated look at our best work across games, art, trailers, websites, and asset packs."
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 41,
                        columnNumber: 234
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portfolio/page.tsx",
                lineNumber: 41,
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
                    lineNumber: 47,
                    columnNumber: 49
                }, this)
        }["PortfolioPage[categories.map()]"]);
        if ($[13] !== t8) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap gap-3 mb-10",
                children: t8
            }, void 0, false, {
                fileName: "[project]/app/portfolio/page.tsx",
                lineNumber: 52,
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
            lineNumber: 89,
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
            lineNumber: 99,
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
            lineNumber: 110,
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
            lineNumber: 121,
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
                        className: "opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500",
                        children: [
                            "\uD83C\uDFAE",
                            "\uD83D\uDCE6",
                            "\uD83C\uDFAC",
                            "\uD83C\uDF10",
                            "\uD83C\uDFA8",
                            "\uD83D\uDD79\uFE0F"
                        ][i % 6]
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 145,
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
                        lineNumber: 145,
                        columnNumber: 228
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-3 right-3 text-xs font-sora text-fluke-muted bg-fluke-bg/60 px-2 py-0.5 rounded",
                        children: item.year
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 149,
                        columnNumber: 31
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portfolio/page.tsx",
                lineNumber: 143,
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
                        lineNumber: 149,
                        columnNumber: 185
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-sora text-xs text-fluke-muted mb-3 line-clamp-2",
                        children: item.description
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 149,
                        columnNumber: 319
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-1.5",
                        children: item.tools.map(_PortfolioPageFilteredMapItemToolsMap)
                    }, void 0, false, {
                        fileName: "[project]/app/portfolio/page.tsx",
                        lineNumber: 149,
                        columnNumber: 409
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/portfolio/page.tsx",
                lineNumber: 149,
                columnNumber: 164
            }, this)
        ]
    }, item.id, true, {
        fileName: "[project]/app/portfolio/page.tsx",
        lineNumber: 131,
        columnNumber: 10
    }, this);
}
function _PortfolioPageFilteredMapItemToolsMap(tool) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[10px] font-sora px-2 py-0.5 rounded bg-fluke-bg text-fluke-muted border border-fluke-yellow/10",
        children: tool
    }, tool, false, {
        fileName: "[project]/app/portfolio/page.tsx",
        lineNumber: 152,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "PortfolioPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_a6ef3109._.js.map