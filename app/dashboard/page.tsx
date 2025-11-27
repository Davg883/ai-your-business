'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ProjectCard } from "@/components/ProjectCard";
import { Plus, Zap, Shield, Activity, FileCode } from "lucide-react";
import Link from "next/link";
import { UnifiedLauncher } from "@/components/UnifiedLauncher";
import { AcademyGrid } from "@/components/AcademyGrid";

export default function DashboardPage() {
    const projects = useQuery(api.projects.getUserProjects, {});
    const user = useQuery(api.users.getCurrentUser);

    // Calculate stats
    const totalProjects = projects?.length || 0;
    const completedReviews = projects?.filter(p => p.status === 'completed').length || 0;
    const issuesFound = 0; // Placeholder for now

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                        Welcome back, {user?.name?.split(' ')[0] || 'Developer'}! 👋
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Here's what's happening with your code reviews today.
                    </p>
                </div>
                <Link
                    href="/dashboard/projects/new"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all transform hover:scale-105"
                >
                    <Plus size={20} />
                    New Review
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Activity size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Reviews</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{totalProjects}</h3>
                        </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '70%' }}></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                            <Zap size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Completed</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{completedReviews}</h3>
                        </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Issues Found</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{issuesFound}</h3>
                        </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '40%' }}></div>
                    </div>
                </div>
            </div>

            {/* Recent Projects */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Projects</h2>
                    <Link href="/dashboard/projects" className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                        View All
                    </Link>
                </div>

                {projects === undefined ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 h-48 rounded-xl animate-pulse border border-slate-200 dark:border-slate-700"></div>
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 border-dashed">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <FileCode size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No projects yet</h3>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
                            Start by creating your first project to analyze your React code.
                        </p>
                        <Link
                            href="/dashboard/projects/new"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors"
                        >
                            <Plus size={20} />
                            Create Project
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.slice(0, 6).map((project) => (
                            <ProjectCard
                                key={project._id}
                                id={project._id}
                                title={project.title}
                                description={project.description}
                                updatedAt={project.updatedAt}
                                status={project.status as any}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Entitlements Demo */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Your Apps (Entitlements Demo)</h2>
                <UnifiedLauncher />
            </div>

            {/* Academy / Library Demo */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Vectis Academy (Resource Library)</h2>
                <AcademyGrid />
            </div>
        </div>
    );
}
