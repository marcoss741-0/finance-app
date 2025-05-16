"use server";

import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId")?.toString();
  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
    },
  });

  return NextResponse.json(transactions);
}
