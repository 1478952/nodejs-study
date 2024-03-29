## SQL 소개

### 데이터베이스 선택하기

목표 : 항상 데이터를 저장하고 쉽게 가용하거나 접근할 수 있게 하여 코드 측면에서뿐만 아니라 데이터 접근도 용이하게 하는 것, 효율적이고 빨라야 한다.
가진 데이터가 커짐에 따라 파일시스템으로 저장할 때 보다 빠르다. 또한 정보 한 조각을 위해 전체 파일을 읽을 필요가 없다.

SQL

- MySQL 관계형 데이터베이스
- 테이블이라는 요소를 통해 사고한다. 만약 사용자 제품 주문 테이블이 각각 있다고 가정하였을 때 각각의 테이블에는 컬럼이있다. 예를 들면 사용자는 ID,
  이메일, 이름을 통해 정의가 가능하다. 제품에는 ID, 제목, 가격, 설명이 있다. 이런 데이터들을 레코드라고 불리는 영역에 채워 넣는다.
- 다른 테이블끼리 연결이 가능하다. 예를 들어 주문이라는 테이블은 간단하게 사용자와 제품의 연결고리만으로 데이터를 채워넣을 수 있다.
- 강력한 데이터 스키마를 지니고 있어 각각의 표마다 내부 데이터의 형태, 보유한 영역과 각각에 저장되는 데이터의 종류를 정확하게 정의하게 된다.
  숫자인지 문자열인지 텍스트인지 불리언인지
- 일대일, 일대다, 다대다라는 세가지 중요한 상관관계로 테이블들의 관계를 정의할 수 있다.

### NoSQL 소개

NoSQL

- SQL의 방식을 따르지 않는다. 스키마와 상관관계 대신 다른 장점들이 있다.
- 테이블은 Collections 이라 부름 레코드는 존재하지 않지만 Documents는 존재함. JSON 객체와 유사함.
- 같은 유저테이블에서 이름은 공통적으로 들어가있으나 나이가 빠져있는 상황이 존재할 수 있음. 같은 집단에 각각 다른 구조를 지닌
  다수의 documents를 저장할 수 있다. 하지만 비슷한 구조로 통일하려고 노력은 해야한다. 엄격하지는 않은것.
- 테이블간의 상관관계가 존재하지 않는다. 만약 데이터를 비슷하게 사용하는 테이블이 있다면 같이 업데이트가 이루어져야한다.

### SQL과 NoSQL 비교하기

수평 및 수직 스케일링

사용자가 늘어나고 규모가 커지는 애플리케이션을 유지하기 위해서는 데이터베이스를 확장해야한다.

수평스케일링

- 서버를 더 추가함
- 무한으로 진행이 가능하다. 업체, 자체 데이터서버든 언제든지 서버를 구매해서 DB에 연결환뒤 서버들에 데이터를 분산시킨다.
- 쿼리를 모든 서버에 실행하고 지능적으로 통합하는 절차도 필요하다. 쉽지만은 않다.

수직 스케일링

- 존재하는 서버에 CPU나 메모리 등을 추가하여 더 강력하게 만든다.
- 클라우드 제공업체의 경우 해당 방식이 일반적으로 용이하다.
- 한계가 존재함

SQL

- 스케일링에 있어서는 SQL 작동방식으로인해 수평 스케일링이 매우 어렵거나 불가능한 경우가 있다. 서버를 추가하는건 가능하지만 전부 하나의
  공유된 클라우드 및 데이터베이스에서 구동하는 건 어렵다.
  NoSQL
- 수평 스케일링이 SQL보다 더 쉽다.

### MySQL 설정

- mysql community server 설치 (무료버전)
- mysql workbench 노드애플리케이션 외부에서 시각적으로 확인할 수 있는 클라이언트

### 앱을 SQL 데이터베이스에 연결하기

### 기본 SQL 및 테이블 생성

테이블 구성시

- PK : 기본키
- NN : not null 값 허용여부
- UQ : unique 고유한값인지
- BIN : Binary 데이터 보관 여부
- UN : 음수값 보관 여부
- ZF : 0 채우기
- AI : 자동 증가 여부

### 데이터 검색

### 제품 가져오기

아래 sql로 products 테이블에 해당하는 모든 데이터를 가져올 수 있다.

```js
return db.execute("SELECT * FROM products");
```

### 데이터베이스에 데이터 삽입

sql injection 방지를 위해 데이터 삽입시 ?를 사용한다. ?는 두번째 매개변수로오는 배열안의 값이됨.

```js
return db.execute(
  "INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)",
  [this.title, this.price, this.imageUrl, this.description]
);
```

### "where" 조건으로 단일 제품 가져오기

조건에 따라 행의 수를 제한할 수 있다.

```js
return db.execute("SELECT * FROM products WHERE product.id = ?", [id]);
```

앱 논리가 많으면 많아질수록 쿼리가 복잡해진다.
mysql전문가라면 되겠지만 보통의경우 쿼리를 전부 작성하지 않아도되는 훨씬쉬운방법을 사용함.
