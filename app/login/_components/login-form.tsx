"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../_components/ui/form";
import { Input } from "../../_components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { authClient } from "@/app/_lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formSchema = z.object({
    email: z
      .string()
      .email({
        message: "Informe um e-mail válido!",
      })
      .trim()
      .min(2, {
        message: "Não pode ser vazio!",
      }),
    password: z
      .string()
      .min(6, {
        message: "A senha deve conter no minimo 6 caracteres",
      })
      .trim(),
  });

  type SigInFormData = z.infer<typeof formSchema>;

  const form = useForm<SigInFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigInFormData) => {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Login Realizado!");
          router.replace("/");
          setIsLoading(false);
        },
        onError: (ctx) => {
          if (
            ctx.error.statusText === "UNAUTHORIZED" ||
            ctx.error.code === "INVALID_EMAIL_OR_PASSWORD"
          ) {
            toast.warning("Email ou senha são invalidos");
          }
          form.reset();
          setIsLoading(false);
        },
        onRequest: () => {
          setIsLoading(true);
        },
      },
    );
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="default"
            type="submit"
            className="w-full font-semibold text-foreground"
          >
            {isLoading ? (
              <Image src="/loader.svg" width={18} height={18} alt="loading" />
            ) : (
              "ENTRAR"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
