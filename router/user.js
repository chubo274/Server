const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
/* GET account listing. */
router.post("/login", userController.login);
router.post("/forGotPass", userController.forGotPass);
router.get("/:id", authAdmin, auth, userController.getUserById);
router.delete("/:id", authAdmin, auth, userController.deleteById);
router.put("/:id", authAdmin, auth, userController.updateUser);
router.get("/", authAdmin, auth, userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
