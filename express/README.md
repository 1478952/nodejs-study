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

미들웨어 사용시 "/" 라우팅에 대해서만 작동하기

- use([path], callback)

### 수신 요청 분석

bodyParser 라이브러리를 사용하면 본문을 쉽게 분석할 수 있다.

- app.use(bodyParser.urlencoded());

### POST 요청으로 미들웨어 실행 제한

app.get : GET 호출만 실행
app.post : POST 호출만 실행
과 같이 delete, put, patch 도 가능하다

### Express 라우터 사용

소스가 많아짐에 따라 라우터별로 소스를 구분해야 할 필요가있음.

- routes폴더(관례일뿐임 폴더명은 달라도됨)를 만들고 내부에 js 파일을 만들어준다
- express를 require하고 express.Router 함수로 route를 만들어주고 app.use를 사용했던것처럼 똑같이 미들웨어를 등록해준다.
- module.exports로 내보낸 뒤 app.js에서 app.use(라우터명) 으로 등록해주면 끝
- 순서신경써야함.

### 404 오류 페이지 추가

listen전에 미들웨어를 하나 추가해준다.
아무경로도 찾지 못했기때문에 해당 경로로 가게 되는것.
res.status(404).send() 로 상태코드를 전달해준다.

### 경로 필터링

app.js에서 app.use("/admin", 라우터명) 처럼 작성하게되면
/admin으로 시작하는 라우터가 등록되게된다

### HTML 페이지 생성

### HTML 페이지 서비스하기

html과 같은 파일을 응답시킬때는 res.sendFile 을 사용한다. express가 파일을 확인하고 타입을 자동으로 추론해준다.
경로가 다른 파일을 import할때에는 path 모듈을 사용할 것.
path.join(**dirname, "../", "views", "shop.html") 처럼 경로를 지정할 수 있다.
**dirname은 현재파일이 위치한 폴더의 절대경로를 불러와줌

### 404 페이지 반환

### 힌트

### 내비게이션을 위한 헬퍼 함수 사용

HTML 페이지 서비스하기 편에서 사용했던 경로지정 방법은 쪼끔 지저분하다.

util 함수를 만들어 경로를 조금 간소화시켜준다

// util/path.js
module.exports = require("path").dirname(require.main.filename);
루트폴더에 경로를 잡아준다.

const rootDir = require("../util/path");
path.join(rootDir, "views", "shop.html") 처럼 경로를 지정할 수 있다.

### 페이지 스타일링

### 정적으로 파일 서비스하기

pulbic 폴더를 생성하고 미들웨어에 등록해준다

```js
app.use(express.static(path.join(__dirname, "public")));
```
