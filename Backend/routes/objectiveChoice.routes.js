const express = require("express");
const controller = require("../controllers/objectiveChoice.controller");

const router = express.Router();
router.get(
	"/api/objectiveChoices",
	controller.getAllObjectiveChoices
);
router.get(
	"/api/objectiveChoices/:id",
	controller.getObjectiveChoiceById
);
router.post("/api/objectiveChoices", controller.addObjectiveChoice);
router.put(
	"/api/objectiveChoices/:id",
	controller.editObjectiveChoice
);
router.delete(
	"/api/objectiveChoices/:id",
	controller.deleteObjectiveChoice
);

module.exports = router;
