import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { PaymentProvider } from "./context/payment_context";
import { Auth0Provider } from "@auth0/auth0-react";
// dev-404vpicizcrfmeoy.us.auth0.com
// NMdGE8RPnc5urKNn790L1MBhA4aj2BlV
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="{dev-404vpicizcrfmeoy.us.auth0.com}"
    clientId="{NMdGE8RPnc5urKNn790L1MBhA4aj2BlV}"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    cacheLocation="localstorage"
  >
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
  </Auth0Provider>
);
