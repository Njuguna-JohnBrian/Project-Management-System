const express = require("express");

const router = express.Router();

const {
  getTasks,
  getAllTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controllers");

// Task Routes
router.route("/all").get(getTasks);
router.route("/tasks/:id").get(getAllTasks);
router.route("/tasks/new").post(createTask);
router.route("/task/:id").get(getOneTask);
router.route("/update/:id").patch(updateTask);
router.route("/delete/:id").delete(deleteTask);

module.exports = router;
