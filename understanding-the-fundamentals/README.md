## 기본 개념 이해

### 웹 작동 방식

유저/클라이언트 (Browser)

- 브라우저 앞에 앉아서 웹페이지를 방문 (브라우저에 URL을 입력)
- 도메인서버에 접근하여 요청을 보냄 (도메인? -> 서버의 주소를 사람이 읽을 수 있도록 인코딩한 버전)
- 따라서 브라우저는 언급했던 주어진 IP주소를 사용하여 해당서버에 요청을 보냄
- 해당서버가 인터넷에서 구동하는 코드를 작성하면 유입되는 요청을 처리하고 이를 활용할 수 있는 서버를 스핀 업하는 코드를 작성하게 됨.
- 이 과정에서 클라이언트로 응답을 보내주어야하는데 요청과응답 전송은 일부 프로토콜 (표준화된 소통 방식 http / https)을 통해 이루어짐
- http: Hyper Text Transfer Protocol, 어떠한 요청이 어떤 형태를 지니고 어떤 데이터가 브라우저 <-> 서버로 전송되어야 할지를 정의함
- https: Hyper Text Transfer Protocol Secure, 데이터가 실제로 암호화되는 ssl암호화가 켜져있는 방식

### Node 서버 생성

Node.js에는 몇가지 코어 모듈이 존재

- http : 서버를 생성하거나 http 요청 및 응답작업에 유용, 서버 출시 요청 전송 에 사용 다른 서버에도 요청을 보낼수가 있음.
- https : 모든 전송 데이터가 암호화되는 ssl암호화 서버를 구축할 때 사용
- fs : 파일
- path : 경로 구축 window, mac, linux가 각각 다른 형식을 사용한기 때문에 파일시스템에 있는 파일에 대한 경로 구축을 도와줌
- os : 운영체제 관련

### Node의 라이프사이클 및 이벤트 루프

node app.js 실행시

- 스크립트가 시작되어 Node.js가 파일 전체를 보고 코드를 분석한 후 변수와 함수를 등록함.
- Node.js의 이벤트루프는 작업이 실행되고 있는한 계속해서 작동하는 루프 프로세스로 이벤트 리스너가 있는 한 계속 작동함. 등록 후 제거하지않았던
  이벤트 리스너로 createServer에 요청 리스너가 실행되고 있음. 서버가 계속 운영되기 위해 제거하지 않아야함.
- 데이터베이스에 접근할때에도 데이터 요청을 넣으라는 메시지를 보내고 실행해야 하는 함수를 등록함. Node.js가 이벤트루프를 사용하는 이유는 싱글스레드
  Js를 실행하기 때문임. 즉 실행중인 컴퓨터에서 전체 노드 프로세스가 하나의 스레드를 사용함.
- 제거해야한다면 process.exit를 사용

### Node.js 프로세스 제어

### 요청의 이해

URL을 브라우저에 입력하는 경우 GET 메소드를 기본으로 사용함.

### 응답 전송

res로 응답데이터를 전송함

### 요청과 응답 헤더

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

### 라우터 요청

### 요청 리디렉션

상태코드 :302
Header에 Location을 심어줌

### 요청 본문 분석

Stream: 지속적인 프로세스 노드가 많은 양의 요청을 한 Chunk씩 읽고 어느시점엔 다 읽게 됨. 노드는 전체 Chunk를 다 읽지 않고도 각각의 파트를 읽을 수
있음 간단한 요청에 대해서는 이와 같은 방식이 필요하지 않음 입력 필드 데이터가 작을 때는 사용하지 않게됨 허나 업로드파일같은경우 상당히 오래 걸리기 때문에
데이터를 스트림하면 디스크에 쓸 수 가 있음 데이터가 들어오는 와중에 앱이 실행되는 하드 드라이브나 노드앱이 실행되는 서버에 쓸 수 있기 때문에 파일 전체가 분석 완료하고 전부 업로드 되기까지 아무것도 안하고 기다릴 필요가 없음.Node.js는 요청이 얼마나 크고 복잡한지 미리 알지 못하기 때문에 전부 이런 방식으로 데이터를 처리함.

하지만 데이터를 미리 다룰 수는 있음

문제는 코드를 사용해 Chunk를 마음대로 다룰 수는 없고 들어오는 Chunk를 체계화 하기 위해 소위 말하는 Buffer를 사용함.

Buffer? -> 버스정류장과 비슷함 버스는 항상 달리지만 승객이 버스에 타고 내릴 수 있으려면 버스를 찾기 쉽도록 버스 정류장이 있음.
여러개의 Chunk를 보유하고 파싱이 끝나기 전에 작업할 수 있도록 함

### 이벤트 기반 코드 실행의 이해

Node.js에서는 코드를 작성하는 순서대로 실행되는 것이 아니다.

콜백함수를 지정하면 안에넣은 함수를 나중에 실행함. 항상 나중에 실행되는건 아니다.

이벤트와 이벤트 리스너가 Node.js 내부적으로 실행됨.

### 블로킹 및 논블로킹 코드

이벤트 드리븐 아키텍처에서는 Node.js에게 작업을 진행하도록 지시하며 이후 Node.js가 해당 프로세스를 멀티 스레딩을 사용하는 운영체제에 전달하며 이벤트 콜백을 파악하기 위해 이벤트 루프를 계속하면서 코드실행을 막지 않도록 작은 조치사항을 발송하고 운영체제에서 작업이 끝난 뒤에는 항상 복귀하는 식의 구조를 지님.

### Node.js 백그라운드 확인

스레드

- 운영체제에서의 프로세스

요청 A가 처리중이면 요청 B의 처리가 불가한지?
정답은? X 둘다 처리가능함

이벤트루프는 Node.js가 시작되면 프로그램에 의해 자동으로 시작됨. 이벤트 루프는 이벤트 콜백을 다룸 createServer등 on 메소드에서 사용
파일시스템에 대해서 이벤트루프는 관여하지 않음.
이벤트루프는 빨리 끝낼 수 있는 코드를 포함한 콜백만을 다룸
파일시스템 연산등의 오래걸리는 연산은 워커풀에 보내짐. 워커풀 또한 Node.js가 자동으로 시작하고 관리함
워커풀은 Js코드로부터 완전히 분리되어 다른 여러 스레드에서 작동할 수 있으며 앱을 실행하는 운영체제와 깊은 연관이 있음.
코드로부터 분리되어 무거운 작업을 실행함.
워커가 작업을 마치면 이벤트루프의 콜백을 실행시키는데 Node.js가 해당작업에 알맞은 콜백을 실행시킴

Node.js에서의 이벤트루프

- Timer Phase
  - 이벤트 루프가 시작하는 단계다. setTimeout이나 setInterval과 같은 함수를 통해 만들어진 타이머들을 큐에 넣고 실행한다.
    큐에 들어가는 타이머들은 실행할 시간이 같거나 지난 타이머들이다. 실행시간을 측정하는 기준은 now - registeredTime >= delta 와 같이 계산한다. 여기서 delta는 setTimeout 등에 매개변수로 사용되는 ms이다.
    큐에 들어가기 이전의 타이머들은 최소 힙으로 관리된다. 최소 힙은 가장 낮은 수의 노드를 루트로 가지는 자료구조이다. 타이머들이 들어있는 최소 힙에서는 실행시간이 기준이 되고 실행시간이 가장 적게 남은 타이머가 항상 루트가 된다. 그렇기 때문에 타이머를 매번 정렬할 필요 없이 항상 가장 먼저 실행될 타이머를 알 수 있다.
    Timer 단계에서는 최소 힙의 타이머들을 순차적으로 찾아 실행하고 힙을 재구성한다. 이 때 순차적으로 타이머를 실행하기 때문에 특정 타이머가 아직 실행하지 않을 단계라면 그 이후의 타이머들은 검사를 생략한다.
- Pending Callbacks Phase
  - 이전 작업들의 콜백이 pending_queue에서 대기 중인지 검사한다. 만약 대기 중인 콜백이 있다면 시스템 실행 한도에 도달할 때까지 꺼내어 실행한다.
    여기서 큐에 들어있는 콜백들은 현재 돌고 있는 루프 이전의 작업에서 큐에 들어온 콜백이다.
- Idle, Prepare Phase
  - 노드의 내부 동작을 위한 단계이다.
- Poll Phase
  - 이벤트 루프 중 가장 중요한 단계이다. 새로운 io 이벤트를 가져와서 관련 콜백을 수행한다. 예를 들면 소켓 연결과 같이 새로운 커넥션이나,
    파일 읽기 같은 데이터 처리 수행한다.
    이 단계에서는 watch_queue를 가지고 있다. 해당 큐가 비어있지 않다면 동기적으로 모든 콜백을 실행한다.
    실행은 큐가 비거나 시스템 실행 한도에 다다를 때까지이다.
    watchqueue의 작업을 모두 처리하면(= 큐가 비면) checkqueue, pendingqueue, closingcallbacks_queue에 남은 작업이 있는지 검사하고 다음 작업이 있다명 다음 단계로 이동한다.
    만약 다른 큐에도 작업이 없다면 다음 타이머의 실행 시점까지 대기한다. 모든 큐가 비었다면 무의미하게 이벤트 루프를 돌게 되기 때문에 대기하는 것이다.
- Check Phase
  - setImmediate의 콜백만을 위한 단계이다.
    check_queue가 비거나 실행한도에 도달할 때까지 콜백을 수행한다.
- Close Callbacks Phase
  - close나 destroy 등의 이벤트, 타입의 콜백이 처리되는 단계이다. 이벤트 루프는 Close 콜백 단계를 마치면 이벤트 루프를 한 번 더 돌지,
    종료할지를 검사한다. 만약 처리해야할 작업이 남아있지 않다면 이벤트 루프를 종료한다.

### Node 모듈 시스템 사용

Node.js에서는 CommonJS를 사용하며

module.exports 로 내보내기가 가능하다.

```js
module.exports = {
  a: a,
  b: b,
};
```

와 같이 객체로 여러개를 내보내기도 가능하다

require로 import가 가능