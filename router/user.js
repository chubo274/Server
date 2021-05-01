const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
/* GET account listing. */
router.post("/login", userController.login);
// router.get("/:id", auth, userController.getUserById);
// router.delete("/:id", auth, userController.deleteById);
// router.put("/:id", authAdmin, auth, userController.updateUser);
// router.get("/", auth, userController.getUsers);
// router.post("/", auth, userController.createUser);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteById);
router.put("/:id", userController.updateUser);
router.get("/", userController.getUsers);
router.post("/", userController.createUser);

module.exports = router;
