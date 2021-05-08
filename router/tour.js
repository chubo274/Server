const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", authAdmin, auth, tourController.getTours);
router.post("/", authAdmin, auth, tourController.createTour);
router.post("/search", authAdmin, auth, tourController.searchTours);
// Booking
router.put("/cancel", authAdmin, auth, tourController.cancelBookingTour);
// Admin App
router.get("/allBooking", authAdmin, auth, tourController.getAllBooking);
router.put("/booking/:id", authAdmin, auth, tourController.bookingTour);
router.get("/:id", authAdmin, auth, tourController.getTourById);
router.delete("/:id", authAdmin, auth, tourController.deleteTourById);
router.put("/:id", authAdmin, auth, tourController.updateTour);

module.exports = router;
