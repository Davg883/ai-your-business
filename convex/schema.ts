import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Users table (synced with Clerk)
    users: defineTable({
        clerkId: v.string(),
        email: v.string(),
        name: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        createdAt: v.number(),
        // Is this person a "Super Admin" (You)?
        isSystemAdmin: v.optional(v.boolean()),
    })
        .index("by_clerk_id", ["clerkId"])
        .index("by_email", ["email"]),

    // THE ENTITLEMENTS (The Permission Slip)
    // This defines WHO has access to WHAT
    entitlements: defineTable({
        userId: v.string(), // The Clerk ID of the customer
        appId: v.string(),  // e.g., "chefos", "siteos", "aegis"

        // Granular Modules (e.g., ["kitchen_guard", "culinary_canvas"])
        activeModules: v.array(v.string()),

        status: v.union(v.literal("active"), v.literal("suspended"), v.literal("trial")),
        expiresAt: v.optional(v.number()), // Unix timestamp for subscription end
    })
        .index("by_user", ["userId"])
        .index("by_user_app", ["userId", "appId"]),

    // Projects (Reviews)
    projects: defineTable({
        userId: v.id("users"),
        title: v.string(),
        description: v.optional(v.string()),
        content: v.any(), // Stores the code to review
        analysis: v.optional(v.string()), // Stores the AI review result
        status: v.union(v.literal("draft"), v.literal("reviewing"), v.literal("completed"), v.literal("archived")),
        createdAt: v.number(),
        updatedAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_user_and_status", ["userId", "status"]),

    // AI Generations (track AI usage)
    aiGenerations: defineTable({
        userId: v.id("users"),
        projectId: v.optional(v.id("projects")),
        provider: v.string(),
        model: v.string(),
        prompt: v.string(),
        response: v.string(),
        tokensUsed: v.optional(v.number()),
        createdAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_project", ["projectId"]),

    // File uploads
    files: defineTable({
        userId: v.id("users"),
        projectId: v.optional(v.id("projects")),
        storageId: v.id("_storage"),
        filename: v.string(),
        mimeType: v.string(),
        size: v.number(),
        createdAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_project", ["projectId"]),

    // 1. THE INVENTORY (What you have to sell/give)
    resources: defineTable({
        title: v.string(),           // e.g. "AI for Code"
        type: v.union(v.literal("ebook"), v.literal("video_course"), v.literal("template")),
        description: v.string(),
        coverImageId: v.optional(v.string()), // Convex Storage ID for the thumbnail
        fileId: v.optional(v.string()),       // Convex Storage ID for the actual PDF
        isPublished: v.boolean(),             // Draft/Live switch
    }),

    // 2. THE LIBRARY (Who owns what)
    // This is distinct from 'entitlements' (which are for software features)
    library_access: defineTable({
        userId: v.string(),      // Clerk ID
        resourceId: v.id("resources"),
        acquiredAt: v.number(),
    })
        .index("by_user", ["userId"])
        .index("by_user_resource", ["userId", "resourceId"]),

    // --- CHEF OS TABLES ---
    chef_audits: defineTable({
        userId: v.string(),
        date: v.number(),
        score: v.number(),
        status: v.string(),
        data: v.any(),
    }).index("by_user", ["userId"]),

    chef_temps: defineTable({
        userId: v.string(),
        date: v.number(),
        applianceId: v.string(),
        temperature: v.number(),
        isSafe: v.boolean(),
    }).index("by_user", ["userId"]),

    // --- SITE OS TABLES ---
    site_inspections: defineTable({
        userId: v.string(),
        siteId: v.string(),
        date: v.number(),
        status: v.string(),
        report: v.any(),
    }).index("by_user", ["userId"]),

    site_incidents: defineTable({
        userId: v.string(),
        siteId: v.string(),
        date: v.number(),
        severity: v.string(),
        description: v.string(),
        resolved: v.boolean(),
    }).index("by_user", ["userId"]),

    // --- AEGIS TABLES ---
    aegis_manifests: defineTable({
        userId: v.string(),
        vehicleId: v.string(),
        date: v.number(),
        cargo: v.any(),
        status: v.string(),
    }).index("by_user", ["userId"]),

    // 1. CRM CONTACTS (Unified List)
    contacts: defineTable({
        email: v.string(),
        name: v.optional(v.string()),
        tags: v.array(v.string()), // e.g. ["chef_os_user", "newsletter_sub", "lead"]
        status: v.string(), // "active", "unsubscribed"
        lastEmailedAt: v.optional(v.number()),
    }).index("by_email", ["email"]),

    // 2. CONTENT ENGINE (The Blog)
    blog_posts: defineTable({
        slug: v.string(),
        title: v.string(),
        content: v.string(), // Markdown or HTML
        seoKeywords: v.array(v.string()),
        coverImage: v.optional(v.string()),
        status: v.string(), // "draft", "published"
        publishedAt: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_status_publishedAt", ["status", "publishedAt"]),

    // 3. EMAIL CAMPAIGNS
    campaigns: defineTable({
        subject: v.string(),
        bodyHtml: v.string(),
        targetTag: v.string(), // e.g. "chef_os_user"
        sentCount: v.number(),
        openCount: v.number(),
        status: v.string(),
    }),
    // --- FACTORY OS TABLES ---
    factory_regulations: defineTable({
        act_name: v.string(),
        section_title: v.string(),
        content_text: v.string(),
        embedding: v.array(v.float64()),
        category: v.string(),
    }).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 1536,
    }),

    factory_audits: defineTable({
        tenant_id: v.string(),
        user_id: v.string(),
        image_id: v.string(),
        identified_hazard: v.string(),
        citation_id: v.id("factory_regulations"),
        status: v.string(),
    }),
});
