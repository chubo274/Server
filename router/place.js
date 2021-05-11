const express = require("express");
const placeController = require("../controllers/place");
const router = express.Router();
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

router.get("/:id", auth, placeController.getPlaceById);
router.delete("/:id", auth, placeController.deletePlaceById);
router.put("/:id", auth, placeController.updatePlace);
router.get("/", auth, placeController.getPlaces);
router.post("/", auth, placeController.createPlace);

module.exports = router;
