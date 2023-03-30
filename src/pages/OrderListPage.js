import React from "react";
import OrderListContent from "../components/OrdersListContent";
import PageHero from "../components/PageHero";
import { usePaymentContext } from "../context/payment_context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const OrderListPage = () => {
  const { order_list, get_all_order_loading } = usePaymentContext();
  if (get_all_order_loading) {
    return <Loading />;
  }
  if (order_list.length === 0) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your order list is empty</h2>
          <Link to="/products" className="btn">
            add some items
          </Link>
        </div>
      </Wrapper>
    );
  }

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
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
  @media (max-width: 662px) {
    .list-itm {
      margin: 1rem;
    }
  }
`;

export default OrderListPage;
