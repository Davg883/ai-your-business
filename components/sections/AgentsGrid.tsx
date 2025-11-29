"use client";

"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChefHat, ClipboardCheck, Truck } from "lucide-react";
import { useThemeMode } from "@/components/providers/ThemeProvider";

const agents = [
    {
        name: "ChefOS",
        role: "OFFENCE",
        desc: "Kitchen intelligence & hygiene automation.",
        icon: ChefHat,
    },
    {
        name: "SiteOS",
        role: "DEFENCE",
        desc: "Site audits, inspections, and incident capture.",
        icon: ClipboardCheck,
    },
    {
        name: "Aegis",
        role: "HARDWARE",
        desc: "Fleet & manifest verification for logistics.",
        icon: Truck,
    },
];

export function AgentsGrid() {
    const { mode } = useThemeMode();

    return (
        <div className="border-t border-white/5 pt-12">
            <div className="mb-8 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                <span className="text-sm uppercase tracking-widest text-slate-500 font-mono">
                    AI Agents at Work
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {agents.map((agent, i) => (
                    <motion.div
                        key={agent.name}
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`group relative overflow-hidden p-6 transition-all duration-300 ${mode === "field"
                                ? "bg-slate-900/50 border-2 border-slate-800 hover:border-field-accent/50 rounded-xl"
                                : "bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-accent/30 rounded-2xl"
                            }`}
                    >
                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-300 ${mode === "field"
                                        ? "bg-slate-800 text-field-accent"
                                        : "bg-brand-accent/10 text-brand-accent"
                                    }`}
                            >
                                <agent.icon size={20} />
                            </div>
                            <span
                                className={`text-[10px] uppercase tracking-wider font-bold ${mode === "field" ? "text-slate-500" : "text-slate-400"
                                    }`}
                            >
                                {agent.role}
                            </span>
                        </div>

                        {/* Content */}
                        <h3
                            className={`mb-2 text-lg font-bold ${mode === "field"
                                    ? "font-mono text-white"
                                    : "font-sans text-slate-900"
                                }`}
                        >
                            {agent.name}
                        </h3>
                        <p className="text-sm text-slate-500 font-sans leading-relaxed">
                            {agent.desc}
                        </p>

                        {/* Hover Glow */}
                        <div
                            className={`absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-20 pointer-events-none ${mode === "field"
                                    ? "bg-field-accent opacity-0"
                                    : "bg-brand-accent opacity-0"
                                }`}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
