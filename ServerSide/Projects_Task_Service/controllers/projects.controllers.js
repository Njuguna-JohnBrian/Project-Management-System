const sql = require("mssql");
require("dotenv").config();
const sqlConfig = require("../config/database");

// Get All Projects =>/projects
exports.getAllProjects = async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let results = await pool.request().execute("getAllProjects");
    if (results.recordset.length == 0) {
      return res.status(406).send("No Projects Found");
    }
    return res.status(201).send(results.recordset);
  } catch (error) {
    res.status(401).send(error.message);
  }
};

// Get One Project =>/project/project:id
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

// Get assigned projecthttp://localhost:9000/projects/userproject/1013

exports.getAssignedProjects = async (req, res) => {
  try {
    let user_id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);

    pool
      .request()
      .input("user_id", sql.Int, user_id)
      .execute("getAssignedProjTasks", (err, results) => {
        if (err) {
          res.status(500).send({ message: "Internal Server Error" });
        }
        if (results.recordset.length == 0)
          res.status(201).send({ message: `User ${user_id} Not Found` });
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
          return res.status(500).send({ message: "Error Please Retry" });
        }
        return res
          .status(201)
          .send({ message: "Project Created Successfully, Proceed To Assign" });
      });
  } catch (error) {
    return res.status(402).send(error.message);
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
        return res
          .status(201)
          .send({ message: "Project Assigned Successfully" });
      });
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

// Get All Projects and Tasks =>/admin/projtasks
exports.getProjectsTasks = async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let results = await pool.request().execute("getProjectsTasks");
    if (results.recordset.length == 0) {
      return res.status(406).send("No Entries Found");
    }
    return res.status(201).send(results.recordset);
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

//Update Project /update/:id
exports.updateProject = async (req, res) => {
  try {
    let id = req.body.id;
    let pool = await sql.connect(sqlConfig);

    // Check If Project Exists
    let project = (
      await pool.request().input("id", sql.Int, id).execute("getOneProject")
    ).recordset[0];
    // Update if exists
    if (project) {
      let updated_project_name = req.body.project_name || project.project_name;
      let updated_project_desc = req.body.project_desc || project.project_desc;

      pool
        .request()
        .input("id", sql.Int, id)
        .input("project_name", sql.VarChar, updated_project_name)
        .input("project_desc", sql.VarChar, updated_project_desc)
        .execute("updateProject", (err, results) => {
          if (err) {
            return res.status(500).send({
              message: "Internal Server Error",
            });
          }
          return res.status(201).send({
            message: "Project Details Updated",
          });
        });
    } else {
      return res.status(500).send({
        message: "Project Not Found",
      });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
// Delete A Project /delete/:id
exports.deleteProject = async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    let pool = await sql.connect(sqlConfig);

    pool
      .request()
      .input("id", sql.Int, id)
      .execute("deleteProject", (err, results) => {
        if (err) {
          return res.status(500).send({
            message: "Oops!, Project Not Deleted",
          });
        }
        return res.status(201).send({ message: "Project Deleted Succesfully" });
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
