const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/", usersController.getAllUsers);
router.get("/users", usersController.getAllUsers);
router.get("/users/:name", usersController.getUserByName);
router.post("/users", usersController.createUser);
router.post("/users/login", usersController.loginUser);
router.post("/users/logOut", usersController.logOut);
router.post("/users/refresh", usersController.refreshToken);
router.get("/users/:id", usersController.getUserById);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
