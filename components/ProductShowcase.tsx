'use client';

import { motion, Variants } from "framer-motion";
import { Play, Shield, Wand, Tablet, Book, Check } from "lucide-react";
import { useState } from "react";
import { createCheckoutSession } from "@/app/actions/stripe";

export default function ProductShowcase() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckout = async () => {
        setIsLoading(true);
        try {
            const url = await createCheckoutSession('chefos');
            window.location.href = url;
        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Please sign in to subscribe.");
            window.location.href = "/sign-in?redirect_url=/products/chefos";
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500 selection:text-black">

            {/* 1. CINEMATIC HERO */}
            <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dimmer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" /> {/* Bottom Fade */}

                    {/* Placeholder for Video - using a high quality image for now if video fails or is heavy */}
                    <img
                        src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop"
                        alt="ChefOS Background"
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>

                {/* Hero Content */}
                <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-5xl md:text-8xl font-serif font-medium tracking-tight mb-8 text-white drop-shadow-2xl"
                    >
                        ChefOS. Safety in a Snap.
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="group flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all mx-auto"
                        >
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                                <Play size={18} fill="currentColor" className="ml-1" />
                            </div>
                            <span className="text-lg font-medium tracking-wide">Watch Trailer</span>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* 2. THE "BENTO" FEATURES */}
            <section className="py-32 px-6 bg-black">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >

                        {/* Card 1: Safety */}
                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-green-500/30 transition-colors group relative overflow-hidden h-[400px]">
                            <div className="absolute inset-0 z-0">
                                <video
                                    src="https://res.cloudinary.com/dptqxjhb8/video/upload/v1764090465/Chef_Uses_AR_For_Kitchen_Safety_vtsjtt.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity z-10">
                                <Shield size={120} />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-black mb-6">
                                    <Shield size={24} />
                                </div>
                                <h3 className="text-3xl font-bold mb-2">Automated Audits</h3>
                                <p className="text-zinc-400 text-lg">AI-driven hygiene checks that happen in the background. Never miss a compliance log again.</p>
                            </div>
                        </motion.div>

                        {/* Card 2: Marketing */}
                        <motion.div variants={itemVariants} className="col-span-1 bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-purple-500/30 transition-colors group relative overflow-hidden h-[400px]">
                            <div className="absolute inset-0 z-0">
                                <video
                                    src="https://res.cloudinary.com/dptqxjhb8/video/upload/v1764090414/App_from_kitchen_to_socials_wmw3ob.mp4"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                            </div>
                            <div className="absolute -right-4 -top-4 opacity-20 group-hover:opacity-40 transition-opacity z-10">
                                <Wand size={100} />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-6">
                                    <Wand size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">AI Photo Studio</h3>
                                <p className="text-zinc-400">Turn messy kitchen snaps into Michelin-star marketing assets.</p>
                            </div>
                        </motion.div>

                        {/* Card 3: Hardware */}
                        <motion.div variants={itemVariants} className="col-span-1 bg-zinc-900 rounded-3xl p-8 border border-zinc-800 hover:border-orange-500/30 transition-colors group relative overflow-hidden h-[400px]">
                            <div className="absolute inset-0">
                                <img src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2015&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" alt="Tablet" />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center text-white mb-6">
                                    <Tablet size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Military Grade</h3>
                                <p className="text-zinc-400">Includes ruggedized tablet built for heat, steam, and chaos.</p>
                            </div>
                        </motion.div>

                        {/* Card 4: Academy (Full Width) */}
                        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-4 bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-800 hover:border-gold-500/30 transition-colors group relative overflow-hidden">
                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <div className="flex-1">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 text-yellow-500 rounded-full text-sm font-bold mb-6 border border-yellow-500/20">
                                        <Check size={14} /> INCLUDED FREE
                                    </div>
                                    <h3 className="text-4xl font-bold mb-4">The Vectis Academy</h3>
                                    <p className="text-xl text-zinc-400 mb-8">
                                        Every subscription includes full access to our "AI for Media" training course.
                                        Learn how to prompt, edit, and publish like a pro.
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                                        <span className="flex items-center gap-2"><Book size={16} /> 12 Modules</span>
                                        <span className="flex items-center gap-2"><Play size={16} /> 4 Hours Video</span>
                                    </div>
                                </div>
                                <div className="flex-1 relative h-64 w-full md:w-auto">
                                    {/* Book Cover Mockup */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 rounded-lg shadow-2xl transform rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500 overflow-hidden border border-zinc-700">
                                        <img
                                            src="https://res.cloudinary.com/dptqxjhb8/image/upload/v1764194608/AI_for_Media_Level_1_Cover_rcc3r9.png"
                                            alt="AI for Media Manual"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>

            {/* 3. THE PRICING DOCK (Sticky Bottom) */}
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ delay: 1, type: "spring" }}
                className="fixed bottom-6 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[600px] z-50"
            >
                <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center justify-between pl-6">
                    <div>
                        <div className="text-white font-bold text-lg">ChefOS Subscription</div>
                        <div className="text-zinc-400 text-xs">Includes Hardware + Software + Training</div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-white font-serif text-xl">£79<span className="text-sm font-sans text-zinc-500">/mo</span></div>
                        <button
                            onClick={handleCheckout}
                            disabled={isLoading}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Loading..." : "Subscribe Now"}
                        </button>
                    </div>
                </div>
            </motion.div>

        </div>
    );
}
