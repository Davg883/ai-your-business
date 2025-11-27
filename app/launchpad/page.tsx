'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { Shield, HardHat, Truck, Lock } from "lucide-react";

export default function Launchpad() {
    const myApps = useQuery(api.users.getMyApps) || [];
    const router = useRouter();

    const apps = [
        { id: "chefos", name: "ChefOS", theme: "green", icon: Shield, description: "Kitchen hygiene & safety" },
        { id: "siteos", name: "SiteOS", theme: "orange", icon: HardHat, description: "Construction site audits" },
        { id: "aegis", name: "Aegis", theme: "cyan", icon: Truck, description: "Logistics & fleet management" },
    ];

    const getThemeClasses = (theme: string, isUnlocked: boolean) => {
        if (!isUnlocked) return 'border-slate-200 dark:border-slate-800 opacity-60 grayscale cursor-not-allowed bg-slate-50 dark:bg-slate-900';

        switch (theme) {
            case 'green': return 'border-green-500/50 hover:border-green-500 bg-green-500/5 hover:bg-green-500/10 hover:shadow-green-500/20';
            case 'orange': return 'border-orange-500/50 hover:border-orange-500 bg-orange-500/5 hover:bg-orange-500/10 hover:shadow-orange-500/20';
            case 'cyan': return 'border-cyan-500/50 hover:border-cyan-500 bg-cyan-500/5 hover:bg-cyan-500/10 hover:shadow-cyan-500/20';
            default: return 'border-slate-500';
        }
    };

    const getIconColor = (theme: string, isUnlocked: boolean) => {
        if (!isUnlocked) return 'text-slate-400';
        switch (theme) {
            case 'green': return 'text-green-500';
            case 'orange': return 'text-orange-500';
            case 'cyan': return 'text-cyan-500';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Vectis Dock</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Select your operational environment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                {apps.map((app) => {
                    const isUnlocked = myApps.includes(app.id);
                    const Icon = app.icon;

                    return (
                        <div
                            key={app.id}
                            onClick={() => isUnlocked ? router.push(`/${app.id}`) : null}
                            className={`
                relative p-8 rounded-2xl border-2 transition-all duration-300 shadow-lg
                flex flex-col items-center text-center group
                ${getThemeClasses(app.theme, isUnlocked)}
                ${isUnlocked ? 'cursor-pointer hover:-translate-y-1' : ''}
              `}
                        >
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-white dark:bg-slate-900 shadow-sm ${isUnlocked ? 'group-hover:scale-110 transition-transform' : ''}`}>
                                <Icon className={`w-10 h-10 ${getIconColor(app.theme, isUnlocked)}`} />
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{app.name}</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6">{app.description}</p>

                            {!isUnlocked && (
                                <div className="absolute top-4 right-4">
                                    <Lock className="w-5 h-5 text-slate-400" />
                                </div>
                            )}

                            {isUnlocked ? (
                                <span className={`text-sm font-bold uppercase tracking-wider ${getIconColor(app.theme, true)}`}>
                                    Enter System &rarr;
                                </span>
                            ) : (
                                <span className="text-xs font-bold text-slate-400 bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full">
                                    LOCKED
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 text-slate-400 text-sm">
                Need access to more modules? <a href="#" className="text-purple-500 hover:text-purple-400 underline">Contact HQ</a>
            </div>
        </div>
    );
}
