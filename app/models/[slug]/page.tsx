import { notFound } from "next/navigation";
import { getModel } from "@/lib/queries";
export const dynamic = "force-dynamic";
export default async function ModelPage({ params }: { params: { slug: string } }) {
  const m = await getModel(params.slug);
  if (!m) notFound();
  return (<div className="space-y-4">
    <h1 className="text-2xl font-bold">{m.name}</h1>
    <p className="text-slate-600">{m.lab.name} · {m.type} · released {m.releaseDate.toDateString()}</p>
    <p>{m.description}</p>
    <ul className="text-sm"><li>Context: {m.contextWindow.toLocaleString()} tokens</li><li>Base price: ${m.inputPrice} in / ${m.outputPrice} out per 1M tokens</li><li>Capabilities: {m.capabilities.join(", ")}</li></ul>
    <h2 className="font-semibold">Providers</h2>
    <table className="w-full max-w-lg text-sm"><tbody>{m.providers.map(p => <tr key={p.providerId} className="border-b"><td>{p.provider.name}</td><td>${p.inputPrice.toFixed(2)} in</td><td>${p.outputPrice.toFixed(2)} out</td></tr>)}</tbody></table>
    <h2 className="font-semibold">Benchmarks</h2>
    <ul className="text-sm">{m.scores.map(s => <li key={s.benchmarkId}>{s.benchmark.name}: {s.value}</li>)}</ul>
  </div>);
}
