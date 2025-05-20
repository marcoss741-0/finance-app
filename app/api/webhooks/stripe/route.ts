"use server";

import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
  try {
    const signature = headers().get("stripe-signature") as string;
    const body = await req.text();

    if (!signature) {
      return NextResponse.error();
    }

    try {
      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string,
      );

      switch (event.type) {
        case "invoice.paid":
          break;
      }
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.error();
  }

  return NextResponse.json({ received: true });
}
