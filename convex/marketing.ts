import { query } from "./_generated/server";
import { v } from "convex/values";

export const getPublishedPosts = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("blog_posts")
            .withIndex("by_status_publishedAt", (q) => q.eq("status", "published"))
            .order("desc")
            .collect();
    },
});

export const getPostBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("blog_posts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});
