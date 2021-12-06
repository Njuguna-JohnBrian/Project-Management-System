// Require Installed Middlewares
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Create App
const app = express();

//configure cors with options
let corsOPtions = {
  origin: "http://localhost:8000",
};

//Mount Installed middlewares
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set port app will listen to for requests
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`Server Running on port: ${PORT}`)
})
