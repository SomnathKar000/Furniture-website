import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = (props) => {
  const { addToCart } = useCartContext();
  const { id, colors, stock } = props.product;
  const [mainColor, setMainColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);
  const increase = () => {
    setAmount((value) => {
      if (value === stock) {
        return value;
      } else {
        return value + 1;
      }
    });
  };
  const decrease = () => {
    setAmount((value) => {
      if (value === 1) {
        return value;
      } else {
        return value - 1;
      }
    });
  };
  return (
    <Wrapper>
      <div className="colors">
        <span>Colors :</span>
        <div className="">
          {colors.map((color, index) => (
            <button
              className={`color-btn ${mainColor === color ? "active" : ""}`}
              style={{ backgroundColor: color }}
              key={index}
              onClick={() => {
                setMainColor(colors[index]);
              }}
            >
              {mainColor === color && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          onClick={() => addToCart(id, mainColor, amount, props.product)}
          className="btn"
          to="/cart"
        >
          Add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
