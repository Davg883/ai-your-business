"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, HardHat } from "lucide-react";
import { useThemeMode } from "@/components/providers/ThemeProvider";

export function ModeToggle() {
    const { mode, setMode } = useThemeMode();

    return (
        <div className="relative inline-flex h-12 items-center rounded-full bg-slate-900/50 p-1 border border-white/10 backdrop-blur-sm w-64">
            {/* Animated Background Thumb */}
            <motion.div
                className="absolute h-10 w-[calc(50%-4px)] rounded-full shadow-sm"
                initial={false}
                animate={{
                    x: mode === "field" ? 0 : "100%",
                    backgroundColor: mode === "field" ? "#334155" : "#D4AF37", // Slate-700 vs Gold
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Field Button */}
            <button
                onClick={() => setMode("field")}
                className={`relative z-10 flex w-1/2 items-center justify-center gap-2 text-sm font-medium transition-colors duration-300 ${mode === "field" ? "text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                aria-pressed={mode === "field"}
            >
                <HardHat size={16} />
                <span>Field</span>
            </button>

            {/* Executive Button */}
            <button
                onClick={() => setMode("exec")}
                className={`relative z-10 flex w-1/2 items-center justify-center gap-2 text-sm font-medium transition-colors duration-300 ${mode === "exec"
                        ? "text-[#0A192F]"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                aria-pressed={mode === "exec"}
            >
                <Briefcase size={16} />
                <span>Executive</span>
            </button>
        </div>
    );
}
