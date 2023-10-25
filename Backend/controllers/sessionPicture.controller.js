const db = require("../models");

const SessionPicture = db.sessionPicture;

const SessionsPictureController = {
	async getAllSessionPictures(req, res) {
		try {
			const sessionPictures = await SessionPicture.findAll();
			const totalSessionPictures = await SessionPicture.count(); // Obtenir le nombre total d'images

			// Construire la chaîne Content-Range
			const contentRange = `pictures 0-${
				sessionPictures.length - 1
			}/${totalSessionPictures}`;

			// Définir l'en-tête Content-Range dans la réponse
			res.header("Content-Range", contentRange);
			console.log("Pictures:", sessionPictures);
			res.json(sessionPictures);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async getSessionPictureById(req, res) {
		try {
			const sessionPicture = await SessionPicture.findByPk(
				req.params.id
			);
			res.json(sessionPicture);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},

	async addSessionPicture(req, res) {
		try {
			upload(req, res, async (err) => {
				if (err) {
					res.status(400).json({ message: err.message });
				} else {
					const imagePath = req.file.filename;
					const createdSessionPicture = await SessionPicture.create({
						name: req.body.name,
						imagePath: imagePath,
					});
					res.status(201).json({
						message: "Image ajoutée avec succès",
						data: createdSessionPicture,
					});
				}
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async editSessionPicture(req, res) {
		try {
			const updatedSessionPicture = await SessionPicture.update(
				req.body,
				{
					where: {
						id: req.params.id,
					},
				}
			);

			if (updatedSessionPicture[0] === 0) {
				return res.status(404).json({ message: "Picture not found" });
			}

			const updateSessionPicture = await SessionPicture.findByPk(
				req.params.id
			);
			res.json({
				data: {
					id: updateSessionPicture.id,
					...updateSessionPicture.toJSON(),
				},
				message: "Picture Updated",
			});
		} catch (error) {
			res.json({ message: error.message });
		}
	},

	async deleteSessionPicture(req, res) {
		try {
			await SessionPicture.destroy({
				where: {
					id: req.params.id,
				},
			});
			res.json({
				message: "picture Deleted !!!",
			});
		} catch (error) {
			res.json({ message: error.message });
		}
	},
};

module.exports = SessionsPictureController;
