import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
// import {
//   CardElement,
//   useStripe,
//   Elements,
//   useElements,
// } from "@stripe/react-stripe-js";
import axios from "axios";
import { useCartContext } from "../context/cart_context";
import { usePaymentContext } from "../context/payment_context";
import { formatPrice } from "../utils/helpers";
import { useHistory } from "react-router-dom";
// import { useHistory } from "react-router-dom";

// const promice = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const history = useHistory();
  const { cart, shipping_fee, total_amount, clearCart } = useCartContext();
  const { checkPaymentStatus, payment } = usePaymentContext();

  const [userAddress, setUserAddress] = useState({
    fullName: "",
    phoneNo1: "",
    phoneNo2: "",
    pincode: "",
    state: "",
    city: "",
    houseNo: "",
    area: "",
    landmark: "",
  });
  const {
    fullName,
    phoneNo1,
    phoneNo2,
    pincode,
    state,
    city,
    houseNo,
    area,
    landmark,
  } = userAddress;
  const onChange = (e) =>
    setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    let paymentMethod = e.target.name;
    payment(cart, userAddress, paymentMethod);
  };
  const getLocation = async () => {
    const getIPInfo = async () => {
      const response = await fetch(
        "https://ipinfo.io/json?token=92a88456b8db402c9f6ed850791d87a9"
      );
      const data = await response.json();
      console.log(data);
      console.log("City: " + data.city);
      console.log("State: " + data.region);
      console.log("Country: " + data.country);
      console.log("Latitude: " + data.loc.split(",")[0]);
      console.log("Longitude: " + data.loc.split(",")[1]);
    };
    getIPInfo();
  };

  return (
    <div>
      <h3 className="text-center">Enter your address</h3>
      <form className="payment_from" action="">
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            {"Full Name (Required)*"}
          </label>
          <input
            onChange={onChange}
            className="form-control"
            type="text"
            id="name"
            name="fullName"
            placeholder="Full Name"
            required
            value={fullName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="ph_number_1">
            {"Phone Number (Required)*"}
          </label>
          <input
            onChange={onChange}
            className="form-control"
            type="text"
            id="ph_number_1"
            name="phoneNo1"
            placeholder="10-digit mobile number "
            required
            value={phoneNo1}
            minLength={10}
            maxLength={10}
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="ph_number_2">
            + Add Alternate Phone Number
          </label>
          <input
            onChange={onChange}
            className="form-control"
            type="text"
            id="ph_number_2"
            name="phoneNo2"
            placeholder="Phone Number"
            minLength={10}
            maxLength={10}
            value={phoneNo2}
          />
        </div>
        <div className="address_box">
          <div className="mb-3">
            <label className="form-label" htmlFor="pincode">
              {"pincode (Required)*"}
            </label>
            <input
              onChange={onChange}
              className="form-control"
              type="text"
              name="pincode"
              id="pincode"
              placeholder="Pincode"
              minLength={6}
              maxLength={6}
              value={pincode}
              required
            />
          </div>
          <div className="mb-3">
            <button className="btn" onClick={getLocation} type="button">
              Use my location
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="state">
              {"State (Required)*"}
            </label>
            <input
              onChange={onChange}
              className="form-control"
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={state}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="city">
              {"City (Required)*"}
            </label>
            <input
              onChange={onChange}
              className="form-control"
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={city}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="house-no">
            {"House No., Building Name (Required)*"}
          </label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            placeholder="House no"
            id="house-no"
            name="houseNo"
            required
            value={houseNo}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="area" className="form-label">
            {"Road name, Area, Colony (Required)*"}
          </label>
          <input
            onChange={onChange}
            type="text"
            placeholder="Area"
            required
            id="area"
            name="area"
            value={area}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="landmark">
            Nearby Famous Shop/Mail/Landmark
          </label>
          <input
            onChange={onChange}
            className="form-control"
            type="text"
            id="landmark"
            name="landmark"
            value={landmark}
            placeholder="+ Add Nearby Famous Shop/Mail/Landmark"
          />
        </div>
        <div className="order-btn">
          <button
            name="cash on delivery"
            className="btn"
            onClick={handleSubmit}
            type="button"
          >
            cash on delivery
          </button>
          <span>or</span>
          <button
            name="online payment"
            className="btn"
            type="button"
            id="payment-request-button"
            onClick={handleSubmit}
          >
            online payment
          </button>
        </div>
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      <CheckoutForm />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin: 2rem 0px;
  .payment_from {
    margin: 0px 10%;
  }
  @media (min-width: 670px) {
    .payment_from {
      margin: 0px 30%;
    }
  }
  .address_box {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: repeat(2, 1fr);
  }
  .order-btn {
    margin: 0px 1rem;
    display: flex;
    justify-content: space-around;
  }
`;

// const Wrapper = styled.section`
//   form {
//     width: 30vw;
//     align-self: center;
//     box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
//       0px 2px 5px 0px rgba(50, 50, 93, 0.1),
//       0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
//     border-radius: 7px;
//     padding: 40px;
//   }
//   input {
//     border-radius: 6px;
//     margin-bottom: 6px;
//     padding: 12px;
//     border: 1px solid rgba(50, 50, 93, 0.1);
//     max-height: 44px;
//     font-size: 16px;
//     width: 100%;
//     background: white;
//     box-sizing: border-box;
//   }
//   .result-message {
//     line-height: 22px;
//     font-size: 16px;
//   }
//   .result-message a {
//     color: rgb(89, 111, 214);
//     font-weight: 600;
//     text-decoration: none;
//   }
//   .hidden {
//     display: none;
//   }
//   #card-error {
//     color: rgb(105, 115, 134);
//     font-size: 16px;
//     line-height: 20px;
//     margin-top: 12px;
//     text-align: center;
//   }
//   #card-element {
//     border-radius: 4px 4px 0 0;
//     padding: 12px;
//     border: 1px solid rgba(50, 50, 93, 0.1);
//     max-height: 44px;
//     width: 100%;
//     background: white;
//     box-sizing: border-box;
//   }
//   #payment-request-button {
//     margin-bottom: 32px;
//   }
//   /* Buttons and links */
//   button {
//     background: #5469d4;
//     font-family: Arial, sans-serif;
//     color: #ffffff;
//     border-radius: 0 0 4px 4px;
//     border: 0;
//     padding: 12px 16px;
//     font-size: 16px;
//     font-weight: 600;
//     cursor: pointer;
//     display: block;
//     transition: all 0.2s ease;
//     box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
//     width: 100%;
//   }
//   button:hover {
//     filter: contrast(115%);
//   }
//   button:disabled {
//     opacity: 0.5;
//     cursor: default;
//   }
//   /* spinner/processing state, errors */
//   .spinner,
//   .spinner:before,
//   .spinner:after {
//     border-radius: 50%;
//   }
//   .spinner {
//     color: #ffffff;
//     font-size: 22px;
//     text-indent: -99999px;
//     margin: 0px auto;
//     position: relative;
//     width: 20px;
//     height: 20px;
//     box-shadow: inset 0 0 0 2px;
//     -webkit-transform: translateZ(0);
//     -ms-transform: translateZ(0);
//     transform: translateZ(0);
//   }
//   .spinner:before,
//   .spinner:after {
//     position: absolute;
//     content: "";
//   }
//   .spinner:before {
//     width: 10.4px;
//     height: 20.4px;
//     background: #5469d4;
//     border-radius: 20.4px 0 0 20.4px;
//     top: -0.2px;
//     left: -0.2px;
//     -webkit-transform-origin: 10.4px 10.2px;
//     transform-origin: 10.4px 10.2px;
//     -webkit-animation: loading 2s infinite ease 1.5s;
//     animation: loading 2s infinite ease 1.5s;
//   }
//   .spinner:after {
//     width: 10.4px;
//     height: 10.2px;
//     background: #5469d4;
//     border-radius: 0 10.2px 10.2px 0;
//     top: -0.1px;
//     left: 10.2px;
//     -webkit-transform-origin: 0px 10.2px;
//     transform-origin: 0px 10.2px;
//     -webkit-animation: loading 2s infinite ease;
//     animation: loading 2s infinite ease;
//   }
//   @keyframes loading {
//     0% {
//       -webkit-transform: rotate(0deg);
//       transform: rotate(0deg);
//     }
//     100% {
//       -webkit-transform: rotate(360deg);
//       transform: rotate(360deg);
//     }
//   }
//   @media only screen and (max-width: 600px) {
//     form {
//       width: 80vw;
//     }
//   }
// `;

export default StripeCheckout;
