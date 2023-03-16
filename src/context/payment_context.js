import stripe from "stripe";
import reducer from "../reducers/payment_reducer";
import { useReducer, createContext, useContext } from "react";
import axios from "axios";
import { host } from "../utils/constants";

const initialState = {
  order_list: [],
  payment_loading: false,
  payment_error: false,
};
const formatPrice = (price) => price * 0.14;

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const hostValue = window.location.hostname;
  const [state, dispatch] = useReducer(reducer, initialState);

  const payment = async (cart, userAddress, paymentMethod) => {
    let totalamount = 0;
    const items = cart.map(({ id, amount, price }) => {
      totalamount += price;
      return {
        productId: id,
        quantity: amount,
        price: formatPrice(price),
      };
    });
    try {
      const token = localStorage.getItem("token");
      const responce = await axios.post(`${host}/api/v1/payment`, {
        items,
        userAddress,
        paymentMethod,
        token,
        totalamount,
        hostValue,
      });

      if (paymentMethod !== "cash on delivery") {
        window.location = responce.data.url;
      } else {
        alert(responce.data.msg);

        return;
      }
    } catch (error) {
      alert(error.responce.data.msg);
    }
  };
  const checkPaymentStatus = async (url) => {
    const { paymentIntent, error } = await stripe.confirmCardPayment(url);
    if (error) {
      console.log(error);
      // Handle error her
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      // Handle successful payment here
    }
  };

  // Get All order list
  const GetAllOrderList = async () => {};
  return (
    <PaymentContext.Provider value={{ ...state, checkPaymentStatus, payment }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};
