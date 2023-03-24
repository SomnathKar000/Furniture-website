import React from "react";
import styled from "styled-components";

const OrderColumns = () => {
  return (
    <Wrapper>
      <div className="content">
        <h5>Item</h5>
        <h5>Total price</h5>
        <h5>ordered status</h5>
      </div>
      <hr />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .content {
    display: grid;
    grid-template-columns: 200px auto auto 200px;
    grid-template-rows: 75px;
    gap: 3rem 1rem;
    justify-items: center;
    margin-bottom: 3rem;
    align-items: center;
  }
  h5 {
    margin: 1rem auto;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

export default OrderColumns;
