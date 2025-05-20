"use server";

import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
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
        data: { stripeCustomerId: session.customer as string },
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

export async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string;
  const invoiceId = invoice.id as string;
  const amount = invoice.amount_paid;

  const user = await prisma.user.findUnique({
    where: {
      stripeCustomerId: customerId,
    },
  });

  if (!user) {
    console.error("Usuário não encontrado para customerId:", customerId);
    return new NextResponse("User not found", { status: 404 });
  }

  await prisma.payment.create({
    data: {
      userId: user.id,
      invoiceId,
      amount,
      status: "paid",
    },
  });
}

export async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
) {
  try {
    let userId = subscription.metadata?.better_userID as string;
    if (!userId) {
      const customer = await stripe.customers.retrieve(
        subscription.customer as string,
      );

      if ("metadata" in customer && customer.metadata?.user_id) {
        userId = customer.metadata.user_id;
      } else {
        const user = await prisma.user.findUnique({
          where: {
            stripeCustomerId: subscription.customer as string,
          },
        });

        if (!user) {
          console.error("User not found for subscription:", subscription.id);
          return;
        }

        userId = user.id;
      }
    }

    const priceId = subscription.items.data[0].price.id;
    const currentPeriodStart = new Date(subscription.start_date);
    const currentPeriodEnd = new Date(subscription.ended_at as number);

    await prisma.subscription.upsert({
      where: { stripeSubscriptionId: subscription.id },
      update: {
        status: subscription.status,
        priceId: priceId,
        productId: subscription.items.data[0].price.product as string,
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      create: {
        userId,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        priceId: priceId,
        productId: subscription.items.data[0].price.product as string,
        currentPeriodStart,
        currentPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionStatus: subscription.status,
        subscriptionId: subscription.id,
        subscriptionPriceId: priceId,
        subscriptionCurrentPeriodEnd: currentPeriodEnd,
      },
    });

    console.log(`Subscription created for user: ${userId}`);
  } catch (error) {
    console.error("Error handling subscription created:", error);
  }
}
