import { v } from "convex/values";
import { internalMutation } from "../_generated/server";

export const logGeneration = internalMutation({
    args: {
        clerkId: v.string(),
        model: v.string(),
        prompt: v.string(),
        response: v.string(),
        projectId: v.optional(v.id("projects")),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
            .unique();

        if (!user) return;

        await ctx.db.insert("aiGenerations", {
            userId: user._id,
            projectId: args.projectId,
            provider: "google",
            model: args.model,
            prompt: args.prompt,
            response: args.response,
            createdAt: Date.now(),
        });
    },
});
