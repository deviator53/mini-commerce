"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug, Product } from "../../utils/products";
import { useCartStore } from "../../utils/cartStore";
import { useState } from "react";
import { useFormatCurrency } from "../../utils/formatCurrency";
import Image from "next/image";

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
      <div className="flex-1 flex flex-col items-center">
        <div className="relative w-full flex justify-center">
          <Image
            width={320}
            height={320}
            src={DUMMY_IMAGES[selectedImg](product)}
            alt={product.name}
            className="w-80 h-80 object-contain rounded mb-4 border"
          />
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
        <div className="flex gap-2 mt-2">
          {DUMMY_IMAGES.map((getImg, i) => (
            <button
              key={i}
              className={`border rounded w-14 h-14 p-1 ${
                selectedImg === i ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedImg(i)}
            >
              <Image
                src={getImg(product)}
                alt="thumb"
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="uppercase text-xs text-gray-500 font-semibold tracking-widest">
          product details
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
       
        <button
          className="w-full py-3 bg-blue-600 text-white rounded text-lg font-semibold hover:bg-blue-700 mb-2"
          onClick={() => {
            addToCart(product, 1);
            router.push("/cart");
          }}
        >
          ADD TO CART
        </button>
        <div className="flex gap-2 mt-2">
          <button className="flex-1 border rounded py-2 hover:bg-gray-100 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M13 14H11C7.54202 14 4.53953 15.9502 3.03239 18.8107C3.01093 18.5433 3 18.2729 3 18C3 12.4772 7.47715 8 13 8V3L23 11L13 19V14Z"></path>
            </svg>
            Share
          </button>
          <button className="flex-1 border rounded py-2 hover:bg-gray-100 flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M5 2H19C19.5523 2 20 2.44772 20 3V22.1433C20 22.4194 19.7761 22.6434 19.5 22.6434C19.4061 22.6434 19.314 22.6168 19.2344 22.5669L12 18.0313L4.76559 22.5669C4.53163 22.7136 4.22306 22.6429 4.07637 22.4089C4.02647 22.3293 4 22.2373 4 22.1433V3C4 2.44772 4.44772 2 5 2Z"></path>
            </svg>
            Bookmark
          </button>
        </div>
      </div>
    </div>
  );
}
