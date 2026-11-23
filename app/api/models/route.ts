import { NextRequest, NextResponse } from "next/server";
import { listModels } from "@/lib/queries";
export async function GET(r: NextRequest) {
  try {
    const p = r.nextUrl.searchParams;
    return NextResponse.json(await listModels({ q: p.get("q") || undefined, lab: p.get("lab") || undefined, type: p.get("type") || undefined,
      cap: p.get("cap") || undefined, sort: p.get("sort") || undefined, page: Number(p.get("page")) || 1 }));
  } catch { return NextResponse.json({ error: "Internal error" }, { status: 500 }); }
}
