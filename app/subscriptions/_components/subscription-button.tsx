"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "@/app/_lib/create-stripe-checkout";
import { getStripe } from "@/app/_lib/stripe-client";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SubscriptionButtonParams {
  hasSubscription: string;
  userMail?: string;
}

const SubscriptionButton = ({
  hasSubscription,
  userMail,
}: SubscriptionButtonParams) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout();
    try {
      setIsLoading(true);
      const stripe = await getStripe();
      if (!stripe) {
        throw new Error("Stripe is not found!");
      }
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Erro ao iniciar checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };
  if (hasSubscription === "SUB_OK") {
    return (
      <Button
        className="w-full gap-2 rounded-full font-bold"
        variant="link"
        asChild
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${userMail}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    );
  }

  if (hasSubscription === "NOTHING_OK") {
    return (
      <Button
        className="w-full gap-2 rounded-full font-bold"
        onClick={handleAcquirePlanClick}
        disabled={isLoading}
      >
        {isLoading && <LoaderIcon className="animate-spin" />}Adquirir plano
      </Button>
    );
  }
};

export default SubscriptionButton;
