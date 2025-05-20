"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "@/app/_lib/create-stripe-checkout";
import { getStripe } from "@/app/_lib/stripe-client";
import { LoaderIcon } from "lucide-react";
import { useState } from "react";

const SubscriptionButton = () => {
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
  return (
    <>
      <Button
        className="w-full gap-2 rounded-full font-bold"
        onClick={handleAcquirePlanClick}
        disabled={isLoading}
      >
        {isLoading && <LoaderIcon className="animate-spin" />}Adquirir plano
      </Button>
    </>
  );
};

export default SubscriptionButton;
