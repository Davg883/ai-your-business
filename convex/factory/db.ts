import { internalMutation, internalQuery } from "../_generated/server";
import { v } from "convex/values";

export const insertRegulation = internalMutation({
    args: {
        act_name: v.string(),
        section_title: v.string(),
        content_text: v.string(),
        embedding: v.array(v.float64()),
        category: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("factory_regulations", {
            act_name: args.act_name,
            section_title: args.section_title,
            content_text: args.content_text,
            embedding: args.embedding,
            category: args.category,
        });
    },
});

export const getRegulation = internalQuery({
    args: { id: v.id("factory_regulations") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});
