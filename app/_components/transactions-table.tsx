"use client";

import useSWR from "swr";
import { DataTable } from "../_components/ui/data-table";
import { TransactionsColumns } from "../transactions/_columns";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface TableProps {
  userId: string;
}
export default function TransactionsTable({ userId }: TableProps) {
  const params = new URLSearchParams({ userId });
  const url = `/api/transactions/get-transaction?${params.toString()}`;
  const { data: transactions, isLoading } = useSWR(url, fetcher);

  if (isLoading)
    return (
      <div id="loadingProgressG">
        <div id="loadingProgressG_1" className="loadingProgressG"></div>
      </div>
    );

  return (
    <DataTable
      columns={TransactionsColumns}
      data={JSON.parse(JSON.stringify(transactions))}
    />
  );
}
