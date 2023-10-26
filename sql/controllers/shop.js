const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = async (req, res, next) => {
  try {
    const [rows] = await Product.fetchAll();

    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "All Products",
      path: "/products",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const [product] = await Product.findById(prodId);

  res.render("shop/product-detail", {
    product: product[0],
    pageTitle: product.title,
    path: "/products",
  });
};

exports.getIndex = async (req, res, next) => {
  try {
    const [rows] = await Product.fetchAll();
    res.render("shop/index", {
      prods: rows,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    const [rows] = Product.fetchAll((products) => {});

    const cartProducts = [];
    for (product of rows) {
      const cartProductData = cart.products.find(
        (prod) => prod.id === product.id
      );
      if (cartProductData) {
        cartProducts.push({ productData: product, qty: cartProductData.qty });
      }
    }
    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts,
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};