"use server";

import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { headers } from "next/headers";
import { UserCountTransaction } from "../user-count-transactions";

export const UserCanAddTransactions = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  const verifyPlan = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    select: {
      plan: true,
    },
  });

  if (verifyPlan && verifyPlan?.plan === ("PRO_PLAN" as string)) {
    return true;
  }
  const currentMonthTransactions = await UserCountTransaction();
  if (currentMonthTransactions >= 10) {
    return false;
  }
  return true;
};
