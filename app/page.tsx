import Link from "next/link";
import { listModels, listLabs } from "@/lib/queries";
export const dynamic = "force-dynamic";
type SP = { [k: string]: string | undefined };
export default async function Home({ searchParams: s }: { searchParams: SP }) {
  const [res, labs] = await Promise.all([listModels({ ...s, page: Number(s.page) || 1 }), listLabs()]);
  const qs = (page: number) => new URLSearchParams({ ...(s as Record<string, string>), page: String(page) }).toString();
  const sel = "rounded border bg-white px-2 py-1";
  return (<div className="space-y-4">
    <form className="flex flex-wrap gap-2">
      <input name="q" defaultValue={s.q} placeholder="Search" className={sel} />
      <select name="lab" defaultValue={s.lab} className={sel}><option value="">All labs</option>{labs.map(l => <option key={l.id} value={l.slug}>{l.name}</option>)}</select>
      <select name="type" defaultValue={s.type} className={sel}><option value="">All types</option>{["chat", "multimodal", "embedding", "image"].map(t => <option key={t}>{t}</option>)}</select>
      <select name="cap" defaultValue={s.cap} className={sel}><option value="">Any capability</option>{["tools", "json", "vision"].map(t => <option key={t}>{t}</option>)}</select>
      <select name="sort" defaultValue={s.sort} className={sel}><option value="date">Newest</option><option value="price">Cheapest</option><option value="context">Largest context</option></select>
      <button className="rounded bg-slate-900 px-3 py-1 text-white">Apply</button>
    </form>
    <form action="/compare" className="space-y-3">
      <p className="text-sm text-slate-500">{res.total} models · select up to 4 to compare</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{res.items.map(m => (
        <div key={m.id} className="rounded-lg border bg-white p-4">
          <label className="float-right text-xs"><input type="checkbox" name="ids" value={m.slug} /> compare</label>
          <Link href={`/models/${m.slug}`} className="font-semibold hover:underline">{m.name}</Link>
          <div className="text-sm text-slate-500">{m.lab.name} · {m.type}</div>
          <div className="mt-2 text-sm">${m.inputPrice}/M in · ${m.outputPrice}/M out</div>
          <div className="text-sm">{m.contextWindow.toLocaleString()} ctx</div>
        </div>))}</div>
      {res.items.length === 0 && <p>No models match.</p>}
      <button className="rounded bg-indigo-600 px-3 py-1 text-white">Compare selected</button>
    </form>
    <div className="flex gap-3 text-sm">
      {res.page > 1 && <Link href={`/?${qs(res.page - 1)}`}>← Prev</Link>}
      <span>Page {res.page} of {Math.max(res.pages, 1)}</span>
      {res.page < res.pages && <Link href={`/?${qs(res.page + 1)}`}>Next →</Link>}
    </div></div>);
}
