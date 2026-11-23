import { NextResponse } from "next/server";
import { getModel } from "@/lib/queries";
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const m = await getModel(params.slug);
  return m ? NextResponse.json(m) : NextResponse.json({ error: "Not found" }, { status: 404 });
}
