import React from "react";
import OrderListContent from "../components/OrdersListContent";
import PageHero from "../components/PageHero";
import { usePaymentContext } from "../context/payment_context";
import styled from "styled-components";

const OrderListPage = () => {
  const { order_list } = usePaymentContext();
  return (
    <Wrapper>
      <PageHero title={"Orders"} />
      <div className="list-itm">
        {order_list.map((item, index) => (
          <OrderListContent key={index} {...item} />
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee8aa;
  .list-itm {
    margin: 2rem;
  }
  @media (max-width: 662px) {
    .list-itm {
      margin: 1rem;
    }
  }
`;

export default OrderListPage;
