import "./globals.css";
import Link from "next/link";
export const metadata = { title: "OneAtlas", description: "AI model discovery & intelligence" };
export default function Root({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="bg-slate-50 text-slate-900">
    <header className="border-b bg-white"><nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 p-4">
      <Link href="/" className="text-lg font-bold">OneAtlas</Link>
      <Link href="/rankings">Rankings</Link><Link href="/labs">Labs</Link>
      <form action="/" className="ml-auto"><input name="q" placeholder="Search models or labs…" className="rounded border px-3 py-1" /></form>
    </nav></header>
    <main className="mx-auto max-w-6xl p-4">{children}</main></body></html>);
}
