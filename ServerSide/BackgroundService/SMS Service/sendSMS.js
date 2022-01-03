const AfricasTalking = require("africastalking");
const dotenv = require("dotenv").config();
const axios = require("axios")

// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: process.env.APIKEY,
  username: "sandbox",
});

module.exports = async function sendSMS() {
  // TODO: Send message
  try {
    const  {data}  = await axios.get(
      "https://localhost:8000/admin/sendsms"
    );
    // console.log(data);

    if (data.length) {
      
      data.map(async (user) => {
        // console.log(user);

        const apiMessage = {
          to: `+${user.phonenumber}`,
          from: "2485",
          message: `Greetings ${user.username}`,
        };
        const result = await africastalking.SMS.send(apiMessage);
      });
    }
  } catch (ex) {
    console.error(ex);
  }
};
