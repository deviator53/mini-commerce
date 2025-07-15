import { create } from "zustand";

export type Currency = "USD" | "NGN" | "EUR";

const rates: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  NGN: { symbol: "₦", rate: 1400 }, // Example: 1 USD = 1400 NGN
  EUR: { symbol: "€", rate: 0.92 }, // Example: 1 USD = 0.92 EUR
};

interface CurrencyState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  getRate: () => { symbol: string; rate: number };
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: "USD",
  setCurrency: (c) => set({ currency: c }),
  getRate: () => rates[get().currency],
}));
