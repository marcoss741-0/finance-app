"use server";

import {
  TotalExpensePerCategory,
  TransactionPercentagePerType,
} from "@/types/transactions-types";
import { prisma } from "../_lib/prisma";
import { TransactionType } from "@prisma/client";

export const getInfoT = async (month?: string, userID?: string) => {
  const where = {
    userId: userID,
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

    // Função destinada a logica de porcentagem das minha receitas, gastos e investimentos
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

    // Função destinada a retornar os gastos por categoria
    const totalExpensePerCategory: TotalExpensePerCategory[] = (
      await prisma.transaction.groupBy({
        by: ["category"],
        where: {
          ...where,
          type: TransactionType.EXPENSE,
        },
        _sum: {
          amount: true,
        },
      })
    ).map((category) => ({
      category: category.category,
      totalAmount: Number(category._sum.amount),
      percentageOfTotal: Math.round(
        (Number(category._sum.amount) / Number(expensesTotal._sum.amount)) *
          100,
      ),
    }));

    const lastTransactions = await prisma.transaction.findMany({
      where: {
        userId: userID,
      },
      orderBy: { date: "desc" },
      take: 15,
    });

    return [
      {
        BALANCE: balance,
        DEP_TOTAL: dpt,
        INV_TOTAL: ivt,
        EXP_TOTAL: exp,
        TYP: typesPercentage,
        TEC: totalExpensePerCategory,
        LAST_TRANSACTIONS: lastTransactions,
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
