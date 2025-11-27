import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        return await ctx.storage.generateUploadUrl();
    },
});

export const saveFile = mutation({
    args: {
        storageId: v.id("_storage"),
        filename: v.string(),
        mimeType: v.string(),
        size: v.number(),
        projectId: v.optional(v.id("projects")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) throw new Error("User not found");

        return await ctx.db.insert("files", {
            userId: user._id,
            projectId: args.projectId,
            storageId: args.storageId,
            filename: args.filename,
            mimeType: args.mimeType,
            size: args.size,
            createdAt: Date.now(),
        });
    },
});

export const getFileUrl = query({
    args: { storageId: v.id("_storage") },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId);
    },
});

export const getUserFiles = query({
    args: { projectId: v.optional(v.id("projects")) },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) return [];

        if (args.projectId) {
            return await ctx.db
                .query("files")
                .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
                .collect();
        }

        return await ctx.db
            .query("files")
            .withIndex("by_user", (q) => q.eq("userId", user._id))
            .collect();
    },
});

export const deleteFile = mutation({
    args: { fileId: v.id("files") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const file = await ctx.db.get(args.fileId);
        if (!file) throw new Error("File not found");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user || file.userId !== user._id) {
            throw new Error("Not authorized");
        }

        await ctx.storage.delete(file.storageId);
        await ctx.db.delete(args.fileId);
    },
});
