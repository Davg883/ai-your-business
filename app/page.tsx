'use client';

import Link from "next/link";
import { Shield, HardHat, Truck, Search, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import BlogFeed from "@/components/BlogFeed";
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function HubPage() {
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
            href: "/products/chefos",
            hoverMedia: "https://res.cloudinary.com/dptqxjhb8/video/upload/v1764090465/Chef_Uses_AR_For_Kitchen_Safety_vtsjtt.mp4",
            mediaType: "video"
        },
        {
            id: "siteos",
            name: "SiteOS",
            sector: "Construction",
            description: "Site audits, incident reporting, and safety logs.",
            icon: HardHat,
            theme: "orange",
            status: "Join Waitlist",
            href: "/products/siteos",
            hoverMedia: "https://res.cloudinary.com/dptqxjhb8/image/upload/v1764195318/SiteOS_dashboard_wmgr3v.png",
            mediaType: "image"
        },
        {
            id: "aegis",
            name: "Aegis",
            sector: "Logistics",
            description: "Fleet management and cargo manifest verification.",
            icon: Truck,
            theme: "cyan",
            status: "Case Study",
            href: "/products/aegis",
            hoverMedia: null,
            mediaType: null
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
                    <div className="flex gap-4 text-sm font-medium text-slate-500 items-center">
                        <Link href="/blog" className="hover:text-slate-900">Intelligence</Link>

                        <SignedIn>
                            <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
                            <UserButton />
                        </SignedIn>

                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="hover:text-slate-900">Sign In</button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </SignedOut>
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

                                            {/* Hover Media Background */}
                                            {tool.hoverMedia && (
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0">
                                                    {tool.mediaType === 'video' ? (
                                                        <video
                                                            src={tool.hoverMedia}
                                                            autoPlay
                                                            muted
                                                            loop
                                                            playsInline
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <img
                                                            src={tool.hoverMedia}
                                                            alt={tool.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                    {/* Gradient Overlay to ensure text readability */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-slate-900/10" />
                                                </div>
                                            )}

                                            {/* Content Layer (z-10 to sit above media) */}
                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Status Badge */}
                                                <div className="absolute top-0 right-0">
                                                    <span className={`
                                                text-xs font-bold px-3 py-1 rounded-full border
                                                ${tool.status === 'Live' ? 'bg-green-50 text-green-700 border-green-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/20' : ''}
                                                ${tool.status === 'Join Waitlist' ? 'bg-orange-50 text-orange-700 border-orange-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/20' : ''}
                                                ${tool.status === 'Case Study' ? 'bg-cyan-50 text-cyan-700 border-cyan-200 group-hover:bg-white/20 group-hover:text-white group-hover:border-white/20' : ''}
                                            `}>
                                                        {tool.status}
                                                    </span>
                                                </div>

                                                <div className={`
                                            w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors
                                            ${tool.theme === 'green' ? 'bg-green-50 text-green-600 group-hover:bg-white/20 group-hover:text-white' : ''}
                                            ${tool.theme === 'orange' ? 'bg-orange-50 text-orange-600 group-hover:bg-white/20 group-hover:text-white' : ''}
                                            ${tool.theme === 'cyan' ? 'bg-cyan-50 text-cyan-600 group-hover:bg-white/20 group-hover:text-white' : ''}
                                        `}>
                                                    <Icon size={28} />
                                                </div>

                                                <h2 className="text-2xl font-bold mb-2 group-hover:text-white transition-colors">{tool.name}</h2>
                                                <p className="text-slate-500 mb-8 flex-1 group-hover:text-slate-200 transition-colors">{tool.description}</p>

                                                <div className="flex items-center text-sm font-bold text-slate-900 group-hover:text-white group-hover:translate-x-1 transition-all">
                                                    Explore {tool.sector} <ArrowUpRight size={16} className="ml-1" />
                                                </div>
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

                    <BlogFeed />
                </div>
            </section>

        </div>
    );
}
