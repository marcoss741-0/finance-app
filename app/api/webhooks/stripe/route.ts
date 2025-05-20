"use server";

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { prisma } from "@/app/_lib/prisma";
import {
  handleCheckoutSessionCompleted,
  handleInvoicePaymentSucceeded,
} from "./stripe-events";
import { setTimeout } from "timers/promises";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
  const signature = headers().get("stripe-signature") as string;
  const body = await req.text();

  if (!signature) {
    return NextResponse.error();
  }

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(
        event.data.object as Stripe.Checkout.Session,
      );
      break;
    case "invoice.payment_succeeded":
      setTimeout(
        2000,
        await handleInvoicePaymentSucceeded(
          event.data.object as Stripe.Invoice,
        ),
      );
      break;
  }

  return NextResponse.json({ received: true });
}
