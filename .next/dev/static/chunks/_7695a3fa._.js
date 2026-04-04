(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/IntroScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IntroScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function IntroScreen(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "56ec9a7d6cadf78408de03318ac955a016bbc07b0e2f2283ee05a333787d8d58") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "56ec9a7d6cadf78408de03318ac955a016bbc07b0e2f2283ee05a333787d8d58";
    }
    const { onComplete } = t0;
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    let t1;
    let t2;
    if ($[1] !== onComplete) {
        t1 = ({
            "IntroScreen[useEffect()]": ()=>{
                const t1$0 = setTimeout({
                    "IntroScreen[useEffect() > setTimeout()]": ()=>setPhase(1)
                }["IntroScreen[useEffect() > setTimeout()]"], 400);
                const t2$0 = setTimeout({
                    "IntroScreen[useEffect() > setTimeout()]": ()=>setPhase(2)
                }["IntroScreen[useEffect() > setTimeout()]"], 1200);
                const t3 = setTimeout({
                    "IntroScreen[useEffect() > setTimeout()]": ()=>setPhase(3)
                }["IntroScreen[useEffect() > setTimeout()]"], 2000);
                const t4 = setTimeout({
                    "IntroScreen[useEffect() > setTimeout()]": ()=>onComplete()
                }["IntroScreen[useEffect() > setTimeout()]"], 2600);
                return ()=>{
                    clearTimeout(t1$0);
                    clearTimeout(t2$0);
                    clearTimeout(t3);
                    clearTimeout(t4);
                };
            }
        })["IntroScreen[useEffect()]"];
        t2 = [
            onComplete
        ];
        $[1] = onComplete;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    if ($[4] !== phase) {
        t3 = phase < 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            transition: {
                duration: 0.6
            },
            className: "fixed inset-0 z-[99999] bg-fluke-bg flex flex-col items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        scale: 0.5
                    },
                    animate: phase >= 1 ? {
                        opacity: 1,
                        scale: 1
                    } : {},
                    transition: {
                        duration: 0.7,
                        ease: "easeOut"
                    },
                    className: "relative w-32 h-32 mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/logo.png",
                        alt: "Fluke",
                        fill: true,
                        className: "object-contain",
                        priority: true,
                        style: {
                            filter: phase >= 2 ? "drop-shadow(0 0 30px #F5C542) drop-shadow(0 0 60px #F5C54288)" : "none",
                            transition: "filter 0.8s ease"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/IntroScreen.tsx",
                        lineNumber: 70,
                        columnNumber: 46
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/IntroScreen.tsx",
                    lineNumber: 61,
                    columnNumber: 98
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                    initial: {
                        opacity: 0,
                        y: 10
                    },
                    animate: phase >= 1 ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.6,
                        delay: 0.3
                    },
                    className: "font-orbitron text-sm tracking-[0.5em] text-fluke-yellow/80 uppercase",
                    children: "Fluke Game Studio"
                }, void 0, false, {
                    fileName: "[project]/components/IntroScreen.tsx",
                    lineNumber: 73,
                    columnNumber: 27
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0
                    },
                    animate: phase >= 2 ? {
                        opacity: 1
                    } : {},
                    transition: {
                        duration: 0.6
                    },
                    className: "flex gap-5 mt-8",
                    children: [
                        "\u2B06",
                        "\u2B07",
                        "\u25C0",
                        "\u25B6"
                    ].map(_IntroScreenAnonymous)
                }, void 0, false, {
                    fileName: "[project]/components/IntroScreen.tsx",
                    lineNumber: 82,
                    columnNumber: 120
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        width: 0
                    },
                    animate: {
                        width: "160px"
                    },
                    transition: {
                        duration: 2,
                        ease: "easeInOut"
                    },
                    className: "mt-10 h-px bg-fluke-yellow/60 rounded-full",
                    style: {
                        boxShadow: "0 0 8px #F5C542"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/IntroScreen.tsx",
                    lineNumber: 88,
                    columnNumber: 120
                }, this)
            ]
        }, "intro", true, {
            fileName: "[project]/components/IntroScreen.tsx",
            lineNumber: 55,
            columnNumber: 23
        }, this);
        $[4] = phase;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
            children: t3
        }, void 0, false, {
            fileName: "[project]/components/IntroScreen.tsx",
            lineNumber: 105,
            columnNumber: 10
        }, this);
        $[6] = t3;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    return t4;
}
_s(IntroScreen, "DIEXBwLLGXBwEF+ZjWTTCDsojpU=");
_c = IntroScreen;
function _IntroScreenAnonymous(btn, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: [
                0,
                1,
                0.4
            ]
        },
        transition: {
            duration: 0.5,
            delay: i * 0.12,
            repeat: 1
        },
        className: "text-fluke-yellow/60 text-lg",
        style: {
            textShadow: "0 0 8px #F5C542"
        },
        children: btn
    }, i, false, {
        fileName: "[project]/components/IntroScreen.tsx",
        lineNumber: 114,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "IntroScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/HeroSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeroSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript) <export default as Gamepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ParticleCanvas() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "b96cc3e90c24953b65a7df0fa10e51553d642aa549310ec13b298943f9d8c8f4") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b96cc3e90c24953b65a7df0fa10e51553d642aa549310ec13b298943f9d8c8f4";
    }
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = ({
            "ParticleCanvas[useEffect()]": ()=>{
                const canvas = canvasRef.current;
                if (!canvas) {
                    return;
                }
                const ctx = canvas.getContext("2d");
                if (!ctx) {
                    return;
                }
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                const particles = [];
                for(let i = 0; i < 120; i++){
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        vx: (Math.random() - 0.5) * 0.4,
                        vy: (Math.random() - 0.5) * 0.4,
                        size: Math.random() * 2 + 0.5,
                        opacity: Math.random() * 0.6 + 0.1
                    });
                }
                let animId;
                const draw = {
                    "ParticleCanvas[useEffect() > draw]": ()=>{
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        particles.forEach({
                            "ParticleCanvas[useEffect() > draw > particles.forEach()]": (p)=>{
                                p.x = p.x + p.vx;
                                p.y = p.y + p.vy;
                                if (p.x < 0) {
                                    p.x = canvas.width;
                                }
                                if (p.x > canvas.width) {
                                    p.x = 0;
                                }
                                if (p.y < 0) {
                                    p.y = canvas.height;
                                }
                                if (p.y > canvas.height) {
                                    p.y = 0;
                                }
                                ctx.beginPath();
                                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                                ctx.fillStyle = `rgba(245, 197, 66, ${p.opacity})`;
                                ctx.shadowBlur = 6;
                                ctx.shadowColor = "#F5C542";
                                ctx.fill();
                            }
                        }["ParticleCanvas[useEffect() > draw > particles.forEach()]"]);
                        for(let i_0 = 0; i_0 < particles.length; i_0++){
                            for(let j = i_0 + 1; j < particles.length; j++){
                                const dx = particles[i_0].x - particles[j].x;
                                const dy = particles[i_0].y - particles[j].y;
                                const dist = Math.sqrt(dx * dx + dy * dy);
                                if (dist < 100) {
                                    ctx.beginPath();
                                    ctx.strokeStyle = `rgba(245, 197, 66, ${0.08 * (1 - dist / 100)})`;
                                    ctx.lineWidth = 0.5;
                                    ctx.moveTo(particles[i_0].x, particles[i_0].y);
                                    ctx.lineTo(particles[j].x, particles[j].y);
                                    ctx.stroke();
                                }
                            }
                        }
                        animId = requestAnimationFrame(draw);
                    }
                }["ParticleCanvas[useEffect() > draw]"];
                draw();
                const handleResize = {
                    "ParticleCanvas[useEffect() > handleResize]": ()=>{
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                    }
                }["ParticleCanvas[useEffect() > handleResize]"];
                window.addEventListener("resize", handleResize);
                return ()=>{
                    cancelAnimationFrame(animId);
                    window.removeEventListener("resize", handleResize);
                };
            }
        })["ParticleCanvas[useEffect()]"];
        t1 = [];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
            ref: canvasRef,
            className: "particles-canvas opacity-60"
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 114,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    return t2;
}
_s(ParticleCanvas, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = ParticleCanvas;
function HeroSection() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(38);
    if ($[0] !== "b96cc3e90c24953b65a7df0fa10e51553d642aa549310ec13b298943f9d8c8f4") {
        for(let $i = 0; $i < 38; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b96cc3e90c24953b65a7df0fa10e51553d642aa549310ec13b298943f9d8c8f4";
    }
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    let t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [
            0,
            600
        ];
        t1 = [
            0,
            180
        ];
        $[1] = t0;
        $[2] = t1;
    } else {
        t0 = $[1];
        t1 = $[2];
    }
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollY, t0, t1);
    let t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = [
            0,
            400
        ];
        t3 = [
            1,
            0
        ];
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    const opacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(scrollY, t2, t3);
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-hero-gradient"
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 159,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 opacity-[0.04]",
            style: {
                backgroundImage: "linear-gradient(rgba(245,197,66,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,66,1) 1px, transparent 1px)",
                backgroundSize: "80px 80px"
            }
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 167,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ParticleCanvas, {}, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 171,
            columnNumber: 10
        }, this);
        $[6] = t5;
        $[7] = t6;
    } else {
        t5 = $[6];
        t6 = $[7];
    }
    let t7;
    if ($[8] !== opacity || $[9] !== y) {
        t7 = {
            y,
            opacity
        };
        $[8] = opacity;
        $[9] = y;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t10;
    let t8;
    let t9;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            opacity: 0,
            scale: 0.6
        };
        t9 = {
            opacity: 1,
            scale: 1
        };
        t10 = {
            duration: 0.8,
            delay: 2.8,
            ease: "easeOut"
        };
        $[11] = t10;
        $[12] = t8;
        $[13] = t9;
    } else {
        t10 = $[11];
        t8 = $[12];
        t9 = $[13];
    }
    let t11;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t8,
            animate: t9,
            transition: t10,
            className: "mb-8 flex justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-28 h-28 animate-float",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    src: "/logo.png",
                    alt: "Fluke Game Studio",
                    fill: true,
                    className: "object-contain drop-shadow-[0_0_40px_#F5C54288]",
                    priority: true
                }, void 0, false, {
                    fileName: "[project]/components/home/HeroSection.tsx",
                    lineNumber: 217,
                    columnNumber: 153
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/home/HeroSection.tsx",
                lineNumber: 217,
                columnNumber: 103
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 217,
            columnNumber: 11
        }, this);
        $[14] = t11;
    } else {
        t11 = $[14];
    }
    let t12;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: 0.6,
                delay: 3
            },
            className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow mb-4 uppercase",
            children: "Fluke Game Studio"
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 224,
            columnNumber: 11
        }, this);
        $[15] = t12;
    } else {
        t12 = $[15];
    }
    let t13;
    let t14;
    let t15;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = {
            opacity: 0,
            y: 40
        };
        t14 = {
            opacity: 1,
            y: 0
        };
        t15 = {
            duration: 0.9,
            delay: 3.1
        };
        $[16] = t13;
        $[17] = t14;
        $[18] = t15;
    } else {
        t13 = $[16];
        t14 = $[17];
        t15 = $[18];
    }
    let t16;
    let t17;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "gradient-text glow-yellow",
            children: "Games,"
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 265,
            columnNumber: 11
        }, this);
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 266,
            columnNumber: 11
        }, this);
        $[19] = t16;
        $[20] = t17;
    } else {
        t16 = $[19];
        t17 = $[20];
    }
    let t18;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
            initial: t13,
            animate: t14,
            transition: t15,
            className: "font-bebas text-6xl sm:text-8xl md:text-9xl leading-none mb-6 text-fluke-text",
            children: [
                "Crafting",
                " ",
                t16,
                t17,
                "Worlds &",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "gradient-text",
                    children: "Digital"
                }, void 0, false, {
                    fileName: "[project]/components/home/HeroSection.tsx",
                    lineNumber: 275,
                    columnNumber: 197
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                    fileName: "[project]/components/home/HeroSection.tsx",
                    lineNumber: 275,
                    columnNumber: 243
                }, this),
                "Experiences"
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 275,
            columnNumber: 11
        }, this);
        $[21] = t18;
    } else {
        t18 = $[21];
    }
    let t19;
    if ($[22] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
            initial: {
                opacity: 0,
                y: 20
            },
            animate: {
                opacity: 1,
                y: 0
            },
            transition: {
                duration: 0.7,
                delay: 3.3
            },
            className: "font-sora text-lg text-fluke-muted max-w-2xl mx-auto mb-10",
            children: "An indie game studio pushing the limits of creativity — building immersive worlds, stunning art, and unforgettable experiences."
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 282,
            columnNumber: 11
        }, this);
        $[22] = t19;
    } else {
        t19 = $[22];
    }
    let t20;
    let t21;
    let t22;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t20 = {
            opacity: 0,
            y: 20
        };
        t21 = {
            opacity: 1,
            y: 0
        };
        t22 = {
            duration: 0.7,
            delay: 3.5
        };
        $[23] = t20;
        $[24] = t21;
        $[25] = t22;
    } else {
        t20 = $[23];
        t21 = $[24];
        t22 = $[25];
    }
    let t23;
    if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/games",
            className: "btn-primary px-8 py-4 rounded-xl text-base font-sora flex items-center gap-2 justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"], {
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/components/home/HeroSection.tsx",
                    lineNumber: 322,
                    columnNumber: 135
                }, this),
                "Explore Games"
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 322,
            columnNumber: 11
        }, this);
        $[26] = t23;
    } else {
        t23 = $[26];
    }
    let t24;
    if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t20,
            animate: t21,
            transition: t22,
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            children: [
                t23,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/contact",
                    className: "btn-outline px-8 py-4 rounded-xl text-base font-sora flex items-center gap-2 justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/components/home/HeroSection.tsx",
                            lineNumber: 329,
                            columnNumber: 258
                        }, this),
                        "Work With Us"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/home/HeroSection.tsx",
                    lineNumber: 329,
                    columnNumber: 132
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 329,
            columnNumber: 11
        }, this);
        $[27] = t24;
    } else {
        t24 = $[27];
    }
    let t25;
    let t26;
    let t27;
    if ($[28] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = {
            opacity: 0
        };
        t26 = {
            opacity: 1
        };
        t27 = {
            delay: 4,
            duration: 1
        };
        $[28] = t25;
        $[29] = t26;
        $[30] = t27;
    } else {
        t25 = $[28];
        t26 = $[29];
        t27 = $[30];
    }
    let t28;
    if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-sora text-xs tracking-widest uppercase",
            children: "Scroll"
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 358,
            columnNumber: 11
        }, this);
        $[31] = t28;
    } else {
        t28 = $[31];
    }
    let t29;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t25,
            animate: t26,
            transition: t27,
            className: "mt-20 flex flex-col items-center gap-2 text-fluke-muted/50",
            children: [
                t28,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        y: [
                            0,
                            8,
                            0
                        ]
                    },
                    transition: {
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        size: 18,
                        className: "text-fluke-yellow/60"
                    }, void 0, false, {
                        fileName: "[project]/components/home/HeroSection.tsx",
                        lineNumber: 371,
                        columnNumber: 10
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/home/HeroSection.tsx",
                    lineNumber: 365,
                    columnNumber: 144
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 365,
            columnNumber: 11
        }, this);
        $[32] = t29;
    } else {
        t29 = $[32];
    }
    let t30;
    if ($[33] !== t7) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            style: t7,
            className: "relative z-0 text-center px-6 max-w-5xl mx-auto pt-20",
            children: [
                t11,
                t12,
                t18,
                t19,
                t24,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 378,
            columnNumber: 11
        }, this);
        $[33] = t7;
        $[34] = t30;
    } else {
        t30 = $[34];
    }
    let t31;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-fluke-bg to-transparent"
        }, void 0, false, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 386,
            columnNumber: 11
        }, this);
        $[35] = t31;
    } else {
        t31 = $[35];
    }
    let t32;
    if ($[36] !== t30) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            ref: containerRef,
            className: "relative min-h-screen flex items-center justify-center overflow-hidden bg-fluke-bg",
            children: [
                t4,
                t5,
                t6,
                t30,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/HeroSection.tsx",
            lineNumber: 393,
            columnNumber: 11
        }, this);
        $[36] = t30;
        $[37] = t32;
    } else {
        t32 = $[37];
    }
    return t32;
}
_s1(HeroSection, "GXkg9+DG5j+XJmPQ16YJ7sVzOkY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c1 = HeroSection;
var _c, _c1;
__turbopack_context__.k.register(_c, "ParticleCanvas");
__turbopack_context__.k.register(_c1, "HeroSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/games.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "games",
    ()=>games
]);
const games = [
    {
        id: "1",
        slug: "neon-drift",
        title: "Neon Drift",
        genre: "Racing / Arcade",
        platforms: [
            "PC",
            "Mobile"
        ],
        status: "Released",
        releaseYear: 2024,
        description: "A high-octane neon racing experience through cyberpunk cityscapes.",
        longDescription: "Neon Drift is a fast-paced arcade racing game set in a sprawling cyberpunk metropolis. Drift through neon-lit streets, dodge obstacles, and race to the top of the leaderboard.",
        coverImage: "/games/neon-drift.jpg",
        screenshots: [],
        features: [
            "40+ tracks",
            "Online leaderboards",
            "Procedural city generation",
            "Custom car skins"
        ],
        tags: [
            "Racing",
            "Neon",
            "Arcade",
            "Cyberpunk"
        ]
    },
    {
        id: "2",
        slug: "shadow-realm",
        title: "Shadow Realm",
        genre: "Action RPG",
        platforms: [
            "PC",
            "Console"
        ],
        status: "In Development",
        releaseYear: 2025,
        description: "Descend into a dark fantasy realm where shadows are your greatest weapon.",
        longDescription: "Shadow Realm is an action RPG where you play as a Shade Hunter navigating a world consumed by darkness. Master shadow magic, craft powerful gear, and unravel ancient mysteries.",
        coverImage: "/games/shadow-realm.jpg",
        screenshots: [],
        features: [
            "Open world",
            "Dynamic shadow mechanics",
            "Deep crafting system",
            "Co-op mode"
        ],
        tags: [
            "RPG",
            "Dark Fantasy",
            "Action",
            "Open World"
        ]
    },
    {
        id: "3",
        slug: "pixel-warriors",
        title: "Pixel Warriors",
        genre: "Platformer",
        platforms: [
            "PC",
            "Mobile",
            "Web"
        ],
        status: "Released",
        releaseYear: 2023,
        description: "A retro pixel platformer with modern gameplay twists.",
        longDescription: "Pixel Warriors blends classic platformer nostalgia with modern design philosophy. Fight through 80+ levels of increasing challenge with tight controls and satisfying combat.",
        coverImage: "/games/pixel-warriors.jpg",
        screenshots: [],
        features: [
            "80+ levels",
            "Boss fights",
            "Unlockable characters",
            "Speedrun mode"
        ],
        tags: [
            "Platformer",
            "Pixel Art",
            "Retro",
            "Action"
        ]
    },
    {
        id: "4",
        slug: "star-forge",
        title: "Star Forge",
        genre: "Strategy / Survival",
        platforms: [
            "PC"
        ],
        status: "Coming Soon",
        releaseYear: 2025,
        description: "Build your galactic empire from nothing but cosmic dust.",
        longDescription: "Star Forge is a space survival strategy game where you mine asteroids, build space stations, recruit crew members, and expand your empire across the galaxy.",
        coverImage: "/games/star-forge.jpg",
        screenshots: [],
        features: [
            "Procedural galaxy",
            "Base building",
            "Resource management",
            "Multiplayer"
        ],
        tags: [
            "Strategy",
            "Survival",
            "Space",
            "Building"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/GamesShowcase.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GamesShowcase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$games$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/games.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript) <export default as Gamepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor.js [app-client] (ecmascript) <export default as Monitor>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/car.js [app-client] (ecmascript) <export default as Car>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/swords.js [app-client] (ecmascript) <export default as Swords>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$joystick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Joystick$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/joystick.js [app-client] (ecmascript) <export default as Joystick>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [app-client] (ecmascript) <export default as Rocket>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const artworkIcons = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$car$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Car$3e$__["Car"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$swords$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Swords$3e$__["Swords"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$joystick$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Joystick$3e$__["Joystick"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"]
];
const platformIcons = {
    PC: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Monitor$3e$__["Monitor"], {
        size: 12
    }, void 0, false, {
        fileName: "[project]/components/home/GamesShowcase.tsx",
        lineNumber: 11,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0)),
    Mobile: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"], {
        size: 12
    }, void 0, false, {
        fileName: "[project]/components/home/GamesShowcase.tsx",
        lineNumber: 12,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    Console: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"], {
        size: 12
    }, void 0, false, {
        fileName: "[project]/components/home/GamesShowcase.tsx",
        lineNumber: 13,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    Web: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
        size: 12
    }, void 0, false, {
        fileName: "[project]/components/home/GamesShowcase.tsx",
        lineNumber: 14,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0))
};
const statusColors = {
    Released: "text-green-400 bg-green-400/10 border-green-400/20",
    "In Development": "text-fluke-yellow bg-fluke-yellow/10 border-fluke-yellow/20",
    "Coming Soon": "text-purple-400 bg-purple-400/10 border-purple-400/20"
};
function GamesShowcase() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(25);
    if ($[0] !== "427621176043337353de86adba3a2e9f58efea1df0a02f32f65fb52012545bd4") {
        for(let $i = 0; $i < 25; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "427621176043337353de86adba3a2e9f58efea1df0a02f32f65fb52012545bd4";
    }
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            once: true,
            margin: "-100px"
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            opacity: 0,
            y: 30
        };
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== isInView) {
        t2 = isInView ? {
            opacity: 1,
            y: 0
        } : {};
        $[3] = isInView;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    let t4;
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            duration: 0.7
        };
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
            children: "Our Worlds"
        }, void 0, false, {
            fileName: "[project]/components/home/GamesShowcase.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-bebas text-5xl sm:text-7xl text-fluke-text yellow-line",
            children: "Games We've Built"
        }, void 0, false, {
            fileName: "[project]/components/home/GamesShowcase.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, this);
        $[5] = t3;
        $[6] = t4;
        $[7] = t5;
    } else {
        t3 = $[5];
        t4 = $[6];
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t2) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-6 mb-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: t1,
                animate: t2,
                transition: t3,
                children: [
                    t4,
                    t5
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/GamesShowcase.tsx",
                lineNumber: 81,
                columnNumber: 56
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/home/GamesShowcase.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[8] = t2;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== isInView) {
        t7 = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$games$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["games"].map({
            "GamesShowcase[games.map()]": (game, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        x: 60
                    },
                    animate: isInView ? {
                        opacity: 1,
                        x: 0
                    } : {},
                    transition: {
                        duration: 0.6,
                        delay: i * 0.1
                    },
                    className: "flex-none w-72 md:w-80",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/games/${game.slug}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "group relative rounded-3xl overflow-hidden bg-[#0c0c0c] border border-fluke-yellow/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(245,197,66,0.15)] h-[420px] isolate",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 flex items-center justify-center opacity-30 group-hover:opacity-40",
                                            style: {
                                                background: `linear-gradient(135deg, hsl(${i * 60 + 20}, 40%, 15%) 0%, hsl(${i * 60}, 50%, 8%) 100%)`
                                            },
                                            children: (()=>{
                                                const Icon = artworkIcons[i % 4];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 120,
                                                    strokeWidth: 0.5,
                                                    className: "text-fluke-yellow/40 mix-blend-overlay"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/home/GamesShowcase.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 26
                                                }, this);
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/GamesShowcase.tsx",
                                            lineNumber: 99,
                                            columnNumber: 337
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/80 to-transparent z-10"
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/GamesShowcase.tsx",
                                            lineNumber: 104,
                                            columnNumber: 28
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/home/GamesShowcase.tsx",
                                    lineNumber: 99,
                                    columnNumber: 299
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-6 left-6",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-[10px] font-orbitron tracking-widest uppercase px-3 py-1 rounded-full border backdrop-blur-md ${statusColors[game.status]}`,
                                                children: game.status
                                            }, void 0, false, {
                                                fileName: "[project]/components/home/GamesShowcase.tsx",
                                                lineNumber: 104,
                                                columnNumber: 254
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/GamesShowcase.tsx",
                                            lineNumber: 104,
                                            columnNumber: 215
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-orbitron text-xs text-fluke-yellow tracking-widest uppercase",
                                                            children: game.genre
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/home/GamesShowcase.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 575
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "w-1 h-1 rounded-full bg-fluke-muted/40"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/home/GamesShowcase.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 678
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-sora text-xs text-fluke-muted",
                                                            children: game.releaseYear
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/home/GamesShowcase.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 737
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/home/GamesShowcase.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 529
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bebas text-4xl text-fluke-text group-hover:text-fluke-white transition-colors mb-3 tracking-wide",
                                                    children: game.title
                                                }, void 0, false, {
                                                    fileName: "[project]/components/home/GamesShowcase.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 821
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-sora text-sm text-fluke-muted line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100",
                                                    children: game.description
                                                }, void 0, false, {
                                                    fileName: "[project]/components/home/GamesShowcase.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 956
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2 items-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs font-sora text-fluke-muted mr-2",
                                                            children: "Platforms:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/home/GamesShowcase.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 1163
                                                        }, this),
                                                        game.platforms.map(_GamesShowcaseGamesMapGamePlatformsMap)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/home/GamesShowcase.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 1122
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/home/GamesShowcase.tsx",
                                            lineNumber: 104,
                                            columnNumber: 428
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/home/GamesShowcase.tsx",
                                    lineNumber: 104,
                                    columnNumber: 139
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2 border-fluke-yellow/30 z-30"
                                }, void 0, false, {
                                    fileName: "[project]/components/home/GamesShowcase.tsx",
                                    lineNumber: 104,
                                    columnNumber: 1314
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/home/GamesShowcase.tsx",
                            lineNumber: 99,
                            columnNumber: 80
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/GamesShowcase.tsx",
                        lineNumber: 99,
                        columnNumber: 45
                    }, this)
                }, game.id, false, {
                    fileName: "[project]/components/home/GamesShowcase.tsx",
                    lineNumber: 90,
                    columnNumber: 50
                }, this)
        }["GamesShowcase[games.map()]"]);
        $[10] = isInView;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            opacity: 0,
            x: 60
        };
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== isInView) {
        t9 = isInView ? {
            opacity: 1,
            x: 0
        } : {};
        $[13] = isInView;
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = {
            duration: 0.6,
            delay: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$games$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["games"].length * 0.1
        };
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/games",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-96 rounded-2xl border border-dashed border-fluke-yellow/20 flex flex-col items-center justify-center gap-4 hover:border-fluke-yellow/50 hover:bg-fluke-yellow/5 transition-all duration-300 group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 rounded-full border border-fluke-yellow/30 flex items-center justify-center group-hover:border-fluke-yellow/60 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"], {
                            size: 28,
                            className: "text-fluke-yellow/60 group-hover:text-fluke-yellow transition-colors"
                        }, void 0, false, {
                            fileName: "[project]/components/home/GamesShowcase.tsx",
                            lineNumber: 144,
                            columnNumber: 400
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/GamesShowcase.tsx",
                        lineNumber: 144,
                        columnNumber: 244
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-orbitron text-sm text-fluke-muted group-hover:text-fluke-yellow transition-colors",
                        children: "View All Games"
                    }, void 0, false, {
                        fileName: "[project]/components/home/GamesShowcase.tsx",
                        lineNumber: 144,
                        columnNumber: 509
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/GamesShowcase.tsx",
                lineNumber: 144,
                columnNumber: 31
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/home/GamesShowcase.tsx",
            lineNumber: 144,
            columnNumber: 11
        }, this);
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t8,
            animate: t9,
            transition: t10,
            className: "flex-none w-72 md:w-80",
            children: t11
        }, void 0, false, {
            fileName: "[project]/components/home/GamesShowcase.tsx",
            lineNumber: 151,
            columnNumber: 11
        }, this);
        $[17] = t9;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] !== t12 || $[20] !== t7) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "horizontal-scroll flex gap-6 px-6 pb-6 md:px-10",
            children: [
                t7,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/GamesShowcase.tsx",
            lineNumber: 159,
            columnNumber: 11
        }, this);
        $[19] = t12;
        $[20] = t7;
        $[21] = t13;
    } else {
        t13 = $[21];
    }
    let t14;
    if ($[22] !== t13 || $[23] !== t6) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-32 bg-fluke-bg overflow-hidden",
            ref: ref,
            children: [
                t6,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/GamesShowcase.tsx",
            lineNumber: 168,
            columnNumber: 11
        }, this);
        $[22] = t13;
        $[23] = t6;
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    return t14;
}
_s(GamesShowcase, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = GamesShowcase;
function _GamesShowcaseGamesMapGamePlatformsMap(p) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        title: p,
        className: "flex items-center justify-center w-8 h-8 text-fluke-muted/80 bg-white/5 hover:bg-white/10 hover:text-fluke-yellow border border-white/5 rounded-full backdrop-blur-sm transition-all",
        children: platformIcons[p]
    }, p, false, {
        fileName: "[project]/components/home/GamesShowcase.tsx",
        lineNumber: 178,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "GamesShowcase");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/data/services.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "services",
    ()=>services
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript) <export default as Gamepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wrench.js [app-client] (ecmascript) <export default as Wrench>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cuboid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cuboid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cuboid.js [app-client] (ecmascript) <export default as Cuboid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [app-client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clapperboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clapperboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clapperboard.js [app-client] (ecmascript) <export default as Clapperboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scissors.js [app-client] (ecmascript) <export default as Scissors>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
;
const services = [
    {
        id: "1",
        slug: "indie-game-development",
        title: "Indie Game Development",
        description: "Full-cycle game development from concept to launch.",
        longDescription: "We handle every stage of game development — from initial concept and game design to programming, art, audio, and QA. We ship polished, fun experiences.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"],
        category: "Development",
        features: [
            "Concept Design",
            "Gameplay Programming",
            "Multiplayer Systems",
            "QA & Optimization"
        ]
    },
    {
        id: "2",
        slug: "game-design-consulting",
        title: "Game Design Consulting",
        description: "Expert advice on mechanics, systems, and player experience.",
        longDescription: "Our experienced game designers review your project and provide actionable feedback on game feel, balance, progression, and player retention.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"],
        category: "Consulting",
        features: [
            "Game Feel Analysis",
            "Balance Reviews",
            "Monetization Strategy",
            "UX Flow"
        ]
    },
    {
        id: "3",
        slug: "unity-unreal-development",
        title: "Unity / Unreal Development",
        description: "Professional game development on industry-standard engines.",
        longDescription: "Expert Unity and Unreal Engine developers delivering optimized, scalable game builds for any platform.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wrench$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wrench$3e$__["Wrench"],
        category: "Development",
        features: [
            "Unity 6",
            "Unreal Engine 5",
            "Cross-platform builds",
            "Performance profiling"
        ]
    },
    {
        id: "4",
        slug: "3d-modeling",
        title: "3D Modeling",
        description: "High-quality 3D assets for games, cinematics, and VR/AR.",
        longDescription: "From low-poly stylized characters to hyper-realistic environments, our 3D team delivers assets optimized for your target platform.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cuboid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cuboid$3e$__["Cuboid"],
        category: "Art",
        features: [
            "Characters & Props",
            "Environment Art",
            "Rigging & Skinning",
            "LOD Setup"
        ]
    },
    {
        id: "5",
        slug: "game-art-animation",
        title: "Game Art & Animation",
        description: "Stunning 2D/3D art and smooth animations for your game.",
        longDescription: "Concept art, sprites, UI design, and character animation — we create cohesive visual identities that bring your game world to life.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"],
        category: "Art",
        features: [
            "Concept Art",
            "2D Sprites",
            "UI/UX Design",
            "Character Animation"
        ]
    },
    {
        id: "6",
        slug: "sound-design-music",
        title: "Sound Design / Music",
        description: "Immersive audio that elevates your game's atmosphere.",
        longDescription: "Original soundtracks, SFX, dynamic audio systems — our sound team crafts audio experiences that make your world feel alive.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"],
        category: "Audio",
        features: [
            "Original OST",
            "SFX Library",
            "Adaptive Audio",
            "Voice Direction"
        ]
    },
    {
        id: "7",
        slug: "publishing-support",
        title: "Publishing Support",
        description: "Get your game in front of the right audiences.",
        longDescription: "From store page optimization to trailer production, we help indie devs navigate publishing on Steam, mobile, and console.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"],
        category: "Publishing",
        features: [
            "Store Page Setup",
            "Trailer Production",
            "Marketing Strategy",
            "Launch Support"
        ]
    },
    {
        id: "8",
        slug: "game-trailers-cinematics",
        title: "Game Trailers / Cinematics",
        description: "Cinematic trailers that sell your game on first view.",
        longDescription: "We produce gameplay trailers, story cinematic trailers, and announcement teasers that capture the essence of your game.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clapperboard$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clapperboard$3e$__["Clapperboard"],
        category: "Video",
        features: [
            "Gameplay Capture",
            "Cinematic Editing",
            "Motion Graphics",
            "Color Grading"
        ]
    },
    {
        id: "9",
        slug: "asset-store-content",
        title: "Asset Store Content",
        description: "Professional assets for Unity Asset Store & Fab.",
        longDescription: "We create and publish premium asset packs for Unity and Unreal marketplaces — models, shaders, templates, and tools.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"],
        category: "Assets",
        features: [
            "Unity Assets",
            "Unreal Fab",
            "Shader Packs",
            "Environment Kits"
        ]
    },
    {
        id: "10",
        slug: "contract-development",
        title: "Contract Development",
        description: "Dedicated dev resources for your studio or project.",
        longDescription: "Need extra firepower? We embed skilled engineers, artists, and designers into your team on a contract basis.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
        category: "Development",
        features: [
            "Dedicated Engineers",
            "Remote Team Integration",
            "Flexible Hours",
            "NDA Protected"
        ]
    },
    {
        id: "11",
        slug: "video-editing",
        title: "Video Editing",
        description: "Professional editing for devlogs, trailers, and social content.",
        longDescription: "From raw footage to polished social clips, reels, and YouTube content — we handle it all.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scissors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scissors$3e$__["Scissors"],
        category: "Video",
        features: [
            "Devlog Editing",
            "Social Reels",
            "Gameplay Highlights",
            "Subtitle & Captions"
        ]
    },
    {
        id: "12",
        slug: "web-development",
        title: "Web Development",
        description: "Stunning game studio websites, landing pages, and portals.",
        longDescription: "We build immersive game studio websites, game landing pages, and fan portals using modern web tech.",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        category: "Web",
        features: [
            "Next.js / React",
            "3D Web Experiences",
            "CMS Integration",
            "SEO Optimization"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/ServicesGrid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServicesGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/services.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function ServicesGrid() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(27);
    if ($[0] !== "23637c2e71d8a664e7a147554fe91cf389cccc6476f3f6ed5793c8270d87b0d6") {
        for(let $i = 0; $i < 27; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "23637c2e71d8a664e7a147554fe91cf389cccc6476f3f6ed5793c8270d87b0d6";
    }
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            once: true,
            margin: "-100px"
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fluke-yellow/[0.02] rounded-full blur-3xl pointer-events-none"
        }, void 0, false, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 31,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            opacity: 0,
            y: 30
        };
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== isInView) {
        t3 = isInView ? {
            opacity: 1,
            y: 0
        } : {};
        $[4] = isInView;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            duration: 0.7
        };
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    let t6;
    let t7;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
            children: "What We Do"
        }, void 0, false, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-bebas text-5xl sm:text-7xl text-fluke-text",
            children: "Our Services"
        }, void 0, false, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-sora text-fluke-muted max-w-xl mx-auto mt-4",
            children: "From concept to launch — we offer end-to-end creative and technical services for game developers and studios worldwide."
        }, void 0, false, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        $[7] = t5;
        $[8] = t6;
        $[9] = t7;
    } else {
        t5 = $[7];
        t6 = $[8];
        t7 = $[9];
    }
    let t8;
    if ($[10] !== t3) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t2,
            animate: t3,
            transition: t4,
            className: "mb-16 text-center",
            children: [
                t5,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        $[10] = t3;
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== isInView) {
        t9 = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$services$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["services"].map({
            "ServicesGrid[services.map()]": (service, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 40
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.5,
                        delay: i * 0.05
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/services#${service.slug}`,
                        className: "block h-full group",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative p-8 rounded-3xl bg-[#0e0e0e] border border-fluke-yellow/10 overflow-hidden h-full min-h-[220px] flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-fluke-yellow/40 hover:shadow-[0_10px_40px_-10px_rgba(245,197,66,0.15)] isolate",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-gradient-to-br from-fluke-yellow/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                                }, void 0, false, {
                                    fileName: "[project]/components/home/ServicesGrid.tsx",
                                    lineNumber: 101,
                                    columnNumber: 359
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute -top-10 -right-10 w-32 h-32 bg-fluke-yellow/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none"
                                }, void 0, false, {
                                    fileName: "[project]/components/home/ServicesGrid.tsx",
                                    lineNumber: 101,
                                    columnNumber: 523
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-fluke-yellow/70 group-hover:text-fluke-yellow group-hover:bg-fluke-yellow/10 group-hover:scale-110 transition-all duration-500 mb-6",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(service.icon, {
                                        size: 24,
                                        strokeWidth: 1.5
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/ServicesGrid.tsx",
                                        lineNumber: 101,
                                        columnNumber: 965
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/home/ServicesGrid.tsx",
                                    lineNumber: 101,
                                    columnNumber: 710
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 flex items-center gap-2 mb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-1.5 h-1.5 rounded-full bg-fluke-yellow/50 group-hover:bg-fluke-yellow transition-colors duration-500"
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/ServicesGrid.tsx",
                                            lineNumber: 101,
                                            columnNumber: 1075
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] font-orbitron tracking-[0.2em] text-fluke-muted group-hover:text-fluke-text uppercase transition-colors duration-500",
                                            children: service.category
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/ServicesGrid.tsx",
                                            lineNumber: 101,
                                            columnNumber: 1198
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/home/ServicesGrid.tsx",
                                    lineNumber: 101,
                                    columnNumber: 1015
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "relative z-10 font-bebas text-2xl tracking-wide text-fluke-text group-hover:text-white transition-colors mb-3",
                                    children: service.title
                                }, void 0, false, {
                                    fileName: "[project]/components/home/ServicesGrid.tsx",
                                    lineNumber: 101,
                                    columnNumber: 1376
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "relative z-10 font-sora text-sm text-fluke-muted line-clamp-2 md:line-clamp-3 flex-1 opacity-80 group-hover:opacity-100 transition-opacity duration-500",
                                    children: service.description
                                }, void 0, false, {
                                    fileName: "[project]/components/home/ServicesGrid.tsx",
                                    lineNumber: 101,
                                    columnNumber: 1522
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative z-10 mt-6 pt-4 border-t border-white/5 flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] font-orbitron tracking-widest text-fluke-muted group-hover:text-fluke-yellow uppercase transition-colors duration-300",
                                            children: "Explore"
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/ServicesGrid.tsx",
                                            lineNumber: 101,
                                            columnNumber: 1813
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-8 h-8 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-fluke-yellow group-hover:text-[#0a0a0a] text-fluke-muted transition-all duration-300 transform group-hover:translate-x-1",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                size: 14
                                            }, void 0, false, {
                                                fileName: "[project]/components/home/ServicesGrid.tsx",
                                                lineNumber: 101,
                                                columnNumber: 2193
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/ServicesGrid.tsx",
                                            lineNumber: 101,
                                            columnNumber: 1975
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/home/ServicesGrid.tsx",
                                    lineNumber: 101,
                                    columnNumber: 1714
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/home/ServicesGrid.tsx",
                            lineNumber: 101,
                            columnNumber: 82
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/ServicesGrid.tsx",
                        lineNumber: 101,
                        columnNumber: 10
                    }, this)
                }, service.id, false, {
                    fileName: "[project]/components/home/ServicesGrid.tsx",
                    lineNumber: 92,
                    columnNumber: 55
                }, this)
        }["ServicesGrid[services.map()]"]);
        $[12] = isInView;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
            children: t9
        }, void 0, false, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 110,
            columnNumber: 11
        }, this);
        $[14] = t9;
        $[15] = t10;
    } else {
        t10 = $[15];
    }
    let t11;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = {
            opacity: 0,
            y: 20
        };
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] !== isInView) {
        t12 = isInView ? {
            opacity: 1,
            y: 0
        } : {};
        $[17] = isInView;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = {
            duration: 0.6,
            delay: 0.8
        };
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/services",
            className: "btn-outline px-8 py-3 rounded-xl font-sora inline-flex items-center gap-2",
            children: [
                "View All Services",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                    size: 16
                }, void 0, false, {
                    fileName: "[project]/components/home/ServicesGrid.tsx",
                    lineNumber: 149,
                    columnNumber: 137
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[20] = t14;
    } else {
        t14 = $[20];
    }
    let t15;
    if ($[21] !== t12) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t11,
            animate: t12,
            transition: t13,
            className: "text-center mt-12",
            children: t14
        }, void 0, false, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 156,
            columnNumber: 11
        }, this);
        $[21] = t12;
        $[22] = t15;
    } else {
        t15 = $[22];
    }
    let t16;
    if ($[23] !== t10 || $[24] !== t15 || $[25] !== t8) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-32 bg-fluke-surface relative overflow-hidden",
            ref: ref,
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6",
                    children: [
                        t8,
                        t10,
                        t15
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/home/ServicesGrid.tsx",
                    lineNumber: 164,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/ServicesGrid.tsx",
            lineNumber: 164,
            columnNumber: 11
        }, this);
        $[23] = t10;
        $[24] = t15;
        $[25] = t8;
        $[26] = t16;
    } else {
        t16 = $[26];
    }
    return t16;
}
_s(ServicesGrid, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = ServicesGrid;
var _c;
__turbopack_context__.k.register(_c, "ServicesGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/StudioCapabilities.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudioCapabilities
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$countup$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-countup/build/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-intersection-observer/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const stats = [
    {
        label: "Games Developed",
        value: 12,
        suffix: "+"
    },
    {
        label: "Assets Created",
        value: 500,
        suffix: "+"
    },
    {
        label: "Clients Worked With",
        value: 30,
        suffix: "+"
    },
    {
        label: "Engines Used",
        value: 5,
        suffix: ""
    }
];
const capabilities = [
    {
        label: "Unity",
        percent: 95
    },
    {
        label: "Unreal Engine 5",
        percent: 82
    },
    {
        label: "3D Art (Blender)",
        percent: 90
    },
    {
        label: "Web Development",
        percent: 88
    },
    {
        label: "Sound Design",
        percent: 78
    },
    {
        label: "Game Design",
        percent: 92
    }
];
function StatCard(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "03a894a60669e775e9f06d6a88980b264868cd0ee720475e7a65b911268979c5") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "03a894a60669e775e9f06d6a88980b264868cd0ee720475e7a65b911268979c5";
    }
    const { stat, delay } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            threshold: 0.4,
            triggerOnce: true
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const { ref, inView } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(t1);
    let t2;
    if ($[2] !== delay || $[3] !== inView || $[4] !== stat.value) {
        t2 = inView && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$countup$2f$build$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            start: 0,
            end: stat.value,
            duration: 2,
            delay: delay
        }, void 0, false, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 72,
            columnNumber: 20
        }, this);
        $[2] = delay;
        $[3] = inView;
        $[4] = stat.value;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] !== stat.suffix || $[7] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-orbitron text-5xl font-bold gradient-text mb-2",
            children: [
                t2,
                stat.suffix
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[6] = stat.suffix;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== stat.label) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-sora text-sm text-fluke-muted",
            children: stat.label
        }, void 0, false, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        $[9] = stat.label;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none glow-box-yellow"
        }, void 0, false, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 99,
            columnNumber: 10
        }, this);
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== ref || $[13] !== t3 || $[14] !== t4) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            className: "relative p-8 rounded-2xl bg-fluke-bg border border-fluke-yellow/10 text-center group hover:border-fluke-yellow/30 transition-all duration-300",
            children: [
                t3,
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 106,
            columnNumber: 10
        }, this);
        $[12] = ref;
        $[13] = t3;
        $[14] = t4;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    return t6;
}
_s(StatCard, "vEzS9BD89CCGbpRFCWWpAfF1nqs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$intersection$2d$observer$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = StatCard;
function StudioCapabilities() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "03a894a60669e775e9f06d6a88980b264868cd0ee720475e7a65b911268979c5") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "03a894a60669e775e9f06d6a88980b264868cd0ee720475e7a65b911268979c5";
    }
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            once: true,
            margin: "-100px"
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            opacity: 0,
            y: 30
        };
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== isInView) {
        t2 = isInView ? {
            opacity: 1,
            y: 0
        } : {};
        $[3] = isInView;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            duration: 0.7
        };
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
            children: "By the Numbers"
        }, void 0, false, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 169,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-bebas text-5xl sm:text-7xl text-fluke-text",
            children: "Studio Capabilities"
        }, void 0, false, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 170,
            columnNumber: 10
        }, this);
        $[6] = t4;
        $[7] = t5;
    } else {
        t4 = $[6];
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t2) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t1,
            animate: t2,
            transition: t3,
            className: "mb-16 text-center",
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 179,
            columnNumber: 10
        }, this);
        $[8] = t2;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== isInView) {
        t7 = stats.map({
            "StudioCapabilities[stats.map()]": (stat, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 30
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.5,
                        delay: i * 0.1
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        stat: stat,
                        delay: i * 0.2
                    }, void 0, false, {
                        fileName: "[project]/components/home/StudioCapabilities.tsx",
                        lineNumber: 197,
                        columnNumber: 10
                    }, this)
                }, stat.label, false, {
                    fileName: "[project]/components/home/StudioCapabilities.tsx",
                    lineNumber: 188,
                    columnNumber: 55
                }, this)
        }["StudioCapabilities[stats.map()]"]);
        $[10] = isInView;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20",
            children: t7
        }, void 0, false, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 206,
            columnNumber: 10
        }, this);
        $[12] = t7;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== isInView) {
        t9 = capabilities.map({
            "StudioCapabilities[capabilities.map()]": (cap, i_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        x: -30
                    },
                    animate: isInView ? {
                        opacity: 1,
                        x: 0
                    } : {},
                    transition: {
                        duration: 0.5,
                        delay: 0.4 + i_0 * 0.1
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-sora text-sm text-fluke-muted",
                                    children: cap.label
                                }, void 0, false, {
                                    fileName: "[project]/components/home/StudioCapabilities.tsx",
                                    lineNumber: 224,
                                    columnNumber: 66
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-orbitron text-xs text-fluke-yellow",
                                    children: [
                                        cap.percent,
                                        "%"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/home/StudioCapabilities.tsx",
                                    lineNumber: 224,
                                    columnNumber: 137
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/home/StudioCapabilities.tsx",
                            lineNumber: 224,
                            columnNumber: 10
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-1.5 bg-fluke-surface rounded-full overflow-hidden",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    width: 0
                                },
                                animate: isInView ? {
                                    width: `${cap.percent}%`
                                } : {},
                                transition: {
                                    duration: 1.2,
                                    delay: 0.5 + i_0 * 0.12,
                                    ease: "easeOut"
                                },
                                className: "h-full rounded-full",
                                style: {
                                    background: "linear-gradient(90deg, #F5C542, #FFD86B)",
                                    boxShadow: "0 0 10px #F5C54288"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/home/StudioCapabilities.tsx",
                                lineNumber: 224,
                                columnNumber: 291
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/home/StudioCapabilities.tsx",
                            lineNumber: 224,
                            columnNumber: 222
                        }, this)
                    ]
                }, cap.label, true, {
                    fileName: "[project]/components/home/StudioCapabilities.tsx",
                    lineNumber: 215,
                    columnNumber: 63
                }, this)
        }["StudioCapabilities[capabilities.map()]"]);
        $[14] = isInView;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-8",
            children: t9
        }, void 0, false, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 244,
            columnNumber: 11
        }, this);
        $[16] = t9;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] !== t10 || $[19] !== t6 || $[20] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-32 bg-fluke-bg relative",
            ref: ref,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-6",
                children: [
                    t6,
                    t8,
                    t10
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/StudioCapabilities.tsx",
                lineNumber: 252,
                columnNumber: 69
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/home/StudioCapabilities.tsx",
            lineNumber: 252,
            columnNumber: 11
        }, this);
        $[18] = t10;
        $[19] = t6;
        $[20] = t8;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    return t11;
}
_s1(StudioCapabilities, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c1 = StudioCapabilities;
var _c, _c1;
__turbopack_context__.k.register(_c, "StatCard");
__turbopack_context__.k.register(_c1, "StudioCapabilities");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/components/home/FeaturedPortfolio.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FeaturedPortfolio
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
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
function FeaturedPortfolio() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(52);
    if ($[0] !== "3ad24c4d1701af71de9cf43c8a60442f5850b9ed04becd216ad32e50291c2b14") {
        for(let $i = 0; $i < 52; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3ad24c4d1701af71de9cf43c8a60442f5850b9ed04becd216ad32e50291c2b14";
    }
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            once: true,
            margin: "-100px"
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, t0);
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    let T0;
    let T1;
    let t1;
    let t2;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[2] !== active || $[3] !== isInView) {
        const filtered = active === "All" ? __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolio"] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolio"].filter({
            "FeaturedPortfolio[portfolio.filter()]": (p)=>p.category === active
        }["FeaturedPortfolio[portfolio.filter()]"]);
        let t10;
        if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
            t10 = {
                Games: "#4ade80",
                Assets: "#60a5fa",
                Trailers: "#f472b6",
                Websites: "#a78bfa",
                Art: "#fb923c"
            };
            $[15] = t10;
        } else {
            t10 = $[15];
        }
        const categoryColors = t10;
        t8 = "py-32 bg-fluke-surface";
        t9 = ref;
        t5 = "max-w-7xl mx-auto px-6";
        let t11;
        if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
            t11 = {
                opacity: 0,
                y: 30
            };
            $[16] = t11;
        } else {
            t11 = $[16];
        }
        let t12;
        if ($[17] !== isInView) {
            t12 = isInView ? {
                opacity: 1,
                y: 0
            } : {};
            $[17] = isInView;
            $[18] = t12;
        } else {
            t12 = $[18];
        }
        let t13;
        if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
            t13 = {
                duration: 0.7
            };
            $[19] = t13;
        } else {
            t13 = $[19];
        }
        let t14;
        let t15;
        if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
            t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
                children: "Our Work"
            }, void 0, false, {
                fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                lineNumber: 96,
                columnNumber: 13
            }, this);
            t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-bebas text-5xl sm:text-7xl text-fluke-text yellow-line",
                children: "Featured Portfolio"
            }, void 0, false, {
                fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                lineNumber: 97,
                columnNumber: 13
            }, this);
            $[20] = t14;
            $[21] = t15;
        } else {
            t14 = $[20];
            t15 = $[21];
        }
        if ($[22] !== t12) {
            t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: t11,
                animate: t12,
                transition: t13,
                className: "mb-12",
                children: [
                    t14,
                    t15
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                lineNumber: 105,
                columnNumber: 12
            }, this);
            $[22] = t12;
            $[23] = t6;
        } else {
            t6 = $[23];
        }
        let t16;
        if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
            t16 = {
                opacity: 0,
                y: 20
            };
            $[24] = t16;
        } else {
            t16 = $[24];
        }
        let t17;
        if ($[25] !== isInView) {
            t17 = isInView ? {
                opacity: 1,
                y: 0
            } : {};
            $[25] = isInView;
            $[26] = t17;
        } else {
            t17 = $[26];
        }
        let t18;
        if ($[27] === Symbol.for("react.memo_cache_sentinel")) {
            t18 = {
                duration: 0.5,
                delay: 0.2
            };
            $[27] = t18;
        } else {
            t18 = $[27];
        }
        let t19;
        if ($[28] !== active) {
            t19 = categories.map({
                "FeaturedPortfolio[categories.map()]": (cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: {
                            "FeaturedPortfolio[categories.map() > <button>.onClick]": ()=>setActive(cat)
                        }["FeaturedPortfolio[categories.map() > <button>.onClick]"],
                        className: `px-5 py-2 rounded-full font-sora text-sm border transition-all duration-300 ${active === cat ? "bg-fluke-yellow border-fluke-yellow text-fluke-bg font-semibold" : "border-fluke-yellow/20 text-fluke-muted hover:border-fluke-yellow/40 hover:text-fluke-text"}`,
                        children: cat
                    }, cat, false, {
                        fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                        lineNumber: 145,
                        columnNumber: 55
                    }, this)
            }["FeaturedPortfolio[categories.map()]"]);
            $[28] = active;
            $[29] = t19;
        } else {
            t19 = $[29];
        }
        if ($[30] !== t17 || $[31] !== t19) {
            t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: t16,
                animate: t17,
                transition: t18,
                className: "flex flex-wrap gap-3 mb-10",
                children: t19
            }, void 0, false, {
                fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                lineNumber: 155,
                columnNumber: 12
            }, this);
            $[30] = t17;
            $[31] = t19;
            $[32] = t7;
        } else {
            t7 = $[32];
        }
        T1 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div;
        t3 = true;
        t4 = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";
        T0 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"];
        t1 = "popLayout";
        let t20;
        if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
            t20 = ({
                "FeaturedPortfolio[filtered.map()]": (item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                            delay: i * 0.06
                        },
                        className: "group relative rounded-2xl overflow-hidden bg-fluke-bg border border-fluke-yellow/10 card-hover cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-52 overflow-hidden flex items-center justify-center text-6xl",
                                style: {
                                    background: `linear-gradient(135deg, hsl(${i * 50}, 30%, 8%) 0%, hsl(${i * 50 + 40}, 50%, 14%) 100%)`
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
                                                fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                                                lineNumber: 186,
                                                columnNumber: 24
                                            }, this);
                                        })()
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                                        lineNumber: 184,
                                        columnNumber: 14
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
                                        fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                                        lineNumber: 187,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                                lineNumber: 182,
                                columnNumber: 135
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-sora font-semibold text-sm text-fluke-text group-hover:text-fluke-yellow transition-colors mb-1",
                                        children: item.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                                        lineNumber: 191,
                                        columnNumber: 64
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-sora text-xs text-fluke-muted mb-3 line-clamp-2",
                                        children: item.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                                        lineNumber: 191,
                                        columnNumber: 198
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-1.5",
                                        children: item.tools.map(_FeaturedPortfolioFilteredMapItemToolsMap)
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                                        lineNumber: 191,
                                        columnNumber: 288
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                                lineNumber: 191,
                                columnNumber: 43
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/components/home/FeaturedPortfolio.tsx",
                        lineNumber: 170,
                        columnNumber: 59
                    }, this)
            })["FeaturedPortfolio[filtered.map()]"];
            $[33] = t20;
        } else {
            t20 = $[33];
        }
        t2 = filtered.map(t20);
        $[2] = active;
        $[3] = isInView;
        $[4] = T0;
        $[5] = T1;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
        $[10] = t5;
        $[11] = t6;
        $[12] = t7;
        $[13] = t8;
        $[14] = t9;
    } else {
        T0 = $[4];
        T1 = $[5];
        t1 = $[6];
        t2 = $[7];
        t3 = $[8];
        t4 = $[9];
        t5 = $[10];
        t6 = $[11];
        t7 = $[12];
        t8 = $[13];
        t9 = $[14];
    }
    let t10;
    if ($[34] !== T0 || $[35] !== t1 || $[36] !== t2) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T0, {
            mode: t1,
            children: t2
        }, void 0, false, {
            fileName: "[project]/components/home/FeaturedPortfolio.tsx",
            lineNumber: 226,
            columnNumber: 11
        }, this);
        $[34] = T0;
        $[35] = t1;
        $[36] = t2;
        $[37] = t10;
    } else {
        t10 = $[37];
    }
    let t11;
    if ($[38] !== T1 || $[39] !== t10 || $[40] !== t3 || $[41] !== t4) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(T1, {
            layout: t3,
            className: t4,
            children: t10
        }, void 0, false, {
            fileName: "[project]/components/home/FeaturedPortfolio.tsx",
            lineNumber: 236,
            columnNumber: 11
        }, this);
        $[38] = T1;
        $[39] = t10;
        $[40] = t3;
        $[41] = t4;
        $[42] = t11;
    } else {
        t11 = $[42];
    }
    let t12;
    if ($[43] !== t11 || $[44] !== t5 || $[45] !== t6 || $[46] !== t7) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t5,
            children: [
                t6,
                t7,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/FeaturedPortfolio.tsx",
            lineNumber: 247,
            columnNumber: 11
        }, this);
        $[43] = t11;
        $[44] = t5;
        $[45] = t6;
        $[46] = t7;
        $[47] = t12;
    } else {
        t12 = $[47];
    }
    let t13;
    if ($[48] !== t12 || $[49] !== t8 || $[50] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: t8,
            ref: t9,
            children: t12
        }, void 0, false, {
            fileName: "[project]/components/home/FeaturedPortfolio.tsx",
            lineNumber: 258,
            columnNumber: 11
        }, this);
        $[48] = t12;
        $[49] = t8;
        $[50] = t9;
        $[51] = t13;
    } else {
        t13 = $[51];
    }
    return t13;
}
_s(FeaturedPortfolio, "5tCTGqHQmPjBngV2ZmrFLvx0wBU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = FeaturedPortfolio;
function _FeaturedPortfolioFilteredMapItemToolsMap(tool) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[10px] font-sora px-2 py-0.5 rounded bg-fluke-surface text-fluke-muted border border-fluke-yellow/10",
        children: tool
    }, tool, false, {
        fileName: "[project]/components/home/FeaturedPortfolio.tsx",
        lineNumber: 269,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "FeaturedPortfolio");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/DevlogsPreview.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DevlogsPreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const devIcons = [
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"],
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"]
];
const categoryColors = {
    Unity: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Design: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    "Studio Updates": "text-green-400 bg-green-400/10 border-green-400/20"
};
function DevlogsPreview() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "dd828d8df797c5f6900390441d403315c2de0ba0144143b1142801caed1819d9") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "dd828d8df797c5f6900390441d403315c2de0ba0144143b1142801caed1819d9";
    }
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            once: true,
            margin: "-100px"
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            opacity: 0,
            y: 30
        };
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== isInView) {
        t2 = isInView ? {
            opacity: 1,
            y: 0
        } : {};
        $[3] = isInView;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            duration: 0.7
        };
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
                    children: "Behind the Scenes"
                }, void 0, false, {
                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                    lineNumber: 67,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "font-bebas text-5xl sm:text-7xl text-fluke-text yellow-line",
                    children: "Dev Logs"
                }, void 0, false, {
                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                    lineNumber: 67,
                    columnNumber: 123
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/DevlogsPreview.tsx",
            lineNumber: 67,
            columnNumber: 10
        }, this);
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/devlogs",
            className: "btn-outline px-6 py-2.5 rounded-xl font-sora text-sm inline-flex items-center gap-2 self-start md:self-auto",
            children: [
                "All Articles",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                    lineNumber: 74,
                    columnNumber: 164
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/DevlogsPreview.tsx",
            lineNumber: 74,
            columnNumber: 10
        }, this);
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t2) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t1,
            animate: t2,
            transition: t3,
            className: "flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4",
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/DevlogsPreview.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[8] = t2;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== isInView) {
        t7 = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["devlogs"].map({
            "DevlogsPreview[devlogs.map()]": (post, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 40
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.6,
                        delay: i * 0.15
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/devlogs/${post.slug}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "group h-full rounded-2xl overflow-hidden bg-fluke-surface border border-fluke-yellow/10 card-hover flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-44 flex items-center justify-center relative overflow-hidden",
                                    style: {
                                        background: `linear-gradient(135deg, hsl(${i * 80 + 200}, 40%, 8%) 0%, hsl(${i * 80 + 230}, 50%, 14%) 100%)`
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 text-fluke-yellow",
                                            children: (()=>{
                                                const Icon = devIcons[i % 3];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                    size: 48,
                                                    strokeWidth: 1.5
                                                }, void 0, false, {
                                                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 26
                                                }, this);
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/DevlogsPreview.tsx",
                                            lineNumber: 101,
                                            columnNumber: 16
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-0 top-0 bottom-0 w-1 bg-fluke-yellow transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom"
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/DevlogsPreview.tsx",
                                            lineNumber: 104,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                                    lineNumber: 99,
                                    columnNumber: 177
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 flex flex-col flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 mb-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: `text-[10px] font-orbitron tracking-wider px-2 py-0.5 rounded border ${categoryColors[post.category] || "text-fluke-yellow bg-fluke-yellow/10 border-fluke-yellow/20"}`,
                                                    children: post.category
                                                }, void 0, false, {
                                                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 285
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex items-center gap-1 text-[10px] text-fluke-muted font-sora",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            size: 10
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/home/DevlogsPreview.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 574
                                                        }, this),
                                                        post.readTime,
                                                        " min read"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 493
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/home/DevlogsPreview.tsx",
                                            lineNumber: 104,
                                            columnNumber: 239
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-sora font-semibold text-sm text-fluke-text group-hover:text-fluke-yellow transition-colors mb-2 flex-1",
                                            children: post.title
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/DevlogsPreview.tsx",
                                            lineNumber: 104,
                                            columnNumber: 630
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-sora text-xs text-fluke-muted line-clamp-2 mb-4",
                                            children: post.excerpt
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/DevlogsPreview.tsx",
                                            lineNumber: 104,
                                            columnNumber: 771
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-xs text-fluke-muted/60 font-sora",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        "by ",
                                                        post.author
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 946
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: new Date(post.date).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 975
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/home/DevlogsPreview.tsx",
                                            lineNumber: 104,
                                            columnNumber: 857
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                                    lineNumber: 104,
                                    columnNumber: 197
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/home/DevlogsPreview.tsx",
                            lineNumber: 99,
                            columnNumber: 47
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/home/DevlogsPreview.tsx",
                        lineNumber: 99,
                        columnNumber: 10
                    }, this)
                }, post.id, false, {
                    fileName: "[project]/components/home/DevlogsPreview.tsx",
                    lineNumber: 90,
                    columnNumber: 53
                }, this)
        }["DevlogsPreview[devlogs.map()]"]);
        $[10] = isInView;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-6",
            children: t7
        }, void 0, false, {
            fileName: "[project]/components/home/DevlogsPreview.tsx",
            lineNumber: 117,
            columnNumber: 10
        }, this);
        $[12] = t7;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== t6 || $[15] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-32 bg-fluke-bg",
            ref: ref,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-6",
                children: [
                    t6,
                    t8
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/DevlogsPreview.tsx",
                lineNumber: 125,
                columnNumber: 59
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/home/DevlogsPreview.tsx",
            lineNumber: 125,
            columnNumber: 10
        }, this);
        $[14] = t6;
        $[15] = t8;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    return t9;
}
_s(DevlogsPreview, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = DevlogsPreview;
var _c;
__turbopack_context__.k.register(_c, "DevlogsPreview");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/StudioStory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StudioStory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const milestones = [
    {
        year: "2023",
        title: "Studio Founded",
        description: "Fluke Game Studio was born with a single passion: build games that matter. Started as a solo project and quickly grew.",
        icon: "🌱"
    },
    {
        year: "2024",
        title: "First Game Released",
        description: "Neon Drift launched on Steam and mobile — our first full commercial release. Pixel Warriors had already shipped earlier as a web game.",
        icon: "🚀"
    },
    {
        year: "2024",
        title: "Asset Store Launch",
        description: "Launched our first asset pack on Unity Asset Store. The Sci-Fi Props vol.1 hit over 200 downloads in the first month.",
        icon: "📦"
    },
    {
        year: "2025",
        title: "Studio Expansion",
        description: "Grew to a team of 4 full-time creators. Took on our first contract development clients and launched web dev services.",
        icon: "⚡"
    },
    {
        year: "2025",
        title: "Shadow Realm in Development",
        description: "Our most ambitious project yet — an open-world dark fantasy action RPG built in Unreal Engine 5.",
        icon: "⚔️"
    }
];
function StudioStory() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(27);
    if ($[0] !== "e064cca947ecf0d4beb84db32ae004ee24d4cd9766fc1b7d01491d94cbcea342") {
        for(let $i = 0; $i < 27; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e064cca947ecf0d4beb84db32ae004ee24d4cd9766fc1b7d01491d94cbcea342";
    }
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            once: true,
            margin: "-100px"
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-gradient-to-b from-fluke-bg via-fluke-surface to-fluke-bg opacity-50 pointer-events-none"
        }, void 0, false, {
            fileName: "[project]/components/home/StudioStory.tsx",
            lineNumber: 54,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            opacity: 0,
            y: 30
        };
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== isInView) {
        t3 = isInView ? {
            opacity: 1,
            y: 0
        } : {};
        $[4] = isInView;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = {
            duration: 0.7
        };
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
            children: "Our Journey"
        }, void 0, false, {
            fileName: "[project]/components/home/StudioStory.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-bebas text-5xl sm:text-7xl text-fluke-text",
            children: "Studio Story"
        }, void 0, false, {
            fileName: "[project]/components/home/StudioStory.tsx",
            lineNumber: 93,
            columnNumber: 10
        }, this);
        $[7] = t5;
        $[8] = t6;
    } else {
        t5 = $[7];
        t6 = $[8];
    }
    let t7;
    if ($[9] !== t3) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t2,
            animate: t3,
            transition: t4,
            className: "text-center mb-20",
            children: [
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/StudioStory.tsx",
            lineNumber: 102,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            scaleY: 0
        };
        $[11] = t8;
    } else {
        t8 = $[11];
    }
    let t9;
    if ($[12] !== isInView) {
        t9 = isInView ? {
            scaleY: 1
        } : {};
        $[12] = isInView;
        $[13] = t9;
    } else {
        t9 = $[13];
    }
    let t10;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = {
            duration: 1.5,
            delay: 0.3,
            ease: "easeInOut"
        };
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t8,
            animate: t9,
            transition: t10,
            className: "absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-fluke-yellow/60 via-fluke-yellow/30 to-transparent origin-top"
        }, void 0, false, {
            fileName: "[project]/components/home/StudioStory.tsx",
            lineNumber: 140,
            columnNumber: 11
        }, this);
        $[15] = t9;
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] !== isInView) {
        t12 = milestones.map({
            "StudioStory[milestones.map()]": (m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 40
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.6,
                        delay: 0.3 + i * 0.18
                    },
                    className: `relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `flex-1 pl-16 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-2xl p-6 border border-fluke-yellow/15 hover:border-fluke-yellow/30 transition-all duration-300 group",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 mb-1 md:justify-end",
                                        style: {
                                            justifyContent: i % 2 !== 0 ? "flex-start" : undefined
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-orbitron text-xs tracking-widest text-fluke-yellow",
                                            children: m.year
                                        }, void 0, false, {
                                            fileName: "[project]/components/home/StudioStory.tsx",
                                            lineNumber: 160,
                                            columnNumber: 16
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/StudioStory.tsx",
                                        lineNumber: 158,
                                        columnNumber: 347
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-sora font-bold text-fluke-text mb-2",
                                        children: m.title
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/StudioStory.tsx",
                                        lineNumber: 160,
                                        columnNumber: 111
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-sora text-xs text-fluke-muted leading-relaxed",
                                        children: m.description
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/StudioStory.tsx",
                                        lineNumber: 160,
                                        columnNumber: 182
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/StudioStory.tsx",
                                lineNumber: 158,
                                columnNumber: 215
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/home/StudioStory.tsx",
                            lineNumber: 158,
                            columnNumber: 120
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-fluke-bg border-2 border-fluke-yellow flex items-center justify-center z-10 text-xs mt-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: m.icon
                            }, void 0, false, {
                                fileName: "[project]/components/home/StudioStory.tsx",
                                lineNumber: 160,
                                columnNumber: 454
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/home/StudioStory.tsx",
                            lineNumber: 160,
                            columnNumber: 279
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden md:block flex-1"
                        }, void 0, false, {
                            fileName: "[project]/components/home/StudioStory.tsx",
                            lineNumber: 160,
                            columnNumber: 481
                        }, this)
                    ]
                }, i, true, {
                    fileName: "[project]/components/home/StudioStory.tsx",
                    lineNumber: 149,
                    columnNumber: 50
                }, this)
        }["StudioStory[milestones.map()]"]);
        $[17] = isInView;
        $[18] = t12;
    } else {
        t12 = $[18];
    }
    let t13;
    if ($[19] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-12",
            children: t12
        }, void 0, false, {
            fileName: "[project]/components/home/StudioStory.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[19] = t12;
        $[20] = t13;
    } else {
        t13 = $[20];
    }
    let t14;
    if ($[21] !== t11 || $[22] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative",
            children: [
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/StudioStory.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[21] = t11;
        $[22] = t13;
        $[23] = t14;
    } else {
        t14 = $[23];
    }
    let t15;
    if ($[24] !== t14 || $[25] !== t7) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-32 bg-fluke-surface relative overflow-hidden",
            ref: ref,
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-4xl mx-auto px-6 relative",
                    children: [
                        t7,
                        t14
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/home/StudioStory.tsx",
                    lineNumber: 186,
                    columnNumber: 94
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/StudioStory.tsx",
            lineNumber: 186,
            columnNumber: 11
        }, this);
        $[24] = t14;
        $[25] = t7;
        $[26] = t15;
    } else {
        t15 = $[26];
    }
    return t15;
}
_s(StudioStory, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = StudioStory;
var _c;
__turbopack_context__.k.register(_c, "StudioStory");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/TeamSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TeamSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/content.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript) <export default as Github>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const socialIcons = {
    twitter: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Twitter$3e$__["Twitter"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/components/home/TeamSection.tsx",
        lineNumber: 9,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0)),
    github: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/components/home/TeamSection.tsx",
        lineNumber: 10,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0)),
    instagram: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/components/home/TeamSection.tsx",
        lineNumber: 11,
        columnNumber: 14
    }, ("TURBOPACK compile-time value", void 0)),
    youtube: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Youtube$3e$__["Youtube"], {
        size: 14
    }, void 0, false, {
        fileName: "[project]/components/home/TeamSection.tsx",
        lineNumber: 12,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0))
};
const avatarColors = [
    "#1a0f2e",
    "#0e1a10",
    "#1a100a",
    "#0a121e"
];
const avatarEmojis = [
    "👤",
    "👤",
    "👤",
    "👤"
];
function TeamSection() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(17);
    if ($[0] !== "70c262fc32c2a91580e32312699e5c45d872e907875f922e5ccee9c2a03a56be") {
        for(let $i = 0; $i < 17; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "70c262fc32c2a91580e32312699e5c45d872e907875f922e5ccee9c2a03a56be";
    }
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            once: true,
            margin: "-100px"
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            opacity: 0,
            y: 30
        };
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== isInView) {
        t2 = isInView ? {
            opacity: 1,
            y: 0
        } : {};
        $[3] = isInView;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            duration: 0.7
        };
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    let t5;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-3",
            children: "The Crew"
        }, void 0, false, {
            fileName: "[project]/components/home/TeamSection.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-bebas text-5xl sm:text-7xl text-fluke-text",
            children: "Meet the Team"
        }, void 0, false, {
            fileName: "[project]/components/home/TeamSection.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, this);
        $[6] = t4;
        $[7] = t5;
    } else {
        t4 = $[6];
        t5 = $[7];
    }
    let t6;
    if ($[8] !== t2) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: t1,
            animate: t2,
            transition: t3,
            className: "text-center mb-16",
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/TeamSection.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[8] = t2;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    let t7;
    if ($[10] !== isInView) {
        t7 = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$content$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["team"].map({
            "TeamSection[team.map()]": (member, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 40
                    },
                    animate: isInView ? {
                        opacity: 1,
                        y: 0
                    } : {},
                    transition: {
                        duration: 0.6,
                        delay: i * 0.12
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group relative rounded-2xl overflow-hidden bg-fluke-surface border border-fluke-yellow/10 hover:border-fluke-yellow/35 transition-all duration-400 p-6 flex flex-col items-center text-center card-hover",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-24 h-24 rounded-full mb-4 flex items-center justify-center text-4xl border-2 border-fluke-yellow/20 group-hover:border-fluke-yellow/50 transition-all duration-300 overflow-hidden relative",
                                style: {
                                    background: avatarColors[i]
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: avatarEmojis[i]
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/TeamSection.tsx",
                                        lineNumber: 99,
                                        columnNumber: 14
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-box-yellow-strong"
                                    }, void 0, false, {
                                        fileName: "[project]/components/home/TeamSection.tsx",
                                        lineNumber: 99,
                                        columnNumber: 44
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/home/TeamSection.tsx",
                                lineNumber: 97,
                                columnNumber: 228
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-sora font-bold text-fluke-text group-hover:text-fluke-yellow transition-colors mb-1",
                                children: member.name
                            }, void 0, false, {
                                fileName: "[project]/components/home/TeamSection.tsx",
                                lineNumber: 99,
                                columnNumber: 188
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-orbitron text-xs tracking-wider text-fluke-yellow mb-3",
                                children: member.role
                            }, void 0, false, {
                                fileName: "[project]/components/home/TeamSection.tsx",
                                lineNumber: 99,
                                columnNumber: 311
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-sora text-xs text-fluke-muted leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-300",
                                children: member.bio
                            }, void 0, false, {
                                fileName: "[project]/components/home/TeamSection.tsx",
                                lineNumber: 99,
                                columnNumber: 403
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-1.5 justify-center mb-4",
                                children: member.skills.map(_TeamSectionTeamMapMemberSkillsMap)
                            }, void 0, false, {
                                fileName: "[project]/components/home/TeamSection.tsx",
                                lineNumber: 99,
                                columnNumber: 559
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2",
                                children: member.socials.map(_TeamSectionTeamMapMemberSocialsMap)
                            }, void 0, false, {
                                fileName: "[project]/components/home/TeamSection.tsx",
                                lineNumber: 99,
                                columnNumber: 680
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/TeamSection.tsx",
                        lineNumber: 97,
                        columnNumber: 10
                    }, this)
                }, member.id, false, {
                    fileName: "[project]/components/home/TeamSection.tsx",
                    lineNumber: 88,
                    columnNumber: 49
                }, this)
        }["TeamSection[team.map()]"]);
        $[10] = isInView;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
            children: t7
        }, void 0, false, {
            fileName: "[project]/components/home/TeamSection.tsx",
            lineNumber: 108,
            columnNumber: 10
        }, this);
        $[12] = t7;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] !== t6 || $[15] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "py-32 bg-fluke-bg",
            ref: ref,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-6",
                children: [
                    t6,
                    t8
                ]
            }, void 0, true, {
                fileName: "[project]/components/home/TeamSection.tsx",
                lineNumber: 116,
                columnNumber: 59
            }, this)
        }, void 0, false, {
            fileName: "[project]/components/home/TeamSection.tsx",
            lineNumber: 116,
            columnNumber: 10
        }, this);
        $[14] = t6;
        $[15] = t8;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    return t9;
}
_s(TeamSection, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = TeamSection;
function _TeamSectionTeamMapMemberSocialsMap(t0) {
    const { platform, url } = t0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: url,
        "aria-label": platform,
        className: "w-7 h-7 rounded-lg bg-fluke-bg border border-fluke-yellow/10 flex items-center justify-center text-fluke-muted hover:text-fluke-yellow hover:border-fluke-yellow/40 transition-all duration-300",
        children: socialIcons[platform]
    }, platform, false, {
        fileName: "[project]/components/home/TeamSection.tsx",
        lineNumber: 130,
        columnNumber: 10
    }, this);
}
function _TeamSectionTeamMapMemberSkillsMap(skill) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-[10px] font-sora px-2 py-0.5 rounded-full bg-fluke-bg border border-fluke-yellow/10 text-fluke-muted",
        children: skill
    }, skill, false, {
        fileName: "[project]/components/home/TeamSection.tsx",
        lineNumber: 133,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "TeamSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/home/CtaSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CtaSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-in-view.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CtaSection() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(16);
    if ($[0] !== "a3441d26bdc37ec5d57a59b6bd547dce8dfb811e2de888acb453c68c510693bc") {
        for(let $i = 0; $i < 16; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a3441d26bdc37ec5d57a59b6bd547dce8dfb811e2de888acb453c68c510693bc";
    }
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            once: true,
            margin: "-100px"
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const isInView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"])(ref, t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 bg-gradient-radial from-fluke-yellow/10 via-transparent to-fluke-bg"
        }, void 0, false, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 opacity-[0.05]",
                    style: {
                        backgroundImage: "linear-gradient(rgba(245,197,66,1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,197,66,1) 1px, transparent 1px)",
                        backgroundSize: "60px 60px"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/home/CtaSection.tsx",
                    lineNumber: 37,
                    columnNumber: 48
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fluke-yellow/5 rounded-full blur-[120px]"
                }, void 0, false, {
                    fileName: "[project]/components/home/CtaSection.tsx",
                    lineNumber: 40,
                    columnNumber: 12
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-0 left-0 w-80 h-80 bg-fluke-yellow/5 rounded-full blur-[80px]"
                }, void 0, false, {
                    fileName: "[project]/components/home/CtaSection.tsx",
                    lineNumber: 40,
                    columnNumber: 155
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[80px]"
                }, void 0, false, {
                    fileName: "[project]/components/home/CtaSection.tsx",
                    lineNumber: 40,
                    columnNumber: 252
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 37,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            opacity: 0,
            y: 40
        };
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] !== isInView) {
        t4 = isInView ? {
            opacity: 1,
            y: 0
        } : {};
        $[5] = isInView;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    let t6;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            duration: 0.8
        };
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-orbitron text-xs tracking-[0.4em] text-fluke-yellow uppercase mb-6",
            children: "Let's Create Together"
        }, void 0, false, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 72,
            columnNumber: 10
        }, this);
        $[7] = t5;
        $[8] = t6;
    } else {
        t5 = $[7];
        t6 = $[8];
    }
    let t7;
    let t8;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-bebas text-6xl sm:text-8xl md:text-9xl text-fluke-text leading-none mb-6",
            children: [
                "Have a",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "gradient-text glow-yellow",
                    children: "Game Idea?"
                }, void 0, false, {
                    fileName: "[project]/components/home/CtaSection.tsx",
                    lineNumber: 82,
                    columnNumber: 115
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-sora text-lg text-fluke-muted max-w-xl mx-auto mb-12",
            children: "Whether you need a full team, a specific skill, or expert advice — we're ready to bring your vision to life."
        }, void 0, false, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 83,
            columnNumber: 10
        }, this);
        $[9] = t7;
        $[10] = t8;
    } else {
        t7 = $[9];
        t8 = $[10];
    }
    let t9;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: "/contact",
            className: "btn-primary px-10 py-4 rounded-xl font-sora text-base flex items-center gap-2 justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                    size: 18
                }, void 0, false, {
                    fileName: "[project]/components/home/CtaSection.tsx",
                    lineNumber: 92,
                    columnNumber: 137
                }, this),
                "Start a Project"
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[11] = t9;
    } else {
        t9 = $[11];
    }
    let t10;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col sm:flex-row gap-4 justify-center",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/contact",
                    className: "btn-outline px-10 py-4 rounded-xl font-sora text-base flex items-center gap-2 justify-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                            size: 18
                        }, void 0, false, {
                            fileName: "[project]/components/home/CtaSection.tsx",
                            lineNumber: 99,
                            columnNumber: 206
                        }, this),
                        "Contact Us"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/home/CtaSection.tsx",
                    lineNumber: 99,
                    columnNumber: 79
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 99,
            columnNumber: 11
        }, this);
        $[12] = t10;
    } else {
        t10 = $[12];
    }
    let t11;
    if ($[13] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-16 flex flex-wrap gap-8 justify-center",
            children: [
                {
                    label: "Fast Turnaround",
                    icon: "\u26A1"
                },
                {
                    label: "NDA Protected",
                    icon: "\uD83D\uDD12"
                },
                {
                    label: "Experienced Team",
                    icon: "\uD83C\uDFC6"
                },
                {
                    label: "Flexible Pricing",
                    icon: "\uD83D\uDC8E"
                }
            ].map(_CtaSectionAnonymous)
        }, void 0, false, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 106,
            columnNumber: 11
        }, this);
        $[13] = t11;
    } else {
        t11 = $[13];
    }
    let t12;
    if ($[14] !== t4) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "relative py-40 overflow-hidden bg-fluke-bg",
            ref: ref,
            children: [
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 max-w-4xl mx-auto px-6 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: t3,
                        animate: t4,
                        transition: t5,
                        children: [
                            t6,
                            t7,
                            t8,
                            t10,
                            t11
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/home/CtaSection.tsx",
                        lineNumber: 125,
                        columnNumber: 155
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/home/CtaSection.tsx",
                    lineNumber: 125,
                    columnNumber: 89
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/home/CtaSection.tsx",
            lineNumber: 125,
            columnNumber: 11
        }, this);
        $[14] = t4;
        $[15] = t12;
    } else {
        t12 = $[15];
    }
    return t12;
}
_s(CtaSection, "DljcBprJKYjULUac3YKdUV9OwZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$in$2d$view$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInView"]
    ];
});
_c = CtaSection;
function _CtaSectionAnonymous(item) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-2 text-fluke-muted",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xl",
                children: item.icon
            }, void 0, false, {
                fileName: "[project]/components/home/CtaSection.tsx",
                lineNumber: 134,
                columnNumber: 85
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-sora text-sm",
                children: item.label
            }, void 0, false, {
                fileName: "[project]/components/home/CtaSection.tsx",
                lineNumber: 134,
                columnNumber: 129
            }, this)
        ]
    }, item.label, true, {
        fileName: "[project]/components/home/CtaSection.tsx",
        lineNumber: 134,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "CtaSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$IntroScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/IntroScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HeroSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/HeroSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$GamesShowcase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/GamesShowcase.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$ServicesGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/ServicesGrid.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$StudioCapabilities$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/StudioCapabilities.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$FeaturedPortfolio$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/FeaturedPortfolio.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$DevlogsPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/DevlogsPreview.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$StudioStory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/StudioStory.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$TeamSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/TeamSection.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$CtaSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/home/CtaSection.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function HomePage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "7abfbbac5ec16f4cb1dbb922ef6e595f21ab304c75e2af6394278e72d47b7c6e") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7abfbbac5ec16f4cb1dbb922ef6e595f21ab304c75e2af6394278e72d47b7c6e";
    }
    const [introComplete, setIntroComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$IntroScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            onComplete: {
                "HomePage[<IntroScreen>.onComplete]": ()=>setIntroComplete(true)
            }["HomePage[<IntroScreen>.onComplete]"]
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 26,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const t1 = introComplete ? 1 : 0;
    let t2;
    if ($[2] !== t1) {
        t2 = {
            opacity: t1,
            transition: "opacity 0.5s ease"
        };
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t10;
    let t11;
    let t3;
    let t4;
    let t5;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$HeroSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$GamesShowcase$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$ServicesGrid$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$StudioCapabilities$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$FeaturedPortfolio$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 59,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$DevlogsPreview$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$StudioStory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 61,
            columnNumber: 10
        }, this);
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$TeamSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 62,
            columnNumber: 11
        }, this);
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$home$2f$CtaSection$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 63,
            columnNumber: 11
        }, this);
        $[4] = t10;
        $[5] = t11;
        $[6] = t3;
        $[7] = t4;
        $[8] = t5;
        $[9] = t6;
        $[10] = t7;
        $[11] = t8;
        $[12] = t9;
    } else {
        t10 = $[4];
        t11 = $[5];
        t3 = $[6];
        t4 = $[7];
        t5 = $[8];
        t6 = $[9];
        t7 = $[10];
        t8 = $[11];
        t9 = $[12];
    }
    let t12;
    if ($[13] !== t2) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: t2,
                    children: [
                        t3,
                        t4,
                        t5,
                        t6,
                        t7,
                        t8,
                        t9,
                        t10,
                        t11
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 86,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true);
        $[13] = t2;
        $[14] = t12;
    } else {
        t12 = $[14];
    }
    return t12;
}
_s(HomePage, "ljavEkPkPajb3k4hNQWJmFrNCn8=");
_c = HomePage;
var _c;
__turbopack_context__.k.register(_c, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_7695a3fa._.js.map