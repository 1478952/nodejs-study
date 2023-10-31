const { MongoClient } = require("mongodb");

let _db;

const mongoConnect = (cb) => {
  MongoClient.connect(
    "mongodb+srv://1478952:rlawjddns@cluster0.pjcihw4.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      cb(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

module.exports = {
  mongoConnect,
  getDb,
};
