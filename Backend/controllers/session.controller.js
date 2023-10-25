const db = require("../models");

const Session = db.session;

const SessionController = {
	async getSessions(req, res) {
		try {
			const response = await Session.findAll();
			const totalSessions = await Session.count(); // récupération du nombre total de sessions

			// Construire la chaîne Content-Range
			const contentRange = `Session 0-${
				response.length - 1
			}/${totalSessions}`;

			// Définir l'en-tête Content-Range dans la réponse
			res.header("Content-Range", contentRange);

			console.log(response);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async getSessionById(req, res) {
		try {
			const response = await Session.findOne({
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async getSessionsByUserId(req, res) {
		try {
			const userId = req.params.userId;
			const sessions = await Session.findAll({
				where: { userId }, // Filtrage des session par ID d'utilisateur
			});

			res.status(200).json(sessions);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async addSession(req, res) {
		try {
			const { comment, rate, isRating } = req.body;

			// Créez uns nouvelle session
			const newSession = await Session.create({
				comment,
				rate,
				isRating,
			});

			return res.status(201).json({
				session: newSession,
				message: "session créé avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la création de la session",
			});
		}
	},

	async deleteSession(req, res) {
		try {
			const sessionId = req.params.id; // Récupéreration l'ID de la sessionScan à supprimer

			// Vérification si la sessionScan existe
			const existingSession = await Session.findByPk(sessionId);
			if (!existingSession) {
				return res
					.status(404)
					.json({ message: "Session non trouvée" });
			}

			// Suppression de la sessionScan
			await existingSession.destroy();

			return res
				.status(200)
				.json({ message: "session supprimée avec succès" });
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la suppression de la session",
			});
		}
	},
};

module.exports = SessionController;
