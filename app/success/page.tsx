import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="mb-2">Your order has been placed successfully.</p>
      {orderId && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-lg">
          Order ID: <span className="font-mono font-bold">{orderId}</span>
        </div>
      )}
      <p className="mt-8">
        <a href="/" className="text-blue-600 hover:underline">
          Back to shop
        </a>
      </p>
    </div>
  );
}

export default function SuccessPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
    </Suspense>
  );
}
