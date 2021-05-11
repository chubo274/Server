const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", auth, userController.getUsers);
router.post("/login", userController.login);
router.post("/forGotPass", userController.forGotPass);
router.post("/", userController.createUser);
router.get("/:id", auth, userController.getUserById);
router.delete("/:id", auth, userController.deleteById);
router.put("/:id", auth, userController.updateUser);

module.exports = router;
