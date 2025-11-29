"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, FileText, ShieldAlert } from "lucide-react";

interface ComplianceTicketProps {
    result: {
        status: "SAFE" | "UNSAFE";
        regulations: Array<{
            act_name: string;
            section_title: string;
            content_text: string;
        }>;
        hazard?: string;
    };
    onReset: () => void;
}

export function ComplianceTicket({ result, onReset }: ComplianceTicketProps) {
    const isSafe = result.status === "SAFE";

    return (
        <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="w-full max-w-md bg-slate-900 border-l-4 border-amber-500 shadow-2xl overflow-hidden font-mono"
        >
            {/* Header Ticket Stub */}
            <div className={`p-4 flex items-center justify-between border-b ${isSafe ? "bg-emerald-900/20 border-emerald-500/30" : "bg-red-900/20 border-red-500/30"}`}>
                <div className="flex items-center gap-3">
                    {isSafe ? (
                        <CheckCircle className="text-emerald-500" size={24} />
                    ) : (
                        <AlertTriangle className="text-red-500" size={24} />
                    )}
                    <div>
                        <h3 className={`font-bold text-lg ${isSafe ? "text-emerald-400" : "text-red-400"}`}>
                            {isSafe ? "VERIFIED SAFE" : "UNSAFE TO MOVE"}
                        </h3>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Ticket #F-2025-884</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block text-xs text-slate-500">SEVERITY</span>
                    <span className={`font-bold ${isSafe ? "text-emerald-500" : "text-red-500"}`}>
                        {isSafe ? "LOW" : "CRITICAL"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
                {/* Identified Hazard */}
                {!isSafe && (
                    <div className="bg-red-500/10 border border-red-500/20 p-3 rounded">
                        <h4 className="text-red-400 text-xs uppercase font-bold mb-1 flex items-center gap-2">
                            <ShieldAlert size={14} /> Identified Hazard
                        </h4>
                        <p className="text-slate-300 text-sm">
                            {result.hazard || "Unsecured load detected. Material stack unstable during transit."}
                        </p>
                    </div>
                )}

                {/* Regulations Cited */}
                <div>
                    <h4 className="text-amber-500 text-xs uppercase font-bold mb-3 flex items-center gap-2">
                        <FileText size={14} /> Regulation Cited
                    </h4>
                    <div className="space-y-3">
                        {result.regulations.map((reg, idx) => (
                            <div key={idx} className="bg-slate-800 p-3 rounded border border-slate-700">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-amber-400 font-bold text-xs">{reg.act_name}</span>
                                    <span className="text-slate-500 text-[10px]">{reg.section_title}</span>
                                </div>
                                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                                    {reg.content_text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The Fix Checklist */}
                {!isSafe && (
                    <div>
                        <h4 className="text-slate-400 text-xs uppercase font-bold mb-3">Required Actions</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <div className="w-4 h-4 border border-slate-600 rounded flex items-center justify-center"></div>
                                Apply Ratchet Straps (Min 2)
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <div className="w-4 h-4 border border-slate-600 rounded flex items-center justify-center"></div>
                                Check Wheel Brakes engaged
                            </li>
                            <li className="flex items-center gap-2 text-sm text-slate-300">
                                <div className="w-4 h-4 border border-slate-600 rounded flex items-center justify-center"></div>
                                Verify center of gravity
                            </li>
                        </ul>
                    </div>
                )}

                {/* Actions */}
                <div className="pt-4 flex gap-3">
                    {!isSafe ? (
                        <>
                            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded font-bold text-sm uppercase tracking-wide transition-colors">
                                Log Incident
                            </button>
                            <button
                                onClick={onReset}
                                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 px-4 rounded font-bold text-sm uppercase tracking-wide transition-colors"
                            >
                                Retest
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onReset}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded font-bold text-sm uppercase tracking-wide transition-colors"
                        >
                            Issue Permit to Move
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
