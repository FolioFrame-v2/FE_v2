import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Building2,
  CalendarDays,
  Clock,
  Eye,
  MapPin,
  Share2,
  Sparkles,
  Wallet,
  Briefcase,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Nav } from "@/components/ui/nav";

export const Route = createFileRoute("/jobs/$id")({
  component: JobDetailPage,
  head: () => ({
    meta: [
      { title: "기업 공고 상세 — FolioFrame" },
      { name: "description", content: "기업 공고 상세 정보를 확인하세요." },
    ],
  }),
});

type Job = {
  id: string;
  title: string;
  company: { name: string; logo: string; size: string; industry: string; site: string };
  position: "프론트엔드" | "백엔드" | "풀스택" | "iOS" | "안드로이드" | "데이터" | "DevOps";
  field: string;
  description: string;
  requirements: string[];
  preferred: string[];
  employmentType: "정규직" | "인턴" | "계약직" | "프리랜서";
  location: string;
  careerLevel: "신입" | "경력" | "신입/경력";
  careerYears?: string;
  salary: { min: number; max: number };
  responsibilities: string[];
  idealCandidate: string[];
  preferredDetail: string[];
  hiringProcess: { step: string; desc: string }[];
  notes: string;
  deadline: string;
  views: number;
  bookmarks: number;
};

const SAMPLE: Record<string, Job> = {
  "1": {
    id: "1",
    title: "프론트엔드 엔지니어 (React/Next.js)",
    company: {
      name: "Linear Studio",
      logo: "L",
      size: "30~50명",
      industry: "SaaS · 협업 도구",
      site: "linear-studio.io",
    },
    position: "프론트엔드",
    field: "웹 서비스 · B2B SaaS",
    description:
      "Linear Studio는 팀의 일하는 방식을 재정의하는 차세대 협업 도구를 만듭니다. 함께 제품을 더 빠르고 단단하게 만들어갈 프론트엔드 엔지니어를 찾고 있어요.",
    requirements: [
      "React 기반 SPA 실서비스 운영 경험 2년 이상",
      "TypeScript에 익숙하신 분",
      "디자인 시스템 / 컴포넌트 단위 개발 경험",
      "협업 도구(Git, Figma, Linear)에 능숙하신 분",
    ],
    preferred: [
      "Next.js 14+ App Router 경험",
      "성능 최적화·렌더링 트러블슈팅 경험",
      "오픈소스 컨트리뷰션 경험",
    ],
    employmentType: "정규직",
    location: "서울 성수동 (하이브리드, 주 2회 재택)",
    careerLevel: "신입/경력",
    careerYears: "0~5년",
    salary: { min: 4800, max: 7200 },
    responsibilities: [
      "메인 프로덕트의 신규 기능 설계 및 개발",
      "디자인 시스템 고도화 및 컴포넌트 라이브러리 운영",
      "실 사용자 데이터 기반 UX 개선 실험 수행",
      "프론트엔드 빌드/배포 파이프라인 개선",
    ],
    idealCandidate: [
      "작은 디테일에도 집착하는 분",
      "문제를 정의하고 가설을 세워 검증하는 분",
      "동료의 코드 리뷰를 즐기는 분",
    ],
    preferredDetail: [
      "테스트 코드 작성 문화에 익숙하신 분 (Vitest, Playwright)",
      "접근성(a11y) / 국제화(i18n) 경험",
      "디자이너·기획자와 협업해 제품을 주도해본 경험",
    ],
    hiringProcess: [
      { step: "서류 전형", desc: "포트폴리오·이력서 검토 (3~5일)" },
      { step: "1차 인터뷰", desc: "팀 컬처 핏 & 경험 인터뷰 (60분)" },
      { step: "기술 과제", desc: "실무 유사 과제 (3일 이내 제출)" },
      { step: "최종 인터뷰", desc: "CTO·동료 엔지니어 (90분)" },
      { step: "처우 협의", desc: "오퍼 레터 발송" },
    ],
    notes:
      "포트폴리오 또는 GitHub 링크를 함께 보내주세요. 사이드 프로젝트도 환영합니다. 입사일은 협의 가능합니다.",
    deadline: "2026-07-31",
    views: 1284,
    bookmarks: 73,
  },
};

function won(num: number) {
  return `${num.toLocaleString()}만원`;
}

function dDay(deadline: string) {
  const diff = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
  if (diff < 0) return "마감";
  if (diff === 0) return "D-DAY";
  return `D-${diff}`;
}

function JobDetailPage() {
  const { id } = Route.useParams();
  const [bookmarked, setBookmarked] = useState(false);
  const job = useMemo<Job>(() => {
    const base = SAMPLE[id] ?? SAMPLE["1"];
    switch (id) {
      case "job1": return { ...base, id, title: "Frontend Developer", company: { ...base.company, name: "Toss", logo: "T" }, position: "프론트엔드" };
      case "job2": return { ...base, id, title: "Backend Engineer", company: { ...base.company, name: "Kakao", logo: "K" }, position: "백엔드" };
      case "job3": return { ...base, id, title: "iOS Engineer", company: { ...base.company, name: "Naver", logo: "N" }, position: "iOS" };
      case "job4": return { ...base, id, title: "Data Scientist", company: { ...base.company, name: "Line", logo: "L" }, position: "데이터" };
      case "job5": return { ...base, id, title: "DevOps Engineer", company: { ...base.company, name: "Daangn", logo: "D" }, position: "DevOps" };
      case "job6": return { ...base, id, title: "Fullstack Engineer", company: { ...base.company, name: "Woowa Bros", logo: "W" }, position: "풀스택" };
      default: return base;
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <div className="border-b border-line bg-surface/40">
        <div className="mx-auto max-w-6xl px-6 py-4 text-sm text-ink-soft flex items-center gap-2">
          <Link to="/" className="hover:text-ink">홈</Link>
          <span>/</span>
          <span className="hover:text-ink cursor-pointer">기업 공고</span>
          <span>/</span>
          <span className="text-ink">{job.company.name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-[1fr_auto] gap-8 items-start">
          <div className="space-y-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="chip bg-mint/20 text-ink border-mint/30">
                <Clock className="size-3.5" /> {dDay(job.deadline)}
              </span>
              <span className="chip">{job.employmentType}</span>
              <span className="chip">{job.careerLevel}{job.careerYears ? ` · ${job.careerYears}` : ""}</span>
              <span className="chip">{job.position}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              {job.title}
            </h1>
            <div className="flex items-center gap-4 text-ink-soft">
              <div className="flex items-center gap-2">
                <div className="size-9 rounded-lg bg-ink text-background grid place-items-center font-display font-bold">
                  {job.company.logo}
                </div>
                <div className="leading-tight">
                  <div className="text-ink font-medium">{job.company.name}</div>
                  <div className="text-xs">{job.company.industry} · {job.company.size}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft pt-2">
              <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {job.location}</span>
              <span className="inline-flex items-center gap-1.5"><Wallet className="size-4" /> {won(job.salary.min)} ~ {won(job.salary.max)}</span>
              <span className="inline-flex items-center gap-1.5"><Briefcase className="size-4" /> {job.field}</span>
              <span className="inline-flex items-center gap-1.5"><Eye className="size-4" /> {job.views.toLocaleString()} 조회</span>
              <span className="inline-flex items-center gap-1.5"><Bookmark className="size-4" /> {job.bookmarks + (bookmarked ? 1 : 0)} 북마크</span>
            </div>
          </div>

          <div className="flex md:flex-col gap-2 md:w-56">
            <button className="h-11 px-4 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
              지원하기
            </button>
            <button
              onClick={() => setBookmarked((b) => !b)}
              className={`h-11 px-4 rounded-full border transition inline-flex items-center justify-center gap-2 ${bookmarked ? "bg-mint/20 border-mint/40 text-ink" : "border-line hover:bg-surface"
                }`}
            >
              {bookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
              {bookmarked ? "북마크됨" : "북마크"}
            </button>
            <button className="h-11 px-4 rounded-full border border-line hover:bg-surface inline-flex items-center justify-center gap-2 text-sm">
              <Share2 className="size-4" /> 공유
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-6 py-12 grid lg:grid-cols-[1fr_320px] gap-10">
        <div className="space-y-10">
          <Block title="분야 설명" icon={<Sparkles className="size-4" />}>
            <p className="leading-relaxed text-ink">{job.description}</p>
          </Block>

          <Block title="주요 담당업무">
            <ul className="space-y-2.5">
              {job.responsibilities.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-2 size-1.5 rounded-full bg-ink flex-none" />
                  <span className="text-ink">{r}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="지원 자격">
            <ul className="space-y-2.5">
              {job.requirements.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="size-4 mt-1 text-ink flex-none" />
                  <span className="text-ink">{r}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="우대 사항">
            <ul className="space-y-2.5">
              {job.preferred.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 text-mint">＋</span>
                  <span className="text-ink">{r}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="우대 조건 상세">
            <div className="surface-card p-5 bg-surface/60 space-y-2">
              {job.preferredDetail.map((p, i) => (
                <p key={i} className="text-ink-soft text-sm">· {p}</p>
              ))}
            </div>
          </Block>

          <Block title="인재상" icon={<Users className="size-4" />}>
            <div className="grid sm:grid-cols-3 gap-3">
              {job.idealCandidate.map((p, i) => (
                <div key={i} className="surface-card p-4 text-sm text-ink">
                  <div className="text-xs text-ink-soft mb-1">0{i + 1}</div>
                  {p}
                </div>
              ))}
            </div>
          </Block>

          <Block title="채용 일정" icon={<CalendarDays className="size-4" />}>
            <ol className="relative border-l border-line ml-2 space-y-5">
              {job.hiringProcess.map((s, i) => (
                <li key={i} className="pl-5 relative">
                  <span className="absolute -left-[7px] top-1 size-3 rounded-full bg-ink border-2 border-background" />
                  <div className="text-ink font-medium">{s.step}</div>
                  <div className="text-sm text-ink-soft">{s.desc}</div>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="기타 요청사항">
            <p className="text-ink-soft leading-relaxed">{job.notes}</p>
          </Block>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-24 self-start">
          <div className="surface-card p-5 space-y-4">
            <div>
              <div className="text-xs text-ink-soft mb-1">채용 마감일</div>
              <div className="font-display text-2xl text-ink">{job.deadline}</div>
              <div className="text-sm text-mint mt-0.5">{dDay(job.deadline)}</div>
            </div>
            <hr className="border-line" />
            <Row label="고용 형태" value={job.employmentType} />
            <Row label="포지션" value={job.position} />
            <Row label="경력" value={`${job.careerLevel}${job.careerYears ? ` · ${job.careerYears}` : ""}`} />
            <Row label="연봉" value={`${won(job.salary.min)} ~ ${won(job.salary.max)}`} />
            <Row label="근무지" value={job.location} />
          </div>

          <div className="surface-card p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-ink">
              <Building2 className="size-4" /> 기업 정보
            </div>
            <Row label="회사명" value={job.company.name} />
            <Row label="산업" value={job.company.industry} />
            <Row label="규모" value={job.company.size} />
            <Row label="웹사이트" value={job.company.site} />
          </div>

          <button className="w-full h-11 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
            지원하기
          </button>
        </aside>
      </section>
    </div>
  );
}

function Block({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-semibold text-ink flex items-center gap-2 mb-4">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <span className="text-ink-soft">{label}</span>
      <span className="text-ink text-right">{value}</span>
    </div>
  );
}
