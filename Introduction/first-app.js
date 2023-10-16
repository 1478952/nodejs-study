const fs = require("fs");

console.log("Hello from Node.js");

// 하드 드라이브에 파일생성 하는 메소드 (파일명, 파일내용)
fs.writeFileSync("hello.txt", "Hello from Node.js");
