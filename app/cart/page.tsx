"use client";
import { useCartStore } from "../utils/cartStore";
import Link from "next/link";
import { useFormatCurrency } from "../utils/formatCurrency";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } =
    useCartStore();
  const formatCurrency = useFormatCurrency();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-center gap-4 border-b pb-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-contain"
              />
              <div className="flex-1">
                <div className="font-semibold">{item.name}</div>
                <div className="text-gray-600">
                  {formatCurrency(item.price)}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <label htmlFor={`qty-${item.slug}`}>Qty:</label>
                  <input
                    id={`qty-${item.slug}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.slug, Number(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button
                    className="ml-2 text-red-500 hover:underline"
                    onClick={() => removeFromCart(item.slug)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="font-semibold">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <div className="text-lg font-bold">
              Total ({totalItems()} items):
            </div>
            <div className="text-xl font-bold">
              {formatCurrency(subtotal())}
            </div>
          </div>
          <Link
            href="/checkout"
            className="block w-full text-center mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
