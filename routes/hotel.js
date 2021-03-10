const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotel");

router.get("/:id", hotelController.getHotelById);
router.delete("/:id", hotelController.deleteHotelById);
router.put("/:id", hotelController.updateHotel);
router.get("/", hotelController.getHotels);
router.post("/", hotelController.createHotel);

module.exports = router;
