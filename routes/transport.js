const express = require("express");
const router = express.Router();
const transportController = require("../controllers/transport");

router.get("/:id", transportController.getTransportById);
router.delete("/:id", transportController.deleteTransportById);
router.put("/:id", transportController.updateTransport);
router.get("/", transportController.getTransports);
router.post("/", transportController.createTransport);

module.exports = router;
