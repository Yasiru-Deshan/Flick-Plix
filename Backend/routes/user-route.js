const express = require("express");
const {
  login,
  addUser,
  signUp,
  updateUser,
  getUsers,
  deleteCustomer,
  uploadProfilePic,
} = require("../controllers/user-controller");
const adminAuth = require("../middleware/AdminAuthentication");
const Authentication = require("../middleware/Authentication");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/", signUp);
router.post("/create", adminAuth, addUser);
router.put("/update", adminAuth, updateUser);
router.put("/profilepic", Authentication, uploadProfilePic);
router.delete("/delete", adminAuth, deleteCustomer);

module.exports = router;
