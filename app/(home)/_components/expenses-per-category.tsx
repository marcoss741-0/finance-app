"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Progress } from "@/app/_components/ui/progress";
import { TRANSACTION_CATEGORY_LABELS } from "../../_constants/transactions";
import ExpensesPerCategorySkeleton from "./skeleton-loaders/expenses-per-category-skeleton";
import { formatCurrency } from "@/app/_helpers/format-values";
import Image from "next/image";
import { useTransactionData } from "@/app/_hooks/useTransactionData";

interface ExpensesPerCategoryParams {
  month: string;
  userID: string;
}

const ExpensesPerCategory = ({ month, userID }: ExpensesPerCategoryParams) => {
  const { expensesByCategory, isLoading } = useTransactionData(month, userID);
  const expenses = expensesByCategory;

  if (isLoading) {
    return (
      <>
        <ExpensesPerCategorySkeleton />
      </>
    );
  }

  if (!expenses?.length) {
    return (
      <ScrollArea className="col-span-2 h-full rounded-md border bg-[#1d1c1c] pb-6">
        <CardContent>
          <CardHeader className="justify-center">
            <CardTitle>Sem Gastos</CardTitle>
            <CardDescription>Não a dados para exibir</CardDescription>
          </CardHeader>
          <Image
            src="/banner-expenses.svg"
            alt="Expenses Banner"
            fill
            className="mt-4 object-contain"
          />
        </CardContent>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="col-span-2 h-full rounded-md border bg-[#1d1c1c] pb-6">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expenses?.map(
          (category: {
            category: string;
            percentageOfTotal: number;
            totalAmount: number;
          }) => (
            <div key={category.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[category.category]}
                </p>
                <p className="text-sm font-bold">
                  {Number(category.percentageOfTotal)}%
                </p>
              </div>
              <Progress value={Number(category.percentageOfTotal)} />
              <p className="p-1">
                {" "}
                {formatCurrency(Number(category.totalAmount))}
              </p>
            </div>
          ),
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
