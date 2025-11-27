'use client';

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogIndex() {
    const posts = useQuery(api.marketing.getPublishedPosts);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
            {/* Header */}
            <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">Vectis Intelligence</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                        Field notes from the automated frontier.
                    </p>
                </div>
            </header>

            {/* Blog Grid */}
            <main className="container mx-auto px-6 py-16">
                {!posts ? (
                    <div className="text-center text-slate-500">Loading intelligence...</div>
                ) : posts.length === 0 ? (
                    <div className="text-center text-slate-500">No intelligence reports published yet.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post._id} className="group">
                                <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-800 h-full flex flex-col">
                                    {/* Cover Image Placeholder */}
                                    <div className="h-48 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                                        {post.coverImage ? (
                                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                                                <span className="font-serif italic text-2xl opacity-20">Vectis</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 flex-1 flex flex-col">
                                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">
                                            Intelligence Report
                                        </div>
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-500 dark:text-slate-400 mb-6 line-clamp-3 flex-1">
                                            {/* Simple excerpt generation if not provided */}
                                            {post.content.substring(0, 150)}...
                                        </p>

                                        <div className="flex items-center text-slate-900 dark:text-white font-medium group-hover:translate-x-2 transition-transform">
                                            Read Report <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
