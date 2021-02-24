const express = require("express");
const router = express.Router();
const tourGuideController = require("../controllers/tourGuide");

router.get("/", tourGuideController.getTourGuides);

module.exports = router;
