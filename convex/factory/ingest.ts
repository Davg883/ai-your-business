"use node";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import OpenAI from "openai";

export const ingestRegulation = action({
    args: {
        act_name: v.string(),
        section_title: v.string(),
        content_text: v.string(),
        category: v.string(),
    },
    handler: async (ctx, args) => {
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: args.content_text,
        });

        const embedding = response.data[0].embedding;

        await ctx.runMutation(internal.factory.db.insertRegulation, {
            act_name: args.act_name,
            section_title: args.section_title,
            content_text: args.content_text,
            embedding,
            category: args.category,
        });
    },
});
