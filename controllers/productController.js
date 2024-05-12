const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");

const comResp = { M: "", A: 0, E: "", Result: {} };

const GetProducts = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find({});
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const GetSinglePoduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const AddProduct = asyncHandler(async (req, res) => {
  let resp = { ...comResp };
  try {
    const totprd = await Product.find();
    console.log(totprd.length);
    if (totprd.length < 10) {
      const newproduct = await Product.create(req.body);
      res.status(200).json(newproduct);
    } else {
      resp.A = 0;
      resp.E = "Products exceeded the limit of 10!!";
      res.status(400).json(resp);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const UpdateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      res.status(404);
      throw new Error(`Unable to find product with id ${id}`);
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404);
      throw new Error(`Cannot delete the data with id ${id}`);
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

module.exports = {
  GetProducts,
  GetSinglePoduct,
  AddProduct,
  UpdateProduct,
  deleteProduct,
};
