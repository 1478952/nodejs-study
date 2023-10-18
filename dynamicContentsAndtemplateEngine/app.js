const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// 서드파티 미들웨어 등록 본문분석 라이브러리
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// adminRoutes의 모든 경로 앞에 /admin을 추가
app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});

// 서버생성시 필요한 메소드
app.listen(3000);
