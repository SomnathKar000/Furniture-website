import React from "react";
import OrderColumns from "./OrderColumns";
import OrderItem from "./OrderItem";

const OrderContent = (props) => {
  return (
    <div className="container">
      <OrderColumns />
      {props.items.items.map((products, index) => (
        <OrderItem products={products} key={index} />
      ))}
    </div>
  );
};

export default OrderContent;
