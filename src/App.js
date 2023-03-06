import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  PaymentResultPage,
  AboutPage,
  HomePage,
  SingleProductPage,
  PrivateRoute,
  ProductsPage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  LoginPage,
  SignupPage,
} from "./pages/index";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/sign-up">
            <SignupPage />
          </Route>
          <Route exact path="/success">
            <PaymentResultPage result={true} />
          </Route>
          <Route exact path="/cancel">
            <PaymentResultPage result={false} />
          </Route>
          <Route exact path="/products/:id" children={<SingleProductPage />} />
          <PrivateRoute exact path="/checkout">
            <CheckoutPage />
          </PrivateRoute>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
