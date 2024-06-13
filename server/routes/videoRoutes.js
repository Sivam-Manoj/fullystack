const express = require("express");
const { adminProtect } = require("../middlewares/adminAuthMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const {
  getVideo,
  addVideo,
  updateVideo,
  deleteVideo,
  getAdminVideo,
} = require("../controllers/videoController");
const router = express.Router();

router.get("/get-videos", protect, getVideo);
router.get("/get-videos-admin", adminProtect, getAdminVideo);
router.post("/add-video", adminProtect, addVideo);
router.put("/update-video/:id", adminProtect, updateVideo);
router.delete("/delete-video/:id", adminProtect, deleteVideo);

module.exports = router;
