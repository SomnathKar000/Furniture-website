import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

import { formatPrice } from "../utils/helpers";
const OrderItem = (props) => {
  const { Image, amount, color, id, name, price } = props.products;
  const pId = id.split("#")[0];
  return (
    <Wrapper>
      <div className="item-container">
        <img src={Image} alt={name}></img>
        <div className="details">
          <p>{name}</p>
          <p className="color">
            color : <span style={{ background: color }}></span>
          </p>
          <p className="price-small">{formatPrice(price)}</p>
          <p>Quantity: {amount}</p>
        </div>
      </div>
      <h5>{formatPrice(price * amount)}</h5>
      <h5>On the way</h5>
      <Link className="btn" to={`/products/${pId}`}>
        view
      </Link>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 200px auto auto 200px;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;

  h5 {
    margin: auto auto;
    font-size: 0.75rem;
  }
  .item-container {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .details {
    display: grid;
    grid-template-rows: repeat(4, 20px);
  }

  .price-small {
    color: var(--clr-primary-5);
  }
  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  @media (max-width: 640px) {
    display: grid;
    grid-template-columns: auto auto auto;
    margin-top: 3rem;
  }
`;

export default OrderItem;
