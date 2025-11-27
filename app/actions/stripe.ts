'use server';

import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-01-27.acacia",
});

export async function createCheckoutSession(appId: string) {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    // In a real app, you'd map appId to a specific Stripe Price ID
    // For demo purposes, we'll use a hardcoded Price ID or create a one-time price
    // const priceId = "price_1234567890"; 

    // Creating a session
    const session = await stripe.checkout.sessions.create({
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                // Provide the exact Price ID (for example, created in your Stripe Dashboard)
                // price: 'price_1Q...', 
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: 'ChefOS Subscription',
                        description: 'Includes Hardware + Software + Training',
                    },
                    unit_amount: 7900, // £79.00
                    recurring: {
                        interval: 'month',
                    },
                },
                quantity: 1,
            },
        ],
        mode: 'subscription',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/products/${appId}?canceled=true`,
        metadata: {
            clerkUserId: userId,
            appId: appId,
        },
    });

    if (!session.url) {
        throw new Error("Failed to create checkout session");
    }

    return session.url;
}
