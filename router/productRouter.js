const express = require("express");

const Product = require("../models/productModel");
const {
  GetProducts,
  GetSinglePoduct,
  AddProduct,
  UpdateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/AllProducts", GetProducts);
router.get("/Getproduct/:id", GetSinglePoduct);

router.post("/Addproduct", AddProduct);

router.put("/Updateproduct/:id", UpdateProduct);

router.delete("/deleteProduct/:id", deleteProduct);

module.exports = router;
