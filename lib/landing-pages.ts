import fs from 'fs';
import path from 'path';

export interface LandingPageData {
    pageType: string;
    slug: string;
    title: string;
    metaDescription: string;
    heroHeadline: string;
    heroSubheadline: string;
    primaryCTA: {
        text: string;
        href: string;
    };
    secondaryCTA?: {
        text: string;
        href: string;
    };
    benefits?: {
        title: string;
        description: string;
        icon: string;
    }[];
    socialProof?: {
        stats: { value: string; label: string }[];
        testimonial: { quote: string; author: string; role: string };
    };
    faq?: { question: string; answer: string }[];
    keywords: string[];
    // Additional fields for specific page types
    competitor?: string;
    comparisonTable?: { feature: string; us: boolean | string; them: boolean | string }[];
    whySwitch?: string[];
    problem?: { title: string; description: string; painPoints: string[] };
    solution?: { title: string; description: string; steps: { step: number; title: string; description: string }[] };
    results?: { title: string; metrics: { value: string; label: string }[] };
    industrySpecificBenefits?: { title: string; description: string }[];
    caseStudy?: { company: string; result: string; metric: string };
    targetAudience?: string;
    painPoints?: string[];
    solutions?: { pain: string; solution: string }[];
}

export function getLandingPage(slug: string[]): LandingPageData | null {
    try {
        // slug is array like ['features', 'ai-code-review']
        const [category, pageSlug] = slug;

        // Map URL category to folder name if needed, or assume 1:1
        const filePath = path.join(process.cwd(), 'landing-pages', category, `${pageSlug}.json`);

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading landing page:', error);
        return null;
    }
}

export function getAllLandingPages() {
    const pages: { category: string; slug: string }[] = [];
    const baseDir = path.join(process.cwd(), 'landing-pages');

    if (!fs.existsSync(baseDir)) return [];

    const categories = fs.readdirSync(baseDir);

    for (const category of categories) {
        const categoryPath = path.join(baseDir, category);
        if (fs.statSync(categoryPath).isDirectory()) {
            const files = fs.readdirSync(categoryPath);
            for (const file of files) {
                if (file.endsWith('.json')) {
                    pages.push({
                        category,
                        slug: file.replace('.json', '')
                    });
                }
            }
        }
    }

    return pages;
}
