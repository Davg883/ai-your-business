"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useThemeMode } from "@/components/providers/ThemeProvider";
import {
    Activity,
    ChefHat,
    ClipboardCheck,
    ShieldCheck,
    TrendingUp,
    Truck,
} from "lucide-react";

const mockAiFeed = {
    field: [
        {
            agent: "ChefOS",
            message: "Fridge 3 trending warm. Schedule check within 2 hours.",
            icon: ChefHat,
        },
        {
            agent: "SiteOS",
            message: "Toolbox talk overdue on Plot 7.",
            icon: ClipboardCheck,
        },
        {
            agent: "Aegis",
            message: "Vehicle check incomplete for Van 4.",
            icon: Truck,
        },
    ],
    exec: [
        {
            agent: "ChefOS",
            message: "Food waste down 14% week-on-week at Cowes site.",
            icon: TrendingUp,
        },
        {
            agent: "Aegis",
            message: "Optimised routing saved 37 minutes on today's first drop.",
            icon: Activity,
        },
        {
            agent: "SiteOS",
            message: "Compliance score increased to 98% across all regions.",
            icon: ShieldCheck,
        },
    ],
};

export function DevicePreview() {
    const { mode } = useThemeMode();
    const feed = mockAiFeed[mode];
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-300, 300], [5, -5]), {
        stiffness: 150,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(x, [-300, 300], [-5, 5]), {
        stiffness: 150,
        damping: 20,
    });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className="perspective-1000 w-full max-w-2xl mx-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={containerRef}
        >
            <motion.div
                style={{ rotateX, rotateY }}
                className={`relative aspect-[4/3] w-full overflow-hidden border-4 transition-all duration-500 ${mode === "exec"
                        ? "rounded-[2rem] border-white/10 shadow-2xl bg-exec-panel backdrop-blur-md"
                        : "rounded-lg border-slate-700 bg-field-panel shadow-xl"
                    }`}
            >
                {/* Executive Gold Inner Shadow */}
                {mode === "exec" && (
                    <div className="absolute inset-0 pointer-events-none z-20 rounded-[1.8rem] shadow-[inset_0_0_40px_rgba(212,175,55,0.1)]" />
                )}

                {/* Field Scanlines & Noise */}
                {mode === "field" && (
                    <div className="absolute inset-0 pointer-events-none z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />
                )}

                {/* Screen Content */}
                <div
                    className={`absolute inset-0 flex flex-col p-6 transition-colors duration-500 ${mode === "field"
                            ? "bg-field-bg"
                            : "bg-gradient-to-br from-slate-900 to-slate-800"
                        }`}
                >
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className={`h-8 w-8 rounded-md flex items-center justify-center ${mode === "field" ? "bg-field-accent" : "bg-exec-accent"
                                    }`}
                            >
                                <Activity
                                    size={16}
                                    className={mode === "exec" ? "text-exec-bg" : "text-field-bg"}
                                />
                            </div>
                            <div className={`h-3 w-32 rounded-full bg-white/10`} />
                        </div>
                        <div className={`h-8 w-8 rounded-full bg-white/10`} />
                    </div>

                    {/* KPIs */}
                    <div className="mb-6 grid grid-cols-3 gap-3">
                        {[
                            { label: "Open Tasks", val: "12", trend: "+2" },
                            { label: "Risk Flags", val: "0", trend: "-" },
                            { label: "Revenue", val: "£4.2k", trend: "+8%" },
                        ].map((kpi, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`flex flex-col p-3 border ${mode === "field"
                                        ? "border-slate-700 bg-slate-900 rounded-none"
                                        : "border-white/10 bg-white/5 rounded-xl backdrop-blur-md"
                                    }`}
                            >
                                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                                    {kpi.label}
                                </span>
                                <div className="flex items-end justify-between mt-1">
                                    <span
                                        className={`text-xl font-bold ${mode === "field" ? "font-mono" : "font-sans"
                                            }`}
                                    >
                                        {kpi.val}
                                    </span>
                                    <span
                                        className={`text-xs ${mode === "field" ? "text-field-accent" : "text-exec-accent"
                                            }`}
                                    >
                                        {kpi.trend}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* AI Suggestions / Kanban Stub */}
                    <div className="mb-6 flex-1">
                        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                            AI Suggestions
                        </h3>
                        <div className="flex gap-3 overflow-hidden">
                            {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className={`flex-1 p-3 flex flex-col gap-2 border ${mode === "field"
                                            ? "border-slate-700 bg-slate-900/50"
                                            : "border-white/10 bg-white/5 rounded-xl"
                                        }`}
                                >
                                    <div className="h-2 w-16 rounded-full bg-white/10" />
                                    <div className="h-2 w-full rounded-full bg-white/5" />
                                    <div className="h-2 w-3/4 rounded-full bg-white/5" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Activity Stream */}
                    <div className="mt-auto">
                        <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                            Live Feed
                        </h3>
                        <div className="space-y-3">
                            <AnimatePresence mode="wait">
                                {feed.map((item, i) => (
                                    <motion.div
                                        key={`${mode}-${i}`}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        transition={{ delay: i * 0.15 }}
                                        className={`flex items-center gap-3 p-2 ${mode === "field"
                                                ? "border-l-4 border-field-accent bg-slate-800/50"
                                                : "rounded-lg bg-white/5 border border-white/5"
                                            }`}
                                    >
                                        <item.icon
                                            size={16}
                                            className={
                                                mode === "field" ? "text-field-accent" : "text-exec-accent"
                                            }
                                        />
                                        <div className="flex-1">
                                            <span
                                                className={`mr-2 text-xs font-bold ${mode === "field"
                                                        ? "text-field-accent font-mono"
                                                        : "text-exec-accent font-sans"
                                                    }`}
                                            >
                                                {item.agent}:
                                            </span>
                                            <span className="text-xs text-slate-200">
                                                {item.message}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Glare effect for Glass mode */}
                {mode === "exec" && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-60" />
                )}
            </motion.div>
        </div>
    );
}
