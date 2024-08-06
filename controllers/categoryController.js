import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res
        .status(401)
        .send({ message: "name is required", success: false });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(200)
        .send({ message: "category already exists", success: true });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    return res
      .status(201)
      .send({ success: true, message: "new category created", category });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in cateory",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    console.log(name, id, 1 + 2);
    return res.status(200).send({
      success: true,
      message: "category added successfully",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in cateory",
      error,
    });
  }
};

const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();
    return res.status(200).send({
      success: true,
      message: "all categories list",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in getting cateories",
      error,
    });
  }
};

const singleCategoyController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoryModel.findOne({ slug });
    return res.status(200).send({
      success: true,
      message: "requested catgeory",
      category,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "error in getting single cateogory",
      error,
    });
  }
};
export {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoyController,
};
