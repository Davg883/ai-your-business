"use client";
"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useThemeMode } from "@/components/providers/ThemeProvider";
import { DevicePreview } from "./DevicePreview";
import { ExecutiveHero } from "./ExecutiveHero";

interface HeroProps {
    titleStatic?: string;
    titleDynamic?: string;
    description?: string;
    bulletsField?: string[];
    bulletsExec?: string[];
    ctaPrimary?: string;
    ctaSecondary?: string;
}

export function HeroDualPersonality({
    titleStatic = "One Brain.",
    titleDynamic = "Many Faces.",
    description = "Switch between Field Operations and Executive View. The same verified data, expressed in the language each role understands.",
    bulletsField = [
        "High-contrast checklists for dirty hands.",
        "Instant actions pushed to the right station.",
        "Licence protection, hygiene, and safety first.",
    ],
    ctaPrimary = "Experience the Toggle",
    ctaSecondary = "View Factory Blueprint",
}: HeroProps) {
    const { mode, toggleMode } = useThemeMode();

    if (mode === "exec") {
        return <ExecutiveHero />;
    }

    return (
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8 mb-24">
            {/* Left Column: Text & Toggle */}
            <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="mb-8">
                    {/* Mode Label */}
                    <span className="text-xs font-bold uppercase tracking-widest text-field-accent">
                        Field Operations Mode
                    </span>
                </div>

                <motion.div
                    key="field"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="mb-6 text-5xl font-bold leading-tight font-mono tracking-tighter text-white">
                        {titleStatic} <br />
                        <span className="text-field-accent">{titleDynamic}</span>
                    </h1>
                    <p className="mb-8 text-lg text-slate-400 font-sans leading-relaxed">
                        {description}
                    </p>

                    <ul className="mb-10 space-y-4">
                        {bulletsField.map((item, i) => (
                            <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle2 size={20} className="text-field-accent" />
                                <span className="text-slate-200 font-sans">{item}</span>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={toggleMode}
                            className="px-8 py-3 transition-all font-bold bg-field-accent text-field-bg font-mono uppercase tracking-wider rounded-sm hover:bg-emerald-400"
                        >
                            {ctaPrimary}
                        </button>
                        <button className="px-8 py-3 transition-all border border-slate-700 text-field-accent font-mono uppercase tracking-wider rounded-sm hover:bg-slate-800">
                            {ctaSecondary}
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Device Preview */}
            <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
                <DevicePreview />
            </div>
        </div>
    );
}
