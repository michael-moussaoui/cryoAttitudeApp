const db = require("../models");

const Role = db.role;

const RoleController = {
	async getRoles(req, res) {
		try {
			const response = await Role.findAll();
			const totalRoles = await Role.count(); // Obtenir le nombre total d'utilisateurs

			// Construire la chaîne Content-Range
			const contentRange = `roles 0-${
				response.length - 1
			}/${totalRoles}`;

			// Définir l'en-tête Content-Range dans la réponse
			res.header("Content-Range", contentRange);

			console.log(response);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async getRoleById(req, res) {
		try {
			const response = await Role.findOne({
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async addRole(req, res) {
		try {
			const { name } = req.body;

			// Vérifiez si l'utilisateur existe déjà
			const existingRole = await Role.findOne({ where: { name } });
			if (existingRole) {
				return res
					.status(400)
					.json({ message: "Ce role existe déjà" });
			}

			// Créez un nouveau role
			const newRole = await Role.create({
				name,
			});

			return res.status(201).json({
				role: newRole,
				message: "Role créé avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la création du role",
			});
		}
	},

	async editRole(req, res) {
		try {
			const roleId = req.params.id; // Récupérer l'ID du role à éditer
			const { name } = req.body;

			// Vérifier si l'utilisateur existe
			const existingRole = await Role.findByPk(roleId);

			if (!existingRole) {
				return res.status(404).json({ message: "Role non trouvé" });
			}

			// Mettre à jour les informations de l'utilisateur
			existingRole.name = name;

			// Enregistrez les modifications
			await existingRole.save();

			return res.status(200).json({
				role: existingRole,
				message: "Role mis à jour avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la mise à jour du role",
			});
		}
	},

	async deleteRole(req, res) {
		try {
			const roleId = req.params.id; // Récupérer l'ID du role à supprimer

			// Vérifier si l'utilisateur existe
			const existingRole = await Role.findByPk(roleId);
			if (!existingRole) {
				return res.status(404).json({ message: "Role non trouvé" });
			}

			// Supprimer l'utilisateur
			await existingRole.destroy();

			return res
				.status(200)
				.json({ message: "Role supprimé avec succès" });
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la suppression du role",
			});
		}
	},
};

module.exports = RoleController;
