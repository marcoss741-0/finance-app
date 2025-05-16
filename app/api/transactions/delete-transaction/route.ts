import { deleteTransactions } from "@/app/_actions/delete-transanctions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { transactionId } = data;

    if (!transactionId) {
      return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const response = await deleteTransactions(transactionId);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Erro ao deletar transação" },
      { status: 500 },
    );
  }
}
