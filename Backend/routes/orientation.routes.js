const express = require("express");
const controller = require("../controllers/orientation.controller");

const router = express.Router();

router.get("/api/orientations", controller.getOrientations);
router.get("/api/orientations/:id", controller.getOrientationById);
router.post("/api/orientations", controller.addOrientation);
router.put("/api/orientations/:id", controller.editOrientation);
router.delete("/api/orientations/:id", controller.deleteOrientation);

module.exports = router;
