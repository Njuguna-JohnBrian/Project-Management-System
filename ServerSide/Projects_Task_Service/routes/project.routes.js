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
  getAssignedProjects,
} = require("../controllers/projects.controllers");

// Project Routes
router.route("/all").get(getAllProjects);
router.route("/project/:id").get(getOneProject);
router.route("/project/new").post(createProject);
router.route("/project/assign").put(assignProject);
router.route("/projtasks").get(getProjectsTasks);
router.route("/update/:id").patch(updateProject);
router.route("/delete/:id").delete(deleteProject);
router.route("/userproject/:id").get(getAssignedProjects);

module.exports = router;
