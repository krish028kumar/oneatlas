import { compareModels } from "@/lib/queries";
export const dynamic = "force-dynamic";
export default async function Compare({ searchParams }: { searchParams: { ids?: string | string[] } }) {
  const ids = ([] as string[]).concat(searchParams.ids ?? []);
  const ms = ids.length ? await compareModels(ids) : [];
  if (!ms.length) return <p>Pick models on the home page to compare.</p>;
  const benches = Array.from(new Set(ms.flatMap(m => m.scores.map(s => s.benchmark.name))));
  const rows: [string, (m: (typeof ms)[number]) => string | number][] = [
    ["Lab", m => m.lab.name], ["Type", m => m.type], ["Input $/M", m => m.inputPrice], ["Output $/M", m => m.outputPrice],
    ["Context", m => m.contextWindow.toLocaleString()], ["Capabilities", m => m.capabilities.join(", ")],
    ...benches.map((b): [string, (m: (typeof ms)[number]) => string | number] => [b, m => m.scores.find(s => s.benchmark.name === b)?.value ?? "–"])];
  return (<div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr><th></th>{ms.map(m => <th key={m.id} className="p-2 text-left">{m.name}</th>)}</tr></thead>
    <tbody>{rows.map(([label, fn]) => <tr key={label} className="border-t"><td className="p-2 font-medium">{label}</td>{ms.map(m => <td key={m.id} className="p-2">{fn(m)}</td>)}</tr>)}</tbody></table></div>);
}
