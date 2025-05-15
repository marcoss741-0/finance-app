"use server";

import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const AddTransactionAction = async (
  params: Prisma.TransactionCreateInput,
) => {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  const userId = session?.user.id;

  if (!userId) {
    return { success: false, message: "Usuario não esta logado!" };
  }

  await prisma.transaction.create({
    data: { ...params, userId },
  });
  revalidatePath("/transactions");

  return { success: true, message: "Transação registrada com êxito!" };
};
