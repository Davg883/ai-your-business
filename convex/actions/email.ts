"use node";
import { action } from "../_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const broadcastNewsletter = action({
    args: {
        subject: v.string(),
        htmlContent: v.string(),
        targetTag: v.string()
    },
    handler: async (ctx, args) => {
        // 1. Fetch contacts (You'd usually do this via an internalQuery first)
        // For demo, let's assume we pass a list or fetch a batch

        // 2. Send via Resend
        // Note: In a real app, you would iterate over your contacts.
        // For this demo, we'll just log it or send to a test email if configured.

        if (!process.env.RESEND_API_KEY) {
            console.log("Resend API Key missing. Simulating send.");
            return "Simulated Send (No API Key)";
        }

        try {
            await resend.emails.send({
                from: 'Vectis Intelligence <briefing@aiyourbusiness.co.uk>',
                to: ['delivered@resend.dev'], // Test email for Resend free tier
                bcc: [], // Iterate your contact list here
                subject: args.subject,
                html: args.htmlContent,
            });
            return "Sent!";
        } catch (error) {
            console.error("Failed to send email:", error);
            throw new Error("Email sending failed");
        }
    },
});
