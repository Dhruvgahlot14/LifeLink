const express = require("express");
const router = express.Router();

const {
  createRequest,
  getRequests,
  getRecentRequests,// ✅ ADD THIS
  findBloodBanks   
} = require("../controllers/requestController");

// create request
router.post("/", createRequest);

// get all requests
router.get("/", getRequests);

// get recent requests
router.get("/recent", getRecentRequests);

// 🔥 find blood banks
router.post("/find-blood", findBloodBanks);

module.exports = router;