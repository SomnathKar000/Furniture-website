import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useUserContext } from "../context/user_context";

const SignupPage = () => {
  const history = useHistory();
  const { creteToken } = useUserContext();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const userSignup = (e) => {
    creteToken(user);
    history.push("/");
  };
  return (
    <Wrapper>
      <div>
        <div className="signUp mt-3">
          <form>
            <h3 className="text-center">Sign Up</h3>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First name
              </label>
              <input
                id="first_name"
                value={user.first_name}
                onChange={onChange}
                name="first_name"
                type="text"
                className="form-control"
                placeholder="First name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last name
              </label>
              <input
                value={user.last_name}
                onChange={onChange}
                name="last_name"
                id="last_name"
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email1" className="form-label">
                Email address
              </label>
              <input
                id="email"
                value={user.email}
                onChange={onChange}
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={user.password}
                onChange={onChange}
                name="password"
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter password"
                minLength={5}
                required
              />
            </div>
            <div className="d-grid">
              <button
                type="button"
                onClick={userSignup}
                className="btn btn-primary"
                to="/"
              >
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered ? <a href="/login">sign in</a>
            </p>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 79vh;
  .signUp {
    margin: 0px 10%;
  }
  @media (min-width: 670px) {
    .signUp {
      margin: 0px 30%;
    }
  }
`;

export default SignupPage;
