const sql = require("mssql");
require("dotenv").config();
const sqlConfig = require("../config/database");

// Get All Tasks In A Project /tasks/:id
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
          res.status(406).json({
            message: `Project ID ${project_id} has no tasks assigned`,
          });
        else {
          res.status(201).send(results.recordset);
        }
      });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

// Create Tasks In A Project /tasks/new/:id
exports.createTask = async (req, res) => {
  try {
    let task_name = req.body.task_name;
    let task_desc = req.body.task_desc;
    let project_id = req.body.project_id;
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

// Get specific task in a project /task/:id
exports.getOneTask = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);

    pool
      .request()
      .input("task_id", sql.Int, id)
      .execute("getOneTask", (err, results) => {
        if (err) {
          res.status(500).send(err);
        }
        if (results.recordset.length == 0)
          res.status(406).send("No Task With That Id Found");
        else {
          res.status(201).send(results.recordset[0]);
        }
      });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

// Update Task /update/:id

exports.updateTask = async (req, res) => {
  try {
    let pool = await sql.connect(sqlConfig);
    let id = parseInt(req.params.id);

    pool
      .request()
      .input("id", sql.Int, id)
      .execute("getSingleTask", (err, results) => {
        if (err) {
          res.status(500).send({ message: "Internal Server Error" });
        }

        let task = results.recordset[0];

        let updated_task_name = req.body.task_name || task.task_name;
        let updated_task_desc = req.body.task_desc || task.task_desc;

        pool
          .request()
          .input("id", sql.Int, id)
          .input("task_desc", sql.VarChar, updated_task_desc)
          .input("task_name", sql.VarChar, updated_task_name)
          .execute("updateTask", (err, results) => {
            if (err) {
              res.status(500).send({ message: "Internal Server Error" });
            }
            res.status(201).send({ message: "Task updated successfully" });
          });
      });
  } catch (error) {
    res.status(500).send(err.message);
  }
};

// Delete Task /delete/:id
exports.deleteTask = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let pool = await sql.connect(sqlConfig);

    // pool
    //   .request()
    //   .input("id", sql.Int, id)
    //   .execute("getOneTask", (err, results) => {
    //     console.log(results);
    //     if (err) {
    //       res.status(500).send({ message: "Internal Server Error" });
    //     }

    pool
      .request()
      .input("id", sql.Int, id)
      .execute("deleteTask", (err, results) => {
        if (err) {
          return res.status(500).send({
            message: "Opps!Task Not Deleted",
          });
        }
        return res.status(201).send({ message: "Taks Deleted Sucessfully" });
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
