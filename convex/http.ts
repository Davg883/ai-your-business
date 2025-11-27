import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import Stripe from "stripe";

const http = httpRouter();

http.route({
    path: "/stripe-webhook",
    method: "POST",
    handler: httpAction(async (ctx, request) => {
        const signature = request.headers.get("stripe-signature");
        if (!signature) {
            return new Response("Missing signature", { status: 400 });
        }

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            typescript: true,
        });

        const payload = await request.text();
        let event;

        try {
            event = stripe.webhooks.constructEvent(
                payload,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET!
            );
        } catch (err) {
            console.error("Webhook signature verification failed.", err);
            return new Response("Webhook signature verification failed", { status: 400 });
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            const { clerkUserId, appId } = session.metadata || {};

            if (clerkUserId && appId) {
                await ctx.runMutation(internal.admin.provisioning.internalSetCustomerAccess, {
                    targetUserId: clerkUserId,
                    appId: appId,
                    modules: [], // Add default modules if needed, or handle in metadata
                    status: "active",
                });
                console.log(`Provisioned ${appId} for user ${clerkUserId}`);
            }
        }

        return new Response("Success", { status: 200 });
    }),
});

export default http;
