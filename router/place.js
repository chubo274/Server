const express = require("express");
const placeController = require("../controllers/place");
const router = express.Router();
const authAdmin = require("../middleware/authAdmin");
const auth = require("../middleware/auth");

router.get("/:id", authAdmin, auth, placeController.getPlaceById);
router.delete("/:id", authAdmin, auth, placeController.deletePlaceById);
router.put("/:id", authAdmin, auth, placeController.updatePlace);
router.get("/", authAdmin, auth, placeController.getPlaces);
router.post("/", authAdmin, auth, placeController.createPlace);

module.exports = router;
