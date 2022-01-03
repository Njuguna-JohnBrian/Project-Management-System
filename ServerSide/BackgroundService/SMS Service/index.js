const express = require("express");
const cron = require("node-cron");

const app = express();


cron.schedule("* * * * * *", () => {
    console.log("JOhn")
  });
  

app.listen(3000, () => {
  console.log("🌏 App running on port: 3000");
});
