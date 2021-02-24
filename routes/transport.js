const express = require("express");
const router = express.Router();
const transportController = require("../controllers/transport");

router.get("/", transportController.getTransports);

module.exports = router;
