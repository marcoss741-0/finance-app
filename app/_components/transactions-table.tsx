"use client";

import useSWR from "swr";
import { DataTable } from "../_components/ui/data-table";
import { TransactionsColumns } from "../transactions/_columns";
import Image from "next/image";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TransactionsTable() {
  const { data: transactions, isLoading } = useSWR(
    "/api/transactions/get-transaction",
    fetcher,
  );

  if (isLoading)
    return (
      <div>
        <Image src="/loader2.svg" alt="Loading Table" width={30} height={30} />
      </div>
    );

  return (
    <DataTable
      columns={TransactionsColumns}
      data={JSON.parse(JSON.stringify(transactions))}
    />
  );
}
