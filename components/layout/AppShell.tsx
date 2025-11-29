"use client";

import React from "react";
import Link from "next/link";
import { useThemeMode } from "@/components/providers/ThemeProvider";
import { ModeToggle } from "./ModeToggle";
import { motion, AnimatePresence } from "framer-motion";

export function AppShell({ children }: { children: React.ReactNode }) {
    const { mode } = useThemeMode();

    return (
        <div className="min-h-screen w-full relative transition-colors duration-700 ease-in-out bg-brand-bg text-white overflow-x-hidden">
            {/* Dynamic Background */}
            <div
                className={`fixed inset-0 z-0 transition-opacity duration-1000 ${mode === "exec" ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    background:
                        "radial-gradient(ellipse at top right, #1e293b, #0f172a, #020617)",
                }}
            />
            <div
                className={`fixed inset-0 z-0 transition-opacity duration-1000 ${mode === "field" ? "opacity-100" : "opacity-0"
                    }`}
                style={{
                    backgroundColor: "#020617",
                    backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Header */}
            <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-6 w-6 bg-brand-accent rounded-sm" />
                        <span className="text-lg font-bold tracking-tight text-white font-display">
                            AI YOUR BUSINESS
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400 font-sans">
                        <Link href="/showroom" className="hover:text-white transition-colors">
                            Showroom
                        </Link>
                        <Link href="/factory" className="hover:text-white transition-colors">
                            Factory
                        </Link>
                        <Link href="/academy" className="hover:text-white transition-colors">
                            Academy
                        </Link>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div
                            className={`hidden md:block rounded-full px-3 py-1 text-xs font-medium border transition-colors duration-300 ${mode === "field"
                                    ? "border-field-accent/30 bg-field-accent/10 text-field-accent"
                                    : "border-exec-accent/30 bg-exec-accent/10 text-exec-accent"
                                }`}
                        >
                            {mode === "field" ? "Field Operations" : "Executive View"}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 pt-24 pb-20 px-6 mx-auto max-w-7xl">
                {children}
            </main>
        </div>
    );
}
