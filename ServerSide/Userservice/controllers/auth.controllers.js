const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const lodash = require("lodash");
const sqlConfig = require("../config/database");
const generateToken = require("../helpers/genToken.helpers");

exports.createUser = async (req, res) => {
  try {
    const checkCapsAndNumber = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    const checkNumberOfChars = new RegExp("^(?=.{8,})");
    const checkSpecialChars = new RegExp("^(?=.*[!@#$%^&*])");

    const { email, username, password, phonenumber } = req.body;
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
    // Check Phone Number
    else if (!phonenumber) {
      res.status(401).send({ message: "Please enter your phonenumber" });
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
        .json({ message: "Email is in use, please enter a different email" });
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
        .input("phonenumber", sql.VarChar, phonenumber)

        .execute("createUser", (error, result) => {
          if (error) {
            res
              .status(500)
              .json({
                message: "Check details and retry.",
              });
          } else {
            return res.status(201).json({
              user: { email, username },
              message: `${username} You Have Registered Successfully.Proceed to Login.`,
              token: generateToken(email, username),
            });
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
    const user = results.recordset[0];

    console.log(password);
    console.log(user.password);
    if (!user || user === undefined) {
      return res.status(401).send({ message: "User not found" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).send("Error");
        }
        console.log(result);
        if (!result) {
          return res.status(401).json({ message: "Wrong Password" });
        }

        return res.status(200).json({
          user: lodash.pick(user, ["username", "email"]),
          message: `${user.username} logged in successfully`,
          token: generateToken(user.email, user.username),
        });
      });
    }
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    let email = req.body.email;
    let updated_password = req.body.password;
    let confirm_password = req.body.confirm_password;

    if (!email) {
      res.status(401).send({ message: "Please provide an email" });
    } else if (!updated_password) {
      res.status(401).send({ message: "Please enter new password" });
    } else if (!confirm_password) {
      res.status(401).send({ message: "Please confirm new passowrd" });
    } else if (updated_password !== confirm_password) {
      res.status(401).send({ message: "Passwords do not match" });
    } else {
      let pool = await sql.connect(sqlConfig);
      let results = await pool
        .request()
        .input("email", sql.VarChar, email)
        .execute("checkEmail");
      const user = results.recordset[0];

      if (user) {
        const hashedPassword = await bcrypt.hash(updated_password, 10);
        pool
          .request()
          .query(
            `UPDATE Users SET password='${hashedPassword}' WHERE email='${email}'`
          );
        res.status(200).send({ message: "Password updated successfully" });
      }
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};
