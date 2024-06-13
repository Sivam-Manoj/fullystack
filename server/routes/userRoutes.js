const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getMe);

module.exports = router;
