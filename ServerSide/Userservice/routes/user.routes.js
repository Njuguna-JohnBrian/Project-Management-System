const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

router.route("/all").get(getAllUsers);
router.route("/:id").get(getOneUser);
router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);

module.exports = router;
