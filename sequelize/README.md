## Sequelize의 이해

### Sequelize란?

Object-Relational Mapping Library

- 백그라운드에서 실제로 SQL코드를 처리하며 js객체로 매핑하여 SQL코드를 실행하는 편리한 메소드를 제공함
- 떼이터베이스를 다루는 모델을 제공하며 모델을 정의할 수 있게 해줌

### 데이터베이스에 연결

util/database.js 참고

### 모델 정의

models/product.js 참고

### 데이터베이스에 JS 정의 동기화하기

app.js 참고

sequelize가 자동으로 model을 찾아 테이블을 생성해준다.

### 데이터 삽입 및 제품 생성

### 데이터 검색 및 제품 찾기

### where 조건으로 단일 제품 얻기

### 관리자 상품 가져오기

### 상품 업데이트하기

### 상품 삭제하기

### 사용자 모델 생성하기

### 일대다 관계 추가하기

Associations 관계설정?

한 제품은 많은 사용자의 카트에 소속될 수 있어야 한다.
각 사용자는 하나의 장바구니만 가지고 있다.

### 더미 사용자 생성 및 관리하기

### 관계 설정 메서드 사용하기

### 관련 상품 가져오기

### 일대다 및 다대다 관계

### 카트 생성 및 가져오기

### 장바구니에 새 상품 추가하기

### 관련 상품 추가 및 장바구니 항목 검색하기

### 관련 상품 삭제 및 장바구니 상품 삭제하기

### 주문 모델 추가하기

### 장바구니 상품을 주문 상품으로 저장하기

### 장바구니 재설정 및 주문 가져오기와 출력하기