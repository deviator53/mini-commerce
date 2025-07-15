"use client";
import { useCartStore } from "../utils/cartStore";
import { useRouter } from "next/navigation";
import { useFormatCurrency } from "../utils/formatCurrency";

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
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex items-center gap-4 border-b pb-2"
          >
            <img
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
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-bold">Total:</div>
        <div className="text-xl font-bold">{formatCurrency(subtotal())}</div>
      </div>
      <button
        className="w-full px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>
    </div>
  );
}
