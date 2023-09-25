## PRESS

frontend web bundles

: 기본 monorepo 컨셉으로 환경 구축

app

: 웹앱 목록

- face
  - 토이프로젝트 앱
  - react, typescript, scss
  - react-router-dom, react-jss, axios, react-icons, ...
  - 실행
    - ```
      npm run dev -w app/face
      ```

lib

: 공용 라이브러리

- index : 하기의 라이브러리 파일들을 namespace pattern으로 묶어줌
- device : 장치 관련
- palette : 색상 정의
- path : svg component 정의
  - 참조 : app/face/src/components/icon/self
- wire : custom global event 관련
- util

test

: 공용 라이브러리 테스트

Todo

- chart library
- app/auth
- ...

```

```
