const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  // express에서 자동으로 header를 text/html 로 설정해준다. setHeader로 설정할수도 있다.
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
