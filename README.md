## 기술 스택

| 카테고리        | 기술 스택                        |
| --------------- | -------------------------------- |
| 빌드 도구       | Vite ^6.2.0                      |
| 프레임워크      | React 19                         |
| 언어            | TypeScript 5.7+                  |
| 라우팅          | React Router ^7                  |
| 상태 관리       | Zustand                          |
| 데이터 페칭     | TanStack Query (React Query)     |
| HTTP 클라이언트 | axios                            |
| 스타일링        | TailwindCSS ^4.1.0 + shadcn/ui   |
| 테스트          | Vitest                           |
| 코드 품질       | ESLint ^9.21.0 + Prettier ^3.5.3 |
| Git 훅          | Husky ^9.1.7 + lint-staged       |
| 배포            | Vercel                           |

## 브랜치 전략 (Git Flow)

Git Flow 워크플로를 채택하며 main은 프로덕션, develop은 개발 브랜치로 유지합니다.

- **main**: 프로덕션 릴리스 전용. 태그로 버전 관리.
- **develop**: 다음 릴리스 개발 통합.
- **feature/\***: 신규 기능 개발 (e.g., feature/user-auth).
- **bugfix/\***: 버그 수정 (e.g., bugfix/login-error).
- **hotfix/\***: 프로덕션 긴급 수정.
- PR은 develop으로 병합, main 푸시는 릴리스 시.

## 커밋 규칙 (Conventional Commits)

형식: `<type>[optional scope]: <description>`

- feat: 신규 기능 (e.g., feat(auth): add login form)
- fix: 버그 수정 (e.g., fix(login): resolve credential validation error)
- docs: 문서 변경 (e.g., docs(readme): update installation guide)
- style: 포맷팅 변경 (e.g., style(button): improve spacing consistency)
- refactor: 코드 리팩토링 (e.g., refactor(user): extract service layer)
- test: 테스트 추가 (e.g., test(api): add query integration tests)
- chore: 빌드/도구 변경 (e.g., chore(deps): update react to v19)

BREAKING CHANGE는 ! 표시 (e.g., feat!: remove legacy API).
