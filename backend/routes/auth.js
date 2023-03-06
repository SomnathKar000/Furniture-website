const {
  loginUser,
  cresateUser,
  getuser,
} = require("../controllers/authControler");
const express = require("express");
const router = express.Router();

router.route("/create-user").post(cresateUser);
router.route("/login").post(loginUser);
router.route("/get-user").post(getuser);

module.exports = router;
