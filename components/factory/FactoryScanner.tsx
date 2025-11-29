"use client";

"use client";

import React, { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, RefreshCw, Scan, AlertCircle, AlertTriangle } from "lucide-react";
import { ComplianceTicket } from "./ComplianceTicket";
import Image from "next/image";

const TEST_SCENARIOS = [
    {
        id: 'scenario-a',
        label: 'Scenario A: Unsecured Load',
        status: 'FAIL',
        imageUrl: '/images/factory/unsafe-trolley.png',
        hazard: 'CRITICAL: No Securing Straps. Non-Braked Castors.',
        citation: 'PUWER 1998 Reg 4 / LOLER Reg 8'
    },
    {
        id: 'scenario-b',
        label: 'Scenario B: Compliant Load',
        status: 'PASS',
        imageUrl: '/images/factory/safe-trolley.png',
        hazard: null,
        citation: null
    }
];

function HazardOverlay() {
    return (
        <div className="absolute inset-0 z-20 pointer-events-none">
            <svg className="w-full h-full absolute inset-0">
                <motion.rect
                    x="25%"
                    y="20%"
                    width="50%"
                    height="60%"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="4"
                    strokeDasharray="10 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />
            </svg>

            {/* Pulsing Glow Area */}
            <motion.div
                className="absolute top-[20%] left-[25%] w-[50%] h-[60%] bg-red-500/10 border border-red-500/50"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div
                    className="absolute inset-0 bg-red-500/20"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-red-500 -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-red-500 -mt-1 -mr-1"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-red-500 -mb-1 -ml-1"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-red-500 -mb-1 -mr-1"></div>
            </motion.div>

            {/* Hazard Label */}
            <motion.div
                className="absolute top-[15%] left-[25%] bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <AlertTriangle size={12} /> HAZARD DETECTED
            </motion.div>
        </div>
    );
}

export function FactoryScanner() {
    const analyzeHazard = useAction(api.factory.auditor.analyzeHazard);
    const [isScanning, setIsScanning] = useState(false);
    type ScanResult = {
        status: "SAFE" | "UNSAFE";
        hazard?: string;
        regulations: Array<{
            act_name: string;
            section_title: string;
            content_text: string;
        }>;
    };
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [selectedScenarioId, setSelectedScenarioId] = useState<string>(TEST_SCENARIOS[0].id);

    const activeScenario = TEST_SCENARIOS.find(s => s.id === selectedScenarioId) || TEST_SCENARIOS[0];

    const handleScan = async () => {
        setIsScanning(true);
        setScanResult(null);

        // Simulate scanning delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
            const query = activeScenario.status === "FAIL"
                ? "Unsecured steel sheets on trolley without straps"
                : "Steel sheets properly strapped to trolley with brakes engaged";

            let regulations;
            try {
                regulations = await analyzeHazard({
                    query,
                    orgId: "license_factory_os_true",
                });
            } catch (err) {
                console.warn("Backend API failed, using mock data for demo:", err);
                // Mock fallback for demo purposes if backend is not ready
                regulations = [
                    {
                        act_name: "PUWER 1998",
                        section_title: "Regulation 4: Suitability of work equipment",
                        content_text: "Every employer shall ensure that work equipment is so constructed or adapted as to be suitable for the purpose for which it is used or provided.",
                    }
                ];
            }

            setScanResult({
                status: activeScenario.status === "FAIL" ? "UNSAFE" : "SAFE",
                hazard: activeScenario.hazard || undefined,
                regulations: regulations || [],
            });
        } catch (error) {
            console.error("Scan failed:", error);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8 h-full">
            {/* Scanner Viewport */}
            <div className="relative flex flex-col h-full min-h-[500px] bg-black rounded-lg overflow-hidden border-4 border-slate-800 shadow-2xl">
                {/* Caution Stripes Border */}
                <div className="absolute inset-0 pointer-events-none z-20 border-[16px] border-transparent"
                    style={{
                        backgroundImage: "repeating-linear-gradient(45deg, #000 0, #000 10px, #EAB308 10px, #EAB308 20px)",
                        maskImage: "linear-gradient(to bottom, black 0%, transparent 5%, transparent 95%, black 100%), linear-gradient(to right, black 0%, transparent 5%, transparent 95%, black 100%)",
                        WebkitMaskComposite: "source-over"
                    }}
                />

                {/* Camera Feed Simulation */}
                <div className="relative flex-1 bg-slate-900 flex items-center justify-center overflow-hidden group">
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 opacity-20 z-10 pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(#EAB308 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                    />

                    {/* Scenario Image */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Image
                            src={activeScenario.imageUrl}
                            alt="Scanner Feed"
                            fill
                            className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        />
                    </div>

                    {/* Hazard Overlay (Only on Fail Result) */}
                    <AnimatePresence>
                        {scanResult?.status === "UNSAFE" && <HazardOverlay />}
                    </AnimatePresence>

                    {/* Scanning Beam (Cyan Laser) */}
                    <AnimatePresence>
                        {isScanning && (
                            <motion.div
                                className="absolute left-0 right-0 h-1 bg-cyan-400 z-30 shadow-[0_0_20px_rgba(34,211,238,1)]"
                                initial={{ top: "0%" }}
                                animate={{ top: "100%" }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Target Reticle (Hidden when scanning or showing result) */}
                    {!isScanning && !scanResult && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            <div className="w-64 h-64 border-2 border-amber-500/50 rounded-lg relative">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-amber-500 -mt-1 -ml-1"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-amber-500 -mt-1 -mr-1"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-amber-500 -mb-1 -ml-1"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-amber-500 -mb-1 -mr-1"></div>
                            </div>
                        </div>
                    )}

                    {/* Live Feed Indicator */}
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-mono text-white uppercase">Live Feed</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-slate-900 p-6 border-t border-slate-800 z-30">
                    <div className="flex flex-col gap-4">
                        {/* Scenario Selector */}
                        <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-lg border border-slate-700">
                            <span className="text-xs text-slate-400 font-mono uppercase px-2">Test Scenario:</span>
                            <select
                                value={selectedScenarioId}
                                onChange={(e) => {
                                    setSelectedScenarioId(e.target.value);
                                    setScanResult(null);
                                }}
                                className="bg-slate-900 text-amber-500 text-sm font-mono border border-slate-700 rounded px-3 py-1 outline-none focus:border-amber-500 w-full"
                            >
                                {TEST_SCENARIOS.map(scenario => (
                                    <option key={scenario.id} value={scenario.id}>{scenario.label}</option>
                                ))}
                            </select>
                        </div>

                        {/* Scan Button */}
                        <button
                            onClick={handleScan}
                            disabled={isScanning}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 px-6 rounded flex items-center justify-center gap-3 uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isScanning ? (
                                <>
                                    <RefreshCw className="animate-spin" /> Querying PUWER Database...
                                </>
                            ) : (
                                <>
                                    <Scan /> Scan Equipment / Load
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Panel */}
            <div className="relative min-h-[500px] flex items-center justify-center bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-800">
                <AnimatePresence mode="wait">
                    {scanResult ? (
                        <ComplianceTicket
                            key="result"
                            result={scanResult}
                            onReset={() => setScanResult(null)}
                        />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center text-slate-500"
                        >
                            <AlertCircle size={48} className="mx-auto mb-4 opacity-20" />
                            <p className="font-mono text-sm uppercase">Ready to Scan</p>
                            <p className="text-xs mt-2 opacity-50">Align equipment within the reticle</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
