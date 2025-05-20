"use server";

import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";
import { Stripe } from "stripe";

export const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session,
) => {
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
      mesage: "Error handling checkout session completed",
    };
  }
};

export const handleInvoicePaymentSucceeded = async (
  invoice: Stripe.Invoice,
) => {
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
};
