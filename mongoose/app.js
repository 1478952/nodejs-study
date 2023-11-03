const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findOne()
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://1478952:rlawjddns@cluster0.pjcihw4.mongodb.net/shop?retryWrites=true&w=majority"
    );
    const findUser = User.findOne();
    if (!findUser) {
      const user = new User({
        name: "kjw",
        email: "kjw@naver.com",
        cart: {
          items: [],
        },
      });
      user.save();
    }
    app.listen(3000);
  } catch (error) {
    console.log(err);
  }
};

connect();
