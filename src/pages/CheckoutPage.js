import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="Checkout" />
      <Wrapper className="page">
        {cart.length > 0 ? (
          <StripeCheckout />
        ) : (
          <div className="page-100">
            <div className="empty">
              <h2>your cart is empty</h2>
              <Link to="/products" className="btn">
                add some items
              </Link>
            </div>
          </div>
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`;
export default CheckoutPage;
