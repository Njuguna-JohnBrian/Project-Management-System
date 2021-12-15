const express = require("express");

const router = express.Router();

const {
  getAllTasks,
  createTask,
  getOneTask,
} = require("../controllers/task.controllers");

// Task Routes
router.route("/admin/tasks/:id").get(getAllTasks);
router.route("/admin/tasks/new/:id").post(createTask);
router.route("/admin/task/:id").get(getOneTask);

module.exports = router;
