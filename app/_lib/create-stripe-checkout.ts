"use server";

import Stripe from "stripe";
import { auth } from "./auth";
import { headers } from "next/headers";

export const createStripeCheckout = async () => {
  const userSession = await auth.api.getSession({
    headers: headers(),
  });
  const userId = userSession?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "Usuario não esta logado!",
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-04-30.basil",
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    success_url: "http://localhost:3000/subscriptions",
    cancel_url: "http://localhost:3000",
    metadata: {
      better_userID: userId,
      plan: "PRO_PLAN",
    },
    line_items: [
      {
        price: process.env.STRIPE_PROPLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });

  return { sessionId: session.id };
};
