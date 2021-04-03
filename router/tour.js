const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour");

router.get("/", tourController.getTours);
router.get("/:id", tourController.getTourById);
router.delete("/:id", tourController.deleteTourById);
router.put("/:id", tourController.updateTour);
router.get("/", tourController.getTours);
router.post("/", tourController.createTour);
module.exports = router;
