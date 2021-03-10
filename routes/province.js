const express = require("express");
const router = express.Router();
const provinceController = require("../controllers/province");

router.get("/:id", provinceController.getProvinceById);
router.delete("/:id", provinceController.deleteProvinceById);
router.put("/:id", provinceController.updateProvince);
router.get("/", provinceController.getProvinces);
router.post("/", provinceController.createProvince);

module.exports = router;
