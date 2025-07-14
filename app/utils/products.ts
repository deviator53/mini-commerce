export type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  description: string;
};

const LOCAL_STORAGE_KEY = "mini-commerce-products";

export async function seedProducts() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
    const res = await fetch("/products.json");
    const products = await res.json();
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  }
}

export function getProducts(): Product[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug);
}
