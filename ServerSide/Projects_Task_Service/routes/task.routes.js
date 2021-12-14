const express = require("express");

const router = express.Router();

const { getAllTasks, createTask } = require("../controllers/task.controllers");

// Task Routes
router.route("/admin/tasks/:id").get(getAllTasks);
router.route("/admin/tasks/new/:id").post(createTask);

module.exports = router;
