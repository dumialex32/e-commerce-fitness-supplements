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
