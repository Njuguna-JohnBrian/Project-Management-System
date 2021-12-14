const sql = require("mssql");
require("dotenv").config();
const sqlConfig = require("../config/database");

// Get All Tasks In A Project /admin/tasks/:id
exports.getAllTasks = async (req, res) => {
  try {
    let project_id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);

    pool
      .request()
      .input("project_id", sql.Int, project_id)
      .execute("getAllTasks", (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        if (results.recordset.length == 0)
          res
            .status(406)
            .send(`Project ID ${project_id} has no tasks assigned`);
        else {
          res.status(201).send(results.recordset);
        }
      });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

// Create Tasks In A Project
exports.createTask = async (req, res) => {
  try {
    let task_name = req.body.task_name;
    let task_desc = req.body.task_desc;
    let project_id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);

    if (!project_id || !task_desc || !task_name) {
      return res
        .status(404)
        .send("Task name, description and Project Id required");
    }
    pool
      .request()
      .input("task_name", sql.VarChar, task_name)
      .input("task_desc", sql.VarChar, task_desc)
      .input("project_id", sql.Int, project_id)
      .execute("createTask", (error, results) => {
        if (error) {
          res.status(500).send({ message: "Error" });
        }
        res.status(201).send({
          message: `Task added successfully to project ${project_id}`,
        });
      });
  } catch (error) {
    res.status(402).send(error.message);
  }
};
