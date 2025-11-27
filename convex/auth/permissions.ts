import { QueryCtx, MutationCtx } from "../_generated/server";
import { v } from "convex/values";

// Helper to check if a user owns a specific module
export async function checkEntitlement(
    ctx: QueryCtx | MutationCtx,
    appId: string,
    requiredModule?: string
) {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const entitlement = await ctx.db
        .query("entitlements")
        .withIndex("by_user_app", (q) =>
            q.eq("userId", identity.subject).eq("appId", appId)
        )
        .first();

    // 1. Check if they have the App
    if (!entitlement || entitlement.status !== "active") {
        throw new Error(`Access Denied: You do not have an active subscription for ${appId}`);
    }

    // 2. Check if they have the specific Module (if requested)
    if (requiredModule && !entitlement.activeModules.includes(requiredModule)) {
        throw new Error(`Access Denied: Upgrade required for module '${requiredModule}'`);
    }

    return entitlement;
}
