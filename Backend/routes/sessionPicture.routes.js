const express = require("express");
const controller = require("../controllers/sessionPicture.controller");

const router = express.Router();

router.get("/api/sessionPictures", controller.getAllSessionPictures);
router.get(
	"/api/sessionPictures/:id",
	controller.getSessionPictureById
);
router.post("/api/sessionPictures", controller.addSessionPicture);
router.put("/api/sessionPictures/:id", controller.editSessionPicture);
router.delete(
	"/api/sessionPictures/:id",
	controller.deleteSessionPicture
);

module.exports = router;
