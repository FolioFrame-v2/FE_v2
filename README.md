# FolioFrame v2 Frontend

폴리오프레임 v2 프론트엔드 레포지토리입니다. (현재 브랜치: `main`)

## 🚀 기술 스택 (Tech Stack)

- **Framework**: React 19, Vite, TanStack Router, TanStack Start
- **State Management & Data Fetching**: TanStack Query (React Query v5), Axios
- **API Client Generation**: Orval
- **Styling**: Tailwind CSS v4, Radix UI Primitives, class-variance-authority
- **Forms & Validation**: React Hook Form, Zod
- **Package Manager**: Bun (권장) / npm

## 📦 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하는 방법입니다.

### 1. 패키지 설치

Bun 패키지 매니저를 사용하는 것을 권장합니다 (`bun.lock` 파일 포함).

```bash
bun install
# 또는 npm install
```

### 2. 개발 서버 실행

```bash
bun run dev
# 또는 npm run dev
```

서버가 실행되면 터미널에 표시되는 로컬 주소(주로 `http://localhost:5173`)를 통해 접속할 수 있습니다.

## 📜 주요 스크립트 (Scripts)

`package.json`에 정의된 주요 명령어 목록입니다:

- `dev`: 개발 서버를 실행합니다. (`vite dev`)
- `build`: 프로덕션용으로 프로젝트를 빌드합니다.
- `preview`: 빌드된 결과물을 로컬에서 실행하여 미리 봅니다.
- `lint`: ESLint를 사용하여 코드 컨벤션을 검사합니다.
- `format`: Prettier를 사용하여 코드를 포맷팅합니다.
- `generate:api`: Orval을 사용하여 `api-docs.json` 명세서를 기반으로 API 클라이언트 및 타입 코드를 자동 생성합니다.

## 📁 프로젝트 구조 (Project Structure)

```text
FE_v2/
├── src/
│   ├── api/          # Orval 등으로 자동 생성된 API 클라이언트 및 타입 정의
│   ├── assets/       # 정적 이미지, 아이콘 등 에셋 파일
│   ├── components/   # 재사용 가능한 UI 컴포넌트 (Radix UI, shadcn/ui 등)
│   ├── fonts/        # 커스텀 폰트 파일
│   ├── hooks/        # 재사용 가능한 커스텀 React 훅
│   ├── lib/          # 유틸리티 함수 (cn, tailwind-merge 등)
│   ├── page/         # 주요 화면 렌더링을 담당하는 페이지 레벨 컴포넌트
│   ├── routes/       # TanStack Router 기반의 파일 라우팅 디렉토리
│   ├── routeTree.gen.ts # TanStack Router가 자동 생성한 라우트 트리
│   ├── router.tsx    # 라우터 설정 및 Provider 구성
│   ├── server.ts     # SSR 및 서버 렌더링 진입점 설정
│   ├── start.ts      # TanStack Start 관련 구동 파일
│   └── styles.css    # 전역 CSS 및 Tailwind 엔트리 파일
├── public/           # 빌드 시 root에 복사되는 정적 에셋
├── api-docs.json     # 백엔드 API 명세서 (OpenAPI)
├── orval.config.ts   # API 통신 코드 자동 생성기(Orval) 설정 파일
└── vite.config.ts    # 프론트엔드 빌드 도구 설정 파일
```

## 🔗 Lovable 환경 설정

> [!IMPORTANT]
> 이 프로젝트는 [Lovable](https://lovable.dev)과 실시간 연동되어 있습니다. 이미 푸시(push)된 git 히스토리를 강제로 수정(force push, rebase, amend, squash 등)하지 마세요. 히스토리를 덮어쓸 경우 Lovable 측 연동에 문제가 발생하고 프로젝트 작업 내역을 잃어버릴 수 있습니다.
