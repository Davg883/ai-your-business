"use node";
import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import OpenAI from "openai";

export const analyzeHazard = action({
    args: {
        query: v.string(),
        orgId: v.string(),
    },
    handler: async (ctx, args): Promise<any> => {
        // LICENSING CHECK (API Gate)
        if (args.orgId !== "license_factory_os_true") {
            throw new Error("License required for FactoryOS");
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        // 1. Generate embedding for the query
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: args.query,
        });

        const embedding = response.data[0].embedding;

        // 2. Perform vectorSearch strictly on the factory_regulations table
        const results = await ctx.vectorSearch("factory_regulations", "by_embedding", {
            vector: embedding,
            limit: 3,
        });

        // 3. Return the matching regulations
        const regulations = await Promise.all(
            results.map((result) =>
                ctx.runQuery(internal.factory.db.getRegulation, { id: result._id })
            )
        );

        return regulations.filter((r: any) => r !== null);
    },
});
