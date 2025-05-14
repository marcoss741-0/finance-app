import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatLocalDate = (date: Date) => {
  return format(date, `dd 'de' MMMM 'de' yyyy`, { locale: ptBR });
};
