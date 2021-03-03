const express = require("express");
const placeController = require("../controllers/place");
const router = express.Router();

router.get("/", placeController.getPlaces);
router.post("/create", placeController.createPlace);
router.delete("/:id", placeController.deletePlaceById);

module.exports = router;
