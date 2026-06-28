export type PortfolioProject = {
  title: string;
  summary: string;
  role: string;
  period: string;
  stacks: string[];
  link?: string;
};

export type PortfolioData = {
  name: string;
  title: string;
  oneLiner: string;
  detail: string;
  location: string;
  email: string;
  github: string;
  website: string;
  intro: string;
  career: string;
  stacks: string[];
  roles: string[];
  projects: PortfolioProject[];
};

export const SAMPLE_PORTFOLIO: PortfolioData = {
  name: "김도현",
  title: "사용자 경험을 코드로 옮기는 프론트엔드 개발자",
  oneLiner: "3년차 프론트엔드, 협업툴과 실시간 인터랙션에 강합니다.",
  detail:
    "사용자가 서비스에 머무는 모든 순간을 설계합니다. 작은 인터랙션 한 줄에도 의도를 담고, 디자이너·백엔드와 함께 가설을 검증하며 성장해왔어요. 최근에는 실시간 협업 도구와 AI 기반 추천 인터페이스에 관심을 두고 있습니다.",
  location: "서울 · 원격 가능",
  email: "dohyun.kim@devfolio.app",
  github: "github.com/dohyun",
  website: "dohyun.dev",
  intro:
    "스타트업 두 곳을 거치며 0→1 제품을 함께 만들었어요. 디자인 시스템 구축, 성능 최적화, 실시간 동기화 영역의 문제를 즐깁니다.",
  career:
    "Acme Corp · Frontend Engineer (2023–현재)\n사내 협업툴의 핵심 화면을 리드하며 LCP를 4.2s → 1.6s로 개선.\n\nBeta Studio · Junior Developer (2022–2023)\n디자인 시스템 v1을 셋업하고 컴포넌트 60+개를 직접 구축.",
  stacks: ["React", "TypeScript", "Next.js", "TanStack Query", "WebRTC", "Tailwind"],
  roles: ["Frontend", "Fullstack"],
  projects: [
    {
      title: "실시간 협업 화이트보드",
      summary:
        "Yjs와 WebRTC 기반의 멀티 커서 화이트보드. 60fps 캔버스 렌더링과 충돌 없는 동기화를 직접 설계했어요.",
      role: "Frontend Lead",
      period: "2024.03 – 2024.09",
      stacks: ["React", "Yjs", "WebRTC", "Canvas"],
      link: "github.com/dohyun/whiteboard",
    },
    {
      title: "AI 코드리뷰 봇",
      summary:
        "OpenAI 함수 호출을 활용해 PR 리뷰를 자동화. 팀 평균 리뷰 대기 시간을 14h → 2h로 단축.",
      role: "Fullstack",
      period: "2023.10 – 2024.02",
      stacks: ["Node", "OpenAI", "Postgres"],
      link: "github.com/dohyun/reviewbot",
    },
    {
      title: "디자인 시스템 v2",
      summary:
        "토큰 기반의 라이트/다크 테마와 60+ 컴포넌트. Storybook 문서화와 시각 회귀 테스트까지 구축했어요.",
      role: "Frontend",
      period: "2022.06 – 2023.06",
      stacks: ["React", "Storybook", "Chromatic"],
    },
  ],
};

export type TemplateMeta = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  accent: string;
  vibe: "minimal" | "editorial" | "terminal" | "playful";
  bestFor: string[];
};

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "minimal",
    name: "Minimal Sheet",
    tagline: "여백으로 말하는 정돈된 한 장",
    description:
      "타이포그래피 중심의 단정한 한 페이지 레이아웃. 채용 담당자가 빠르게 훑어볼 수 있어요.",
    accent: "var(--color-ink)",
    vibe: "minimal",
    bestFor: ["주니어", "프론트엔드", "디자이너 협업"],
  },
  {
    id: "editorial",
    name: "Editorial Mag",
    tagline: "잡지처럼 읽히는 큐레이션",
    description:
      "큰 헤드라인과 그리드 카드로 프로젝트 스토리를 강조합니다. 글이 풍부한 분에게 추천.",
    accent: "var(--color-coral)",
    vibe: "editorial",
    bestFor: ["풀스택", "프로덕트", "기획 경험"],
  },
  {
    id: "terminal",
    name: "Terminal Log",
    tagline: "터미널 감성의 모노스페이스",
    description:
      "코드 블록과 명령어 프롬프트 비주얼로 기술 깊이를 어필하기 좋아요.",
    accent: "var(--color-mint)",
    vibe: "terminal",
    bestFor: ["백엔드", "DevOps", "인프라"],
  },
  {
    id: "playful",
    name: "Playful Grid",
    tagline: "컬러 블록으로 개성을 드러내는",
    description:
      "발랄한 컬러 블록과 라운드한 카드로 개성을 강조합니다. 사이드 프로젝트가 많은 분께.",
    accent: "var(--color-mint)",
    vibe: "playful",
    bestFor: ["주니어", "모바일", "크리에이티브"],
  },
];
