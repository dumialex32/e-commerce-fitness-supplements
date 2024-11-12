export function formatPriceCurrency(number: number): string {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "EUR",
  }).format(number);
}

export const addDecimals = (
  num: number,
  decimalsPlaces: number = 2
): number => {
  return parseFloat(num.toFixed(decimalsPlaces));
};

export const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};
