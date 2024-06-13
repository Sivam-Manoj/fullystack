const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAdmin,
} = require("../controllers/adminController");
const { adminProtect } = require("../middlewares/adminAuthMiddleware");
const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/login-admin", loginAdmin);
router.get("/profile", adminProtect, getAdmin);

module.exports = router;
