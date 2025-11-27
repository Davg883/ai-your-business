"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const broadcastNewsletter = action({
    args: {
        subject: v.string(),
        htmlContent: v.string(),
        targetTag: v.string()
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.RESEND_API_KEY;

        // 1. Check for API Key safely inside the function
        if (!apiKey) {
            console.log("Resend API Key missing. Simulating send.");
            return "Simulated Send (No API Key)";
        }

        // 2. Initialize Resend HERE (Lazy initialization)
        const resend = new Resend(apiKey);

        try {
            // 3. Send via Resend
            await resend.emails.send({
                from: 'Vectis Intelligence <onboarding@resend.dev>', // Use this for testing
                to: ['delivered@resend.dev'], // Use this for testing
                bcc: [],
                subject: args.subject,
                html: args.htmlContent,
            });
            return "Sent!";
        } catch (error: any) {
            console.error("Failed to send email:", error);
            throw new Error(`Email sending failed: ${error.message}`);
        }
    },
});