const express = require("express");
const controller = require("../controllers/objective.controller.js");

const router = express.Router();

router.get("/api/objectives", controller.getObjectives);
router.get("/api/objectives/:id", controller.getObjectiveById);
router.post("/api/objectives", controller.addObjective);
router.put("/api/objectives/:id", controller.editObjective);
router.delete("/api/objectives/:id", controller.deleteObjective);

module.exports = router;
