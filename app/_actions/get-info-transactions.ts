"use server";

import { prisma } from "../_lib/prisma";

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

    const insvestmentsTotal = await prisma.transaction.aggregate({
      where: { ...where, type: "INVESTMENT" },
      _sum: { amount: true },
    });

    const ivt = insvestmentsTotal._sum.amount;

    const expensesTotal = await prisma.transaction.aggregate({
      where: { ...where, type: "EXPENSE" },
      _sum: { amount: true },
    });

    const exp = expensesTotal._sum.amount;

    if (!depositsTotal && !insvestmentsTotal && expensesTotal) {
      return { success: false, message: "A consulta não retornou dados" };
    }

    const balance = Number(dpt) - Number(ivt) - Number(exp);

    return [
      {
        BALANCE: balance,
        DEP_TOTAL: dpt,
        INV_TOTAL: ivt,
        EXP_TOTAL: exp,
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
