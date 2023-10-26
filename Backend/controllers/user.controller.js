const db = require("../models");
const bcrypt = require("bcrypt");

const User = db.user;

const UserController = {
	async getUsers(req, res) {
		try {
			const response = await User.findAll();
			const totalUsers = await User.count(); // Obtenir le nombre total d'utilisateurs

			// Construire la chaîne Content-Range
			const contentRange = `users 0-${
				response.length - 1
			}/${totalUsers}`;

			// Définir l'en-tête Content-Range dans la réponse
			res.header("Content-Range", contentRange);

			console.log(response);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async getUserById(req, res) {
		try {
			const response = await User.findOne({
				attributes: [
					"id",
					"firstname",
					"lastname",
					"username",
					"userRole",
					"email",
				],
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async addUser(req, res) {
		try {
			const {
				firstname,
				lastname,
				username,
				email,
				password,
				userRole,
			} = req.body;

			// Vérification si l'utilisateur existe déjà
			const existingUser = await User.findOne({ where: { email } });
			if (existingUser) {
				return res
					.status(400)
					.json({ message: "Cet utilisateur existe déjà" });
			}
			// Hachage du mot de passe avec bcrypt
			const hashedPassword = await bcrypt.hash(password, 10);

			// Création d'un nouvel utilisateur
			const newUser = await User.create({
				firstname,
				lastname,
				username,
				email,
				password: hashedPassword,
				userRole,
			});

			return res.status(201).json({
				user: newUser,
				message: "Utilisateur créé avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la création de l'utilisateur",
			});
		}
	},

	async editUser(req, res) {
		try {
			const userId = req.params.id; // Récupéreration l'ID de l'utilisateur à éditer
			const { firstname, lastname, username, email, userRole } =
				req.body;

			// Vérification si l'utilisateur existe
			const existingUser = await User.findByPk(userId);

			if (!existingUser) {
				return res
					.status(404)
					.json({ message: "Utilisateur non trouvé" });
			}

			// Mise à jour des informations de l'utilisateur
			existingUser.firstname = firstname;
			existingUser.lastname = lastname;
			existingUser.username = username;
			existingUser.email = email;
			existingUser.userRole = userRole;

			// Enregistrement des modifications
			await existingUser.save();

			return res.status(200).json({
				user: existingUser,
				message: "Utilisateur mis à jour avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la mise à jour de l'utilisateur",
			});
		}
	},
	async updateUserRole(req, res) {
		try {
			const userId = req.params.id; // Récupération de l'ID de l'utilisateur à mettre à jour
			const { userRole } = req.body; // Récupération du nouveau rôle de l'utilisateur

			// Vérification si l'utilisateur existe
			const existingUser = await User.findByPk(userId);

			if (!existingUser) {
				return res
					.status(404)
					.json({ message: "Utilisateur non trouvé" });
			}

			// Mise à jour le champ "userRole" de l'utilisateur
			existingUser.userRole = userRole;

			// Enregistrements des modifications dans la base de données
			await existingUser.save();

			return res.status(200).json({
				user: existingUser,
				message: "Rôle de l'utilisateur mis à jour avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la mise à jour du rôle de l'utilisateur",
			});
		}
	},

	async deleteUser(req, res) {
		try {
			const userId = req.params.id; // Récupéreration l'ID de l'utilisateur à supprimer

			// Vérification si l'utilisateur existe
			const existingUser = await User.findByPk(userId);
			if (!existingUser) {
				return res
					.status(404)
					.json({ message: "Utilisateur non trouvé" });
			}

			// Suppression l'utilisateur
			await existingUser.destroy();

			return res
				.status(200)
				.json({ message: "Utilisateur supprimé avec succès" });
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la suppression de l'utilisateur",
			});
		}
	},
};

module.exports = UserController;
