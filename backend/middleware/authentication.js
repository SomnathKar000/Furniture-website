const jwt = require("jsonwebtoken");
// const jwtSecret = process.env.JWTSECRET;
const jwtSecret = "amiSomnath";
const customError = require("../errors/error");

const authentication = (req, res, next) => {
  const token = req.body.token;
  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.user;
    next();
  } catch (error) {
    customError("Something went wrong", 404);
  }
};

module.exports = authentication;
