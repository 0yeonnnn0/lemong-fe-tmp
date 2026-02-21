# Lemong 프로젝트 가이드

## 프로젝트 소개

Lemong은 React 기반 웹 애플리케이션입니다.
협업을 위한 자동화 도구들이 세팅되어 있어서, 코드를 작성하고 합치는 과정이 체계적으로 관리됩니다.

---

## 사용 기술 요약

| 분류            | 기술                    | 역할                          |
| --------------- | ----------------------- | ----------------------------- |
| 프레임워크      | React + TypeScript      | 화면을 만드는 핵심 도구       |
| 빌드 도구       | Vite                    | 개발 서버 실행, 배포용 빌드   |
| 스타일링        | TailwindCSS + shadcn/ui | 디자인, UI 컴포넌트           |
| 라우팅          | TanStack Router         | 페이지 이동 (URL 관리)        |
| 서버 데이터     | TanStack Query          | API 호출, 데이터 캐싱         |
| 클라이언트 상태 | Zustand                 | 앱 내부 상태 관리             |
| HTTP 통신       | Axios                   | 백엔드 API 호출               |
| 테스트          | Vitest + Playwright     | 단위 테스트 + 화면 테스트     |
| 컴포넌트 문서   | Storybook               | UI 컴포넌트를 독립적으로 확인 |
| 코드 품질       | ESLint + Prettier       | 코드 스타일 자동 검사/정리    |
| CI/CD           | GitHub Actions + Vercel | 자동 검사 + 자동 배포         |

---

## 아키텍처: Feature-Sliced Design (FSD)

이 프로젝트는 **FSD(Feature-Sliced Design)** 아키텍처를 사용합니다.
코드를 "역할별 레이어"로 나눠서 관리하는 방식입니다.

### 레이어 구조 (위에서 아래로 의존)

```
app      → 앱 초기화, 프로바이더, 글로벌 스타일
pages    → 페이지 단위 화면 (홈, 로그인, 마이페이지 등)
widgets  → 독립적인 큰 UI 블록 (헤더, 사이드바 등)
features → 사용자 행동 단위 기능 (로그인 폼, 좋아요 버튼 등)
entities → 비즈니스 데이터 단위 (유저, 상품, 주문 등)
shared   → 프로젝트 전체에서 재사용하는 코드 (UI 컴포넌트, API, 유틸리티)
```

**핵심 규칙**: 위 레이어는 아래 레이어만 import 가능 (예: `pages`는 `features`, `entities`, `shared`를 쓸 수 있지만, `shared`는 `pages`를 쓸 수 없음)

### 폴더 구조

```
src/
├── app/                         # 앱 설정
│   ├── providers/               # React 프로바이더 (QueryClient 등)
│   └── styles/                  # 글로벌 스타일 (TailwindCSS, 테마)
├── pages/                       # 페이지 컴포넌트
│   └── home/
│       ├── ui/HomePage.tsx      # 실제 화면 컴포넌트
│       └── index.ts             # public API (외부에 공개할 것만 export)
├── widgets/                     # 큰 UI 블록 (아직 비어있음)
├── features/                    # 기능 단위 (아직 비어있음)
├── entities/                    # 비즈니스 엔티티 (아직 비어있음)
├── shared/                      # 공용 코드
│   ├── api/                     # HTTP 클라이언트 (Axios 설정)
│   ├── ui/                      # 공용 UI 컴포넌트 (shadcn/ui)
│   ├── lib/                     # 유틸리티 함수 (cn 등)
│   ├── config/                  # 설정값, 상수
│   ├── types/                   # 공용 타입 정의
│   └── test/                    # 테스트 설정
├── routes/                      # TanStack Router 라우트 정의 (얇은 wrapper)
│   ├── __root.tsx               # 루트 레이아웃
│   └── index.tsx                # / → HomePage 연결
e2e/                             # E2E 테스트
.github/                         # CI/CD, PR 템플릿
.storybook/                      # Storybook 설정
.husky/                          # Git 커밋 시 자동 검사
```

### 새 기능 추가 예시

"로그인" 기능을 만든다면:

```
src/
├── pages/login/                 # 로그인 페이지
│   ├── ui/LoginPage.tsx
│   └── index.ts
├── features/auth/               # 인증 기능 (로그인 폼, 로그아웃 버튼)
│   ├── ui/LoginForm.tsx
│   ├── model/useAuth.ts         # 인증 상태 관리
│   ├── api/login.ts             # 로그인 API 호출
│   └── index.ts
├── entities/user/               # 유저 데이터
│   ├── model/types.ts
│   └── index.ts
```

---

## 개발 흐름 (이렇게 작업하면 됩니다)

### 1단계: 브랜치 만들기

```bash
git checkout develop          # develop 브랜치로 이동
git pull origin develop       # 최신 코드 받기
git checkout -b feature/기능이름  # 작업 브랜치 생성
```

### 2단계: 코드 작성

- `src/pages/` 에 새 페이지 추가 → `src/routes/`에 라우트 연결
- `src/features/` 에 새 기능 추가
- `src/shared/ui/` 에 재사용 가능한 UI 컴포넌트 추가
- 저장하면 브라우저에서 바로 확인 가능 (Hot Reload)

### 3단계: 커밋하기

```bash
git add .
git commit -m "feat: 로그인 페이지 추가"
git push origin feature/기능이름
```

커밋할 때 자동으로 코드 스타일 검사가 실행됩니다 (ESLint + Prettier).
문제가 있으면 커밋이 안 되니, 수정 후 다시 시도하면 됩니다.

### 4단계: PR(Pull Request) 만들기

GitHub에서 **"New pull request"** 클릭하면 됩니다.

- base: `develop` ← compare: `feature/기능이름`
- PR 템플릿이 자동으로 채워지니 내용만 작성하면 됩니다

### 5단계: 자동 검사 (CI)

PR을 만들면 로봇이 자동으로 4가지를 검사합니다:

| 검사 항목   | 사용 도구                      | 내용                           | 소요 시간 |
| ----------- | ------------------------------ | ------------------------------ | --------- |
| 코드 품질   | ESLint + Prettier + TypeScript | 코드 스타일, 포맷팅, 타입 검사 | ~30초     |
| 단위 테스트 | Vitest + React Testing Library | 함수/컴포넌트 동작 확인        | ~30초     |
| 빌드        | TypeScript Compiler + Vite     | 배포용 빌드가 성공하는지       | ~30초     |
| E2E 테스트  | Playwright (Chromium)          | 실제 브라우저에서 화면 테스트  | ~1분 30초 |

- 모두 통과하면 → merge 버튼 활성화
- 실패하면 → 어디서 문제인지 로그로 알려줌 → 고치고 다시 push

### 6단계: Merge & 배포

- `develop`에 merge → Vercel 프리뷰 배포 (테스트용)
- `develop` → `main` PR → merge → **실제 서비스 자동 배포**

---

## 브랜치 구조

```
main (프로덕션 - 실제 서비스에 배포되는 코드)
 └── develop (개발 통합 - 기능들이 모이는 곳)
      ├── feature/로그인    (각자 작업하는 브랜치)
      ├── feature/회원가입
      └── feature/마이페이지
```

### 규칙

- `main`, `develop`에 직접 push 불가 → 반드시 PR을 통해서만 합칠 수 있음
- PR에서 CI 검사를 통과해야 merge 가능
- 협업자가 합류하면 리뷰 승인 1명 필수로 변경 예정

---

## 자주 쓰는 명령어

| 명령어              | 설명                            |
| ------------------- | ------------------------------- |
| `npm run dev`       | 개발 서버 실행 (localhost:5173) |
| `npm run build`     | 프로덕션 빌드                   |
| `npm run lint`      | 코드 스타일 검사                |
| `npm run format`    | 코드 자동 정리                  |
| `npm test`          | 단위 테스트 실행                |
| `npm run test:e2e`  | E2E 테스트 실행                 |
| `npm run storybook` | Storybook 실행 (localhost:6006) |

---

## 커밋 메시지 규칙

```
타입: 설명

예시:
feat: 로그인 페이지 추가
fix: 회원가입 이메일 검증 버그 수정
style: 메인 페이지 레이아웃 변경
refactor: API 호출 로직 정리
docs: README 업데이트
test: 로그인 테스트 추가
chore: 패키지 업데이트
```

---

## Vercel 자동 배포

- PR을 만들면 → **프리뷰 링크** 자동 생성 (합치기 전에 미리 확인 가능)
- `main`에 merge하면 → **실제 서비스에 자동 배포**
- 별도 작업 필요 없음, 전부 자동

---

## 추가 참고 파일

| 파일                      | 내용                           |
| ------------------------- | ------------------------------ |
| `docs/libraries.md`       | 설치된 패키지 목록과 사용 이유 |
| `docs/ci-setup-report.md` | CI/CD 구성 상세 보고서         |
| `docs/project-guide.md`   | 이 파일 (프로젝트 가이드)      |
| `CLAUDE.md`               | 프로젝트 개발 규칙             |
