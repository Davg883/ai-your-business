import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const setCustomerAccess = mutation({
    args: {
        targetUserId: v.string(), // The customer's Clerk ID
        appId: v.string(),
        modules: v.array(v.string()), // e.g. ["kitchen_guard"]
        status: v.string(), // "active"
    },
    handler: async (ctx, args) => {
        // 1. Security Check: Am *I* the Super Admin?
        const myIdentity = await ctx.auth.getUserIdentity();
        const me = await ctx.db
            .query("users")
            .withIndex("by_clerk_id", (q) => q.eq("clerkId", myIdentity?.subject || ""))
            .first();

        if (!me?.isSystemAdmin) {
            throw new Error("Unauthorized: Only Vectis HQ can provision apps.");
        }

        // 2. Update or Create the Entitlement
        const existing = await ctx.db
            .query("entitlements")
            .withIndex("by_user_app", (q) =>
                q.eq("userId", args.targetUserId).eq("appId", args.appId)
            )
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                activeModules: args.modules,
                status: args.status as any,
            });
        } else {
            await ctx.db.insert("entitlements", {
                userId: args.targetUserId,
                appId: args.appId,
                activeModules: args.modules,
                status: args.status as any,
            });
        }
    },
});

import { internalMutation } from "../_generated/server";

export const internalSetCustomerAccess = internalMutation({
    args: {
        targetUserId: v.string(),
        appId: v.string(),
        modules: v.array(v.string()),
        status: v.string(),
    },
    handler: async (ctx, args) => {
        // Trusted internal mutation - no admin check needed
        const existing = await ctx.db
            .query("entitlements")
            .withIndex("by_user_app", (q) =>
                q.eq("userId", args.targetUserId).eq("appId", args.appId)
            )
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                activeModules: args.modules,
                status: args.status as any,
            });
        } else {
            await ctx.db.insert("entitlements", {
                userId: args.targetUserId,
                appId: args.appId,
                activeModules: args.modules,
                status: args.status as any,
            });
        }
    },
});
