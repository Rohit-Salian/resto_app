const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// get USER info
const getUserController = async (req, res) => {
  try {
    //find user
    // _id : 0 to hide id
    const user = await userModel.findById({ _id: req.body.id }, { _id: 0 });

    //validation
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User Not found" });

    //hide password
    user.password = undefined;

    res
      .status(200)
      .send({ success: true, message: "User found Sucessfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get User Api",
    });
  }
};

// update USER info
const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });

    //update
    const { username, address, phone } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    // save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update User API",
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    //find user
    const { email, newPassword, answer } = req.body;

    if (!email || !newPassword || !answer)
      return res
        .status(500)
        .send({ success: false, message: "Please provide all fields" });

    const user = await userModel.findOne({ email, answer });
    if (!user)
      return res.status(500).send({ success: false, message: "No user found" });

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.save();
    res
      .status(200)
      .send({ success: true, message: "Password changed succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in rest password API",
      error,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res
        .status(500)
        .send({ success: false, message: "Please provide all fields" });

    // check user password | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(500).send({
        success: false,
        message: "Invalid old Password",
      });
    const isSamePassword = await bcrypt.compare(oldPassword, newPassword);

    if (isSamePassword)
      return res.status(500).send({
        success: false,
        message: "New password cannot be old password",
      });

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated succesfuly",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Update password APi" }),
      error;
  }
};

const deleteUserController = async (req, res) => {
  try {
    // find user
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Your acc has been deleted",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Update password APi" }),
      error;
  }
};

module.exports = {
  getUserController,
  updateUserController,
  resetPasswordController,
  updatePasswordController,
  deleteUserController,
};
