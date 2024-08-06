export const getItemStockInfo = (counterInStock: number) => {
  if (counterInStock === 0) {
    return { text: "Sold Out", color: "text-red-400" };
  }
  if (counterInStock > 0 && counterInStock <= 9) {
    return {
      text: `Only ${counterInStock} left`,
      color: "text-blue-400",
    };
  }

  return { text: "In Stock", color: "text-green-400" };
};
