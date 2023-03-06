import {
  LOGOUT_USER,
  LOGIN_USER,
  ERROR_USER_DATA,
  GET_USER_DATA,
} from "../actions";

const reducer = (state, action) => {
  if (action.type === ERROR_USER_DATA) {
    return {
      ...state,
      isAuthenticated: false,
      login: false,
      error: true,
    };
  }
  if (action.type === LOGIN_USER) {
    return {
      ...state,
      error: false,
      isAuthenticated: true,
      login: true,
    };
  }

  if (action.type === GET_USER_DATA) {
    const { name, email } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      login: true,
      error: false,
      user: { name, email },
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...state,
      isAuthenticated: false,
      login: false,
      user: {},
      error: false,
    };
  }
  // if (action.type === "payment") {
  // () => {
  //   fetch("/api/v1/payment/create-checkout-session", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       items: [
  //         { id: "recZkNf2kwmdBcqd0", quantity: 3 },
  //         { id: "recd1jIVIEChmiwhe", quantity: 2 },
  //       ],
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.ok) return res.json();
  //       return res.json().then((json) => Promise.reject(json));
  //     })
  //     .then(({ url }) => (window.location = url))
  //     .catch((e) => console.log(e.error));
  // };
  //   return { ...state };
  // }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default reducer;
