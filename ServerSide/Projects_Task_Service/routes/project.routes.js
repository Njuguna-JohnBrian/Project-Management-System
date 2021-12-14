const express = require("express");

const router = express.Router();

const {
  getAllProjects,
  getOneProject,
  createProject,
  assignProject,
} = require("../controllers/projects.controllers");

// Project Routes
router.route("/admin/projects").get(getAllProjects);
router.route("/admin/project/:id").get(getOneProject);
router.route("/admin/project/new").post(createProject);
router.route("/admin/project/assign").put(assignProject);

module.exports = router;
