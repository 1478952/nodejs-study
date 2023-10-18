## 소개

Node.js Chrome V8 JavaScript 엔진을 기반으로 하는 서버 측 자바스크립트 런타임 환경으로 브라우저가 아닌 환경에서도 작동 할 수 있도록 해준다.

설치 후

node 명령어를 입력하면 PEPL이 실행된다

기본적으로는 소스코드를 작성하는게 낫다.

js파일을 작성하고 node first-app.js 명령어로 해당 스크립트를 실행시킨다.

## Node.js 역할과 사용법 이해

클라이언트는 브라우저를 사용할 수도 있고 우리는 html,css,js를 사용해서 웹페이지를 구성할 수 있다.

클라이언트가 브라우저에 URL을 입력 -> 서버에 요청을 보낸다

서버?

- 인터넷에서 실행 중인 컴퓨터로 해당 도메인과 관련된 IP를 가지고 있으며 자동을 할당됨.
- 우리는 주로 들어오는 요청을 응답해주는 것을 구현할 예정임.
- 모두는 그렇진 않지만 대부분의 응답은 브라우저가 표시할 수 있는 HTML페이지의 형태이다.
- 일반적으로 보안상의 이유로 인해 브라우저에서 할 수 없거나 하고 싶지 않은 작업을 수행한다. (데이터 저장, 데이터 불러오기, 데이터베이스 접속, 사용자 인증, 사용자 입력값 검증 등)
- 서버는 유저가 직접 액세스할 수 없기 때문에 안전하다

일반적으로 Node.js는 웹개발이나 서버사이드 코드를 작성할 때 많이 사용된다.