"use client";

import Link from "next/link";
import UserButton from "./user-button";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Props = {
  user?: {
    id: string;
    name?: string;
    email?: string;
    image?: string | null;
  };
};

const NavBar = ({ user }: Props) => {
  const pathName = usePathname();

  return (
    <>
      <nav className="flex justify-between border-b border-solid px-8 py-4">
        <div className="flex items-center gap-10">
          <Image
            src="/logo.svg"
            alt="Logo da Aplicação"
            width={173}
            height={39}
          />
          <Link
            href="/"
            className={pathName === "/" ? "text-primary" : "text-foreground"}
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className={
              pathName === "/transactions" ? "text-primary" : "text-foreground"
            }
          >
            Transações
          </Link>
          <Link
            href="/subscriptions"
            className={
              pathName === "/subscriptions" ? "text-primary" : "text-foreground"
            }
          >
            Assinaturas
          </Link>
        </div>

        {/* User Button */}
        <div className="flex">
          <UserButton user={user} />
        </div>
      </nav>
    </>
  );
};

export default NavBar;
