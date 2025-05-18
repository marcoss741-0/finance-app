"use server";

import { getInfoT } from "@/app/_actions/get-info-transactions";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month")?.toString() || "";
  const userID = searchParams.get("userID")?.toString() || "";

  const transactions = await getInfoT(month, userID);

  return NextResponse.json(transactions);
}
