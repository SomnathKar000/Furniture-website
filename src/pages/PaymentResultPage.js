import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const PaymentResultPage = ({ result }) => {
  if (result === true) {
    return (
      <Wrapper className="page-100">
        <section>
          <h1>Payment successful</h1>
          <Link className="btn" to="/">
            Back home
          </Link>
        </section>
      </Wrapper>
    );
  }
  return (
    <Wrapper className="page-100">
      <section>
        <h1>Payment unsuccessful</h1>
        <Link className="btn" to="/">
          Back home
        </Link>
      </section>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  h1 {
    font-size: 5rem;
  }
  h3 {
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default PaymentResultPage;
