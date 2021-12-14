const express = require("express");
const router = express.Router();

const {
  createUser,
  login,
  resetPassword,
} = require("../controllers/auth.controllers");

router.route("/signup").post(createUser);
router.route("/login").post(login);
router.route("/reset-password").post(resetPassword);

module.exports = router;
