'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Tablet } from "lucide-react";
import { useParams } from "next/navigation";

export default function BlogPost() {
    const params = useParams();
    const slug = params.slug as string;

    const post = useQuery(api.marketing.getPostBySlug, { slug });

    if (post === undefined) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading...</div>;
    }

    if (post === null) {
        return <div className="min-h-screen flex items-center justify-center text-slate-500">Post not found.</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-blue-100 selection:text-blue-900">

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/blog" className="flex items-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> Back to Intelligence
                    </Link>
                    <div className="font-serif font-bold text-slate-900 dark:text-white">VECTIS</div>
                </div>
            </nav>

            {/* Article Header */}
            <header className="pt-32 pb-16 px-6 bg-slate-50 dark:bg-slate-900/50">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-4">
                        Intelligence Report
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-8 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>5 min read</span>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12 max-w-6xl">
                {/* Article Content */}
                <article className="flex-1 max-w-3xl mx-auto lg:mx-0">
                    <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </article>

                {/* The Trap (Right Rail on Desktop) */}
                <aside className="hidden lg:block w-80 shrink-0">
                    <div className="sticky top-24">
                        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800">
                            <div className="flex justify-center mb-6">
                                {/* Miniature Tablet Visual */}
                                <div className="w-32 h-24 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg border-2 border-slate-600 flex items-center justify-center shadow-inner relative overflow-hidden">
                                    <Tablet className="text-slate-400" size={32} />
                                    <div className="absolute inset-0 bg-blue-500/10"></div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-center">Stop reading. Start automating.</h3>
                            <p className="text-slate-400 text-sm mb-6 text-center">
                                ChefOS handles compliance so you don't have to.
                            </p>
                            <Link href="/products/chefos" className="block w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors text-center shadow-lg">
                                Launch ChefOS &rarr;
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>

            {/* The Trap (Bottom Banner on Mobile) */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 z-40 border-t border-slate-800">
                <div className="container mx-auto flex items-center justify-between gap-4">
                    <div>
                        <div className="font-bold text-sm">Stop reading. Start automating.</div>
                    </div>
                    <Link href="/products/chefos" className="px-4 py-2 bg-white text-black font-bold text-sm rounded-lg hover:bg-slate-200 transition-colors whitespace-nowrap">
                        Launch ChefOS &rarr;
                    </Link>
                </div>
            </div>

            <div className="h-20 lg:hidden"></div> {/* Spacer for mobile footer */}
        </div>
    );
}
