"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

export default function BlogFeed() {
    // Fetch the live data from Convex
    const posts = useQuery(api.marketing.getPublishedPosts);

    // Loading State (Skeleton)
    if (posts === undefined) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    // Empty State
    if (posts.length === 0) {
        return <div className="text-gray-500">No intelligence reports filed yet.</div>;
    }

    // Render the Grid
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
                <Link
                    key={post._id}
                    href={`/blog/${post.slug}`}
                    className="group block h-full"
                >
                    <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-gray-100 border border-gray-200">
                        {/* If you have cover images, render them here. If not, use a placeholder or Sector badge */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 group-hover:scale-105 transition-transform duration-500">
                            {/* Placeholder Visual */}
                            <span className="text-4xl font-bold opacity-20">VECTIS</span>
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 text-xs font-bold uppercase tracking-widest text-slate-800 rounded">
                            Intelligence
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-xs font-mono text-gray-500">
                            {format(new Date(post.publishedAt), 'dd/MM/yyyy')}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
                            {/* Extract a snippet from content or use a summary field if you added one */}
                            {post.content.substring(0, 120).replace(/[#*]/g, '')}...
                        </p>
                        <div className="flex items-center text-blue-600 text-sm font-medium mt-4 group-hover:translate-x-1 transition-transform">
                            Read Report <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
