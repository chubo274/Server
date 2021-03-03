const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel");

router.get("/", hotelController.getHotels);
router.post("/create", hotelController.createHotel);
router.delete("/:id", hotelController.deleteHotelById);

module.exports = router;
