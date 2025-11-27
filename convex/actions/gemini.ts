"use node";

import { v } from "convex/values";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateText = action({
    args: {
        prompt: v.string(),
        modelName: v.optional(v.string()),
        projectId: v.optional(v.id("projects")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) throw new Error("GOOGLE_API_KEY not set");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: args.modelName || 'gemini-1.5-pro'
        });

        const result = await model.generateContent(args.prompt);
        const response = await result.response;
        const text = response.text();

        await ctx.runMutation(internal.ai.logging.logGeneration, {
            clerkId: identity.subject,
            model: args.modelName || 'gemini-1.5-pro',
            prompt: args.prompt,
            response: text,
            projectId: args.projectId,
        });

        return text;
    },
});
