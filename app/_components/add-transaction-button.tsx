"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { MoneyInput } from "./money-input";
import {
  CATEGORY_OPTIONS,
  PAYMENT_OPTION,
  TRANSACTION_TYPE,
} from "../_constants/transactions";
import { DatePicker } from "./date-picker";
import { toast } from "sonner";
import { useState } from "react";
import { mutate } from "swr";

const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Titulo da transação é obrigatório!",
  }),
  amount: z.number().positive({
    message: "O valor deve ser maior que zero!",
  }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo de transação é obrigatório",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamento é obrigatório",
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "",
  }),

  date: z.date({
    required_error: "A data é obrigatória",
  }),
});

type FCHEMA = z.infer<typeof formSchema>;

const AddTransactionsButton = () => {
  const [dialogIsOpen, setDialoIsOpen] = useState(false);

  const form = useForm<FCHEMA>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      category: TransactionCategory.OTHER,
      type: TransactionType.EXPENSE,
      paymentMethod: TransactionPaymentMethod.OTHER,
      date: new Date(),
    },
  });

  const onSubmit = async (data: FCHEMA) => {
    try {
      const result = await fetch("/api/transactions/add-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      mutate("/api/transactions");
      const response = await result.json();

      if (response.success === false) {
        return toast.warning(response.message);
      }

      toast.success(response.message || "");
      form.reset();
      setDialoIsOpen(false);
    } catch (error) {
      toast.error("Ooops, algo incomum aconteceu!!" + error);
    }
  };
  return (
    <>
      <Dialog
        open={dialogIsOpen}
        onOpenChange={(open) => {
          setDialoIsOpen(open);
          if (!open) form.reset();
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="gap-2 rounded-full text-[14px] font-semibold"
          >
            Adicionar transação <ArrowUpDown />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex w-[380px] max-w-[400px] flex-col rounded-xl p-5">
          <DialogHeader>
            <DialogTitle className="text-center">
              Adicionar Transação
            </DialogTitle>
            <DialogDescription className="text-center">
              Insira as informações abaixo
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Titulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor</FormLabel>
                    <FormControl>
                      <MoneyInput
                        placeholder="R$ 00.000,00"
                        value={field.value}
                        onValueChange={({ floatValue }) =>
                          field.onChange(floatValue)
                        }
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categoria da transação</SelectLabel>
                          {CATEGORY_OPTIONS.map((categoty) => (
                            <SelectItem
                              key={categoty.value}
                              value={categoty.value}
                            >
                              {categoty.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipo da transação</SelectLabel>
                            {TRANSACTION_TYPE.map((transaction) => (
                              <SelectItem
                                key={transaction.value}
                                value={transaction.value}
                              >
                                {transaction.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de pagamento</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Método de pagamento</SelectLabel>
                            {PAYMENT_OPTION.map((method) => (
                              <SelectItem
                                key={method.value}
                                value={method.value}
                              >
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="mt-auto">
                <div className="flex w-full items-center justify-between gap-5">
                  <DialogClose asChild>
                    <Button type="button" variant="outline" className="w-full">
                      Cancelar
                    </Button>
                  </DialogClose>

                  <Button type="submit" variant="default" className="w-full">
                    Adicionar
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddTransactionsButton;
