const express = require("express");
const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");
const router = express.Router();

router.post("/api/auth/signup", controller.signup, [
	verifySignUp.checkDuplicateUsernameOrEmail,
	verifySignUp.checkRolesExisted,
]);
router.post("/api/auth/signin", controller.signin);
router.post("api/auth/signout", controller.signout);

router.get("/hiddenpage", authJwt.verifyToken, (req, res) => {
	res.send("Route accessible avec un token valide");
});

router.get(
	"/admin",
	authJwt.verifyToken,
	authJwt.isAdmin,
	(req, res) => {
		res.send("Route accessible uniquement par les administrateurs");
	}
);

router.get(
	"/admin-or-manager",
	authJwt.verifyToken,
	authJwt.isManagerOrAdmin,
	(req, res) => {
		res.send(
			"Route accessible par les managers ou les administrateurs"
		);
	}
);

module.exports = router;
