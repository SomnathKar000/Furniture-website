import React, { useContext, useEffect, useReducer } from "react";
import {
  LOGOUT_USER,
  LOGIN_USER,
  ERROR_USER_DATA,
  GET_USER_DATA,
} from "../actions";

import { host } from "../utils/constants";

import axios from "axios";
import reducer from "../reducers/user_reducer";

const UserContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  login: false,
  error: false,
  user: {},
};
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const responce = await axios.post(`${host}/api/v1/user/get-user`, {
        token,
        status: true,
      });

      if (responce.data.success) {
        dispatch({ type: GET_USER_DATA, payload: responce.data.user });
      } else {
        localStorage.removeItem("token");
      }
    } else {
      console.log("token does not exsist");
    }
  };
  const creteToken = async (e) => {
    const { first_name, last_name, email, password } = e;

    try {
      const responce = await axios.post(`${host}/api/v1/user/create-user`, {
        first_name,
        last_name,
        email,
        password,
      });
      if (responce.data.success) {
        localStorage.setItem("token", responce.data.token);
        dispatch({ type: LOGIN_USER });
        alert("login successful");
      } else {
        dispatch({ type: ERROR_USER_DATA });
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const findUser = async (e) => {
    const { email, password } = e;

    try {
      const responce = await axios.post(`${host}/api/v1/user/login`, {
        email,
        password,
      });
      if (responce.data.success) {
        localStorage.setItem("token", responce.data.token);
        dispatch({ type: LOGIN_USER });
        alert("login successful");
      } else {
        dispatch({ type: ERROR_USER_DATA });
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT_USER });
  };

  useEffect(() => {
    getUser();
  }, [localStorage.getItem("token")]);
  return (
    <UserContext.Provider
      value={{
        ...state,
        logout,
        creteToken,
        findUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
