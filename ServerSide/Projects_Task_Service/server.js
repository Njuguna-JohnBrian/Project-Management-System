// Require Installed Middlewares
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sql = require("mssql");
const sqlConfig = require("./config/database");

// Create App
const app = express();

//configure cors with options
let corsOPtions = {
  origin: "http://localhost:9000",
};

//MOUNT INSTALLED MIDDLEWARES
app.use(cors());

//parse json content-type requests
app.use(bodyParser.json());

//parse url-encoded contet-type requests
app.use(bodyParser.urlencoded({ extended: true }));

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

// Import All Routes
const projects = require("./routes/project.routes");
const tasks = require("./routes/task.routes");

app.use("/projects/", projects);
app.use("/tasks/", tasks);

//Set port app will listen to for requests
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Project Service Running on port: ${PORT}`);
});
