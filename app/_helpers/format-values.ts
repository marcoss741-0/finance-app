import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatLocalDate = (date: string | Date) => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return format(parsedDate, `dd 'de' MMMM 'de' yyyy`, { locale: ptBR });
};
