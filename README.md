<div align="center">
  <h1>🌟 FolioFrame v2 Frontend</h1>
  <p>
    <strong>구직자의 포트폴리오를 관리하고 채용 공고를 탐색하며,<br/>기업과 인재를 연결해주는 구인구직 및 포트폴리오 플랫폼</strong>
  </p>
  <p>
    <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/TanStack_Router-FF4154?style=for-the-badge&logo=react-router&logoColor=white" alt="TanStack Router" />
  </p>
</div>

<br/>

## ✨ 주요 기능 (Key Features)

- 🎨 **포트폴리오 관리**: 사용자 맞춤형 포트폴리오 작성 및 직관적인 뷰어 제공
- 🤝 **채용/구직 연동**: 맞춤형 채용 공고 탐색 및 원클릭 지원 시스템
- 🏢 **기업 특화 기능**: 기업용 마이페이지 및 리크루터 전용 관리 기능 지원
- 🌿 **현재 브랜치**: `main`

---

## 🚀 기술 스택 (Tech Stack)

### ⚛️ Core
- **Framework**: React 19, Vite, TanStack Router, TanStack Start
- **Language**: TypeScript

### 🔄 State & Data
- **Data Fetching**: TanStack Query (React Query v5), Axios
- **API Client**: Orval (OpenAPI 기반 자동 생성)

### 💅 Styling & UI
- **Styling**: Tailwind CSS v4, class-variance-authority
- **Components**: Radix UI Primitives, shadcn/ui 기반 컴포넌트

### 📋 Form & Utils
- **Form Handling**: React Hook Form, Zod
- **Package Manager**: Bun (권장) 또는 npm

---

## 📦 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하는 방법입니다.

### 1. 패키지 설치

의존성 관리를 위해 **Bun** 사용을 권장합니다 (`bun.lock` 파일 포함).

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

---

## 📜 주요 스크립트 (Scripts)

| 명령어 | 설명 |
| :--- | :--- |
| `dev` | 로컬 개발 서버를 실행합니다. |
| `build` | 프로덕션용으로 프로젝트를 빌드합니다. |
| `preview` | 빌드된 결과물을 로컬 환경에서 미리 봅니다. |
| `lint` | ESLint를 사용하여 코드 컨벤션을 검사합니다. |
| `format` | Prettier를 사용하여 코드를 포맷팅합니다. |
| `generate:api` | Orval을 사용하여 OpenAPI 스펙(`api-docs.json`) 기반 API 코드를 자동 생성합니다. |

---

## 📁 프로젝트 구조 (Project Structure)

```text
FE_v2/
├── src/
│   ├── api/          # 🌐 Orval 등으로 자동 생성된 API 클라이언트 및 타입
│   ├── assets/       # 🖼️ 정적 이미지, 아이콘 등 에셋 파일
│   ├── components/   # 🧩 재사용 가능한 UI 컴포넌트 (Radix UI 기반)
│   ├── fonts/        # 🔤 커스텀 폰트 파일
│   ├── hooks/        # 🪝 재사용 가능한 커스텀 React 훅
│   ├── lib/          # 🛠️ 유틸리티 함수 (cn, tailwind-merge 등)
│   ├── page/         # 📄 주요 화면 렌더링을 담당하는 페이지 컴포넌트
│   ├── routes/       # 🛣️ TanStack Router 기반의 파일 라우팅 디렉토리
│   ├── routeTree.gen.ts # 🌳 TanStack Router 자동 생성 라우트 트리
│   ├── router.tsx    # ⚙️ 라우터 설정 및 Provider 구성
│   ├── server.ts     # 🖥️ SSR 및 서버 렌더링 진입점 설정
│   ├── start.ts      # 🚀 TanStack Start 관련 구동 파일
│   └── styles.css    # 🎨 전역 CSS 및 Tailwind 엔트리 파일
├── public/           # 📂 빌드 시 root에 복사되는 정적 에셋
├── api-docs.json     # 📜 백엔드 API 명세서 (OpenAPI)
├── orval.config.ts   # ⚙️ API 통신 코드 자동 생성기(Orval) 설정 파일
└── vite.config.ts    # ⚙️ 프론트엔드 빌드 도구 설정 파일
```

---

## 🔗 Lovable 환경 설정

> [!IMPORTANT]
> 이 프로젝트는 [Lovable](https://lovable.dev)과 실시간 연동되어 있습니다.  
> 이미 푸시(push)된 git 히스토리를 강제로 수정(`force push`, `rebase`, `amend`, `squash` 등)하지 마세요.  
> 히스토리를 덮어쓸 경우 Lovable 측 연동에 문제가 발생하고 프로젝트 작업 내역을 잃어버릴 수 있습니다.
