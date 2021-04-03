const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
/* GET account listing. */
router.post("/login", userController.login);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteById);
router.put("/:id", userController.updateUser);
router.get("/", userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
