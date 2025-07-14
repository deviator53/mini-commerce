"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, Product } from "../../utils/products";
import { useCartStore } from "../../utils/cartStore";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: product } = useQuery<Product | undefined>({
    queryKey: ["product", slug],
    queryFn: () => Promise.resolve(getProductBySlug(slug)),
  });
  const addToCart = useCartStore((s) => s.addToCart);

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-48 h-48 object-contain mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-2">${product.price.toFixed(2)}</p>
      <p className="mb-4 text-center">{product.description}</p>
      <button
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => {
          addToCart(product, 1);
          router.push("/cart");
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
