const express = require("express");
const controller = require("../controllers/role.controller");

const router = express.Router();
router.get("/api/roles", controller.getRoles);
router.get("/api/roles/:id", controller.getRoleById);
router.post("/api/roles", controller.addRole);
router.put("/api/roles/:id", controller.editRole);
router.delete("/api/roles/:id", controller.deleteRole);

module.exports = router;
