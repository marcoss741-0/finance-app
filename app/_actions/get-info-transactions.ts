"use server";

import { TransactionPercentagePerType } from "@/types/transactions-types";
import { prisma } from "../_lib/prisma";
import { TransactionType } from "@prisma/client";

export const getInfoT = async (month: string) => {
  const where = {
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  try {
    const depositsTotal = await prisma.transaction.aggregate({
      where: {
        ...where,
        type: "DEPOSIT",
      },
      _sum: { amount: true },
    });
    const dpt = depositsTotal._sum.amount;

    const investmentsTotal = await prisma.transaction.aggregate({
      where: { ...where, type: "INVESTMENT" },
      _sum: { amount: true },
    });

    const ivt = investmentsTotal._sum.amount;

    const expensesTotal = await prisma.transaction.aggregate({
      where: { ...where, type: "EXPENSE" },
      _sum: { amount: true },
    });

    const exp = expensesTotal._sum.amount;

    if (!depositsTotal && !investmentsTotal && expensesTotal) {
      return { success: false, message: "A consulta não retornou dados" };
    }

    const balance = Number(dpt) - Number(ivt) - Number(exp);

    const transactionsTotal = Number(
      (
        await prisma.transaction.aggregate({
          where,
          _sum: { amount: true },
        })
      )._sum.amount,
    );
    const typesPercentage: TransactionPercentagePerType = {
      [TransactionType.DEPOSIT]: Math.round(
        (Number(dpt || 0) / Number(transactionsTotal)) * 100,
      ),
      [TransactionType.EXPENSE]: Math.round(
        (Number(exp || 0) / Number(transactionsTotal)) * 100,
      ),
      [TransactionType.INVESTMENT]: Math.round(
        (Number(ivt || 0) / Number(transactionsTotal)) * 100,
      ),
    };

    return [
      {
        BALANCE: balance,
        DEP_TOTAL: dpt,
        INV_TOTAL: ivt,
        EXP_TOTAL: exp,
        TYP: typesPercentage,
      },
    ];
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Ooops, algo inesperado ocorreu!",
    };
  }
};
