"use server";

import { prisma } from "@/app/_lib/prisma";
import { Stripe } from "stripe";

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
