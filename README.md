# boiler-plate code 작성

### Client
 - dev stack
    - typescript
    - React
    - Redux
    - scss
    - styled-components
 - 유저 로그인 화면
 - 유저 회원가입 화면
 - 유저 정보수정 화면
 - nav bar
    - screen size 768px 이하 column형태로 변환할 수 있도록 반응
 - side bar
    - toggle 버튼으로 side bar최소화 기능
    - screen size 768px 이하일 때 자동 최소화

### Server
 - dev stack
    - typescript
    - nestjs
    - mysql
 - 회원가입
 - 유저정보 수정

##### 진행관련
https://kmj24.tistory.com/category/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8/boilerplate-code%EB%A7%8C%EB%93%A4%EA%B8%B0

### 해야될 것
 - test-server : 전체 코드 리팩토링 필요
 - test-client
   1. 모바일 화면이랑 호환 되게 화면 조정필요
   2. 컴포넌트에서 html코드와 ts코드를 따로 나누기
   3. register, user_patch 컴포넌트 합치기