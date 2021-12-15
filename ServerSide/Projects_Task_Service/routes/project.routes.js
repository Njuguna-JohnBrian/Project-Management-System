const express = require("express");

const router = express.Router();

const {
  getAllProjects,
  getOneProject,
  createProject,
  assignProject,
  getProjectsTasks,
  updateProject,
  deleteProject,
} = require("../controllers/projects.controllers");

// Project Routes
router.route("/projects").get(getAllProjects);
router.route("/project/:id").get(getOneProject);
router.route("/project/new").post(createProject);
router.route("/project/assign").put(assignProject);
router.route("/projtasks").get(getProjectsTasks);
router.route("/update/:id").patch(updateProject);
router.route("/delete/:id").delete(deleteProject);

module.exports = router;
