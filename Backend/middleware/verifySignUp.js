const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
	if (!req.body || (!req.body.username && !req.body.email)) {
		res.status(400).send({
			message:
				"Failed! Missing username and/or email in the request body.",
		});
		return;
	}

	// Username
	if (req.body.username) {
		User.findOne({
			where: {
				username: req.body.username,
			},
		}).then((user) => {
			if (user) {
				res.status(400).send({
					message: "Failed! Username is already in use!",
				});
				return;
			}
			checkEmail();
		});
	} else {
		checkEmail();
	}

	function checkEmail() {
		// Email
		if (req.body.email) {
			User.findOne({
				where: {
					email: req.body.email,
				},
			}).then((user) => {
				if (user) {
					res.status(400).send({
						message: "Failed! Email is already in use!",
					});
					return;
				}
				next();
			});
		} else {
			next();
		}
	}
};

checkRolesExisted = (req, res, next) => {
	if (req.body.roles) {
		for (let i = 0; i < req.body.roles.length; i++) {
			if (!ROLES.includes(req.body.roles[i])) {
				res.status(400).send({
					message:
						"Failed! Role does not exist = " + req.body.roles[i],
				});
				return;
			}
		}
	}

	next();
};

const verifySignUp = {
	checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
	checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
