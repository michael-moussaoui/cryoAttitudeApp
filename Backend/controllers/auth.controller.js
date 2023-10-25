const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.signup = (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	}).then((user) => {
		if (user) {
			return res
				.status(400)
				.send({ message: "Adresse e-mail déjà utilisée." });
		} else {
			// Save User to Database
			User.create({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				username: req.body.username,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8),
			})
				.then((user) => {
					res.send({ message: "Utilisateur inscrit avec succes!" });
				})
				.catch((err) => {
					res.status(500).send({ message: err.message });
				});
		}
	});
};

exports.signin = (req, res) => {
	User.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User Not found." });
			}

			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!",
				});
			}

			const token = jwt.sign({ id: user.id }, config.secret, {
				algorithm: "HS256",
				allowInsecureKeySizes: true,
				expiresIn: 43200, // 12 hours
			});

			res.status(200).send({
				id: user.id,
				lastname: user.lastname,
				firstname: user.firstname,
				username: user.username,
				email: user.email,
				accessToken: token,
			});
		})
		.catch((err) => {
			res.status(500).send({ message: err.message });
		});
};

exports.signout = (req, res) => {
	res.clearCookie("accessToken");
	res
		.status(200)
		.send({ message: "Vous avez été déconnecté avec succès." });
};

exports.isAuth = (req, res, next) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		return res.status(401).json({ message: "not authenticated" });
	}
	const token = authHeader.split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, "secret");
	} catch (err) {
		return res
			.status(500)
			.json({ message: err.message || "could not decode the token" });
	}
	if (!decodedToken) {
		res.status(401).json({ message: "unauthorized" });
	} else {
		res.status(200).json({ message: "here is your resource" });
	}
};
