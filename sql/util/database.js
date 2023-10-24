// db 연결 객체 구성
// 커넥션 풀 방식

const mysql = require("mysql2");

const pool = mysql.createPool({
  // ip
  host: "localhost",
  // mysql 설정 유저명
  user: "root",
  // 사용할 스키마
  database: "node-complete",
  // mysql 비밀번호
  password: "rlawjddns1!",
});

module.exports = pool.promise();
