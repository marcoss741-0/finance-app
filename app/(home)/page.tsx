import { headers } from "next/headers";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";
import NavBar from "../_components/nav-bar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import AiReportButton from "./_components/ai-report-button";
import { prisma } from "../_lib/prisma";
import { UserCanAddTransactions } from "../_data/user-can-add-transactions";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

export default async function Home({ searchParams: { month } }: HomeProps) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const monthIsValid = !month || !isMatch(month, "MM");

  if (monthIsValid) {
    redirect("?month=01");
  }

  function getMonthName(month: string): string {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const index = parseInt(month, 10) - 1;

    // Verificação de validade
    if (index >= 0 && index < 12) {
      return months[index];
    }

    return "Mês inválido";
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session.user.id,
      plan: "PRO_PLAN",
    },
    select: {
      plan: true,
    },
  });

  let hasPlan: string = "NONE";

  if (user?.plan === undefined || null || "NONE") {
    hasPlan = "NOTHING_OK";
  }

  if (user?.plan === "PRO_PLAN") {
    hasPlan = "SUB_OK";
  }

  const userCanAdd = await UserCanAddTransactions();

  return (
    <>
      <NavBar user={session.user} />

      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <AiReportButton month={month} hasPremiumPlan={hasPlan} />
            <TimeSelect />
          </div>
        </div>

        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              month={month}
              userID={session.user.id}
              userCanAddTransaction={userCanAdd}
            />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              <TransactionPieChart
                month={month}
                label={getMonthName(month)}
                userID={session.user.id}
              />
              <ExpensesPerCategory month={month} userID={session.user.id} />
            </div>
          </div>
          <LastTransactions month={month} userID={session.user.id} />
        </div>
      </div>
    </>
  );
}
