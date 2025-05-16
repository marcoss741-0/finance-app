"use client";

import useSWR from "swr";
import { DataTable } from "../_components/ui/data-table";
import { TransactionsColumns } from "../transactions/_columns";

interface TableProps {
  userId: string;
}

const fetcher = async ([url, userId]: [string, string]) => {
  const params = new URLSearchParams({ userId });
  const res = await fetch(`${url}?${params.toString()}`);
  if (!res.ok) throw new Error("Erro ao buscar transações");
  return res.json();
};

export default function TransactionsTable({ userId }: TableProps) {
  const swrKey: [string, string] = [
    "/api/transactions/get-transaction",
    userId,
  ];

  const { data: transactions, isLoading, error } = useSWR(swrKey, fetcher);

  if (isLoading)
    return (
      <div id="loadingProgressG">
        <div id="loadingProgressG_1" className="loadingProgressG"></div>
      </div>
    );

  if (error) {
    return <p>Erro ao carregar transações.</p>;
  }

  return (
    <DataTable
      columns={TransactionsColumns}
      data={JSON.parse(JSON.stringify(transactions))}
    />
  );
}
