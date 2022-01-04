const express = require("express");
const cron = require("node-cron");
const sql = require("mssql");
const sqlConfig = require("./config/database");
const sendSMS = require("./sendSMS");
const sendEmail = require("./sendEmail");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connectDB() {
  const pool = new sql.ConnectionPool(sqlConfig);

  try {
    await pool.connect();

    console.log("Database Connection Successfull!");

    return pool;
  } catch (err) {
    console.log("Database Connection Failed", err);
    return err;
  }
}
connectDB();

cron.schedule("* * * * * *", () => {
  sendSMS();
});
sendEmail();

const port = 7000;

app.listen(port, () => {
  console.log(`🌏 App running on port: ${port}`);

  // TODO: call sendSMS to send message after server starts
});
