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

interface UserButtonProps {
  session: any;
}

const UserButton = ({ session }: UserButtonProps) => {
  const router = useRouter();

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer gap-4 rounded-lg border p-2">
            <Avatar className="h-8 w-8 rounded-lg grayscale">
              <AvatarImage
                src={session.user.image || "user-icon-styled.svg"}
                alt={session.user.name}
              />
              <AvatarFallback className="rounded-lg">FA</AvatarFallback>
            </Avatar>
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
                  src={session.user.image || "user-icon-styled.svg"}
                  alt={session.user.name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
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
            <DropdownMenuItem>
              <UserCircleIcon />
              Conta
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
    </>
  );
};

export default UserButton;
