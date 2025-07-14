"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { seedProducts, getProducts, Product } from "./utils/products";
import Link from "next/link";
import { useCartStore } from "./utils/cartStore";

export default function CataloguePage() {
  useEffect(() => {
    seedProducts();
  }, []);

  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => Promise.resolve(getProducts()),
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const handleShopNow = () => {
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addToCart = useCartStore((s) => s.addToCart);
  const cartItems = useCartStore((s) => s.items);
  const [added, setAdded] = useState<string | null>(null);

  const getProductQty = (slug: string) => {
    const item = cartItems.find((i) => i.slug === slug);
    return item ? item.quantity : 0;
  };

  return (
    <>
      <section className="mb-10 text-center py-10 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-blue-700">
            Welcome to Mini-Commerce
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Discover the best mini gadgets and everyday essentials at unbeatable
            prices. Shop smart, shop mini!
          </p>
          <button
            className="px-8 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={handleShopNow}
          >
            Shop Now
          </button>
        </div>
      </section>
      {added && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2 rounded shadow z-50 transition">
          Added to cart!
        </div>
      )}
      <div
        ref={gridRef}
        className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col items-center bg-white shadow hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-contain mb-2"
              loading="lazy"
            />
            <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
            <div className="flex gap-2 w-full">
              <button
                className="flex justify-center px-3 py-2 border border-gray-200 rounded hover:bg-gray-200 transition"
                title="Add to Cart"
                onClick={() => {
                  addToCart(product, 1);
                  setAdded(product.slug);
                  setTimeout(() => setAdded(null), 1000);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M19.0001 14V17H22.0001V19H18.9991L19.0001 22H17.0001L16.9991 19H14.0001V17H17.0001V14H19.0001ZM20.2426 4.75748C22.505 7.02453 22.5829 10.6361 20.4795 12.9921L19.06 11.5741C20.3901 10.05 20.3201 7.66 18.827 6.17022C17.3244 4.67104 14.9076 4.60713 13.337 6.017L12.0019 7.21536L10.6661 6.01793C9.09098 4.60609 6.67506 4.66821 5.17157 6.1717C3.68183 7.66143 3.60704 10.0474 4.97993 11.6233L13.412 20.0691L11.9999 21.4851L3.52138 12.9931C1.41705 10.6371 1.49571 7.01913 3.75736 4.75748C6.02157 2.49327 9.64519 2.41699 12.001 4.52865C14.35 2.42012 17.98 2.49012 20.2426 4.75748Z"></path>
                </svg>
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="flex-1 px-3 py-2 border border-gray-200 rounded hover:bg-gray-200 text-gray-800 text-center"
              >
                View
              </Link>
            </div>
            {getProductQty(product.slug) > 0 && (
              <div className="mt-2 text-sm text-green-700 font-semibold">
                In cart: {getProductQty(product.slug)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
