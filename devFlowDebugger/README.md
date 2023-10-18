## 개선된 개발 워크플로우 및 디버깅

### NPM 스크립트의 이해

NPM : Node Package Manager

- Node.js 내부에 설치되어 있음.
- 코어 모듈에 포함되어있지 않은 패키지를 설치 할 수 있음
- npm init 으로 package.json을 설치가능 (package.json은 프로젝트 명세서 같은개념)
- 스크립트는 명령어를 간단하게 작성할 수 있도록 도와주는 것

### 제3자 패키지 설치하기

npm 클라우드 저장소에는 좀더 쉬운 프로젝트 구현을 위한 3rd Party 패키지들이 존재한다.
npm 을 사용하여 간편하게 설치 및 관리할 수 있다.

npm i {package-name} -D(개발용) -g(해당머신 전체에 설치유무)

설치한 패키지는 node_modules에 설치된다. 해당 패키지의 의존되어있는 패키지들도 함께 설치됨.

package.json dependencies(배포용) devDependencies(개발용) 에 설치한 모듈이 명세되어 있으며 버전앞 "^" 문자는 패키지 설치시 최신버전 사용 유무이다.

### 전역 기능 vs 코어 모듈 vs 제3자 모듈

기본적으로 다음과 같이 구분할 수 있습니다.

- 전역 기능: const나 function 같은 키워드 및 process 등의 전역 객체
- 코어 Node.js 모듈: 파일 시스템 모듈 ("fs"), 경로 모듈 ("path"), Http 모듈 ("http") 등
- 제3자 모듈: npm install을 통해 어떤 종류의 기능도 설치 가능

전역 기능은 항상 사용 가능하며, 사용하기 위해 파일에 임포트 할 필요가 없습니다.
코어 Node.js 모듈은 설치하지 않아도 되기 때문에 npm install이 필요하지 않지만, 관련된 기능을 사용하려면 임포트 해야 됩니다.

```js
const fs = require('fs');

“fs” 모듈에서 내보낸 fs객체를 사용할 수 있게 됩니다.

프로젝트 폴더에npm instal을 실행해 제3자 모듈을 설치하고 임포트 합니다.

추후 강의에서 다룰 예정이라 지금 당장 이해하실 필요는 없지만, 그 예로

// Terminal 또는 명령 프롬프트에서는

npm install --save express-session
// app.js 같은 코드 파일에서는

const sessions = require('express-session');
```

### 자동 재시작을 위한 Nodemon 사용

최종적으로는 node app을 실행시켜줌 동시에 파일들의 변경내역을 확인하고 무언가를 변경하면 서버를 재시작해줌.

실행 명령어 : nodemon app.js

### 전역 및 지역 npm 패키지

local dependency의 장점은 프로젝트를 저장하는 node_modules 폴더가 없어도 공유가 가능하다.
그 후에 프로젝트에 npm install을 실행해서 node_modules 폴더를 재생성합니다. 공유 프로젝트의 크기가 엄청나게 줄어듭니다.

Terminal이나 명령줄에는 local dependency가 아니라 글로벌 패키지를 사용하기 때문에, nodemon app.js가 작동하지 않는다.

지역 레벨에서 실행해도 되니 굳이 필요하지는 않지만, 전역 레벨에 nodemon을 설치할 수 있다.

### 다양한 오류 유형 이해

- 구문오류 (Syntax Errors) : 코드에 오타, 중괄호를 빼먹는 뜽 프로젝트 실행 시 자동으로 오류 발생
- 런타임 오류 (Runtime Errors) : 오타는 아니지만 코르를 실행하려고 할 때 멈춰버림
- 논리적 오류 (Logical Errors) : 가장 해결하기 어려움, 에러 메시지가 발생하지 않으나 앱은 원하는 대로 작동하지 않음.

### 구문 오류 찾기 및 수정

- IDE자체에서 빨간줄을 그어 오류를 찾아줌
- 서버에서는 Unexpected identifier 오류를 발생시킴
  - 어느 코드에 오류가 발생했는지 알려줌

### 런타임 오류 처리

- res.write 에서 잘 발생함
- res.end 함수 실행시 return을 깜빡하면 응답을 끊었는데 계속 사용하려하는 에러가 발생함.
- 오류메시지가 발생하면 무조건 구글에 검색하는게 아닌 오류메시지를 꼼꼼히 읽어볼 것.

### 논리 오류

- 데이터 파싱간 배열 작업시 잘못된 인덱스를 사용하거나 할 때
- debugger를 사용해서 중간중간 점검하는게 좋다.
- 중단점을 찍어놓으면 해당 구간까지만 소스가 실행되며 해당시점에 어떤값이 들어있는지 궁금한 변수위에 마우스를 가져다대면 할당된 값이 보인다.

### 디버거 사용

- 디버그 콘솔에서 소스에는 반영되지 않으나 소스를 작성하여 여러가지 테스트를 해볼수 있음 브라우저 콘솔창과 비슷한듯?

### 앱 편집 후 자동으로 디버거 재시작 하기

### vscode에서 node.js 디버깅하기

- https://code.visualstudio.com/docs/nodejs/nodejs-debugging

### 디버그 콘솔에서 변수 변경

- 변수패널에서 값을 더블클릭하여 변경가능
