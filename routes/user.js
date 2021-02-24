const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
/* GET account listing. */
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteById);
router.put("/:id", userController.updateUser);
router.get("/", userController.getUsers);
router.post("/create", userController.createUser);

module.exports = router;
