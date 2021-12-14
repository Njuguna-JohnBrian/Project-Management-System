const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controllers");

router.route("/admin/").get(getAllUsers);
router.route("/admin/:id").get(getOneUser);
router.route("/admin/update/:id").put(updateUser);
router.route("/admin/delete/:id").delete(deleteUser);

module.exports = router;
