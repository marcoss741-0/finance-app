import Image from "next/image";
import { Button } from "../_components/ui/button";

const LoginPage = () => {
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
          <Button
            className="w-full gap-2 p-2 text-[14px] font-medium"
            variant="outline"
          >
            <Image
              src="/google.svg"
              width={18}
              height={18}
              alt="Login with google"
            />
            Entrar como o Google
          </Button>
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
