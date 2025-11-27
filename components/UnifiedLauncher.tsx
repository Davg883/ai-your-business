'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Lock } from "lucide-react";

export const UnifiedLauncher = () => {
    // Fetch permissions for "chefos" (as per example)
    const chefOSAccess = useQuery(api.entitlements.getMyStatus, { appId: "chefos" });

    // Check specific modules
    const hasCanvas = chefOSAccess?.activeModules.includes("culinary_canvas");

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

            {/* KITCHEN GUARD CARD */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">KitchenGuard</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">Automated hygiene and safety monitoring system.</p>

                {chefOSAccess?.status === 'active' ? (
                    <button className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-colors">
                        OPEN APP
                    </button>
                ) : (
                    <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-400 font-bold rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
                        <Lock size={18} />
                        LOCKED (SUBSCRIBE)
                    </button>
                )}
            </div>

            {/* CULINARY CANVAS CARD */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <div className="w-24 h-24 bg-purple-500 rounded-full blur-2xl"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Culinary Canvas</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">AI-powered menu design and food styling studio.</p>

                {hasCanvas ? (
                    <button className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors">
                        OPEN STUDIO
                    </button>
                ) : (
                    // The Upsell Opportunity
                    <button className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold rounded-lg transition-all shadow-lg shadow-orange-500/20">
                        UPGRADE TO PRO (+£50)
                    </button>
                )}
            </div>

        </div>
    );
};
