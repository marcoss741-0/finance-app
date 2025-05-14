import { DataTable } from "../_components/ui/data-table";
import { prisma } from "../_lib/prisma";
import { TransactionsColumns } from "./_columns";
import { Button } from "../_components/ui/button";
import { ArrowUpDown } from "lucide-react";

const Transactions = async () => {
  const transactions = await prisma.transaction.findMany({});

  return (
    <>
      <div className="space-y-6 p-6">
        <div className="relative flex w-full items-center p-5">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Transações</h2>
            <Button
              variant="default"
              className="gap-2 rounded-full text-[14px] font-semibold"
            >
              Adicionar transação <ArrowUpDown />
            </Button>
          </div>
        </div>
        <DataTable
          columns={TransactionsColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </>
  );
};

export default Transactions;
