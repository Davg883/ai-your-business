'use client';

import Link from "next/link";
import { Shield, HardHat, Truck, Search, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export default function HubPage() {
    // Static placeholder data to prevent hydration crash
    const posts = [
        {
            _id: "1",
            slug: "winter-hygiene-risks",
            title: "Winter Hygiene Risks in Commercial Kitchens",
            publishedAt: Date.now(),
            content: "As temperatures drop, pests move indoors...",
            coverImage: null
        },
        {
            _id: "2",
            slug: "digital-audit-trails",
            title: "Why Paper Logs Won't Stand Up in Court",
            publishedAt: Date.now() - 86400000,
            content: "The legal landscape is shifting...",
            coverImage: null
        },
        {
            _id: "3",
            slug: "ai-in-construction",
            title: "AI in Construction: Beyond the Hype",
            publishedAt: Date.now() - 172800000,
            content: "How computer vision is saving lives...",
            coverImage: null
        }
    ];

    const [searchQuery, setSearchQuery] = useState("");

    const tools = [
        {
            id: "chefos",
            name: "ChefOS",
            sector: "Hospitality",
            description: "Automated hygiene compliance and kitchen intelligence.",
            icon: Shield,
            theme: "green",
            status: "Live",
            href: "/products/chefos"
        },
        {
            id: "siteos",
            name: "SiteOS",
            sector: "Construction",
            description: "Site audits, incident reporting, and safety logs.",
            icon: HardHat,
            theme: "orange",
            status: "Join Waitlist",
            href: "/products/siteos"
        },
        {
            id: "aegis",
            name: "Aegis",
            sector: "Logistics",
            description: "Fleet management and cargo manifest verification.",
            icon: Truck,
            theme: "cyan",
            status: "Case Study",
            href: "/products/aegis"
        }
    ];

    const filteredTools = tools.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.sector.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-200">

            {/* Navigation Placeholder (Minimal) */}
            <nav className="border-b border-slate-100 py-4">
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="font-bold tracking-tight text-lg">VECTIS HUB</div>
                    <div className="flex gap-4 text-sm font-medium text-slate-500">
                        <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
                        <Link href="/blog" className="hover:text-slate-900">Intelligence</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6">
                <div className="container mx-auto max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl">
                        Intelligence for the <br className="hidden md:block" />
                        <span className="text-slate-400">Industrial World.</span>
                    </h1>

                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Find tools for your sector..."
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all text-lg placeholder:text-slate-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* The Core Grid (Launcher) */}
            <section className="px-6 pb-24">
                <div className="container mx-auto max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {filteredTools.map((tool, index) => {
                            const Icon = tool.icon;
                            return (
                                <div key={tool.id}>
                                    <Link href={tool.href} className="block group h-full">
                                        <div className="h-full p-8 border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-lg transition-all duration-300 bg-white flex flex-col relative overflow-hidden">

                                            {/* Status Badge */}
                                            <div className="absolute top-6 right-6">
                                                <span className={`
                                            text-xs font-bold px-3 py-1 rounded-full border
                                            ${tool.status === 'Live' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                            ${tool.status === 'Join Waitlist' ? 'bg-orange-50 text-orange-700 border-orange-200' : ''}
                                            ${tool.status === 'Case Study' ? 'bg-cyan-50 text-cyan-700 border-cyan-200' : ''}
                                        `}>
                                                    {tool.status}
                                                </span>
                                            </div>

                                            <div className={`
                                        w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors
                                        ${tool.theme === 'green' ? 'bg-green-50 text-green-600 group-hover:bg-green-100' : ''}
                                        ${tool.theme === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-100' : ''}
                                        ${tool.theme === 'cyan' ? 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100' : ''}
                                    `}>
                                                <Icon size={28} />
                                            </div>

                                            <h2 className="text-2xl font-bold mb-2">{tool.name}</h2>
                                            <p className="text-slate-500 mb-8 flex-1">{tool.description}</p>

                                            <div className="flex items-center text-sm font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                                                Explore {tool.sector} <ArrowUpRight size={16} className="ml-1" />
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Knowledge Section (Operator Manuals) */}
            <section className="px-6 pb-24 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto max-w-5xl pt-16">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Operator Manuals</h2>
                        <p className="text-slate-500">Standard Operating Procedures for the AI workforce.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "AI for Text: Level 1",
                                tag: "PROTOCOL",
                                color: "bg-blue-100 text-blue-700",
                                image: "https://res.cloudinary.com/dptqxjhb8/image/upload/v1764194633/AI_for_Text_Cover_l9fle5.png"
                            },
                            {
                                title: "AI for Media: Level 1",
                                tag: "IMAGING",
                                color: "bg-purple-100 text-purple-700",
                                image: "https://res.cloudinary.com/dptqxjhb8/image/upload/v1764194608/AI_for_Media_Level_1_Cover_rcc3r9.png"
                            },
                            {
                                title: "AI for Code: Level 1",
                                tag: "ENGINEERING",
                                color: "bg-amber-100 text-amber-700",
                                image: "https://res.cloudinary.com/dptqxjhb8/image/upload/v1764194585/AI_for_Code_Level_1_Cover_ufokuj.png"
                            }
                        ].map((manual, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="bg-white border border-slate-200 p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-600 flex flex-col">
                                    {/* Visual */}
                                    <div className="aspect-[3/4] bg-slate-100 mb-6 flex items-center justify-center border border-slate-100 group-hover:border-slate-200 transition-colors overflow-hidden relative">
                                        <img
                                            src={manual.image}
                                            alt={manual.title}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    </div>

                                    <div className="flex items-start justify-between mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider ${manual.color}`}>
                                            {manual.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold mb-4 group-hover:text-blue-600 transition-colors">{manual.title}</h3>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-sm font-medium text-slate-500 group-hover:text-slate-900">
                                        Download PDF <ArrowRight size={14} className="ml-2 rotate-90 group-hover:translate-y-1 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Intelligence Feed */}
            <section className="px-6 pb-24 bg-white border-t border-slate-200">
                <div className="container mx-auto max-w-5xl pt-16">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-bold tracking-tight">Deployment Logs</h2>
                        <Link href="/blog" className="text-slate-500 hover:text-slate-900 flex items-center text-sm font-medium">
                            View Archive <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link href={`/blog/${post.slug}`} key={post._id} className="group block">
                                <article className="flex flex-col h-full">
                                    <div className="aspect-[4/3] bg-slate-200 rounded-xl overflow-hidden mb-4 relative">
                                        {post.coverImage ? (
                                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-white">
                                                <span className="font-serif italic opacity-20">Vectis</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </div>
                                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm line-clamp-2">
                                        {post.content.substring(0, 100)}...
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
