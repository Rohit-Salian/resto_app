const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getFoodController,
  getFoodByRestController,
  updateFoodController,
  deleteFoodController,
  orderFoodController,
  changeOrderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

//routes
// Create food
router.post("/create", authMiddleware, createFoodController);

// get all food
router.get("/getAll", getAllFoodController);

// get by id food
router.get("/get/:id", getFoodController);

// get by rest food
router.get("/getFoodbyRest/:id", getFoodByRestController);

// update food
router.put("/update/:id", authMiddleware, updateFoodController);
// delete food
router.delete("/delete/:id", authMiddleware, deleteFoodController);

// order food
router.post("/order", authMiddleware, orderFoodController);

// order Status
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  changeOrderStatusController
);

module.exports = router;
