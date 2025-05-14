import { headers } from "next/headers";
import { auth } from "./_lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UserButton from "./_components/user-button";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex w-full items-center justify-between border-b px-8 py-4">
        <div className="flex items-center gap-8">
          <Image
            src="/logo.svg"
            alt="Logo da Aplicação"
            width={174}
            height={39}
          />
          <Link href="#">Dashboard</Link>
          <Link href="/transactions">Transações</Link>
          <Link href="#">Assinaturas</Link>
        </div>

        {/* User Button */}
        <div className="flex">
          <UserButton session={session} />
        </div>
      </div>
    </>
  );
}
