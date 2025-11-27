import { getLandingPage, getAllLandingPages, LandingPageData } from '@/lib/landing-pages';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

// Generate static params for all known landing pages
export async function generateStaticParams() {
    const pages = getAllLandingPages();
    return pages.map((page) => ({
        slug: [page.category, page.slug],
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = getLandingPage(slug);
    if (!page) return {};

    return {
        title: page.title,
        description: page.metaDescription,
        keywords: page.keywords,
    };
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const page = getLandingPage(slug);

    if (!page) {
        notFound();
    }

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="relative pt-20 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm font-medium text-slate-300">Powered by Gemini 1.5 Pro</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-white">
                        {page.heroHeadline}
                    </h1>

                    <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                        {page.heroSubheadline}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={page.primaryCTA.href}
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 transition-all transform hover:scale-105"
                        >
                            {page.primaryCTA.text}
                        </Link>
                        {page.secondaryCTA && (
                            <Link
                                href={page.secondaryCTA.href}
                                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium rounded-xl transition-all"
                            >
                                {page.secondaryCTA.text}
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Social Proof */}
            {page.socialProof && (
                <section className="py-10 border-y border-white/5 bg-white/5">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
                            {page.socialProof.stats.map((stat, i) => (
                                <div key={i}>
                                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                                    <p className="text-slate-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                        <div className="max-w-3xl mx-auto bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                            <blockquote className="text-xl text-slate-300 mb-4">"{page.socialProof.testimonial.quote}"</blockquote>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                                <div className="text-left">
                                    <p className="font-bold text-white">{page.socialProof.testimonial.author}</p>
                                    <p className="text-sm text-slate-400">{page.socialProof.testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Benefits / Features */}
            {page.benefits && (
                <section className="py-24 bg-slate-900">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-16 text-white">Why Developers Love Us</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {page.benefits.map((benefit, i) => (
                                <div key={i} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                                    <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                                    <p className="text-slate-400">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Comparison Table */}
            {page.comparisonTable && (
                <section className="py-24 bg-slate-900">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-bold text-center mb-16 text-white">Us vs {page.competitor}</h2>
                        <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-slate-900/50">
                                        <th className="p-6 text-left text-slate-400">Feature</th>
                                        <th className="p-6 text-center text-white font-bold text-xl">Us</th>
                                        <th className="p-6 text-center text-slate-400">{page.competitor}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700">
                                    {page.comparisonTable.map((row, i) => (
                                        <tr key={i} className="hover:bg-slate-700/30">
                                            <td className="p-6 text-slate-300">{row.feature}</td>
                                            <td className="p-6 text-center">
                                                {row.us === true ? (
                                                    <span className="text-green-400 text-xl">✓</span>
                                                ) : (
                                                    <span className="text-white">{row.us}</span>
                                                )}
                                            </td>
                                            <td className="p-6 text-center">
                                                {row.them === true ? (
                                                    <span className="text-green-400 text-xl">✓</span>
                                                ) : row.them === false ? (
                                                    <span className="text-red-400 text-xl">✗</span>
                                                ) : (
                                                    <span className="text-slate-400">{row.them}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            )}

            {/* Problem / Solution */}
            {page.problem && page.solution && (
                <section className="py-24 bg-slate-800/30">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="inline-block px-4 py-1 bg-red-500/10 text-red-400 rounded-full text-sm font-bold mb-6">The Problem</div>
                                <h2 className="text-3xl font-bold mb-6 text-white">{page.problem.title}</h2>
                                <p className="text-xl text-slate-400 mb-8">{page.problem.description}</p>
                                <ul className="space-y-4">
                                    {page.problem.painPoints.map((point, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300">
                                            <span className="text-red-400">✗</span> {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="inline-block px-4 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-bold mb-6">The Solution</div>
                                <h2 className="text-3xl font-bold mb-6 text-white">{page.solution.title}</h2>
                                <p className="text-xl text-slate-400 mb-8">{page.solution.description}</p>
                                <div className="space-y-6">
                                    {page.solution.steps.map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white flex-shrink-0">
                                                {step.step}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{step.title}</h4>
                                                <p className="text-slate-400">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {page.faq && (
                <section className="py-24 bg-slate-900">
                    <div className="container mx-auto px-6 max-w-3xl">
                        <h2 className="text-3xl font-bold text-center mb-16 text-white">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {page.faq.map((item, i) => (
                                <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                    <h3 className="font-bold text-lg mb-2 text-white">{item.question}</h3>
                                    <p className="text-slate-400">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-6 text-white">Ready to get started?</h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of developers who trust ReactReviewer.
                    </p>
                    <Link
                        href={page.primaryCTA.href}
                        className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors transform hover:scale-105"
                    >
                        {page.primaryCTA.text}
                    </Link>
                </div>
            </section>
        </div>
    );
}
