/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useSWR from "swr";
import { Transaction } from "@prisma/client";

// Tipo para os dados retornados pela API
interface TransactionData {
  LAST_TRANSACTIONS?: Transaction[];
  TEC?: any[];
  TYP?: any;
  BALANCE?: number;
  DEP_TOTAL?: number;
  INV_TOTAL?: number;
  EXP_TOTAL?: number;
  [key: string]: any;
}

// Função fetcher para o SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar dados de transações");
  }
  return response.json();
};

/**
 * Hook personalizado para buscar dados de transações usando SWR
 * @param month Mês para filtrar as transações (opcional)
 * @param userID ID do usuário para filtrar as transações (opcional)
 * @returns Objeto com dados, estado de loading e erro
 */
export function useTransactionData(month?: string, userID?: string) {
  const { data, error, isLoading, mutate } = useSWR<TransactionData[]>(
    `/api/transactions/get-resume?month=${month || ""}&userID=${userID || ""}`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000, // 5 segundos
    },
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate, // Função para revalidar manualmente os dados
    lastTransactions: data?.[0]?.LAST_TRANSACTIONS || [],
    expensesByCategory: data?.[0]?.TEC || [],
    transactionsByType: data?.[0]?.TYP,
    balance: data?.[0]?.BALANCE || 0,
    depositTotal: data?.[0]?.DEP_TOTAL || 0,
    investmentTotal: data?.[0]?.INV_TOTAL || 0,
    expenseTotal: data?.[0]?.EXP_TOTAL || 0,
  };
}
