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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formSchema = z
    .object({
      name: z.string().trim().min(1, {
        message: "Informe seu nome completo",
      }),

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
      confirmPassword: z
        .string()
        .min(6, {
          message: "A confirmação de senha deve conter 6 caracteres",
        })
        .trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "As senhas não coincidem!!",
      path: ["confirmPassword"],
    });

  type SignUpFormData = z.infer<typeof formSchema>;

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    await authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          toast.success("Usuario Cadastrado com êxito!");
          setIsLoading(false);
          form.reset();
          router.replace("/");
        },
        onError: (ctx) => {
          toast.error("Erro ao criar usuario!");
          console.log(ctx);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Informe seu nome completo"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Esconder senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword
                          ? "Esconder senha"
                          : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant="default"
            type="submit"
            className="w-full font-semibold"
          >
            {isLoading ? (
              <>
                {" "}
                <Image src="/loader.svg" alt="Loading" width={18} height={18} />
              </>
            ) : (
              "Cadastrar"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
