import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useUserContext } from "../context/user_context";
import { useHistory, Link } from "react-router-dom";

const LoginPage = () => {
  const { findUser } = useUserContext();
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const userFind = (e) => {
    findUser(user);
    history.push("/");
  };
  return (
    <Wrapper>
      <div className="login mt-5">
        <form>
          <h3 className="text-center">Sign In</h3>
          <div className="mb-3 ">
            <label htmlFor="email1" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control "
              placeholder="Enter email"
              name="email"
              value={user.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control "
              placeholder="Enter password"
              name="password"
              value={user.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-grid">
            <button
              type="submit"
              onClick={userFind}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <p className="forgot-password text-right">
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </p>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 5%;
  height: 68vh;
  .login {
    margin: 0px 10%;
  }
  @media (min-width: 670px) {
    .login {
      margin: 0px 30%;
    }
  }
`;

export default LoginPage;
