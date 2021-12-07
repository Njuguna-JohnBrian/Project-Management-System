const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const lodash = require("lodash");
const sqlConfig = require("../config/database");

exports.createUser = async (req, res) => {
  try {
    const checkCapsAndNumber = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    const checkNumberOfChars = new RegExp("^(?=.{8,})");
    const checkSpecialChars = new RegExp("^(?=.*[!@#$%^&*])");

    const { email, username, password } = req.body;
    let pool = await sql.connect(sqlConfig);
    let results = await pool
      .request()
      .input("email", sql.VarChar, email)
      .execute("checkEmail");
    const user = results.recordset[0];

    //check if email is correct
    if (!email) {
      res.status(401).send({ message: "Please enter your email" });
    }
    //check username
    else if (!username) {
      res.status(401).send({ message: "Please enter your username" });
    }
    //check password
    else if (!password) {
      res.status(401).send({ message: "Please enter your password" });
    }
    //check password length
    else if (!checkNumberOfChars.test(password)) {
      res.status(401).send({ message: "Password must be 8 characters long" });
    }
    //check password special characters
    else if (!checkSpecialChars.test(password)) {
      res
        .status(401)
        .send({ message: "Password must contain special characters" });
    }
    //check password small letters, caps and numbers
    else if (!checkCapsAndNumber.test(password)) {
      res.status(401).send({
        message:
          "Password must have a combination of numbers, small and capital letters",
      });
    } else if (user && user.is_deleted === 0) {
      res
        .status(401)
        .send({ message: "Email is in use, please enter a different email" });
    } else {
      //hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      let pool = await sql.connect(sqlConfig);

      //execute stored proc
      pool
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, hashedPassword)
        .execute("createUser", (error, result) => {
          if (error) {
            res.status(500).send(error.message);
          } else {
            jwt.sign(
              { email, username },
              process.env.SECRET_KEY,
              { expiresIn: "3600s" },
              (err, token) => {
                return res.status(201).json({
                  user: { email, username },
                  message: `${username} added successfully`,
                  token,
                });
              }
            );
          }
        });
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//Login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let pool = await sql.connect(sqlConfig);
    let results = await pool
      .request()
      .input("email", sql.VarChar, email)
      .execute("checkEmail");
  } catch (error) {}
};
