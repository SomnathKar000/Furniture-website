import reducer from "../reducers/payment_reducer";
import {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { host } from "../utils/constants";

const initialState = {
  order_list: [],
  payment_loading: false,
  payment_error: false,
  single_order_loading: false,
  single_order_error: false,
  single_order: {},
};
const formatPrice = (price) => price * 0.14;

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const hostValue = window.location.hostname;
  const [state, dispatch] = useReducer(reducer, initialState);

  const payment = async (cart, userAddress, paymentMethod) => {
    let totalamount = 0;
    const items = cart.map(({ id, amount, price }) => {
      totalamount += formatPrice(price);
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

  // Get All order list
  const GetAllOrderList = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const responce = await axios.post(`${host}/api/v1/orders `, {
          token,
          success: true,
        });
        const data = responce.data.data.reverse();
        const products = responce.data.products;

        dispatch({ type: "GET_ALL_LISTS", payload: { data, products } });
      } catch (error) {
        alert(error.responce.data.msg);
      }
    }
  };

  // Get Single Order
  const GetSingleOrder = (id, OList) => {
    dispatch({ type: "SINGLE_ORDER_LOADING_BEGAIN" });
    if (OList.length === 0) {
      dispatch({ type: "SINGLE_ORDER_LOADING_ERROR" });
    }
    let newData = {};
    newData = OList.find((item) => item._id === id);
    dispatch({ type: "GET_SINGLE_ORDER", payload: newData });
  };

  useEffect(() => {
    GetAllOrderList();
  }, []);
  return (
    <PaymentContext.Provider value={{ ...state, payment, GetSingleOrder }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};
