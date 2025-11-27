import { query } from "./_generated/server";
import { v } from "convex/values";

export const getMyStatus = query({
    args: { appId: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        const entitlement = await ctx.db
            .query("entitlements")
            .withIndex("by_user_app", (q) =>
                q.eq("userId", identity.subject).eq("appId", args.appId)
            )
            .first();

        return entitlement;
    },
});
