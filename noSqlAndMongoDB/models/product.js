const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

class Product {
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id ? new ObjectId(id) : null;
  }

  async save() {
    try {
      if (this._id) {
        // updated product
        return getDb()
          .collection("products")
          .updateOne({ _id: this._id }, { $set: this });
      } else {
        return getDb().collection("products").insertOne(this);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchAll() {
    try {
      return getDb().collection("products").find().toArray();
    } catch (error) {
      console.log(error);
    }
  }

  static async findById(prodId) {
    try {
      // 하나의 값을 받을때엔 next()!
      // id값 비교시 ObjectId 생성자 사용!
      return getDb()
        .collection("products")
        .find({ _id: new ObjectId(prodId) })
        .next();
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteById(prodId) {
    try {
      return getDb()
        .collection("products")
        .deleteOne({ _id: new ObjectId(prodId) });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Product;
