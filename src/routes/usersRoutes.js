const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/users", usersController.getAllUsers);
router.get("/users/:name", usersController.getUserByName);
router.post("/users/", usersController.createUser);
router.post("/users/login", usersController.loginUser);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.deleteUser);

module.exports = router;
