const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    try {
      if (this._id) {
        // updated product
        return getDb()
          .collection("users")
          .updateOne({ _id: this._id }, { $set: this });
      } else {
        return getDb().collection("users").insertOne(this);
      }
    } catch (error) {
      console.log(error);
    }
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };
    return getDb()
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  async getCart() {
    const productIds = this.cart.items.map((item) => item.productId);

    try {
      const products = await getDb()
        .collection("products")
        .find({ _id: { $in: productIds } })
        .toArray();

      return products.map((product) => {
        return {
          ...product,
          quantity: this.cart.items.find(
            (item) => item.productId.toString() === product._id.toString()
          ).quantity,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteItemFromCart(prodId) {
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== prodId.toString()
    );

    try {
      return getDb()
        .collection("users")
        .updateOne(
          { _id: this._id },
          { $set: { cart: { items: updatedCartItems } } }
        );
    } catch (error) {
      console.log(error);
    }
  }

  async addOrder() {
    try {
      const products = await this.getCart();

      await getDb()
        .collection("orders")
        .insertOne({
          items: products,
          user: {
            _id: this._id,
            username: this.username,
          },
        });
      this.cart = { items: [] };
      return getDb()
        .collection("users")
        .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders() {
    return getDb()
      .collection("orders")
      .find({ "user._id": this._id })
      .toArray();
  }

  static findById(userId) {
    try {
      // 하나의 값을 받을때엔 next()!
      // id값 비교시 ObjectId 생성자 사용!
      return getDb()
        .collection("users")
        .findOne({ _id: new ObjectId(userId) });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
