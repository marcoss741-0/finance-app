"use client";

import useSWR from "swr";
import { DataTable } from "../_components/ui/data-table";
import { TransactionsColumns } from "../transactions/_columns";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TransactionsTable() {
  const { data: transactions, isLoading } = useSWR(
    "/api/transactions/get-transaction",
    fetcher,
  );

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
