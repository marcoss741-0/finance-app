"use server";

import { prisma } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId")?.toString();
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
  });

  revalidatePath("/transactions");

  return NextResponse.json(transactions, {
    headers: { "Cache-control": "no-store" },
  });
}
