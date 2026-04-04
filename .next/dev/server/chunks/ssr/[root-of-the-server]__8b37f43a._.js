module.exports = [
"[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/favicon.ico.mjs { IMAGE => \"[project]/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/lib/data/content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/app/devlogs/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DevlogsPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-rsc] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-rsc] (ecmascript) <export default as ArrowRight>");
;
;
;
;
const metadata = {
    title: "Devlogs | Fluke Game Studio",
    description: "Development insights, tutorials, and behind-the-scenes content from Fluke Game Studio."
};
const categoryColors = {
    Unity: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    "Unreal": "text-orange-400 bg-orange-400/10 border-orange-400/20",
    Design: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    "Studio Updates": "text-green-400 bg-green-400/10 border-green-400/20",
    Art: "text-pink-400 bg-pink-400/10 border-pink-400/20"
};
const categories = [
    "Game Dev",
    "Unity",
    "Unreal",
    "Design",
    "Studio Updates"
];
function DevlogsPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-fluke-bg pt-28 pb-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-6",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-4 gap-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
                                        children: "Dev Notes"
                                    }, void 0, false, {
                                        fileName: "[project]/app/devlogs/page.tsx",
                                        lineNumber: 29,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "font-bebas text-6xl sm:text-8xl text-fluke-text yellow-line",
                                        children: "Devlogs"
                                    }, void 0, false, {
                                        fileName: "[project]/app/devlogs/page.tsx",
                                        lineNumber: 32,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/devlogs/page.tsx",
                                lineNumber: 28,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["devlogs"].map((post, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: `/devlogs/${post.slug}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group flex gap-6 rounded-2xl bg-fluke-surface border border-fluke-yellow/10 overflow-hidden card-hover",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-40 flex-none flex items-center justify-center text-4xl",
                                                    style: {
                                                        background: `linear-gradient(135deg, hsl(${i * 80 + 200}, 40%, 8%), hsl(${i * 80 + 230}, 50%, 14%))`
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500",
                                                        children: [
                                                            "⚙️",
                                                            "🎨",
                                                            "🏆"
                                                        ][i % 3]
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/devlogs/page.tsx",
                                                        lineNumber: 48,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/devlogs/page.tsx",
                                                    lineNumber: 42,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "py-6 pr-6 flex flex-col justify-center flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3 mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `text-[10px] font-orbitron tracking-wider px-2 py-0.5 rounded border ${categoryColors[post.category] || "text-fluke-yellow bg-fluke-yellow/10 border-fluke-yellow/20"}`,
                                                                    children: post.category
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/devlogs/page.tsx",
                                                                    lineNumber: 56,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center gap-1 text-[10px] text-fluke-muted font-sora",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                            size: 10
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/devlogs/page.tsx",
                                                                            lineNumber: 60,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        post.readTime,
                                                                        " min read"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/devlogs/page.tsx",
                                                                    lineNumber: 59,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/devlogs/page.tsx",
                                                            lineNumber: 55,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "font-sora font-bold text-fluke-text group-hover:text-fluke-yellow transition-colors mb-2",
                                                            children: post.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/devlogs/page.tsx",
                                                            lineNumber: 64,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-sora text-xs text-fluke-muted line-clamp-2 mb-3",
                                                            children: post.excerpt
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/devlogs/page.tsx",
                                                            lineNumber: 67,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between text-xs text-fluke-muted/60 font-sora",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: [
                                                                        "by ",
                                                                        post.author
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/devlogs/page.tsx",
                                                                    lineNumber: 69,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "flex items-center gap-1 text-fluke-yellow/60 group-hover:text-fluke-yellow transition-colors",
                                                                    children: [
                                                                        "Read more ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                            size: 12
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/devlogs/page.tsx",
                                                                            lineNumber: 71,
                                                                            columnNumber: 37
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/devlogs/page.tsx",
                                                                    lineNumber: 70,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/devlogs/page.tsx",
                                                            lineNumber: 68,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/devlogs/page.tsx",
                                                    lineNumber: 54,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/devlogs/page.tsx",
                                            lineNumber: 40,
                                            columnNumber: 19
                                        }, this)
                                    }, post.id, false, {
                                        fileName: "[project]/app/devlogs/page.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/devlogs/page.tsx",
                                lineNumber: 37,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/devlogs/page.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-2xl p-6 border border-fluke-yellow/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-4",
                                        children: "Categories"
                                    }, void 0, false, {
                                        fileName: "[project]/app/devlogs/page.tsx",
                                        lineNumber: 84,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "font-sora text-sm text-fluke-muted hover:text-fluke-yellow transition-colors w-full text-left py-1 flex items-center justify-between group",
                                                    children: [
                                                        cat,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            size: 12,
                                                            className: "opacity-0 group-hover:opacity-100 transition-opacity"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/devlogs/page.tsx",
                                                            lineNumber: 90,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/devlogs/page.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 21
                                                }, this)
                                            }, cat, false, {
                                                fileName: "[project]/app/devlogs/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/devlogs/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/devlogs/page.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-2xl p-6 border border-fluke-yellow/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-orbitron text-xs tracking-widest text-fluke-yellow uppercase mb-3",
                                        children: "Contributing"
                                    }, void 0, false, {
                                        fileName: "[project]/app/devlogs/page.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-sora text-xs text-fluke-muted mb-4",
                                        children: "Want to write for our devlog? We're always looking for contributor voices."
                                    }, void 0, false, {
                                        fileName: "[project]/app/devlogs/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/contact",
                                        className: "btn-outline text-xs py-2 px-4 rounded-lg font-sora w-full text-center block",
                                        children: "Write for Us"
                                    }, void 0, false, {
                                        fileName: "[project]/app/devlogs/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/devlogs/page.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/devlogs/page.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/devlogs/page.tsx",
                lineNumber: 25,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/devlogs/page.tsx",
            lineNumber: 24,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/devlogs/page.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/devlogs/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/devlogs/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8b37f43a._.js.map