const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct);

router.get("/products", getProducts);

router.get("/edit-product/:productId", getEditProduct);

router.post("/edit-product", postEditProduct);

router.post("/add-product", postAddProduct);

router.post("/delete-product", postDeleteProduct);

exports.routes = router;
