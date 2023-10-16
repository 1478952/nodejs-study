const http = require("http");
const requestHandler = require("./routes");

// 서버생성시 필요한 메소드
const server = http.createServer(requestHandler);

// 스크립트를 종료하지 않고 계속 실행하여 요청을 듣도록 함
server.listen(3000);
