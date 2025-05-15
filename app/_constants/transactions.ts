import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

export const CATEGORY_OPTIONS = [
  {
    value: TransactionCategory.EDUCATION,
    label: "Educação",
  },
  {
    value: TransactionCategory.ENTERTAINMENT,
    label: "Lazer",
  },
  {
    value: TransactionCategory.FOOD,
    label: "Alimentação",
  },
  {
    value: TransactionCategory.HEALTH,
    label: "Saúde",
  },
  {
    value: TransactionCategory.HOUSING,
    label: "Moradia",
  },
  {
    value: TransactionCategory.OTHER,
    label: "Outros",
  },
  {
    value: TransactionCategory.SALARY,
    label: "Crédito de salário",
  },
  {
    value: TransactionCategory.TRANSPORTATION,
    label: "Transporte",
  },
  {
    value: TransactionCategory.UTILITY,
    label: "Sem categoria",
  },
];

export const PAYMENT_OPTION = [
  {
    value: TransactionPaymentMethod.BANK_SLIP,
    label: "Boleto",
  },
  {
    value: TransactionPaymentMethod.BANK_TRANSFER,
    label: "Transferência",
  },
  {
    value: TransactionPaymentMethod.CASH,
    label: "Dinheiro",
  },
  {
    value: TransactionPaymentMethod.CREDIT_CARD,
    label: "Cartão de crédito",
  },
  {
    value: TransactionPaymentMethod.DEBIT_CARD,
    label: "Cartão de débito",
  },
  {
    value: TransactionPaymentMethod.PIX,
    label: "Pix",
  },
  {
    value: TransactionPaymentMethod.OTHER,
    label: "Outros",
  },
];

export const TRANSACTION_TYPE = [
  {
    value: TransactionType.DEPOSIT,
    label: "Depósito",
  },
  {
    value: TransactionType.EXPENSE,
    label: "Gasto",
  },
  {
    value: TransactionType.INVESTMENT,
    label: "Investimento",
  },
];
