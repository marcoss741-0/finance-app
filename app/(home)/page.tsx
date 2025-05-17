import { headers } from "next/headers";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";
import NavBar from "../_components/nav-bar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import TransactionPieChart from "./_components/transactions-pie-chart";

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

  // const result = await getInfoT(month);
  // const data: ResumeData[] = await result;

  return (
    <>
      <NavBar user={session.user} />

      <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <TimeSelect />
        </div>

        <div className="grid h-full grid-cols-[2fr,1fr] gap-6 overflow-hidden">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards month={month} />
            <div className="grid h-full grid-cols-3 grid-rows-1 gap-6 overflow-hidden">
              {/* <TransactionPieChart
                DEP_TOTAL={Number(result[0]?.DEP_TOTAL)}
                EXP_TOTAL={Number(result[0]?.EXP_TOTAL)}
                INV_TOTAL={Number(result[0]?.INV_TOTAL)}
              /> */}
              <TransactionPieChart month={month} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
