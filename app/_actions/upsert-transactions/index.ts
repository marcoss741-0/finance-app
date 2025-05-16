"use server";

import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

interface UpsertTransactionParams {
  id?: string;
  name: string;
  type: TransactionType;
  amount: number;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const UpsertTransactionAction = async (
  params: UpsertTransactionParams,
) => {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  const userId = session?.user.id;

  if (!userId) {
    return { success: false, message: "Usuario não esta logado!" };
  }

  await prisma.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params.id || "",
    },
  });
  revalidatePath("/transactions");

  return { success: true, message: "Transação registrada com êxito!" };
};
