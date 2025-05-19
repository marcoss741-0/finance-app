"use client";

import { RadialBar, LabelList, RadialBarChart } from "recharts";
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
import ChartSkeleton from "./skeleton-loaders/chart-skeleton";
import PercentageItem from "./percentage-item";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { useTransactionData } from "@/app/_hooks/useTransactionData";

interface PieChartParams {
  month?: string;
  label?: string;
  userID?: string;
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

const TransactionPieChart = ({ month, label, userID }: PieChartParams) => {
  const {
    depositTotal,
    investmentTotal,
    expenseTotal,
    transactionsByType,
    isLoading,
  } = useTransactionData(month, userID);

  const chartData = [
    {
      type: "DEPÓSITO",
      amount: depositTotal ?? 0,
      fill: "#55B02E",
    },
    {
      type: "GASTOS",
      amount: expenseTotal ?? 0,
      fill: "#E93030",
    },
    {
      type: "INVESTIMENTOS",
      amount: investmentTotal ?? 0,
      fill: "#428BCA",
    },
  ].filter((item) => item.amount > 0 && !isNaN(item.amount));

  const resumePieData = {
    DPT: transactionsByType?.DEPOSIT || 0,
    EXP: transactionsByType?.EXPENSE || 0,
    IVT: transactionsByType?.INVESTMENT || 0,
  };

  if (isLoading)
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
                <p>Nenhum dado disponível para o mês de {label}</p>
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
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="type" />}
            />
            <RadialBar dataKey="amount" background>
              <LabelList
                position="insideStart"
                dataKey="type"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>

        <div className="space-y-3">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={Number(resumePieData.DPT)}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Despesas"
            value={Number(resumePieData.EXP)}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} className="text-[#428BCA]" />}
            title="Investido"
            value={Number(resumePieData.IVT)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionPieChart;
