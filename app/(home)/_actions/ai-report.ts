"use server";

import { auth } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { headers } from "next/headers";

export async function generateAiReport(month: string) {
  const API_KEY = process.env.GEMINI_API_KEY as string;
  if (!API_KEY) {
    console.error(
      "Server-side API Key not found. Ensure GEMINI_API_KEY is set in .env.local.",
    );
    throw new Error("API Key for Gemini is not configured.");
  }
  const session = await auth.api.getSession({
    headers: headers(),
  });
  if (!session?.user) {
    throw new Error("User not authenticated.");
  }
  const verifyPlan = await prisma.user.findFirst({
    where: {
      id: session.user.id,
      plan: "PRO_PLAN",
    },
  });
  if (!verifyPlan) {
    throw new Error("User does not have a premium plan.");
  }

  const year = 2025;
  const startDate = new Date(`${year}-${month}-01`);

  let nextMonth = parseInt(month) + 1;
  let nextYear = year;
  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear++;
  }
  const endDate = new Date(
    `${nextYear}-${String(nextMonth).padStart(2, "0")}-01`,
  );

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session?.user.id,
      date: {
        gte: startDate,
        lt: endDate, // Usar 'lt' para o primeiro dia do próximo mês
      },
    },
  });

  if (transactions.length === 0) {
    return {
      success: false,
      message: "Nenhuma transação encontrada para o mês selecionado.",
    };
  }

  const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira.
Use **formato Markdown** para estruturar o relatório, incluindo:
- Títulos e subtítulos (com # e ##)
- Listas (com - ou *) para dicas e orientações
- Negrito (com **) para destacar informações importantes
- Titulos e subtítulos em português com estilização em negrito
- espaços entre os parágrafos
- use emojis para deixar o relatório mais amigável

${transactions
  .map(
    (transaction) =>
      `${transaction.date.toLocaleDateString("pt-BR")}-R$${transaction.amount}-${transaction.type}-${transaction.category}`,
  )
  .join(
    ";",
  )} coloque o valor em reais e a data no formato dd/mm/aaaa. e tambem em lista.`;

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(content);
    const response = result.response;
    const text = response.text();

    return { text, status: 201 };
  } catch (error) {
    console.error("Error calling Gemini API from backend:", error);
    return {
      success: false,
      message: "Failed to get response from Gemini API.",
    };
  }
}
