import { useCurrencyStore } from "./currencyStore";

export function useFormatCurrency() {
  const { symbol, rate } = useCurrencyStore((s) => s.getRate());
  return (amount: number) =>
    `${symbol}${(amount * rate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
}
