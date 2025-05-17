"use client";

import AddTransactionsButton from "@/app/_components/add-transaction-button";
import { Card, CardHeader, CardContent } from "@/app/_components/ui/card";
import { formatCurrency } from "@/app/_helpers/format-values";

interface summaryCardProps {
  title: string;
  icon: React.ReactNode;
  amount: number;
  size?: "small" | "large";
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
}: summaryCardProps) => {
  return (
    <>
      <Card>
        <CardHeader className="flex-row items-center gap-4">
          {icon}
          <p
            className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
          >
            {title}
          </p>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p
            className={`${size === "small" ? "text-2xl" : "text-4xl"} font-bold`}
          >
            {formatCurrency(Number(amount))}
          </p>

          {size === "large" && <AddTransactionsButton />}
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
