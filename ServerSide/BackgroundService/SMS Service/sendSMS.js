const AfricasTalking = require("africastalking");
const dotenv = require("dotenv").config()

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: process.env.APIKEY,
  username: "sandbox",
});

module.exports = async function sendSMS() {
  // TODO: Send message
  try {
    const result = await africastalking.SMS.send({
      to: process.env.TO,
      message: "Welcome John, Our Admin will assign you a project soon",
      from: process.env.FROM,
    });
    console.log(result);
  } catch (ex) {
    console.error(ex);
  }
};
