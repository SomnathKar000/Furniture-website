import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { usePaymentContext } from "../context/payment_context";
import { simpleFormatPrice } from "../utils/helpers";

const OrderListContent = (props) => {
  const { CancelOrder, PayOnline } = usePaymentContext();
  const {
    paidAt,
    paymentMethod,
    totalPrice,
    shippingAddress,
    _id,
    orderStatus,
    paymentStatus,
    isPaid,
    recievePayment,
    items,
  } = props;

  const newDate = new Date(paidAt);
  const formattedDate = newDate.toLocaleString();
  let status = isPaid && paymentStatus == "Success";

  const { fullName, phoneNo1, phoneNo2, landmark, area, city, state, pincode } =
    shippingAddress;

  let phoneNo = phoneNo1;
  if (phoneNo2) {
    phoneNo = phoneNo1 + "," + phoneNo2;
  }
  let address = ` ${area}, ${city} - ${pincode}, ${state}`;
  if (landmark) {
    address = landmark + address;
  }
  return (
    <Wrapper>
      <div className="list">
        <h5>
          Ordered at : <span>{formattedDate}</span>
        </h5>
        <h5>
          Total price :<span> {simpleFormatPrice(totalPrice)}</span>
        </h5>
        <h5>
          Payment type : <span>{paymentMethod}</span>
        </h5>
        <h5>
          Payment status : <span>{paymentStatus}</span>
        </h5>
        <h5>
          Order status: <span>{orderStatus}</span>
        </h5>
      </div>
      <div className="address">
        <h5>Delivary address</h5>
        <h5>{fullName}</h5>
        <p>{address}</p>
        <h5>Phone no</h5>
        <p>{phoneNo}</p>
      </div>
      {orderStatus !== "Canceled" ? (
        <div className="buttons">
          <Link className="btn" to={`/orderlist/${_id}`}>
            View products
          </Link>
          <button onClick={() => CancelOrder(_id)} className="btn">
            Cancel
          </button>
          {!status && (
            <button
              onClick={() => {
                PayOnline(items, totalPrice, _id);
              }}
              className="btn"
            >
              Pay online
            </button>
          )}
        </div>
      ) : (
        <div className="buttons">
          <Link className="btn" to={`/orderlist/${_id}`}>
            View products
          </Link>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr;
  gap: 3rem 1rem;
  background: white;
  margin: 1rem 0px;
  border-radius: 0.5rem;
  p {
    color: #191970;
  }
  span {
    font-size: 1rem;
  }
  .onlyBtn {
    margin: auto auto;
  }
  .buttons {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
  }
  .address {
    margin: 1rem;
  }
  .list {
    margin: 1rem;
  }
  .custom-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.4rem;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    background: var(--clr-primary-5);
    color: var(--clr-primary-10);
    border: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .custom-button:hover {
    background: var(--clr-primary-10);
    color: var(--clr-primary-5);
  }
  @media (max-width: 662px) {
    margin: 1rem 0px;
    display: grid;
    grid-template-columns: 2fr 2fr;
    .buttons {
      margin: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      justify-content: center;
    }
  }
  @media (max-width: 452px) {
    margin: 0.5rem 0px;
    gap: 1rem 0.2rem;
    grid-template-columns: 1fr;
    .address {
      margin: 0.5rem;
    }
    .list {
      margin: 0.5rem;
    }
  }
`;

export default OrderListContent;
