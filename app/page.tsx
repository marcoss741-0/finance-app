import { headers } from "next/headers";
import { auth } from "./_lib/auth";
import { redirect } from "next/navigation";
import NavBar from "./_components/nav-bar";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <NavBar user={session.user} />
    </>
  );
}
