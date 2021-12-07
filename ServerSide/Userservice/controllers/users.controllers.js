const sql = require("mssql");
require("dotenv").config();
const sqlConfig = require("../config/database");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let results = await pool.request().execute("showUser");
    if (results.recordset.length === 0) {
      return res.status(406).send("No users found");
    }
    return res.status(201).send(results.recordset);
  } catch (error) {
    console.log(error);
  }
};

//Get a single user
exports.getOneUser = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);

    pool
      .request()
      .input("id", sql.Int, id)
      .execute("showOneUser", (err, results) => {
        if (err) {
          res.status(500).send({ message: "Error!" });
        }
        if (results.recordset.length === 0)
          res.status(406).send("No user with that id found");
        else {
          res.status(201).send(results.recordset[0]);
        }
      });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

//Update User
exports.updateUser = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);
    let user = (
      await pool.request().input("id", sql.Int, id).execute("showOneUser")
    ).recordset[0];

    if (user === undefined) {
      res.send(`User with ${id} not found`);
    }
    if (user) {
      let updated_username = req.body.username || user.username;
      let updated_email = req.body.email || user.email;

      pool
        .request()
        .input("id", sql.Int, id)
        .input("email", sql.VarChar, updated_email)
        .input("username", sql.VarChar, updated_username)
        .execute("updateUser", (error, results) => {
          if (error) {
            console.log(error);
            res.status(500).send({ message: "Error" });
          }
          res.status(201).send({ message: "User details updated" });
        });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//Delete User
exports.deleteUser = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);

    pool
      .request()
      .input("id", sql.Int, id)
      .execute("deleteUser", (err, results) => {
        if (err) {
          res.send({ message: "Error!" });
        }
        res.status(201).send(`User with id ${id} deleted successfully`);
      });
  } catch (error) {
    res.status(401).send(error.message);
  }
};
