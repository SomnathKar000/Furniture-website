import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { PaymentProvider } from "./context/payment_context";

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(process.env.REACT_APP_BACKEND_PORT);
root.render(
  <UserProvider>
    <ProductsProvider>
      <FilterProvider>
        <CartProvider>
          <PaymentProvider>
            <App />
          </PaymentProvider>
        </CartProvider>
      </FilterProvider>
    </ProductsProvider>
  </UserProvider>
);
