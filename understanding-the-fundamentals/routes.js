const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    // res 응답에 사용
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
    // 추후에 html을 쉽게 리턴하는 방법을 배울 것.
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    // 새 Chunk가 읽힐 준비가 될 때마다 데이터 이벤트가 발생하는 데에 Buffer가 도움을 줌
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // 들어오는 요청 데이터 혹은 전반적인 요청을 분석한 후에 실행
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // sync는 동기화를 의미 파일이 생성되기전까지 코드실행을 막는 메서드
      // fs.writeFileSync("message.txt", message);
      // 짧은 파일만을 사용하는경우 sync를 사용하지 않아도됨.
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  // 서버 중지 명령어
  // process.exit();
  // res 응답에 사용
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from may Node.js Server!</h1></body>");
  res.write("</html>");
  // 추후에 html을 쉽게 리턴하는 방법을 배울 것.

  // end 를 응답실행하고 난 다음에는 아무것도 실행하여주면 안됨.
  res.end();
};

module.exports = requestHandler;
