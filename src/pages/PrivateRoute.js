import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children, ...rest }) => {
  const { login } = useUserContext();
  return (
    <Route
      {...rest}
      render={() => (login ? children : <Redirect from="/checkout" to="/" />)}
    ></Route>
  );
};
export default PrivateRoute;
