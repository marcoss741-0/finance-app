"use client";

import { Button } from "@/app/_components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { formatCurrency } from "@/app/_helpers/format-values";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Transaction, TransactionType } from "@prisma/client";
import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
import LastTransactionsSkeleton from "./last-transaction-skeleton";

interface LastTransactionsParams {
  month?: string;
}

const LastTransactions = ({ month }: LastTransactionsParams) => {
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function fetchLastTransactions() {
      try {
        const response = await fetch(
          `/api/transactions/get-resume?month=${month}`,
        );
        const data = await response.json();
        const transactionsProps = data[0]?.LAST_TRANSACTIONS;

        setTransactions(transactionsProps);
        console.log(transactionsProps);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLastTransactions();
  }, [month]);

  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) {
      return "text-red-500";
    }
    if (transaction.type === TransactionType.DEPOSIT) {
      return "text-primary";
    }
    return "text-white";
  };
  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return "+";
    }
    return "-";
  };

  if (isLoading) {
    return <LastTransactionsSkeleton />;
  }

  return (
    <ScrollArea className="rounded-md border bg-[#1d1c1c]">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold">Últimas Transações</CardTitle>
        <Button variant="outline" className="rounded-full font-bold" asChild>
          <Link href="/transactions">Ver mais</Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {transactions?.map((trs) => (
          <div key={trs.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[trs.paymentMethod]}`}
                  height={20}
                  width={20}
                  alt="PIX"
                />
              </div>
              <p className="text-sm font-bold">{trs.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(trs.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(trs)}`}>
              {getAmountPrefix(trs)}
              {formatCurrency(Number(trs.amount))}
            </p>
          </div>
        ))}
        {/* {lastTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white bg-opacity-[3%] p-3 text-white">
                <Image
                  src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
                  height={20}
                  width={20}
                  alt="PIX"
                />
              </div>
              <div>
                <p className="text-sm font-bold">{transaction.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm font-bold ${getAmountColor(transaction)}`}>
              {getAmountPrefix(transaction)}
              {formatCurrency(Number(transaction.amount))}
            </p>
          </div>
        ))} */}
      </CardContent>
    </ScrollArea>
  );
};

export default LastTransactions;
