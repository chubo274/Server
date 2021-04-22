const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const authAdmin = require("../middleware/authAdmin");
/* GET account listing. */
router.post("/login", adminController.login);
router.delete("/:id", authAdmin, adminController.deleteById);
router.post("/", adminController.createAdmin);

module.exports = router;
