import React from "react";
import OrderColumns from "./OrderColumns";
import OrderItem from "./OrderItem";
import { useCartContext } from "../context/cart_context";

const OrderContent = (props) => {
  const { cart } = useCartContext();
  console.log(props.item);
  return (
    <div className="container">
      <OrderColumns />
      {cart.map((products, index) => (
        <OrderItem products={products} key={index} />
      ))}
    </div>
  );
};

export default OrderContent;
