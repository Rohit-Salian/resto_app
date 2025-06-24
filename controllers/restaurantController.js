const restaurantModel = require("../models/restaurantModel");

const createResturantController = async (req, res) => {
  try {
    // const restaurantData = req.body;

    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      rating,
      code,
      coords,
    } = req.body;

    if (!title || !coords)
      return res
        .status(500)
        .send({ success: false, message: "Provide title and coords" });

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      rating,
      code,
      coords,
    });

    await newRestaurant.save();
    res
      .status(201)
      .send({ success: true, message: "Restaurant created successfuly" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Create restuarant API " });
  }
};

const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants)
      return res.status(404).send({
        success: false,
        message: "No Restaurant available",
      });
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Get all restaurant api failed" });
  }
};

const getRestaurantController = async (req, res) => {
  try {
    //get id
    const id = req.params.id;
    if (!id)
      return res
        .status(404)
        .send({ success: true, message: "Please provide restaurant Id" });

    const restaurant = await restaurantModel.findById({ _id: id });
    if (!restaurant)
      return res
        .status(404)
        .send({ success: true, message: "No Restaurant found" });

    res
      .status(200)
      .send({ success: true, message: "Here is your restaurant", restaurant });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Get restaurant api failed" });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res
        .status(404)
        .send({ success: false, message: "Please provide ID" });

    await restaurantModel.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .send({ success: true, message: "Restaurant deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in Delete restaurant" });
  }
};

module.exports = {
  createResturantController,
  getAllRestaurantController,
  getRestaurantController,
  deleteRestaurantController,
};
