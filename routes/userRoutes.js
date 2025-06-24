const express = require("express");
const {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//routes
//Get user | GET
router.get("/getUser", authMiddleware, getUserController);

// update user | PUT
router.put("/updateUser", authMiddleware, updateUserController);

// Reset passowrd | POST
router.post("/resetPassword", authMiddleware, resetPasswordController);

// Update passowrd | POST
router.post("/updatePassword", authMiddleware, updatePasswordController);

//Delete User | Delete
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
