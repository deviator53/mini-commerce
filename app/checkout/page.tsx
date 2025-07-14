"use client";
import { useCartStore } from "../utils/cartStore";
import { useRouter } from "next/navigation";

function randomOrderId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const router = useRouter();

  const handlePlaceOrder = () => {
    const orderId = randomOrderId();
    clearCart();
    router.replace(`/success?orderId=${orderId}`);
  };

  if (items.length === 0) {
    return <div className="text-center">Your cart is empty.</div>;
  }

  return (
    <div>
      <h1 className="max-w-4xl mx-auto text-2xl font-bold mb-4">Checkout</h1>
      <div className="max-w-4xl mx-auto shadow-lg p-2 space-y-4 mb-6">
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
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-4xl mx-auto  flex justify-between items-center mb-6">
        <div className="text-lg font-bold">Total:</div>
        <div className="text-xl font-bold">${subtotal().toFixed(2)}</div>
      </div>
      <div className="max-w-4xl mx-auto">
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
