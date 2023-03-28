import React from "react";
import OrderColumns from "./OrderColumns";
import OrderItem from "./OrderItem";

const OrderContent = (props) => {
  const { orderStatus } = props.items;

  return (
    <div className="container">
      <OrderColumns />
      {props.items.items.map((products, index) => (
        <OrderItem products={products} key={index} orderStatus={orderStatus} />
      ))}
    </div>
  );
};

export default OrderContent;
