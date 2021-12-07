// Require Installed Middlewares
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");
const sqlConfig = require("./config/database");
const userRoutes = require("./routes/user.routes");

// Create App
const app = express();

//configure cors with options
let corsOPtions = {
  origin: "http://localhost:8000",
};

//MOUNT INSTALLED MIDDLEWARES
app.use(cors(corsOPtions));

//parse json content-type requests
app.use(bodyParser.json());

//parse url-encoded contet-type requests
app.use(bodyParser.urlencoded({ extended: true }));

//Set port app will listen to for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server Running on port: ${PORT}`);
});

//test database connection
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

app.use("/users", userRoutes);
