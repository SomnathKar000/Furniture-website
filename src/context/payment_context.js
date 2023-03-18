import stripe from "stripe";
import reducer from "../reducers/payment_reducer";
import { useReducer, createContext, useContext, useEffect } from "react";
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
  const GetAllOrderList = async () => {
    const token = localStorage.getItem("token");
    try {
      const responce = await axios.post(`${host}/api/v1/orders `, {
        token,
        success: true,
      });
      const data = responce.data.data;
      const products = responce.data.products;

      dispatch({ type: "GET_ALL_LISTS", payload: { data, products } });
    } catch (error) {
      alert(error.responce.data.msg);
    }
  };
  const updateImage = (Odata, products) => {
    Odata.items.forEach((item) => {
      const nId = item.productId.split("#")[0];
      const color = "#" + item.productId.split("#")[1];
      const product = products.find((p) => p.id === nId);
      if (product) {
        item.image = product.image;
        item.color = color;
        item.name = product.name;
      }
    });
    return Odata;
  };
  // Get Single Order
  const GetSingleOrder = async (id) => {
    dispatch({ type: "SINGLE_ORDER_LOADING_BEGAIN" });
    const token = localStorage.getItem("token");
    try {
      const responce = await axios.post(`${host}/api/v1/orders/single-order`, {
        token,
        productId: id,
      });
      if (responce.data !== undefined) {
        const data = responce.data.data;
        const products = responce.data.products;
        const NewData = updateImage(data, products);
        console.log(responce.data);
        dispatch({ type: "GET_SINGLE_ORDER", payload: NewData });
      }
    } catch (error) {
      dispatch({ type: "SINGLE_ORDER_LOADING_ERROR" });
      alert(error.responce.data.msg);
    }
  };

  useEffect(() => {
    GetAllOrderList();
  }, [localStorage.getItem("token")]);
  return (
    <PaymentContext.Provider
      value={{ ...state, checkPaymentStatus, payment, GetSingleOrder }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePaymentContext = () => {
  return useContext(PaymentContext);
};
