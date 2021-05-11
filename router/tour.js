const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", auth, tourController.getTours);
router.post("/", auth, tourController.createTour);
router.post("/search", auth, tourController.searchTours);
// Booking
router.put("/cancel", auth, tourController.cancelBookingTour);
// Admin App
router.get("/allBooking", auth, tourController.getAllBooking);
router.put("/booking/:id", auth, tourController.bookingTour);
router.get("/:id", auth, tourController.getTourById);
router.delete("/:id", auth, tourController.deleteTourById);
router.put("/:id", auth, tourController.updateTour);

module.exports = router;
