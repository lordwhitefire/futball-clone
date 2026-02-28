import { promises as fs } from "fs";
import path from "path";
import type { Product } from "./types";

let cachedProducts: Product[] | null = null;

export async function getProducts(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts;

  const filePath = path.join(process.cwd(), "products.json");
  const raw = await fs.readFile(filePath, "utf-8");
  cachedProducts = JSON.parse(raw) as Product[];
  return cachedProducts;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const products = await getProducts();
  // Match by url_slug OR by id (lowercased)
  return products.find(
    (p) =>
      p.url_slug === slug || p.id.toLowerCase() === slug.toLowerCase()
  );
}
