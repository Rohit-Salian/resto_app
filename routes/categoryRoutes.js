const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createCategoryController,

  updateCategoryController,
  getAllCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

//create category
router.post("/create", authMiddleware, createCategoryController);
router.get("/get", authMiddleware, getAllCategoryController);
router.put("/put/:id", authMiddleware, updateCategoryController);
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;
