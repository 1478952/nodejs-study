const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  try {
    // 관계설정시 자동으로 메소드가 생성됨.
    await req.user.createProduct({
      title,
      imageUrl,
      price,
      description,
    });
    // await Product.create({
    //   title,
    //   imageUrl,
    //   price,ㅇ
    //   description,
    // });
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  // req.user.getProducts({ where: { id: prodId } });
  const product = await Product.findByPk(prodId);
  if (!product) {
    return res.redirect("/");
  }
  res.render("admin/edit-product", {
    pageTitle: "Edit Product",
    path: "/admin/edit-product",
    editing: editMode,
    product: product,
  });
};

exports.postEditProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const product = await Product.findByPk(prodId);

  try {
    product.title = updatedTitle;
    product.imageUrl = updatedImageUrl;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.title = updatedTitle;
    await product.save();
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await req.user.getProducts();
    // const products = await Product.findAll();
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  try {
    const product = await Product.findByPk(prodId);
    await product.destroy();
    res.redirect("/admin/products");
  } catch (error) {
    console.log(error);
  }
};
