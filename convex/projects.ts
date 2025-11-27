import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserProjects = query({
    args: {
        status: v.optional(v.union(v.literal("draft"), v.literal("reviewing"), v.literal("completed"), v.literal("archived"))),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) return [];

        let projectsQuery = ctx.db
            .query("projects")
            .withIndex("by_user", (q) => q.eq("userId", user._id));

        const projects = await projectsQuery.collect();

        if (args.status) {
            return projects.filter((p) => p.status === args.status);
        }

        return projects.sort((a, b) => b.updatedAt - a.updatedAt);
    },
});

export const getProject = query({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const project = await ctx.db.get(args.projectId);
        if (!project) return null;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user || project.userId !== user._id) return null;

        return project;
    },
});

export const createProject = mutation({
    args: {
        title: v.string(),
        description: v.optional(v.string()),
        content: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user) throw new Error("User not found");

        const now = Date.now();
        return await ctx.db.insert("projects", {
            userId: user._id,
            title: args.title,
            description: args.description,
            content: args.content || {},
            status: "draft",
            createdAt: now,
            updatedAt: now,
        });
    },
});

export const updateProject = mutation({
    args: {
        projectId: v.id("projects"),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        content: v.optional(v.any()),
        analysis: v.optional(v.string()),
        status: v.optional(v.union(v.literal("draft"), v.literal("reviewing"), v.literal("completed"), v.literal("archived"))),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const project = await ctx.db.get(args.projectId);
        if (!project) throw new Error("Project not found");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user || project.userId !== user._id) {
            throw new Error("Not authorized");
        }

        const { projectId, ...updates } = args;
        await ctx.db.patch(projectId, {
            ...updates,
            updatedAt: Date.now(),
        });

        return projectId;
    },
});

export const deleteProject = mutation({
    args: { projectId: v.id("projects") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) throw new Error("Not authenticated");

        const project = await ctx.db.get(args.projectId);
        if (!project) throw new Error("Project not found");

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
            .unique();

        if (!user || project.userId !== user._id) {
            throw new Error("Not authorized");
        }

        await ctx.db.delete(args.projectId);
    },
});
