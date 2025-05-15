"use client";

import {
  Transaction,
  TransactionCategory,
  TransactionPaymentMethod,
} from "@prisma/client";

import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "../_components/type-badge";
import { formatCurrency, formatLocalDate } from "@/app/_helpers/format-values";
import EditTransactionsButton from "../_components/edit-transaction-button";
import DeleteTransactionButton from "../_components/delete-transaction-button";

export const TransactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      return (
        <TransactionTypeBadge key={transaction.id} transaction={transaction} />
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({
      row: {
        original: { category },
      },
    }) => {
      switch (category) {
        case TransactionCategory.EDUCATION:
          return "Educação";
        case TransactionCategory.ENTERTAINMENT:
          return "Lazer";
        case TransactionCategory.FOOD:
          return "Alimentação";
        case TransactionCategory.HEALTH:
          return "Saúde";
        case TransactionCategory.HOUSING:
          return "Moradia";
        case TransactionCategory.OTHER:
          return "Outros";
        case TransactionCategory.SALARY:
          return "Crédito de salário";
        case TransactionCategory.TRANSPORTATION:
          return "Transporte";
        default:
          return "Sem Categoria";
      }
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Método",
    cell: ({
      row: {
        original: { paymentMethod },
      },
    }) => {
      switch (paymentMethod) {
        case TransactionPaymentMethod.BANK_TRANSFER:
          return "Transferência";
        case TransactionPaymentMethod.BANK_SLIP:
          return "Boleto";
        case TransactionPaymentMethod.CASH:
          return "Dinheiro";
        case TransactionPaymentMethod.CREDIT_CARD:
          return "Cartão de Crédito";
        case TransactionPaymentMethod.DEBIT_CARD:
          return "Cartão de débito";
        case TransactionPaymentMethod.OTHER:
          return "Outros";

        default:
          return "Pix";
      }
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({
      row: {
        original: { date },
      },
    }) => {
      return formatLocalDate(date);
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({
      row: {
        original: { amount },
      },
    }) => {
      return formatCurrency(Number(amount));
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex justify-between gap-2 px-2">
          <EditTransactionsButton transaction={transaction} />

          <DeleteTransactionButton />
        </div>
      );
    },
  },
];
