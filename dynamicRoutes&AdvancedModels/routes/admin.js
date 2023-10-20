const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
} = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/products", getProducts);

router.get("/edit-product", getEditProduct);

router.post("/add-product", postAddProduct);

exports.routes = router;
