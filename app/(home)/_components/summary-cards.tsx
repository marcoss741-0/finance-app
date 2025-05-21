"use client";

import { PiggyBankIcon, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import SummaryCard from "./summary-card";
import SummarySkeleton from "./skeleton-loaders/summary-skeleton";
import { useTransactionData } from "@/app/_hooks/useTransactionData";

export type ResumeData = {
  BALANCE: number;
  DEP_TOTAL: number;
  INV_TOTAL: number;
  EXP_TOTAL: number;
};

interface SummaryCardParams {
  month?: string;
  userID?: string;
  userCanAddTransaction?: boolean;
}

const SummaryCards = ({
  month,
  userID,
  userCanAddTransaction,
}: SummaryCardParams) => {
  const { depositTotal, expenseTotal, balance, investmentTotal, isLoading } =
    useTransactionData(month, userID);

  return (
    <>
      {isLoading ? (
        <SummarySkeleton />
      ) : (
        <div className="space-y-6">
          <SummaryCard
            icon={<Wallet size={16} />}
            title="Saldo"
            amount={balance ?? 0}
            size="large"
            userCanAddTransaction={userCanAddTransaction}
          />

          <div className="grid grid-cols-3 gap-6">
            <SummaryCard
              icon={<PiggyBankIcon size={18} />}
              title="Investido"
              amount={investmentTotal ?? 0}
            />

            <SummaryCard
              icon={<TrendingUp size={18} className="text-primary" />}
              title="Receita"
              amount={depositTotal ?? 0}
            />

            <SummaryCard
              icon={<TrendingDown size={18} className="text-danger" />}
              title="Despesas"
              amount={expenseTotal ?? 0}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryCards;
