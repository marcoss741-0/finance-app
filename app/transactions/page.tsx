import { headers } from "next/headers";
import AddTransactionsButton from "../_components/add-transaction-button";
import { DataTable } from "../_components/ui/data-table";
import { prisma } from "../_lib/prisma";
import { TransactionsColumns } from "./_columns";
import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";

const Transactions = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }
  const transactions = await prisma.transaction.findMany({});

  return (
    <>
      <div className="space-y-6 p-6">
        <div className="relative flex w-full items-center p-5">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Transações</h2>
            {/* Botão de Adicionar transação  */}
            <AddTransactionsButton />
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
