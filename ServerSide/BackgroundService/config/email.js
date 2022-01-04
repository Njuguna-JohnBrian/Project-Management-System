const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 2525,
  auth: {
    user: process.env.EmailUser,
    pass: process.env.EmailPass,
  },
});

module.exports = transporter;
