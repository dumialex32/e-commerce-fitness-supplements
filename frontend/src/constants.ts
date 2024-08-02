//managing API endpoints
// export const BASE_URL: string =
//   process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

// API endpoints constants
export const BASE_URL: string = "";
export const PRODUCTS_URL: string = "/api/products";
export const USERS_URL: string = "/api/users";
export const ORDERS_URL: string = "/api/orders";
export const PAYPAL_URL: string = "/api/config/paypal";

// Shipping constants
export const STANDARD_SHIPPING_PRICE: number = 12;
export const FREE_SHIPPING_THRESHOLD: number = 65;

// Order constants
export const MAX_ORDER_PER_ITEM: number = 9;
