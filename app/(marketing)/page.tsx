import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
    const { userId } = await auth();

    if (userId) {
        redirect('/dashboard');
    }

    return (
        <div className="pt-20">
            {/* Hero */}
            <section className="relative pt-20 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">Powered by Gemini 1.5 Pro</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-white">
                        Ship Flawless React Code<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">In Seconds</span>
                    </h1>

                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                        The AI-powered code reviewer that catches bugs, security issues, and performance bottlenecks before you push.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/sign-up"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all transform hover:scale-105">
                            Review My Code Free
                        </Link>
                        <Link href="#demo"
                            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z">
                                </path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Watch Demo
                        </Link>
                    </div>

                    <div className="mt-20 relative max-w-5xl mx-auto">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-30 blur-lg"></div>
                        <div className="relative bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700 bg-slate-900/50">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="ml-4 text-xs text-slate-500 font-mono">dashboard.tsx</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-[400px]">
                                <div className="p-6 font-mono text-sm text-slate-300 border-r border-slate-700 bg-slate-900/30 text-left">
                                    <div className="text-slate-500">// Original Code</div>
                                    <div className="mt-2 text-purple-400">useEffect<span className="text-slate-300">(() ={'>'} {'{'}</span></div>
                                    <div className="pl-4 text-slate-300">fetchData();</div>
                                    <div className="text-slate-300">{'}'}); <span className="text-red-400 underline decoration-wavy decoration-red-500/50" title="Missing dependency array">// Infinite loop risk!</span></div>
                                </div>
                                <div className="p-6 font-mono text-sm text-slate-300 bg-slate-900/50 text-left">
                                    <div className="text-green-400">// AI Suggestion</div>
                                    <div className="mt-2 text-purple-400">useEffect<span className="text-slate-300">(() ={'>'} {'{'}</span></div>
                                    <div className="pl-4 text-slate-300">fetchData();</div>
                                    <div className="text-slate-300">{'}'}, []); <span className="text-green-400">✓ Fixed</span></div>
                                    <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-300">
                                        <strong>Optimization:</strong> Added dependency array to prevent infinite re-renders.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            <section className="py-10 border-y border-white/5 bg-white/5">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-sm text-slate-400 mb-8 uppercase tracking-wider">Trusted by developers at</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="text-2xl font-bold text-white">ACME</span>
                        <span className="text-2xl font-bold text-white">Globex</span>
                        <span className="text-2xl font-bold text-white">Soylent</span>
                        <span className="text-2xl font-bold text-white">Initech</span>
                        <span className="text-2xl font-bold text-white">Umbrella</span>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-slate-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Everything you need to code cleaner</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Don't let technical debt pile up. Get instant feedback on your React components.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-colors group">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Performance Audit</h3>
                            <p className="text-slate-400">Identify unnecessary re-renders, heavy computations, and memory leaks in your components.</p>
                        </div>

                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors group">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Security Scan</h3>
                            <p className="text-slate-400">Detect XSS vulnerabilities, unsafe dependencies, and exposed secrets automatically.</p>
                        </div>

                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-pink-500/50 transition-colors group">
                            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">Modern Refactoring</h3>
                            <p className="text-slate-400">Get suggestions to upgrade legacy patterns to modern Hooks and functional components.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">Ready to write better React?</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Join thousands of developers who trust ReactReviewer to keep their codebase clean.</p>
                    <Link href="/sign-up"
                        className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors transform hover:scale-105">
                        Start Reviewing Now
                    </Link>
                    <p className="mt-6 text-sm text-slate-400">No credit card required for free tier</p>
                </div>
            </section>
        </div>
    );
}
