const db = require("../models");

const Objective = db.objective;

const ObjectiveController = {
	async getObjectives(req, res) {
		try {
			const response = await Objective.findAll();
			const totalObjectives = await Objective.count();

			// Construire la chaîne Content-Range
			const contentRange = `objectives 0-${
				response.length - 1
			}/${totalObjectives}`;

			// Définir l'en-tête Content-Range dans la réponse
			res.header("Content-Range", contentRange);

			console.log(response);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async getObjectiveById(req, res) {
		try {
			const response = await Objective.findOne({
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async addObjective(req, res) {
		try {
			const { description } = req.body;

			// Vérifiez si l'objectif existe déjà
			const existingObjective = await Objective.findOne({
				where: { description },
			});
			if (existingObjective) {
				return res
					.status(400)
					.json({ message: "Cet objectif existe déjà" });
			}

			// Créez un nouveau objectif
			const newObjective = await Objective.create({
				description,
			});

			return res.status(201).json({
				objective: newObjective,
				message: "Objectif créé avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la création de l'objectif",
			});
		}
	},

	async editObjective(req, res) {
		try {
			const objectiveId = req.params.id; // Récupérer l'ID de l'objectif à éditer
			const { description } = req.body;

			// Vérifier si l'objectif existe
			const existingObjective = await Objective.findByPk(objectiveId);

			if (!existingObjective) {
				return res
					.status(404)
					.json({ message: "Objectif non trouvé" });
			}

			// Mettre à jour les informations de l'objectif
			existingObjective.description = description;

			// Enregistrez les modifications
			await existingObjective.save();

			return res.status(200).json({
				objective: existingObjective,
				message: "objectif mis à jour avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la mise à jour de l'objectif",
			});
		}
	},

	async deleteObjective(req, res) {
		try {
			const objectiveId = req.params.id; // Récupéreration l'ID de l'objectif à supprimer

			// Vérification si l'objectif existe
			const existingObjective = await Objective.findByPk(objectiveId);
			if (!existingObjective) {
				return res
					.status(404)
					.json({ message: "Objective non trouvé" });
			}

			// Suppression de l'objectif
			await existingObjective.destroy();

			return res
				.status(200)
				.json({ message: "objectif supprimé avec succès" });
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la suppression de l'objectif",
			});
		}
	},
};

module.exports = ObjectiveController;
