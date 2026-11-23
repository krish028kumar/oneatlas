import Link from "next/link";
import { listLabs } from "@/lib/queries";
export const dynamic = "force-dynamic";
export default async function Labs() {
  const labs = await listLabs();
  return (<div className="grid gap-3 sm:grid-cols-2">{labs.map(l => (<div key={l.id} className="rounded-lg border bg-white p-4">
    <h2 className="font-semibold">{l.name} <span className="text-sm text-slate-500">({l.country})</span></h2><p className="text-sm">{l.description}</p>
    <ul className="mt-2 text-sm">{l.models.map(m => <li key={m.slug}><Link href={`/models/${m.slug}`} className="underline">{m.name}</Link></li>)}</ul></div>))}</div>);
}
