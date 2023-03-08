import React from "react";
import { useProductsContext } from "../context/products_context";
import styled from "styled-components";

const AuthWrapper = ({ children }) => {
  const { single_product_loading, single_product_error } = useProductsContext();
  if (single_product_loading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  }
  if (single_product_error) {
    return (
      <Wrapper>
        <h1>Error</h1>
      </Wrapper>
    );
  }
  return { children };
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`;

export default AuthWrapper;
