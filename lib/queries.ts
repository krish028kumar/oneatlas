import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";
export const PAGE_SIZE = 12;
export type Filters = { q?: string; lab?: string; type?: string; cap?: string; sort?: string; page?: number };
export async function listModels(f: Filters) {
  const where: Prisma.ModelWhereInput = {
    ...(f.q && { OR: [{ name: { contains: f.q, mode: "insensitive" } }, { lab: { name: { contains: f.q, mode: "insensitive" } } }] }),
    ...(f.lab && { lab: { slug: f.lab } }), ...(f.type && { type: f.type }), ...(f.cap && { capabilities: { has: f.cap } }),
  };
  const orderBy: Prisma.ModelOrderByWithRelationInput =
    f.sort === "price" ? { inputPrice: "asc" } : f.sort === "context" ? { contextWindow: "desc" } : { releaseDate: "desc" };
  const page = Math.max(1, f.page || 1);
  const [items, total] = await Promise.all([
    prisma.model.findMany({ where, orderBy, include: { lab: true }, take: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE }),
    prisma.model.count({ where }),
  ]);
  return { items, total, page, pages: Math.ceil(total / PAGE_SIZE) };
}
export const getModel = (slug: string) => prisma.model.findUnique({ where: { slug },
  include: { lab: true, providers: { include: { provider: true } }, scores: { include: { benchmark: true } } } });
export const compareModels = (slugs: string[]) => prisma.model.findMany({ where: { slug: { in: slugs.slice(0, 4) } },
  include: { lab: true, scores: { include: { benchmark: true } } } });
export const listLabs = () => prisma.lab.findMany({ include: { models: { select: { slug: true, name: true } } }, orderBy: { name: "asc" } });
export async function rankings(benchmark?: string, category?: string) {
  return prisma.score.findMany({
    where: { benchmark: { ...(benchmark && { name: benchmark }), ...(category && { category }) } },
    include: { model: { include: { lab: true } }, benchmark: true }, orderBy: { value: "desc" }, take: 50 });
}
