const categoryModel = require("../models/categoryModel");

const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    if (!title)
      res.status(500).send({
        succes: false,
        message: "Please provide category title and Image url ",
      });

    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    res.status(201).send({
      succes: true,
      message: "Category created successfuly",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ succes: false, message: "Create category api failed" });
  }
};

const getAllCategoryController = async (req, res) => {
  try {
    const allCategories = await categoryModel.find({});
    if (!allCategories)
      return res
        .status(500)
        .send({ succes: false, message: "No Categories exist" });
    res.status(201).send({
      succes: true,
      message: "All Category fetched successfuly",
      count: allCategories.length,
      allCategories,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ succes: false, message: "Create category api failed" });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, imageUrl } = req.body;
    if (!id)
      return res
        .status(500)
        .send({ succes: false, message: "Please provide id" });

    const isCategoryExist = await categoryModel.findByIdAndUpdate(
      id,
      {
        title,
        imageUrl,
      },
      { new: true }
    );
    if (!isCategoryExist)
      return res
        .status(500)
        .send({ succes: false, message: "Category dont exist" });

    res
      .status(200)
      .send({ succes: true, message: "Category Updated", isCategoryExist });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ succes: false, message: "Uppdate category api failed" });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(500).send({
        success: false,
        message: "Please provide id to delete",
      });

    await categoryModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ succes: false, message: "Delete category api failed" });
  }
};
module.exports = {
  createCategoryController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
