import { headers } from "next/headers";
import NavBar from "../_components/nav-bar";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import { Badge } from "../_components/ui/badge";
import SubscriptionButton from "./_components/subscription-button";
import { prisma } from "../_lib/prisma";

const Subscriptions = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session) {
    redirect("/login");
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

  return (
    <>
      <NavBar user={session.user} />

      <div className="space-y-6 p-6">
        <div className="relative flex w-full items-center p-5">
          <h1 className="text-2xl font-bold text-foreground">Assinatura</h1>
        </div>
        <div className="flex items-center gap-6">
          <Card className="h-[380px] w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPlan === "NOTHING_OK" && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}

              <h2 className="text-center text-2xl font-semibold">
                Plano Básico
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">0</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Apenas 10 transações por mês ({6}/10)</p>
              </div>
              <div className="flex items-center gap-2">
                <XIcon />
                <p>Relatórios de IA</p>
              </div>
            </CardContent>
          </Card>

          <Card className="h-[380px] w-[450px]">
            <CardHeader className="relative border-b border-solid py-8">
              {hasPlan === "SUB_OK" && (
                <Badge className="absolute left-4 top-12 bg-primary/10 text-primary">
                  Ativo
                </Badge>
              )}

              <h2 className="text-center text-2xl font-semibold">
                Plano Premium
              </h2>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl">R$</span>
                <span className="text-6xl font-semibold">19,99</span>
                <div className="text-2xl text-muted-foreground">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary" />
                <p>Relatórios de IA</p>
              </div>
              <SubscriptionButton
                hasSubscription={hasPlan}
                userMail={session?.user?.email}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
