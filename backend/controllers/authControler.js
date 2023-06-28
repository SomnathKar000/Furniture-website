const User = require("../models/userModel");
const customError = require("../errors/error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const jwtSecret = process.env.JWTSECRET;
const jwtSecret = process.env.JWTSECRET;

// check the email is valid or not
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// route 1 for create user

const cresateUser = async (req, res) => {
  const { password, first_name, last_name, email } = req.body;
  if (!isValidEmail(email)) {
    throw new customError("Enter a valid email", 400);
  }
  let user = await User.findOne({ email: email });
  if (user) {
    throw new customError("This email already exsist", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(password, salt);
  user = await User.create({
    name: `${first_name} ${last_name}`,
    email: email,
    password: securePassword,
  });
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, jwtSecret);

  res.status(200).send({ success: true, token });
};
// route for login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!isValidEmail(email)) {
    throw new customError("Emter a valid email", 400);
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new customError("Enter valid details", 400);
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new customError("Enter valid details", 400);
  }
  const data = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(data, jwtSecret);
  res.status(200).send({ success: true, token: token });
};

const getuser = async (req, res) => {
  // const token = req.header("auth-token");
  const { token } = req.body;
  if (!token) {
    throw new customError("Please enter a valid token ", 401);
  }
  const data = jwt.verify(token, jwtSecret);
  const user = await User.findById(data.user.id).select("-password");
  res.status(200).send({ success: true, user });
};

module.exports = { cresateUser, loginUser, getuser };
