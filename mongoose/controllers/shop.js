const Order = require("../models/order");
const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
    const product = await Product.findById(prodId);
    res.render("shop/product-detail", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await req.user.populate("cart.items.productId").execPopulate();
    const products = user.cart.items;

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: products,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;

  const product = await Product.findById(prodId);

  await req.user.addToCart(product);

  res.redirect("/cart");
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    await req.user.deleteItemFromCart(prodId);

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res, next) => {
  const user = await req.user.populate("cart.items.productId").execPopulate();
  const products = user.cart.items.map((item) => {
    return {
      quantity: item.quantity,
      product: { ...item.productId._doc },
    };
  });

  const order = new Order({
    user: {
      name: req.user.name,
      userId: req.user,
    },
    products: products,
  });

  await order.save();
  await req.user.clearCart();

  res.redirect("/orders");
};

exports.getOrders = async (req, res, next) => {
  const orders = await Order.find({
    "user.userId": req.user._id,
  });

  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders: orders,
  });
};
