import Image from "next/image";
import { Button } from "../_components/ui/button";
import { LogInIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../_components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../_components/ui/card";
import LoginForm from "./_components/login-form";
import RegisterForm from "./_components/register-form";
import { headers } from "next/headers";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid h-full grid-cols-2 justify-center p-5">
      <div className="mx-auto flex max-w-[488px] flex-col items-center justify-center gap-8 p-8">
        <div className="w-full gap-8 space-y-8 py-8">
          <Image src="/logo.svg" width={180} height={40} alt="Finance AI" />
          <h1 className="text-4xl font-bold">Bem Vindo.</h1>
          <p>
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full gap-2 p-2 text-[14px] font-medium"
                variant="outline"
              >
                <LogInIcon />
                Fazer Login
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="uppercase">Fazer Login</DialogTitle>
                <DialogDescription>
                  Faça login ou cadastre-se para ter acesso a nossa plataforma
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signup">Entrar</TabsTrigger>
                  <TabsTrigger value="signin">Cadastrar</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fazer Login</CardTitle>
                      <CardDescription>
                        Faça login na plataforma com seu e-mail e senha.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {/* Formulario de login */}
                      <LoginForm />
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="signin">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cadastre-se</CardTitle>
                      <CardDescription>Insira suas credenciais</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {/* Formulario de cadastro */}
                      <RegisterForm />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Logo Da Aplicação"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
