import { rankings } from "@/lib/queries";
export const dynamic = "force-dynamic";
export default async function Rankings({ searchParams: s }: { searchParams: { category?: string } }) {
  const rows = await rankings(undefined, s.category);
  return (<div className="space-y-3"><h1 className="text-2xl font-bold">Rankings</h1>
    <form className="flex gap-2"><select name="category" defaultValue={s.category} className="rounded border bg-white px-2 py-1"><option value="">All</option>{["reasoning", "coding", "vision"].map(c => <option key={c}>{c}</option>)}</select><button className="rounded bg-slate-900 px-3 py-1 text-white">Filter</button></form>
    <table className="w-full text-sm"><tbody>{rows.map((r, i) => <tr key={`${r.modelId}-${r.benchmarkId}`} className="border-b"><td className="p-1">{i + 1}</td><td>{r.model.name}</td><td>{r.model.lab.name}</td><td>{r.benchmark.name}</td><td className="font-semibold">{r.value}</td></tr>)}</tbody></table></div>);
}
