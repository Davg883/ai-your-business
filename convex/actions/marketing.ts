"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const openai = new OpenAI();

export const generateCampaign = action({
    args: { topic: v.string(), sector: v.string() }, // e.g. "Winter Menu Trends", "Hospitality"
    handler: async (ctx, args) => {

        // 1. Generate the SEO Blog Post
        const blogPrompt = `
      Write a high-ranking SEO blog post for the ${args.sector} sector about: ${args.topic}.
      Voice: Authoritative, Industrial, Professional (The 'Julian' Persona).
      Structure: Introduction, 3 Key Insights, How ChefOS Solves It, Conclusion.
      Format: Markdown.
    `;
        const blogContent = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: blogPrompt }],
        });

        // 2. Generate the Email Newsletter (based on the blog)
        const emailPrompt = `
      Write a short, punchy email newsletter summarizing this blog post.
      Voice: Urgent, Helpful, 'Safety in a Snap' vibe.
      Goal: Click through to read the full article.
      Context: The user is a busy business owner.
    `;
        const emailContent = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: emailPrompt + "\n\n" + blogContent.choices[0].message.content }],
        });

        return {
            blog: blogContent.choices[0].message.content,
            email: emailContent.choices[0].message.content,
        };
    },
});
