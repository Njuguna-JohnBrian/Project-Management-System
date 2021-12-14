const sql = require("mssql");
require("dotenv").config();
const sqlConfig = require("../config/database");

// Get All Projects =>/projects/admin/projects
exports.getAllProjects = async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let results = await pool.request().execute("getAllProjects");
    if (results.recordset.length == 0) {
      return res.status(406).send("No Projects Found");
    }
    return res.status(201).send(results.recordset);
  } catch (error) {
    console.log(error);
  }
};

// Get One Project =>/project/admin/project:id
exports.getOneProject = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);

    pool
      .request()
      .input("project_id", sql.Int, id)
      .execute("getOneProject", (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        if (results.recordset.length == 0)
          res.status(406).send("No Project Found with that Id");
        else {
          res.status(201).send(results.recordset[0]);
        }
      });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

// Create Project

exports.createProject = async (req, res) => {
  try {
    let project_name = req.body.project_name;
    let project_desc = req.body.project_desc;
    let pool = await sql.connect(sqlConfig);

    if (!project_name || !project_desc) {
      return res
        .status(404)
        .send("Project Name and Description Cannot Be Empty");
    }
    pool
      .request()
      .input("project_name", sql.VarChar, project_name)
      .input("project_desc", sql.VarChar, project_desc)
      .execute("createProject", (error, results) => {
        if (error) {
          res.status(500).send({ message: "Error" });
        }
        res.status(201).send({ message: "Project Created Successfully" });
      });
  } catch (error) {
    res.status(402).send(error.message);
  }
};

// Assign Project
exports.assignProject = async (req, res) => {
  try {
    let project_id = req.body.project_id;
    let user_id = req.body.user_id;
    let pool = await sql.connect(sqlConfig);

    if (!project_id || !user_id) {
      return res
        .status(400)
        .send({ message: "User ID and Project ID cannot be empty" });
    }

    // pool
    //   .request()
    //   .input("project_id", sql.Int, project_id)
    //   .execute("getOneProject", (err, results) => {
    //     if (err) {
    //       return res.status(500).send(err);
    //     }
    //     if (results.recordset.length == 0)
    //       return res.status(406).send("No Project Found with that Id");
    //   });
    pool
      .request()
      .input("id", sql.Int, project_id)
      .input("user_id", sql.Int, user_id)
      .execute("assignProject", (error, results) => {
        if (error) {
          return res.status(500).send({ message: "Error" });
        }
        if (results.rowsAffected[0] == 0) {
          return res.status(400).send({ message: "No Entry Made" });
        }
        return es
          .status(201)
          .send({ message: "Project Assigned Successfully" });
      });
  } catch (error) {
    return res.status(401).send(error.message);
  }
};