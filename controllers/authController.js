const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//Register
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;
    //validation
    if (!username || !email || !password || !phone || !address || !answer)
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });

    // check user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser)
      return res.status(500).send({
        success: false,
        message: "Email already registered please login",
      });

    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "User created Successfuly",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//Login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password)
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });

    //check user
    const user = await userModel.findOne({
      email,
    });

    if (!user)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    // check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res
        .status(500)
        .send({ success: false, message: "Invalid Credentials" });

    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      message: "error in login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
