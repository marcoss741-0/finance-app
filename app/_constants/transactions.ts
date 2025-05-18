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

export const TRANSACTION_CATEGORY_LABELS: {
  [key: string]: string;
  EDUCATION: string;
  ENTERTAINMENT: string;
  FOOD: string;
  HEALTH: string;
  HOUSING: string;
  OTHER: string;
  SALARY: string;
  TRANSPORTATION: string;
  UTILITY: string;
} = {
  EDUCATION: "Educação",
  ENTERTAINMENT: "Entretenimento",
  FOOD: "Alimentação",
  HEALTH: "Saúde",
  HOUSING: "Moradia",
  OTHER: "Outros",
  SALARY: "Salário",
  TRANSPORTATION: "Transporte",
  UTILITY: "Utilidades",
};

export const TRANSACTION_PAYMENT_METHOD_ICONS: {
  [key: string]: string;
  CREDIT_CARD: string;
  DEBIT_CARD: string;
  BANK_TRANSFER: string;
  BANK_SLIP: string;
  CASH: string;
  PIX: string;
  OTHER: string;
} = {
  CREDIT_CARD: "credit-card.svg" as string,
  DEBIT_CARD: "debit-card.svg" as string,
  BANK_TRANSFER: "bank-transfer.svg" as string,
  BANK_SLIP: "bank-slip.svg" as string,
  CASH: "money.svg" as string,
  PIX: "pix.svg" as string,
  OTHER: "other.svg" as string,
};
