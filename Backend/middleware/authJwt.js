const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

// verifyToken = (req, res, next) => {
// 	let token = req.headers["x-access-token"];

// 	if (!token) {
// 		return res.status(403).send({
// 			message: "No token provided!",
// 		});
// 	}

// 	jwt.verify(token, config.secret, (err, decoded) => {
// 		if (err) {
// 			return res.status(401).send({
// 				message: "Unauthorized!",
// 			});
// 		}
// 		req.userId = decoded.id;
// 		next();
// 	});
// };

// isAdmin = (req, res, next) => {
// 	User.findByPk(req.userId).then((user) => {
// 		user.getRoles().then((roles) => {
// 			for (let i = 0; i < roles.length; i++) {
// 				if (roles[i].name === "admin") {
// 					next();
// 					return;
// 				}
// 			}

// 			res.status(403).send({
// 				message: "Require Admin Role!",
// 			});
// 			return;
// 		});
// 	});
// };

// isManager = (req, res, next) => {
// 	User.findByPk(req.userId).then((user) => {
// 		user.getRoles().then((roles) => {
// 			for (let i = 0; i < roles.length; i++) {
// 				if (roles[i].name === "manager") {
// 					next();
// 					return;
// 				}
// 			}

// 			res.status(403).send({
// 				message: "Require Manager Role!",
// 			});
// 		});
// 	});
// };

// isManagerOrAdmin = (req, res, next) => {
// 	User.findByPk(req.userId).then((user) => {
// 		user.getRoles().then((roles) => {
// 			for (let i = 0; i < roles.length; i++) {
// 				if (roles[i].name === "manager") {
// 					next();
// 					return;
// 				}

// 				if (roles[i].name === "admin") {
// 					next();
// 					return;
// 				}
// 			}

// 			res.status(403).send({
// 				message: "Require Manager or Admin Role!",
// 			});
// 		});
// 	});
// };

// const authJwt = {
// 	verifyToken: verifyToken,
// 	isAdmin: isAdmin,
// 	isManager: isManager,
// 	isManagerOrAdmin: isManagerOrAdmin,
// };
// module.exports = authJwt;

const verifyToken = (req, res, next) => {
	if (
		req.headers &&
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "JWT"
	) {
		jwt.verify(
			req.headers.authorization.split(" ")[1],
			process.env.JWT_SECRET,
			(err, decode) => {
				if (err) {
					return res.status(401).send({ message: "Unauthorized" });
				} else {
					User.findByPk(decode.id).then((user) => {
						if (!user) {
							return res
								.status(404)
								.send({ message: "User Not Found" });
						}

						req.user = user;
						next();
					});
				}
			}
		);
	} else {
		req.user = undefined;
		next();
	}
};

const isAdmin = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ message: "Unauthorized" });
	}

	if (req.user.role === "admin") {
		next();
	} else {
		res.status(403).send({ message: "Require Admin Role" });
	}
};

const isManager = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ message: "Unauthorized" });
	}

	if (req.user.role === "manager") {
		next();
	} else {
		res.status(403).send({ message: "Require Manager Role" });
	}
};

const isManagerOrAdmin = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ message: "Unauthorized" });
	}

	if (req.user.role === "manager" || req.user.role === "admin") {
		next();
	} else {
		res
			.status(403)
			.send({ message: "Require Manager or Admin Role" });
	}
};

const authJwt = {
	verifyToken,
	isAdmin,
	isManager,
	isManagerOrAdmin,
};

module.exports = authJwt;
