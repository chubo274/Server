const express = require("express");
const placeController = require("../controllers/place");
const router = express.Router();

router.get("/:id", placeController.getPlaceById);
router.delete("/:id", placeController.deletePlaceById);
router.put("/:id", placeController.updatePlace);
router.get("/", placeController.getPlaces);
router.post("/", placeController.createPlace);

module.exports = router;
