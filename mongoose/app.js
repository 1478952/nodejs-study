const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const User = require('./models/user');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
// User.findById('5baa2528563f16379fc8a610')
// .then(user => {
// req.user = new User(user.name, user.email, user.cart, user._id);
// next();
// })
// .catch(err => console.log(err));
// });

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://1478952:rlawjddns@cluster0.pjcihw4.mongodb.net/shop?retryWrites=true&w=majority"
    );
    app.listen(3000);
  } catch (error) {
    console.log(err);
  }
};

connect();
