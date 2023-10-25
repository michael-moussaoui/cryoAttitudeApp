const express = require("express");
const controller = require("../controllers/category.controller");

const router = express.Router();

router.get("/api/categories", controller.getCategories);
router.get("/api/categories/:id", controller.getCatgoryById);
router.post("/api/categories", controller.addCatgory);
router.put("/api/categories/:id", controller.editCategory);
router.delete("/api/categories/:id", controller.deleteCategory);

module.exports = router;
