const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const restaurantModel = require("../models/restaurantModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      image,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price)
      return res
        .status(500)
        .send({ success: false, message: "Please provide price or blah blah" });
    const newFood = new foodModel({
      title,
      description,
      price,
      image,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(201).send({ success: true, message: "New food added" });
  } catch (error) {
    console.log(error),
      res
        .status(500)
        .send({ success: false, message: "Error in create food Api" });
  }
};

const getAllFoodController = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods)
      return res
        .status(500)
        .send({ success: false, message: "No Foods were found" });
    res.status(200).send({
      success: true,
      message: "Foods found",
      count: foods.length,
      foods,
    });
  } catch (error) {
    console.log(error),
      res
        .status(500)
        .send({ success: false, message: "Error in get all food Api" });
  }
};

const getFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId)
      return res
        .status(500)
        .send({ success: false, message: "No ID Provided" });

    const food = await foodModel.find({ _id: foodId });
    if (!food)
      return res.status(500).send({ success: false, message: "No Food found" });

    res.status(500).send({
      success: true,
      message: "Food found",
      food,
    });
  } catch (error) {
    console.log(error),
      res
        .status(500)
        .send({ success: false, message: "Error in get all food Api" });
  }
};

const getFoodByRestController = async (req, res) => {
  try {
    const restId = req.params.id;

    if (!restId)
      return res
        .status(500)
        .send({ success: false, message: "No ID Provided" });

    const food = await foodModel.find({ restaurant: restId });
    if (!food)
      return res.status(500).send({ success: false, message: "No Food found" });

    res.status(500).send({
      success: true,
      message: "Food found",
      food,
    });
  } catch (error) {
    console.log(error),
      res
        .status(500)
        .send({ success: false, message: "Error in get all food Api" });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const getFoodId = req.params.id;
    if (!getFoodId)
      return res.status(404).send({
        success: false,
        message: "Please provide ID",
      });

    const food = await foodModel.findById(getFoodId);

    if (!food)
      return res.status(500).send({ success: false, message: "No Food found" });
    const {
      title,
      description,
      price,
      image,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    const updatedFood = await foodModel.findByIdAndUpdate(
      getFoodId,
      {
        title,
        description,
        price,
        image,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
        ratingCount,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food updated",
      updatedFood,
    });
  } catch (error) {
    console.log(error),
      res
        .status(500)
        .send({ success: false, message: "Error in update food Api" });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const getId = req.params.id;

    if (!getId)
      return res.status(404).send({
        success: false,
        message: "POlease provide Id ",
      });

    const food = await foodModel.findById(getId);
    if (!food)
      return res.status(404).send({
        success: false,
        message: "No Food found",
      });

    await foodModel.findByIdAndDelete(getId);
    res.status(200).send({
      success: true,
      message: "Food item deleted",
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({ success: false, message: "Error in Delete Food Api" });
  }
};

const orderFoodController = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    if (!cart)
      return res
        .status(500)
        .send({ success: false, message: "please add food or payment method" });

    //calculate cart
    let total = 0;
    cart.map((food) => (total += food.price));

    const order = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    res
      .status(201)
      .send({ success: true, message: "Order created sucessfully", order });
    await order.save();
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error in order api" });
  }
};

const changeOrderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId)
      return res
        .status(500)
        .send({ success: false, message: "No order ID found" });

    const { status } = req.body;
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res
      .status(200)
      .send({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Change order api" });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getFoodController,
  getFoodByRestController,
  updateFoodController,
  deleteFoodController,
  orderFoodController,
  changeOrderStatusController,
};
