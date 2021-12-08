const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (email, username) => {
  return jwt.sign({ email, username }, process.env.SECRET_KEY, {
    expiresIn: "1800s",
  });
};
module.exports = generateToken;
