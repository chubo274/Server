const express = require("express");
const router = express.Router();
const tourGuideController = require("../controllers/tourGuide");

router.get("/:id", tourGuideController.getTourGuideById);
router.delete("/:id", tourGuideController.deleteTourGuideById);
router.put("/:id", tourGuideController.updateTourGuide);
router.get("/", tourGuideController.getTourGuides);
router.post("/", tourGuideController.createTourGuide);

module.exports = router;
