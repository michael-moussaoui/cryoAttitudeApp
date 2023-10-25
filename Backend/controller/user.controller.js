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
				attributes: ["id", "firstname", "lastname", "role", "email"],
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
			const { firstname, lastname, email, password, role } = req.body;

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
				email,
				password: hashedPassword,
				role,
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
			const { firstname, lastname, email, role } = req.body;

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
			existingUser.email = email;
			existingUser.role = role;

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
