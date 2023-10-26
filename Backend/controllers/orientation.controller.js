const db = require("../models");

const Orientation = db.orientation;

const OrientationController = {
	async getOrientations(req, res) {
		try {
			const response = await Orientation.findAll();
			const totalOrientations = await Orientation.count(); // récupération du nombre total des orientations

			// Construire la chaîne Content-Range
			const contentRange = `orientations 0-${
				response.length - 1
			}/${totalOrientations}`;

			// Définir l'en-tête Content-Range dans la réponse
			res.header("Content-Range", contentRange);

			console.log(response);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async getOrientationById(req, res) {
		try {
			const response = await Orientation.findOne({
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async addOrientation(req, res) {
		try {
			const { name } = req.body;

			// Vérification si la catégorie existe déjà
			const existingOrientation = await Orientation.findOne({
				where: { name },
			});
			if (existingOrientation) {
				return res
					.status(400)
					.json({ message: "Cette orientation existe déjà" });
			}

			// Création une nouvelle orientation
			const newOrientation = await Orientation.create({
				name,
			});

			return res.status(201).json({
				orientation: newOrientation,
				message: "Orientation créé avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la création de l'orientation",
			});
		}
	},

	async editOrientation(req, res) {
		try {
			const orientationId = req.params.id; // Récupéreration l'ID de l'orientation à éditer
			const { name } = req.body;

			// Vérification si la orientation existe
			const existingOrientation = await Orientation.findByPk(
				orientationId
			);

			if (!existingOrientation) {
				return res
					.status(404)
					.json({ message: "Orientation non trouvée" });
			}

			// Mise à jour des informations de l'orientation
			existingOrientation.name = name;

			// Enregistrement des modifications
			await existingOrientation.save();

			return res.status(200).json({
				category: existingOrientation,
				message: "Orientation mise à jour avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la mise à jour de l'orientation",
			});
		}
	},

	async deleteOrientation(req, res) {
		try {
			const orientationId = req.params.id; // Récupérer l'ID de l'orientation à supprimer

			// Vérification si l'orientation existe
			const existingOrientation = await Orientation.findByPk(
				orientationId
			);
			if (!existingOrientation) {
				return res
					.status(404)
					.json({ message: "Orientation non trouvée" });
			}

			// Suppression de la orientation
			await existingOrientation.destroy();

			return res
				.status(200)
				.json({ message: "Orientation supprimée avec succès" });
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la suppression de l'orientation",
			});
		}
	},
};

module.exports = OrientationController;
