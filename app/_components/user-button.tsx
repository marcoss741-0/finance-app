"use client";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  UserCircleIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { authClient } from "../_lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";

interface UserButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

const UserButton = ({ session }: UserButtonProps) => {
  const [DialogOpen, setDialogIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setIsLoading(false);
          router.push("/login");
        },
        onRequest: () => {
          setIsLoading(true);
        },
      },
    });
  };

  const handleDialogOpen = () => {
    setDialogIsOpen((prev) => !prev);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer gap-4 rounded-full border p-4">
            {isLoading ? (
              <Image
                src="/loader2.svg"
                alt="Loading Logout"
                width={36}
                height={36}
              />
            ) : (
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session.user.image || "icons8-user-48.png"}
                  alt={session.user.name}
                />
                <AvatarFallback className="rounded-lg">FA</AvatarFallback>
              </Avatar>
            )}

            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{session.user.name}</span>
              <span className="truncate text-xs text-muted-foreground">
                {session.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={session.user.image || "icons8-user-48.png"}
                  alt={session.user.name}
                />
                <AvatarFallback className="rounded-lg">FA</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session.user.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleDialogOpen}>
              <UserCircleIcon />
              Gerenciar Conta
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Cobrança
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BellIcon />
              Notificações
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignout}>
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog para gestão da conta */}
      <Dialog open={DialogOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="w-[50%] items-center">
          <DialogHeader>
            <DialogTitle>Informações da conta.</DialogTitle>
            <DialogDescription>
              Alterar Informações da Conta ou Excluir Conta
            </DialogDescription>
          </DialogHeader>
          <div></div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserButton;
