const express = require("express");
const router = express.Router();
const provinceController = require("../controllers/province");

router.get("/", provinceController.getProvinces);
router.post("/create", provinceController.createProvince);
router.delete("/:id", provinceController.deleteProvinceById);

module.exports = router;
