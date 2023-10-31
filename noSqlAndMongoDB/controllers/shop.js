const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
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
  const product = await Product.findById(prodId);

  res.render("shop/product-detail", {
    product: product,
    pageTitle: product?.title ?? "",
    path: "/products",
  });
};

exports.getIndex = async (req, res, next) => {
  try {
    const products = await Product.fetchAll();
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await req.user.getCart();

    const cartProducts = await cart.getProducts();

    res.render("shop/cart", {
      path: "/cart",
      pageTitle: "Your Cart",
      products: cartProducts,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const cart = await req.user.getCart();
    const cartProducts = await cart.getProducts({ where: { id: prodId } });

    let cartProduct;

    if (cartProducts.length > 0) {
      cartProduct = cartProducts[0];
    }

    let newQuantity = 1;

    if (cartProduct) {
      const oldQuantity = cartProduct.cartItem.quantity;
      newQuantity = oldQuantity + 1;
    }

    const product = await Product.findById(prodId);

    cart.addProduct(product, { through: { quantity: newQuantity } });

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;

  try {
    const cart = await req.user.getCart();

    const cartProducts = await cart.getProducts({ where: { id: prodId } });
    const cartProduct = cartProducts[0];

    await cartProduct.cartItem.destroy();

    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.postOrder = async (req, res, next) => {
  const cart = await req.user.getCart();

  const cartProducts = await cart.getProducts();

  const order = await req.user.createOrder();

  await order.addProducts(
    cartProducts.map((cartProduct) => {
      cartProduct.orderItem = { quantity: cartProduct.cartItem.quantity };
      return cartProduct;
    })
  );

  await cart.setProducts(null);

  res.redirect("/orders");
};

exports.getOrders = async (req, res, next) => {
  const orders = await req.user.getOrders({ include: ["products"] });
  console.log(orders);
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
    orders: orders,
  });
};
