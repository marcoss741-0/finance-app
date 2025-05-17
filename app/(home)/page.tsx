import { headers } from "next/headers";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";
import NavBar from "../_components/nav-bar";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";

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

  return (
    <>
      <NavBar user={session.user} />

      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
          <TimeSelect />
        </div>
        <SummaryCards month={month} />
      </div>
    </>
  );
}
