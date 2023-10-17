const express = require("express");

const app = express();

// 미들웨어 추가
// next: 다음 미들웨어로 요청이 이동할 수 있도록 해주는 함수
app.use((req, res, next) => {
  console.log("In the middleware!");
  next();
});

app.use((req, res, next) => {
  console.log("In another middleware!");

  // express에서 자동으로 header를 text/html 로 설정해준다. setHeader로 설정할수도 있다.
  res.send("<h1>Hello</h1>");
});

// 서버생성시 필요한 메소드
app.listen(3000);
