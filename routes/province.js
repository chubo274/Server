const express = require("express");
const router = express.Router();
const provinceController = require("../controllers/province");

router.get("/", provinceController.getProvinces);
router.get("/create", provinceController.createProvince);

module.exports = router;
