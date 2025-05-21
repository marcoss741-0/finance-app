import { headers } from "next/headers";
import AddTransactionsButton from "../_components/add-transaction-button";
import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import TransactionsTable from "../_components/transactions-table";
import NavBar from "../_components/nav-bar";
import { UserCanAddTransactions } from "../_data/user-can-add-transactions";

const Transactions = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const userCanAdd = await UserCanAddTransactions();

  console.log("UserCanAddTransactions", userCanAdd);

  return (
    <>
      <NavBar user={session.user} />
      <div className="space-y-6 p-6">
        <div className="relative flex w-full items-center p-5">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Transações</h2>
            {/* Botão de Adicionar transação  */}
            <AddTransactionsButton
              userId={session.user.id}
              userCanAddTransaction={userCanAdd}
            />
          </div>
        </div>
        <TransactionsTable userId={session.user.id} />
      </div>
    </>
  );
};

export default Transactions;
