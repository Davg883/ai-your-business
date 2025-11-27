import { mutation } from "../_generated/server";
import { v } from "convex/values";

// 1. Generate a URL to upload the PDF/Cover Image
export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

// 2. Create the Item in the Database
export const createResource = mutation({
    args: {
        title: v.string(),
        type: v.string(),
        description: v.string(),
        coverImageId: v.string(),
        fileId: v.string(),
    },
    handler: async (ctx, args) => {
        // Security: Check if Admin (reuse logic from previous step)
        const identity = await ctx.auth.getUserIdentity();
        const me = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity?.subject || ""))
            .first();

        if (!me?.isSystemAdmin) {
            throw new Error("Unauthorized: Only Vectis HQ can publish resources.");
        }

        await ctx.db.insert("resources", {
            title: args.title,
            type: args.type as any,
            description: args.description,
            coverImageId: args.coverImageId,
            fileId: args.fileId,
            isPublished: true,
        });
    },
});

// 3. Grant Access (The "Gift" Button)
export const grantBook = mutation({
    args: { userId: v.string(), resourceId: v.id("resources") },
    handler: async (ctx, args) => {
        // Check if they already have it
        const existing = await ctx.db
            .query("library_access")
            .withIndex("by_user_resource", q =>
                q.eq("userId", args.userId).eq("resourceId", args.resourceId)
            )
            .first();

        if (!existing) {
            await ctx.db.insert("library_access", {
                userId: args.userId,
                resourceId: args.resourceId,
                acquiredAt: Date.now(),
            });
        }
    }
});
