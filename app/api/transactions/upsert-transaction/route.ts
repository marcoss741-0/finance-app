import { UpsertTransactionAction } from "@/app/_actions/upsert-transactions";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    const response = await UpsertTransactionAction({ id, ...data });

    if (response.success === false) {
      return NextResponse.json(response, { status: 401 });
    }

    if (response.success === true) {
      revalidatePath("/transactions");
      return NextResponse.json(response, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
