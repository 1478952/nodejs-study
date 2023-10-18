const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

// 매장관리자 제품 생성
const router = express.Router();

// 미들웨어 추가
// next: 다음 미들웨어로 요청이 이동할 수 있도록 해주는 함수
router.get("/add-product", (req, res, next) => {
  // console.log("In the middleware!");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  console.log("add product", req.body);

  res.redirect("/");
});

module.exports = router;
