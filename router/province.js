const express = require("express");
const router = express.Router();
const provinceController = require("../controllers/province");
const auth = require("../middleware/auth");

router.get("/:id", auth, provinceController.getProvinceById);
router.delete("/:id", auth, provinceController.deleteProvinceById);
router.put("/:id", auth, provinceController.updateProvince);
router.get("/", auth, provinceController.getProvinces);
router.post("/", auth, provinceController.createProvince);

module.exports = router;
