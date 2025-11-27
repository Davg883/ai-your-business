import { FileCode, MoreVertical, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface ProjectCardProps {
    id: string;
    title: string;
    description?: string;
    updatedAt: number;
    status: "draft" | "reviewing" | "completed" | "archived";
    issuesCount?: number;
}

export function ProjectCard({ id, title, description, updatedAt, status, issuesCount }: ProjectCardProps) {
    return (
        <Link href={`/dashboard/projects/${id}`} className="block group">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all shadow-sm hover:shadow-md">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                            <FileCode size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                                {description || "No description"}
                            </p>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <MoreVertical size={18} />
                    </button>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                            <Clock size={14} />
                            <span>{formatDistanceToNow(updatedAt, { addSuffix: true })}</span>
                        </div>
                        {status === 'completed' && (
                            <div className="flex items-center gap-1.5 text-red-500">
                                <AlertCircle size={14} />
                                <span>{issuesCount || 0} Issues</span>
                            </div>
                        )}
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            status === 'reviewing' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>
            </div>
        </Link>
    );
}
