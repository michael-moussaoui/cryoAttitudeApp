const db = require("../models");

const ObjectiveChoice = db.objectiveChoice;

const ObjectiveChoiceController = {
	async getAllObjectiveChoices(req, res) {
		try {
			const objectiveChoices = await ObjectiveChoice.findAll({
				// include: ["Objective", "ChoiceSession"],
			});
			const totalObjectiveChoices = await ObjectiveChoice.count();

			// Construire la chaîne Content-Range
			const contentRange = `objectiveChoice 0-${
				objectiveChoices.length - 1
			}/${totalObjectiveChoices}`;

			// Définir l'en-tête Content-Range dans la réponse
			res.header("Content-Range", contentRange);
			console.log("ObjectiveChoices:", objectiveChoices);
			res.json(objectiveChoices);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async getObjectiveChoiceById(req, res) {
		try {
			const objectiveChoice = await ObjectiveChoice.findByPk(
				req.params.id
			);
			res.json(objectiveChoice);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async addObjectiveChoice(req, res) {
		try {
			const { description, IdObjective, IdChoiceSession } = req.body;

			if (!description || !IdObjective || !IdChoiceSession) {
				return res.status(400).json({
					message:
						"Missing required fields: description, ObjectiveId, ChoiceSessionId",
				});
			}
			const createdObjectiveChoice = await ObjectiveChoice.create({
				description,
				IdObjective,
				IdChoiceSession,
			});
			res.status(201).json({
				message: "Choix de l'objectif ajouté avec succès",
				data: createdObjectiveChoice,
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async editObjectiveChoice(req, res) {
		try {
			const id = req.params.id;
			const { description, IdObjective, IdChoiceSession } = req.body;

			if (!description || !IdObjective || !IdChoiceSession) {
				return res.status(400).json({
					message:
						"Missing required fields: description, ObjectiveId, ChoiceSessionId",
				});
			}

			const existingObjectiveChoice = await ObjectiveChoice.findByPk(
				id
			);

			if (!existingObjectiveChoice) {
				return res
					.status(404)
					.json({ message: "ObjectiveChoice not found" });
			}

			existingObjectiveChoice.description = description;
			existingObjectiveChoice.IdObjective = IdObjective;
			existingObjectiveChoice.IdChoiceSession = IdChoiceSession;

			await existingObjectiveChoice.save();

			res.status(200).json({
				message: "ObjectiveChoice updated successfully",
				data: existingObjectiveChoice,
			});
		} catch (error) {
			res.status(500).json({
				message:
					"An error occurred while updating the ObjectiveChoice",
				error: error.message,
			});
		}
	},

	async deleteObjectiveChoice(req, res) {
		try {
			await ObjectiveChoice.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.json({
				message: "ObjectiveChoice Deleted !!!",
			});
		} catch (error) {
			res.json({ message: error.message });
		}
	},
};

module.exports = ObjectiveChoiceController;
