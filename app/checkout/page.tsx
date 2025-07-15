"use client";
import { useCartStore } from "../utils/cartStore";
import { useRouter } from "next/navigation";
import { useFormatCurrency } from "../utils/formatCurrency";
import Image from "next/image";

function randomOrderId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const router = useRouter();
  const formatCurrency = useFormatCurrency();

  const handlePlaceOrder = () => {
    const orderId = randomOrderId();
    clearCart();
    router.replace(`/success?orderId=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div>Your cart is empty.</div>
        <a
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back Home
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 className="max-w-4xl mx-auto text-2xl font-bold mb-4">Checkout</h1>
      <div className="max-w-4xl mx-auto shadow-lg p-2 space-y-4">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex items-center gap-4 border-b pb-2"
          >
            <Image
              width={64}
              height={64}
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-contain"
            />
            <div className="flex-1">
              <div className="font-semibold">{item.name}</div>
              <div className="text-gray-600">Qty: {item.quantity}</div>
            </div>
            <div className="font-semibold">
              {formatCurrency(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto  p-2 space-y-4 flex justify-between items-center mb-6">
        <div className="text-lg font-bold">Total:</div>
        <div className="text-xl font-bold">{formatCurrency(subtotal())}</div>
      </div>
      <div className="max-w-4xl mx-auto  p-2 space-y-4">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
