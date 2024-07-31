export function formatPrice(number: number) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "EUR",
  }).format(number);
}
