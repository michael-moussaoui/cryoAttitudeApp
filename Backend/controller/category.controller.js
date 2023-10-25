const db = require("../models");

const Category = db.category;

const CategoryController = {
	async getCategories(req, res) {
		try {
			const response = await Category.findAll();
			const totalCategories = await Category.count(); // récupération du nombre total des catégories

			// Construire la chaîne Content-Range
			const contentRange = `categories 0-${
				response.length - 1
			}/${totalCategories}`;

			// Définir l'en-tête Content-Range dans la réponse
			res.header("Content-Range", contentRange);

			console.log(response);
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async getCatgoryById(req, res) {
		try {
			const response = await Category.findOne({
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json(response);
		} catch (error) {
			res.status(500).json({ msg: error.message });
		}
	},

	async addCatgory(req, res) {
		try {
			const { name } = req.body;

			// Vérification si la catégorie existe déjà
			const existingCategory = await Category.findOne({
				where: { name },
			});
			if (existingCategory) {
				return res
					.status(400)
					.json({ message: "Cette catégorie existe déjà" });
			}

			// Création une nouvelle catégorie
			const newCategory = await Category.create({
				name,
			});

			return res.status(201).json({
				category: newCategory,
				message: "Catégorie créé avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la création de la catégorie",
			});
		}
	},

	async editCategory(req, res) {
		try {
			const categoryId = req.params.id; // Récupéreration l'ID de la catégorie à éditer
			const { name } = req.body;

			// Vérification si la catégorie existe
			const existingCategory = await Category.findByPk(categoryId);

			if (!existingCategory) {
				return res
					.status(404)
					.json({ message: "Catégorie non trouvée" });
			}

			// Mise à jour des informations de la catégorie
			existingCategory.name = name;

			// Enregistrement des modifications
			await existingCategory.save();

			return res.status(200).json({
				category: existingCategory,
				message: "Catégorie mise à jour avec succès",
			});
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la mise à jour de la catégorie",
			});
		}
	},

	async deleteCategory(req, res) {
		try {
			const categoryId = req.params.id; // Récupérer l'ID de la catégorie à supprimer

			// Vérification si la catégorie existe
			const existingCategory = await Category.findByPk(categoryId);
			if (!existingCategory) {
				return res
					.status(404)
					.json({ message: "Catégorie non trouvée" });
			}

			// Suppression de la catégorie
			await existingCategory.destroy();

			return res
				.status(200)
				.json({ message: "Catégorie supprimée avec succès" });
		} catch (error) {
			return res.status(500).json({
				message:
					"Une erreur est survenue lors de la suppression de la catégorie",
			});
		}
	},
};

module.exports = CategoryController;
