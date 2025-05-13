import { headers } from "next/headers";
import { Button } from "./_components/ui/button";
import { auth } from "./_lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <h1>Bem Vindo {session.user.name}</h1>
      <Button>Hello world!</Button>
    </>
  );
}
