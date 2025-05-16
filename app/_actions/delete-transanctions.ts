"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../_lib/prisma";

export const deleteTransactions = async (transactionId: string) => {
  if (!transactionId) {
    return { success: false, message: "Transação não informada!" };
  }

  try {
    const transaction = await prisma.transaction.delete({
      where: { id: transactionId },
    });

    if (!transaction) {
      return {
        success: false,
        message: "Ocorreu um erro ao deletar a transação",
      };
    }
    revalidatePath("/transactions");
    return { succeess: true, message: "Transação excluída com êxito!" };
  } catch (error) {
    return { success: false, message: "Ooops, algo incomun ocorreu" + error };
  }
};
