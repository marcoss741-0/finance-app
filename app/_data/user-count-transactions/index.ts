"use server";

import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { headers } from "next/headers";

export const UserCountTransaction = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session?.user) {
    throw new Error("User not authenticated");
  }

  const currentMonthTransactions = await prisma.transaction.count({
    where: {
      userId: session?.user.id,
      createdAt: {
        gte: new Date(new Date().setDate(1)),
        lte: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
    },
  });

  return currentMonthTransactions;
};
