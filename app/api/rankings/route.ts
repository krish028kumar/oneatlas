import { NextRequest, NextResponse } from "next/server";
import { rankings } from "@/lib/queries";
export async function GET(r: NextRequest) {
  const p = r.nextUrl.searchParams;
  return NextResponse.json(await rankings(p.get("benchmark") || undefined, p.get("category") || undefined));
}
