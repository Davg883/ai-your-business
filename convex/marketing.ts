import { v } from "convex/values";
import { query } from "./_generated/server";

export const getPublishedPosts = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("blog_posts")
            .filter((q) => q.eq(q.field("status"), "published"))
            .order("desc")
            .collect();
    },
});

export const getPostBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        const post = await ctx.db
            .query("blog_posts")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
        return post;
    },
});