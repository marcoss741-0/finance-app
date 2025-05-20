"use client";

import * as React from "react";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/_components/ui/chart";
import { useTransactionData } from "@/app/_hooks/useTransactionData";
import { TransactionType } from "@prisma/client";
import PercentageItem from "./percentage-item";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import ChartSkeleton from "./skeleton-loaders/chart-skeleton";
import Image from "next/image";
import { formatCurrency } from "@/app/_helpers/format-values";

interface PieChartParams {
  month?: string;
  label?: string;
  userID?: string;
}

const TransactionPieChart = ({ label, month, userID }: PieChartParams) => {
  const {
    balance,
    depositTotal,
    expenseTotal,
    investmentTotal,
    transactionsByType,
    isLoading,
  } = useTransactionData(month, userID);

  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: Number(depositTotal),
      fill: "#55B02E",
    },
    {
      type: TransactionType.INVESTMENT,
      amount: Number(investmentTotal),
      fill: "#428BCA",
    },
    {
      type: TransactionType.EXPENSE,
      amount: Number(expenseTotal),
      fill: "crimson",
    },
  ];

  const chartConfig = {
    visitors: {
      label: "SALDO",
    },
    [TransactionType.DEPOSIT]: {
      label: "Depósitos",
    },
    [TransactionType.INVESTMENT]: {
      label: "Investidos",
    },
    [TransactionType.EXPENSE]: {
      label: "Gastos",
    },
  } satisfies ChartConfig;

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

  if (!chartData[0].amount || !chartData[1].amount || !chartData[2].amount)
    return (
      <>
        <Card className="flex flex-col gap-12 bg-[#1d1c1c] px-8 py-6">
          <CardContent>
            <CardHeader>
              <CardTitle>Dados inexistentes</CardTitle>
              <CardDescription>
                <p>Você não fez movimentações em {label}</p>
              </CardDescription>
            </CardHeader>
            <Image
              src="/banner-chart.svg"
              alt="Chart Banner"
              width={700}
              height={700}
            />
          </CardContent>
        </Card>
      </>
    );

  return (
    <ScrollArea className="flex flex-col bg-[#1d1c1c]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Balanço Mensal</CardTitle>
        <CardDescription>{label} 2025</CardDescription>
      </CardHeader>
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
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-[18px] font-bold"
                        >
                          {formatCurrency(
                            Number(balance) +
                              Number(expenseTotal) +
                              Number(investmentTotal),
                          )}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Receita total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
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
      </CardFooter>
    </ScrollArea>
  );
};

export default TransactionPieChart;
