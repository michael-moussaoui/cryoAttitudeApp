const express = require("express");

const controller = require("../controllers/session.controller");

const router = express.Router();

router.get("/api/sessions", controller.getSessions);
router.get("/api/sessions/:id", controller.getSessionById);
router.get("/api/sessions/:userId", controller.getSessionsByUserId);
router.post("/api/sessions", controller.addSession);
router.delete("/api/sessions/:id", controller.deleteSession);

module.exports = router;
