import { query } from "./_generated/server";

export const getMyBooks = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return [];

        const access = await ctx.db
            .query("library_access")
            .withIndex("by_user", (q) => q.eq("userId", identity.subject))
            .collect();

        const books = await Promise.all(
            access.map(async (entry) => {
                const resource = await ctx.db.get(entry.resourceId);
                if (!resource) return null;

                return {
                    ...resource,
                    coverUrl: resource.coverImageId ? await ctx.storage.getUrl(resource.coverImageId) : null,
                    fileUrl: resource.fileId ? await ctx.storage.getUrl(resource.fileId) : null,
                };
            })
        );

        return books.filter((b) => b !== null);
    },
});
