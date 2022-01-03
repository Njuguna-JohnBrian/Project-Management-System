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
    const { data } = await axios.get(
      "http://localhost:8000/admin/sendsms"
    );
    if (data.length) {
      data.map(async (user) => {

        const apiMessage = {
          to: `+${user.phonenumber}`,
          from: "2485",
          message: `Greetings ${user.username}
                    Welcome To Projects System,
                    Our Admin will assign you a project soon.
                    We will be updating you soon via email:
                    ${user.email}\n
                    Be on the lookout`,
        };
        const result = await africastalking.SMS.send(apiMessage);
      });
    }
  } catch (ex) {
    console.error(ex);
  }
};
