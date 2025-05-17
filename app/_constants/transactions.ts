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

export const TRANSACTION_CATEGORY_LABELS = {
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

export const TRANSACTION_PAYMENT_METHOD_ICONS = {
  [TransactionPaymentMethod.CREDIT_CARD]: "credit-card.svg",
  [TransactionPaymentMethod.DEBIT_CARD]: "debit-card.svg",
  [TransactionPaymentMethod.BANK_TRANSFER]: "bank-transfer.svg",
  [TransactionPaymentMethod.BANK_SLIP]: "bank-slip.svg",
  [TransactionPaymentMethod.CASH]: "money.svg",
  [TransactionPaymentMethod.PIX]: "pix.svg",
  [TransactionPaymentMethod.OTHER]: "other.svg",
};
