"use client";

import React from "react";
import { FactoryScanner } from "./FactoryScanner";
import { Battery, Signal, Wifi, Menu } from "lucide-react";

export function FactoryOS() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-mono selection:bg-amber-500/30">
            {/* Industrial Header */}
            <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-amber-500 flex items-center justify-center rounded-sm">
                            <span className="text-black font-bold text-xl">F</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg tracking-tight text-white">FactoryOS</h1>
                            <div className="flex items-center gap-2 text-[10px] text-slate-400 uppercase tracking-wider">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Active Shift: Late | Site: Bishops Way
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Stats Bar */}
                        <div className="hidden md:flex items-center gap-6 pr-6 border-r border-slate-800">
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-slate-500 uppercase">Equipment Audits</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-amber-500 font-bold">12/15</span>
                                    <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500 w-[80%]"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] text-slate-500 uppercase">Open Hazards</span>
                                <span className="text-emerald-500 font-bold">0</span>
                            </div>
                        </div>

                        {/* System Status */}
                        <div className="flex items-center gap-3 text-slate-500">
                            <Wifi size={18} />
                            <Signal size={18} />
                            <Battery size={18} className="text-green-500" />
                            <button className="ml-2 p-2 hover:bg-slate-800 rounded text-slate-400">
                                <Menu size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto p-4 lg:p-8">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Hazard Detection Scanner</h2>
                    <p className="text-slate-400 max-w-2xl">
                        Use the camera to scan equipment and loads for compliance with PUWER regulations.
                        Ensure all safety checks are logged before transit.
                    </p>
                </div>

                {/* Scanner Component */}
                <div className="h-[calc(100vh-250px)] min-h-[600px]">
                    <FactoryScanner />
                </div>
            </main>
        </div>
    );
}
