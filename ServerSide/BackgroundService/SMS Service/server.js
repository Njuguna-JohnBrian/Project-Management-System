const express = require("express");
const sql = require("mssql");
const sqlConfig = require("./config/database");
const sendSMS = require("./sendSMS");

const app = express();

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

function smsServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // TODO: Incoming messages route

  // TODO: Delivery reports route

  const port = 7000;

  app.listen(port, () => {
    console.log(`🌏 App running on port: ${port}`);

    // TODO: call sendSMS to send message after server starts
  });
}

smsServer();
sendSMS();
