## Express.js 작업

### Express.js 란?

서버측 논리를 모두 직접 작성하는것은 상당히 복잡함.

- 기존에는 한가지 종류의 데이터를 추출하기위해 data 이벤트와 end 이벤트를 핸들링하고 버퍼를 문자열로 변환하는 등 여러가지 작업을 해야했음.
- express가 내부 데이터핸들링을 직접 해주는 것은 아니나 외부 패키지와 연결을 쉽게 이루어줌
- 자잘한 데이터핸들링을 작성하기보다는 앱을 정의하는 코드 고유의 장점에 집중할 수 있음.

### Express.js 설치

npm i express

```js
const express = require("express");

const app = express();

// 서버생성시 필요한 메소드
const server = http.createServer(app);
```

### 미들웨어 추가

미들웨어?

- 들어오는 요청을 express에 의한 다양한 함수를 통해 자동으로 이동하는 것
- 단일 요청 핸들러를 사용하는 대신 응답 전송 전까지 요청을 통과할 다양한 함수들을 연결함

request -> middleware(next) -> middleware(res.send()) -> response

```js
app.use((req, res, next) => {
  console.log("In the middleware!");
  next();
});

app.use((req, res, next) => {
  console.log("In another middleware!");
  res.send("<h1>Hello</h1>");
});
```

### 미들웨어 작동 방식

- 응답을 내보내지 않을거면 next 함수를 호출해주어야 한다.

### Express.js 백그라운드 확인

- express 소스는 오픈소스이며 github에서 확인가능하다.

### 다른 라우트 사용법

### 수신 요청 분석

### POST 요청으로 미들웨어 실행 제한

### Express 라우터 사용

### 404 오류 페이지 추가

### 경로 필터링

### HTML 페이지 생성

### HTML 페이지 서비스하기

### 404 페이지 반환

### 힌트

### 내비게이션을 위한 헬퍼 함수 사용

### 페이지 스타일링

### 정적으로 파일 서비스하기
