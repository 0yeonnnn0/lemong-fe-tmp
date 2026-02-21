# Project Rules

## 라이브러리 설치 시 문서화 필수

새로운 npm 패키지를 설치(`npm install`)할 때마다 반드시 `libraries.md` 파일을 업데이트한다.

- 해당 패키지가 속하는 카테고리 섹션의 테이블에 행을 추가
- 패키지명과 함께 **어떤 상황에서 사용하기 위해 설치했는지** 사유를 한 줄로 기재
- 기존 카테고리에 맞지 않으면 새 카테고리 섹션을 만들어 추가
- dependencies는 "Dependencies (런타임)" 섹션, devDependencies는 "DevDependencies (개발)" 하위 섹션에 기재
