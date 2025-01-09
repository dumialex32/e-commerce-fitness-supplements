import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen.tsx";
import ProductScreen from "./screens/ProductScreen.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import CartScreen from "./screens/CartScreen.tsx";
import AuthScreen from "./screens/AuthScreen.tsx";
import RegisterScreen from "./screens/RegisterScreen.tsx";
import ShippingScreen from "./screens/ShippingScreen.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import PaymentScreen from "./screens/PaymentScreen.tsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.tsx";
import OrderScreen from "./screens/OrderScreen.tsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProfileScreen from "./screens/ProfileScreen.tsx";
import AdminRoute from "./screens/admin/AdminRoute.tsx";
import AdminOrderList from "./screens/admin/AdminOrderList.tsx";
import AdminProducts from "./screens/admin/AdminProducts.tsx";
import AdminUserList from "./components/admin/AdminUserList.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} element={<HomeScreen />} />
        <Route path="product/:id" element={<ProductScreen />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/login" element={<AuthScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/checkout" element={<PlaceOrderScreen />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin/orderlist" element={<AdminOrderList />} />
          <Route path="/admin/userlist" element={<AdminUserList />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Route>
      </Route>

      <Route path="/register" element={<RegisterScreen />}></Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}></RouterProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
