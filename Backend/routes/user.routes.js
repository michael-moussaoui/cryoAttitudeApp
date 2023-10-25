const express = require("express");
const controller = require("../controllers/user.controller");

const router = express.Router();

router.get("/api/users", controller.getUsers);
router.get("/api/users/:id", controller.getUserById);
router.post("/api/users", controller.addUser);
router.put("/api/users/:id", controller.editUser);
router.delete("/api/users/:id", controller.deleteUser);

module.exports = router;
