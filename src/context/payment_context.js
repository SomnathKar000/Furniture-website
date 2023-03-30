import reducer from "../reducers/payment_reducer";
import { useReducer, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { host } from "../utils/constants";

const initialState = {
  order_list: [],
  get_all_order_loading: false,
  get_all_order_error: false,
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

  // create payment
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
        localStorage.removeItem("cart");
      } else {
        alert(responce.data.msg);
        localStorage.removeItem("cart");

        return;
      }
    } catch (error) {
      alert(error.responce.data.msg);
    }
  };

  // Pay again for the user
  const PayOnline = (items, address, totalPrice) => {
    localStorage.getItem("token");
    const hostValue = window.location.hostname;
    console.log(items);
  };

  // Get All order list
  const GetAllOrderList = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch({ type: "GET_ALL_ORDERLISTS_START" });
        const responce = await axios.post(`${host}/api/v1/orders `, {
          token,
          success: true,
        });
        const data = responce.data.data.reverse();
        const products = responce.data.products;

        dispatch({ type: "GET_ALL_LISTS", payload: { data, products } });
      } catch (error) {
        alert(error.responce.data.msg);
        dispatch({ type: "All_ORDER_LOADING_ERROR" });
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

  // cancel the order
  const CancelOrder = async (_id) => {
    const token = localStorage.getItem("token");
    try {
      const responce = await axios.patch(`${host}/api/v1/orders/cancel-order`, {
        token,
        productId: _id,
      });
      GetAllOrderList();
      console.log(responce.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetAllOrderList();
  }, [localStorage.getItem("token")]);
  return (
    <PaymentContext.Provider
      value={{ ...state, payment, GetSingleOrder, CancelOrder, PayOnline }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};
