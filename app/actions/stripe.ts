'use server';

import { auth, currentUser } from "@clerk/nextjs/server";
import Stripe from "stripe";

// FIX: Removed the specific apiVersion line to prevent TypeScript build errors
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export async function createCheckoutSession(appId: string) {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    // Use the Price ID you created in the Stripe Dashboard earlier
    // This ensures all sales track to the same product analytics
    // Replace "price_1Q..." with your actual ID if you have it.
    // If not, the 'price_data' block below acts as a fallback.

    const session = await stripe.checkout.sessions.create({
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
            {
                // OPTION A (Recommended): Use your real Price ID
                // price: "price_1Qxxxxxxxxxxxxxx", 

                // OPTION B (Current): Create product on the fly
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
