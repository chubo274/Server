const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour");

router.get("/", tourController.getTours);

module.exports = router;
