const express = require("express");

const {
  createResturantController,
  getAllRestaurantController,
  getRestaurantController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//routes

//Create
router.post("/create", authMiddleware, createResturantController);

//Get all
router.get("/getAllRestaurant", getAllRestaurantController);

//Get single restaurant
router.get("/getRestaurant/:id", getRestaurantController);

//Get delete restaurant
router.delete(
  "/deleteRestaurant/:id",
  authMiddleware,
  deleteRestaurantController
);

module.exports = router;
