"use client";

import { PieChart, Pie } from "recharts";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { TransactionType } from "@prisma/client";
import ChartSkeleton from "./chart-skeleton";
import PercentageItem from "./percentage-item";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/app/_components/ui/scroll-area";

type ResumeData = {
  DEP_TOTAL: number;
  INV_TOTAL: number;
  EXP_TOTAL: number;
  DPT: number;
  EXP: number;
  IVT: number;
};

interface PieChartParams {
  month?: string;
  label?: string;
}

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: "Investido",
    color: "#FFFFFF",
  },
  [TransactionType.DEPOSIT]: {
    label: "Receita",
    color: "#55B02E",
  },
  [TransactionType.EXPENSE]: {
    label: "Despesas",
    color: "#E93030",
  },
} satisfies ChartConfig;

const TransactionPieChart = ({ month, label }: PieChartParams) => {
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetchPieChartData() {
      try {
        const res = await fetch(`/api/transactions/get-resume?month=${month}`);
        const result = await res.json();

        const typeData = result[0]?.TYP ?? 0;
        const { DEPOSIT, EXPENSE, INVESTMENT } = typeData;

        setData({
          DEP_TOTAL: Number(result[0]?.DEP_TOTAL ?? 0),
          INV_TOTAL: Number(result[0]?.INV_TOTAL ?? 0),
          EXP_TOTAL: Number(result[0]?.EXP_TOTAL ?? 0),
          DPT: Number(DEPOSIT),
          EXP: Number(EXPENSE),
          IVT: Number(INVESTMENT),
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPieChartData();
  }, [month]);

  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: data?.DEP_TOTAL ?? 0,
      fill: "#55B02E",
    },
    {
      type: TransactionType.EXPENSE,
      amount: data?.EXP_TOTAL ?? 0,
      fill: "#E93030",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: data?.INV_TOTAL ?? 0,
      fill: "#FFFFFF",
    },
  ].filter((item) => item.amount > 0 && !isNaN(item.amount));

  if (loading)
    return (
      <>
        <ChartSkeleton />
      </>
    );

  if (!chartData.length)
    return (
      <>
        <ScrollArea className="flex flex-col gap-12 bg-[#1d1c1c] px-8 py-6">
          <CardContent>
            <CardHeader>
              <CardTitle>Dados inexistentes</CardTitle>
              <CardDescription>
                <p>Nenhum dado disponível para exibir para o mês de {label}</p>
              </CardDescription>
            </CardHeader>
            <Image
              src="/banner-chart.svg"
              alt="Chart Banner"
              fill
              className="mt-4 object-contain"
            />
          </CardContent>
        </ScrollArea>
      </>
    );

  return (
    <Card className="flex flex-col gap-12 bg-[#1d1c1c] px-8 py-6">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={Number(data?.DPT)}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={Number(data?.EXP)}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Investido"
            value={Number(data?.IVT)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
