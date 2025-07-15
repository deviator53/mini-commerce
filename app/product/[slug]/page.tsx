"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, Product } from "../../utils/products";
import { useCartStore } from "../../utils/cartStore";
import { useState } from "react";
import { useFormatCurrency } from "../../utils/formatCurrency";

const DUMMY_IMAGES = [
  (product: Product) => product.image,
  (product: Product) => product.image,
  (product: Product) => product.image,
  (product: Product) => product.image,
  (product: Product) => product.image,
];

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { data: product } = useQuery<Product | undefined>({
    queryKey: ["product", slug],
    queryFn: () => Promise.resolve(getProductBySlug(slug)),
  });
  const addToCart = useCartStore((s) => s.addToCart);
  const [selectedImg, setSelectedImg] = useState(0);
  const [size, setSize] = useState("");
  const formatCurrency = useFormatCurrency();

  if (!product) return <div>Product not found.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow p-8 flex flex-col md:flex-row gap-10">
      {/* Left: Images */}
      <div className="flex-1 flex flex-col items-center">
        <div className="relative w-full flex justify-center">
          <img
            src={DUMMY_IMAGES[selectedImg](product)}
            alt={product.name}
            className="w-80 h-80 object-contain rounded mb-4 border"
          />
          {/* Arrows (dummy, not functional) */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-gray-100"
            disabled={selectedImg === 0}
            onClick={() => setSelectedImg((i) => Math.max(0, i - 1))}
          >
            <span className="sr-only">Previous</span>
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path
                d="M15 19l-7-7 7-7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-gray-100"
            disabled={selectedImg === DUMMY_IMAGES.length - 1}
            onClick={() =>
              setSelectedImg((i) => Math.min(DUMMY_IMAGES.length - 1, i + 1))
            }
          >
            <span className="sr-only">Next</span>
            <svg width="24" height="24" fill="none" stroke="currentColor">
              <path
                d="M9 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {/* Thumbnails */}
        <div className="flex gap-2 mt-2">
          {DUMMY_IMAGES.map((getImg, i) => (
            <button
              key={i}
              className={`border rounded w-14 h-14 p-1 ${
                selectedImg === i ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedImg(i)}
            >
              <img
                src={getImg(product)}
                alt="thumb"
                className="object-contain w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
      {/* Right: Info */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="uppercase text-xs text-gray-500 font-semibold tracking-widest">
          Adidas
        </div>
        <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
        <div className="text-xl text-amber-600 font-semibold mb-2">
          {formatCurrency(product.price)}
        </div>
        <p className="text-gray-700 mb-2">
          Designed for simplicity and made from high quality materials. Its
          sleek geometry and material combinations creates a modern personalized
          look.
        </p>
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {[...Array(4)].map((_, i) => (
            <svg
              key={i}
              width="18"
              height="18"
              fill="#fbbf24"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          ))}
          <svg width="18" height="18" fill="#e5e7eb" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        </div>
        {/* Size selector (dummy) */}
        <div className="mb-4">
          <label htmlFor="size" className="block text-sm font-medium mb-1">
            Size
          </label>
          <select
            id="size"
            className="border rounded px-3 py-2 w-40"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="">Select size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <button
          className="w-full py-3 bg-black text-white rounded text-lg font-semibold hover:bg-gray-900 mb-2"
          onClick={() => {
            addToCart(product, 1);
            router.push("/cart");
          }}
        >
          ADD TO CART
        </button>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 border rounded py-2 hover:bg-gray-100 flex items-center justify-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Collect
          </button>
          <button className="flex-1 border rounded py-2 hover:bg-gray-100 flex items-center justify-center gap-2">
            <svg width="18" height="18" fill="none" stroke="currentColor">
              <path d="M4 12v7a2 2 0 002 2h8a2 2 0 002-2v-7" />
              <path d="M16 6V4a2 2 0 00-2-2H6a2 2 0 00-2 2v2" />
              <rect width="20" height="8" x="2" y="6" rx="2" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
