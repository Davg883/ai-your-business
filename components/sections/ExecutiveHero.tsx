"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useThemeMode } from "@/components/providers/ThemeProvider";

export function ExecutiveHero() {
    const { toggleMode } = useThemeMode();

    return (
        <div className="flex flex-col items-center justify-center text-center pt-12 pb-24">
            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl font-display"
            >
                Intelligence for the <br />
                <span className="text-slate-500">Industrial World.</span>
            </motion.h1>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="w-full max-w-xl relative mb-16"
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Find tools for your sector..."
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-100 border-none text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-brand-accent/20 outline-none shadow-sm"
                    />
                </div>
            </motion.div>

            {/* Laptop Mockup */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="relative w-full max-w-5xl mx-auto"
            >
                {/* Laptop Frame */}
                <div className="relative aspect-[16/9] bg-slate-200 rounded-t-2xl shadow-2xl overflow-hidden border-8 border-slate-300">
                    {/* Screen Content Placeholder */}
                    <div className="absolute inset-0 bg-white flex items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">AI YOUR BUSINESS</h3>
                            <p className="text-slate-500">INTELLIGENCE FOR THE INDUSTRIAL WORLD.</p>
                            {/* Mock UI elements */}
                            <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto px-8">
                                <div className="h-32 bg-slate-50 rounded-lg border border-slate-100"></div>
                                <div className="h-32 bg-slate-50 rounded-lg border border-slate-100"></div>
                                <div className="h-32 bg-slate-50 rounded-lg border border-slate-100"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Laptop Base */}
                <div className="h-4 bg-slate-300 rounded-b-xl mx-auto w-full shadow-lg relative z-10">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-slate-400 rounded-b-lg"></div>
                </div>
            </motion.div>

            {/* Toggle Back Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="mt-12"
            >
                <button
                    onClick={toggleMode}
                    className="px-6 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm"
                >
                    Switch to Field Operations
                </button>
            </motion.div>
        </div>
    );
}
