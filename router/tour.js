const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// router.get("/", authAdmin, auth, tourController.getTours);
router.get("/", tourController.getTours);
router.get("/", tourController.getTours);
router.post("/", tourController.createTour);
router.post("/search/", tourController.searchTours);
// Booking
router.put("/cancel/", tourController.cancelBookingTour);
router.put("/booking/:id", tourController.bookingTour);
// Admin App
router.get("/allBooking", tourController.getAllBooking);
router.get("/:id", tourController.getTourById);
router.delete("/:id", tourController.deleteTourById);
router.put("/:id", tourController.updateTour);

module.exports = router;
