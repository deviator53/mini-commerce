"use client";
import { useCurrencyStore, Currency } from "../utils/currencyStore";

const options: { value: Currency; label: string }[] = [
  { value: "USD", label: "$ USD" },
  { value: "NGN", label: "₦ NGN" },
  { value: "EUR", label: "€ EUR" },
];

export default function CurrencySelector() {
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);
  return (
    <select
      className="border rounded px-2 py-1 text-sm bg-white"
      value={currency}
      onChange={(e) => setCurrency(e.target.value as Currency)}
      aria-label="Select currency"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
