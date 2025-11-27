'use client';

import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Play, Save, Loader2, CheckCircle, AlertTriangle, FileCode, Activity } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

export default function ProjectDetailsPage() {
    const params = useParams();
    const projectId = params.id as string; // Ensure projectId is treated as string

    // We need to cast projectId to Id<"projects"> if we were using strict types, 
    // but for now let's trust the query handles the string ID or we might need a helper.
    // Actually Convex expects Id<"projects">. The query `getProject` takes `projectId: v.id("projects")`.
    // In the generated API, passing a string usually works if it's a valid ID string.

    const project = useQuery(api.projects.getProject, { projectId: projectId as any });
    const updateProject = useMutation(api.projects.updateProject);
    const generateReview = useAction(api.actions.gemini.generateText);

    const [code, setCode] = useState("");
    const [isReviewing, setIsReviewing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Load initial code when project loads
    useEffect(() => {
        if (project?.content?.code) {
            setCode(project.content.code);
        }
    }, [project]);

    if (project === undefined) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    if (project === null) {
        return <div>Project not found</div>;
    }

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await updateProject({
                projectId: projectId as any,
                content: { ...project.content, code },
            });
        } catch (error) {
            console.error("Failed to save:", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleReview = async () => {
        if (!code.trim()) return;

        setIsReviewing(true);
        await handleSave(); // Save before reviewing

        try {
            // Update status to reviewing
            await updateProject({
                projectId: projectId as any,
                status: "reviewing",
            });

            const prompt = `
        You are a Senior React Engineer. Review the following React code.
        Focus on:
        1. Potential bugs and logic errors.
        2. Performance issues (re-renders, memory leaks).
        3. Security vulnerabilities.
        4. Best practices and code style.

        Provide the output in Markdown format with clear headings.
        
        Code:
        \`\`\`tsx
        ${code}
        \`\`\`
      `;

            const analysis = await generateReview({
                prompt,
                projectId: projectId as any,
            });

            await updateProject({
                projectId: projectId as any,
                analysis,
                status: "completed",
            });

        } catch (error) {
            console.error("Review failed:", error);
            // Revert status?
        } finally {
            setIsReviewing(false);
        }
    };

    return (
        <div className="h-[calc(100vh-8rem)] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} className="text-slate-500" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            {project.title}
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-700' :
                                project.status === 'reviewing' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-slate-100 text-slate-700'
                                }`}>
                                {project.status}
                            </span>
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{project.description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isReviewing}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                    >
                        {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        Save
                    </button>
                    <button
                        onClick={handleReview}
                        disabled={isReviewing || !code.trim()}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-lg shadow-lg shadow-purple-500/25 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isReviewing ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Play size={18} />
                                Run Review
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content - Split View */}
            <div className="flex-1 flex gap-6 min-h-0">
                {/* Code Editor */}
                <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <FileCode size={16} />
                            Code Editor
                        </span>
                        <span className="text-xs text-slate-400">TypeScript / React</span>
                    </div>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="// Paste your React component code here..."
                        className="flex-1 w-full p-4 font-mono text-sm bg-transparent outline-none resize-none text-slate-800 dark:text-slate-200"
                        spellCheck={false}
                    />
                </div>

                {/* Analysis Results */}
                <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                            <Activity size={16} />
                            AI Analysis
                        </span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 prose dark:prose-invert max-w-none">
                        {project.analysis ? (
                            <ReactMarkdown>{project.analysis}</ReactMarkdown>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400">
                                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                                    <Play size={24} className="ml-1 opacity-50" />
                                </div>
                                <p>Run a review to see the analysis here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
