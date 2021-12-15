const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  createTask,
  getOneTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controllers");

// Task Routes
router.route("/tasks/:id").get(getAllTasks);
router.route("/tasks/new/:id").post(createTask);
router.route("/task/:id").get(getOneTask);
router.route("/update/:id").patch(updateTask);
router.route("/delete/:id").delete(deleteTask);

module.exports = router;
