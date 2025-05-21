"use server";

import { prisma } from "@/app/_lib/prisma";
import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  try {
    const userId = session.metadata?.better_userID;

    if (!userId) {
      console.error("User ID not found in session metadata");
      return;
    }

    if (session.customer) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: session.customer as string,
          plan: session.metadata?.plan as string,
          subscriptionStatus: session.metadata?.status as string,
        },
      });
    }

    return {
      success: false,
      message: `Checkout session completed for user: ${userId}`,
    };
  } catch (error) {
    return {
      success: false,
      mesage: `Error handling checkout session completed, ${error}`,
    };
  }
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
) {
  try {
    let userId = subscription.metadata?.better_userID;

    if (!userId) {
      const customer = await stripe.customers.retrieve(
        subscription.customer as string,
      );
      if ("metadata" in customer && customer?.metadata.better_userID) {
        userId = customer.metadata.better_userID;
      } else {
        const user = await prisma.user.findFirst({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
        });

        if (!user) {
          console.error("User not found in database");
          return;
        }
        userId = user.id;
      }
    }
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        stripeCustomerId: null,
        plan: null,
        subscriptionStatus: "inactive",
      },
    });

    console.log(`Subscription deleted for user: ${userId}`);
  } catch (error) {
    return {
      success: false,
      message: `Error handling subscription deleted, ${error}`,
    };
  }
}
