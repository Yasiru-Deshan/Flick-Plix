const express = require("express");
const {
  login,
  addUser,
  signUp,
  updateUser,
  getUsers,
  deleteCustomer,
  uploadProfilePic,
  addToFavorites,
  getFavorites,
  createPlayList,
  getPlayLists,
  getPlayList
} = require("../controllers/user-controller");
const adminAuth = require("../middleware/AdminAuthentication");
const Authentication = require("../middleware/Authentication");
const router = express.Router();

router.get("/", getUsers);
router.post("/login", login);
router.post("/", signUp);
router.post("/create", adminAuth, addUser);
router.put("/update", adminAuth, updateUser);
router.put("/:id/addtofav", Authentication, addToFavorites);
router.get("/:id/favorites", Authentication, getFavorites);
router.post("/:id/newplaylist", Authentication, createPlayList);
router.get("/:id/playlists", Authentication, getPlayLists);
router.get("/:id/playlist", Authentication, getPlayList);
router.put("/profilepic", Authentication, uploadProfilePic);
router.delete("/delete", adminAuth, deleteCustomer);

module.exports = router;
