const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth.middleware");

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  sendSMS,
} = require("../controllers/users.controllers");

router.route("/all").get(getAllUsers);
router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/sendsms").get(sendSMS);
router.route("/:id").get(getOneUser);

module.exports = router;
