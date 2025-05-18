"use client";

import { PiggyBankIcon, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import SummaryCard from "./summary-card";
import { useEffect, useState } from "react";
import SummarySkeleton from "./skeleton-loaders/summary-skeleton";

export type ResumeData = {
  BALANCE: number;
  DEP_TOTAL: number;
  INV_TOTAL: number;
  EXP_TOTAL: number;
};

interface SummaryCardParams {
  month?: string;
  userID?: string;
}

const SummaryCards = ({ month, userID }: SummaryCardParams) => {
  const [values, setValues] = useState<ResumeData>();
  const [loading, setIsloading] = useState(true);

  useEffect(() => {
    setIsloading(true);
    async function fetchSummaryInfos() {
      try {
        const response = await fetch(
          `/api/transactions/get-resume?month=${month}&userID=${userID}`,
        );
        const data = await response.json();

        setValues(data[0]);
      } catch (error) {
        console.log("Erro ao buscar dados!", error);
      } finally {
        setIsloading(false);
      }
    }

    fetchSummaryInfos();
  }, [month]);

  return (
    <>
      {loading ? (
        <SummarySkeleton />
      ) : (
        <div className="space-y-6">
          <SummaryCard
            icon={<Wallet size={16} />}
            title="Saldo"
            amount={values?.BALANCE ?? 0}
            size="large"
          />

          <div className="grid grid-cols-3 gap-6">
            <SummaryCard
              icon={<PiggyBankIcon size={18} />}
              title="Investido"
              amount={values?.INV_TOTAL ?? 0}
            />

            <SummaryCard
              icon={<TrendingUp size={18} className="text-primary" />}
              title="Receita"
              amount={values?.DEP_TOTAL ?? 0}
            />

            <SummaryCard
              icon={<TrendingDown size={18} className="text-danger" />}
              title="Despesas"
              amount={values?.EXP_TOTAL ?? 0}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryCards;
