import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Footer } from "@/components/ui/footer";
import { Nav } from "@/components/ui/nav";
import { useNavigate } from "@tanstack/react-router";


export default function MainPage() {
    return (
        <div className="min-h-screen text-foreground">
            <Nav />
            <Hero />
            {/* <LogoBar /> */}
            <HowItWorks />
            <DiagnosePreview />
            <TemplateGallery />
            <ShareSection />
            {/* <Stats /> */}
            <Faq />
            <Footer />
        </div>
    );
}


/* ----------------------------- HERO ----------------------------- */
function Hero() {
    const navigate = useNavigate();
    // 내 포트폴리오 만들기 → 클릭 시 포트폴리오 제작 화면으로 이동 
    const onClick_portfolio = () => {
        navigate({ to: `/portfolio` });
    };

    // 템플릿 둘러보기 → 클릭 시 템플릿 화면으로 이동 
    // const onClick_portfolio = () => {
    //     navigate({ to: `/portfolio` });
    // };

    return (
        <section className="relative overflow-hidden pt-5">
            {/* 비디오 */}
            <div className="flex flex-col items-center justify-center relative w-full ">
                <div className="flex flex-col items-center justify-center relative">
                    <video className="flex flex-col items-center justify-center w-[70.5em] h-[25.5em] object-cover" autoPlay loop muted>
                        <source src="/videos/Mainvideo.mp4" type="video/mp4" />
                        비디오를 재생할 수 없습니다. 브라우저가 이 형식을 지원하지 않습니다.
                    </video>
                    <p className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-[1] text-white text-[5em] font-extrabold font-['OTF_B']">FolioFrame</p>
                </div>
            </div>

            <div className="absolute inset-0 grid-paper opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

            {/* 텍스트 영역 */}
            <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-24 grid lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7">
                    <span className="chip">
                        <span className="h-1.5 w-1.5 rounded-full bg-mint" />
                        새로운 AI 자소서 진단 출시
                    </span>
                    <h1 className="mt-5 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight">
                        깔끔한 포트폴리오,
                        <br />
                        <span className="relative inline-block">
                            한 시간이면 충분합니다.
                            <svg
                                className="absolute -bottom-2 left-0 w-full"
                                viewBox="0 0 600 18"
                                fill="none"
                                preserveAspectRatio="none"
                            >
                                <path
                                    d="M2 12 Q150 2 300 9 T598 6"
                                    stroke="var(--color-mint)"
                                    strokeWidth="5"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            </svg>
                        </span>
                    </h1>
                    <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
                        템플릿으로 빠르게 만들고, AI 진단으로 문장을 다듬고,
                        기업에 공유하세요. 채용 담당자가 먼저 연락해옵니다.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <button className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/10"
                            onClick={onClick_portfolio}
                        >
                            내 포트폴리오 만들기 →
                        </button>
                        <button className="h-12 px-6 rounded-full border border-line bg-card text-ink font-medium hover:bg-surface transition">
                            템플릿 둘러보기
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}

function HeroCard() {
    return (
        <div className="relative">
            <div className="absolute -inset-6 bg-mint/20 rounded-3xl blur-2xl -z-10" />
            <div className="surface-card overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-surface">
                    <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.16_85)]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-mint" />
                    <span className="ml-3 text-xs font-mono text-ink-soft">
                        folioframe.io/@minji-kim
                    </span>
                </div>
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-semibold text-lg">
                            MK
                        </div>
                        <div className="flex-1">
                            <h3 className="font-display font-semibold text-xl">케로로</h3>
                            <p className="text-sm text-ink-soft">Frontend Engineer · 2년차</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                                {["React", "TypeScript", "Next.js"].map((t) => (
                                    <span
                                        key={t}
                                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-surface-2 text-ink"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <ProjectRow
                            title="협업 디자인 도구 — Klue"
                            meta="2024 · 팀 5명"
                            tag="진행중"
                            tagColor="mint"
                        />
                        <ProjectRow
                            title="실시간 코드 리뷰 봇"
                            meta="2023 · 사이드"
                            tag="런칭"
                            tagColor="surface"
                        />
                        <ProjectRow
                            title="대학생 학습 트래커"
                            meta="2022 · 개인"
                            tag="아카이브"
                            tagColor="surface"
                        />
                    </div>

                    <div className="mt-6 pt-5 border-t border-line flex items-center justify-between">
                        <div className="text-xs text-ink-soft">
                            <span className="font-mono text-ink">AI 진단 점수</span>
                            <span className="mx-2">·</span>
                            마지막 업데이트 2일 전
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="font-display text-2xl font-semibold">92</span>
                            <span className="text-xs text-ink-soft">/100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProjectRow({
    title,
    meta,
    tag,
    tagColor,
}: {
    title: string;
    meta: string;
    tag: string;
    tagColor: "mint" | "surface";
}) {
    return (
        <div className="flex items-center justify-between gap-4 py-2.5 px-3 -mx-3 rounded-lg hover:bg-surface transition">
            <div className="min-w-0">
                <div className="font-medium text-sm truncate">{title}</div>
                <div className="text-xs text-ink-soft font-mono">{meta}</div>
            </div>
            <span
                className={`text-[10px] font-mono px-2 py-1 rounded-md ${tagColor === "mint"
                    ? "bg-mint/40 text-ink"
                    : "bg-surface-2 text-ink-soft"
                    }`}
            >
                {tag}
            </span>
        </div>
    );
}

/* --------------------------- LOGO BAR --------------------------- */
function LogoBar() {
    const items = ["김고은", "김세정", "김태연", "코알라", "햄토리", "개굴"];
    return (
        <section className="border-y border-line bg-surface/50">
            <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center gap-x-10 gap-y-3 justify-between">
                <span className="text-xs font-mono text-ink-soft uppercase tracking-widest">
                    이 개발자들이 사용 중
                </span>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                    {items.map((n) => (
                        <span
                            key={n}
                            className="font-display font-semibold text-ink-soft/70 text-lg tracking-tight"
                        >
                            {n}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ----------------------------- HOW IT WORKS ----------------------------- */
function HowItWorks() {
    const steps = [
        {
            n: "01",
            title: "템플릿 선택",
            body: "직무·경력별로 큐레이션된 템플릿에서 시작하세요. 빈 화면에서 시작할 필요 없습니다.",
        },
        {
            n: "02",
            title: "프로젝트 입력",
            body: "GitHub 연동 또는 직접 입력. 기술 스택과 역할을 구조화해 정리합니다.",
        },
        {
            n: "03",
            title: "AI 진단",
            body: "맞춤법·표현·문장 흐름을 필드별로 분석하고, 원문과 수정안을 나란히 제공합니다.",
        },
        {
            n: "04",
            title: "공유 & 매칭",
            body: "한 줄 링크로 공개. 채용 담당자가 필터 검색으로 당신을 발견합니다.",
        },
    ];
    return (
        <section id="how" className="mx-auto max-w-7xl px-6 py-24">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
                <div>
                    <span className="chip">사용 방법</span>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl">
                        네 단계면 완성됩니다.
                    </h2>
                </div>
                <p className="text-ink-soft max-w-md">
                    어디서부터 시작해야 할지 막막한 분들을 위해, 빈 화면 없이 흐름을
                    따라가기만 하면 됩니다.
                </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((s, i) => (
                    <div
                        key={s.n}
                        className="surface-card p-6 hover:translate-y-[-2px] transition relative overflow-hidden"
                    >
                        <div className="font-mono text-xs text-ink-soft">{s.n}</div>
                        <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                        <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.body}</p>
                        {i === 3 && (
                            <span className="absolute top-5 right-5 chip !py-0.5 !text-[10px]">
                                ★ 인기
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

/* --------------------------- DIAGNOSE PREVIEW --------------------------- */
function DiagnosePreview() {
    const [applied, setApplied] = useState<Record<string, boolean>>({
        intro: true,
        project: false,
    });
    const toggle = (k: string) =>
        setApplied((p) => ({ ...p, [k]: !p[k] }));

    return (
        <section id="diagnose" className="bg-surface/60 border-y border-line">
            <div className="mx-auto max-w-7xl px-6 py-24 grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-4">
                    <span className="chip">
                        <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                        AI 진단
                    </span>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                        문장 단위로,
                        <br />
                        골라서 적용하세요.
                    </h2>
                    <p className="mt-5 text-ink-soft leading-relaxed">
                        전체를 바꾸지 않습니다. 필드마다 원문과 AI 수정안을 나란히 보여주고,
                        마음에 드는 것만 체크해 적용할 수 있습니다.
                    </p>
                    <ul className="mt-6 space-y-3 text-sm">
                        {[
                            "맞춤법·띄어쓰기 자동 교정",
                            "문장 흐름과 어색한 표현 개선",
                            "필드별 부분 적용 / 원문 유지",
                            "전체 개선점 요약 리포트",
                        ].map((t) => (
                            <li key={t} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-mint" />
                                <span className="text-ink-soft">{t}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="lg:col-span-8 space-y-4">
                    <DiagnoseRow
                        label="자기소개"
                        original="안녕하세요, 저는 프론트엔드 개발자 김민지 입니다. 다양한 프로젝트 경험이 있고, 새로운 기술을 배우는걸 좋아합니다."
                        improved="3년차 프론트엔드 엔지니어 김민지입니다. 협업 도구와 디자인 시스템 분야에서 사용자 경험을 개선하는 일에 집중하고 있습니다."
                        checked={applied.intro}
                        onToggle={() => toggle("intro")}
                    />
                    <DiagnoseRow
                        label="프로젝트 설명 — Klue"
                        original="팀에서 디자인 협업 툴을 만들었고, 저는 프론트 부분을 담당했습니다. React로 개발하였습니다."
                        improved="5인 팀에서 실시간 디자인 협업 도구 Klue를 개발했습니다. React·CRDT 기반 동시 편집 모듈을 설계해 평균 동기화 지연을 320ms 단축했습니다."
                        checked={applied.project}
                        onToggle={() => toggle("project")}
                    />

                    <div className="surface-card p-5 flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-mint/40 grid place-items-center font-display text-xl font-semibold">
                                +18
                            </div>
                            <div>
                                <div className="font-medium">전체 진단 점수가 92점으로 향상됩니다</div>
                                <div className="text-sm text-ink-soft">
                                    2개 필드 적용 · 전체 개선점 7가지
                                </div>
                            </div>
                        </div>
                        <button className="h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                            선택 적용
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

function DiagnoseRow({
    label,
    original,
    improved,
    checked,
    onToggle,
}: {
    label: string;
    original: string;
    improved: string;
    checked: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="surface-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-line">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-ink-soft uppercase tracking-wider">
                        {label}
                    </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="text-xs text-ink-soft">수정안 적용</span>
                    <span
                        onClick={onToggle}
                        className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-mint" : "bg-surface-2"
                            }`}
                    >
                        <span
                            className={`absolute top-0.5 h-5 w-5 rounded-full bg-card border border-line transition-all ${checked ? "left-[22px]" : "left-0.5"
                                }`}
                        />
                    </span>
                </label>
            </div>
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-line">
                <div className="p-5">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-ink-soft mb-2">
                        원문
                    </div>
                    <p className="text-sm text-ink-soft leading-relaxed">{original}</p>
                </div>
                <div className={`p-5 ${checked ? "bg-mint/10" : ""}`}>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-ink-soft mb-2 flex items-center gap-1.5">
                        AI 수정안
                        <span className="h-1 w-1 rounded-full bg-mint" />
                    </div>
                    <p className="text-sm text-ink leading-relaxed">{improved}</p>
                </div>
            </div>
        </div>
    );
}

/* --------------------------- TEMPLATES --------------------------- */
function TemplateGallery() {
    const templates = [
        { name: "Minimal Resume", tag: "신입 · 주니어", accent: "bg-mint/40" },
        { name: "Project Showcase", tag: "사이드 프로젝트", accent: "bg-coral/30" },
        { name: "Engineer Story", tag: "현업 · 시니어", accent: "bg-[oklch(0.85_0.14_240)]/40" },
        { name: "Open Source Hub", tag: "OSS 컨트리뷰터", accent: "bg-[oklch(0.85_0.12_85)]/40" },
    ];
    return (
        <section id="templates" className="mx-auto max-w-7xl px-6 py-24">
            <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
                <div>
                    <span className="chip">템플릿</span>
                    <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight max-w-xl">
                        직무에 맞는 출발점.
                    </h2>
                </div>
                <a href="#" className="text-sm text-ink-soft hover:text-ink transition">
                    전체 보기 →
                </a>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {templates.map((t) => (
                    <div key={t.name} className="group cursor-pointer">
                        <div
                            className={`aspect-[4/5] rounded-xl border border-line ${t.accent} relative overflow-hidden grid-paper`}
                        >
                            <div className="absolute inset-4 bg-card rounded-lg shadow-sm flex flex-col p-3 group-hover:translate-y-[-4px] transition">
                                <div className="h-3 w-16 rounded bg-ink/80" />
                                <div className="mt-2 h-1.5 w-24 rounded bg-ink-soft/40" />
                                <div className="mt-4 grid grid-cols-3 gap-1">
                                    <div className="h-8 rounded bg-surface-2" />
                                    <div className="h-8 rounded bg-surface-2" />
                                    <div className="h-8 rounded bg-surface-2" />
                                </div>
                                <div className="mt-3 space-y-1">
                                    <div className="h-1.5 rounded bg-ink-soft/30" />
                                    <div className="h-1.5 w-4/5 rounded bg-ink-soft/30" />
                                    <div className="h-1.5 w-3/5 rounded bg-ink-soft/30" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <div className="font-display font-semibold">{t.name}</div>
                                <div className="text-xs font-mono text-ink-soft mt-0.5">{t.tag}</div>
                            </div>
                            <span className="text-sm text-ink-soft group-hover:text-ink transition">
                                →
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* --------------------------- SHARE & MATCHING --------------------------- */
function ShareSection() {
    return (
        <section id="share" className="mx-auto max-w-7xl px-6 py-24">
            <div className="grid lg:grid-cols-2 gap-10">
                <div className="surface-card p-8 relative overflow-hidden">
                    <span className="chip">개인 — 공유</span>
                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                        한 줄 링크로 공유합니다.
                    </h3>
                    <p className="mt-3 text-ink-soft">
                        공개 전환 한 번이면 끝. 기업은 링크에서 폼이나 이메일로 직접
                        연락할 수 있습니다. 별도 채팅 설치는 필요 없습니다.
                    </p>
                    <div className="mt-6 flex items-center gap-2 p-2 pl-4 bg-surface rounded-full border border-line">
                        <span className="font-mono text-sm text-ink-soft truncate flex-1">
                            devfolio.io/@minji-kim
                        </span>
                        <button className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                            링크 복사
                        </button>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                        {["공개 · published", "이메일 연락 ON", "지원 알림 ON"].map((t) => (
                            <span key={t} className="chip">
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="surface-card p-8 bg-primary text-primary-foreground relative overflow-hidden">
                    <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-mint/20 blur-3xl" />
                    <span className="chip !border-primary-foreground/20 !bg-primary-foreground/10 !text-primary-foreground/80">
                        기업 — 인재 찾기
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                        추천 대신 필터로,
                        <br />
                        확실하게 찾습니다.
                    </h3>
                    <p className="mt-3 text-primary-foreground/70">
                        기술 스택, 경력 연차, 도메인, 위치 등 명확한 조건으로 인재 풀을
                        탐색하세요. 결과는 곧바로 연락 가능한 공개 포트폴리오입니다.
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-2 relative">
                        {[
                            "React",
                            "3~5년차",
                            "원격 가능",
                            "Fintech",
                            "TypeScript",
                            "서울",
                        ].map((f) => (
                            <div
                                key={f}
                                className="px-3 py-2 rounded-lg bg-primary-foreground/10 border border-primary-foreground/15 text-sm font-mono"
                            >
                                {f}
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 h-11 px-5 rounded-full bg-mint text-accent-foreground font-medium hover:opacity-90 transition">
                        인재 검색 시작하기
                    </button>
                </div>
            </div>
        </section>
    );
}

/* --------------------------- STATS --------------------------- */
function Stats() {
    const items = [
        { n: "12.4k", l: "활성 포트폴리오" },
        { n: "63%", l: "AI 수정안 적용률" },
        { n: "1,200+", l: "참여 기업" },
        { n: "48h", l: "평균 첫 연락 도착" },
    ];
    return (
        <section className="border-y border-line bg-surface/50">
            <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {items.map((i) => (
                    <div key={i.l}>
                        <div className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
                            {i.n}
                        </div>
                        <div className="text-sm text-ink-soft mt-1">{i.l}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* --------------------------- FAQ --------------------------- */
function Faq() {
    const qs = [
        {
            q: "정말 무료로 사용할 수 있나요?",
            a: "공개 포트폴리오 1개와 AI 진단 월 5회까지 무료입니다. 더 많은 진단이나 비공개 포트폴리오는 Pro 플랜에서 제공됩니다.",
        },
        {
            q: "AI가 모든 문장을 바꾸나요?",
            a: "아니요. 필드별로 원문과 수정안을 보여드리고, 직접 토글로 적용 여부를 선택합니다. 원문 유지가 기본값입니다.",
        },
        {
            q: "기업에서 어떻게 연락하나요?",
            a: "공유 링크 페이지에 있는 연락 폼 또는 등록한 이메일로 연락이 옵니다. 채팅 앱 설치 없이 진행됩니다.",
        },
        {
            q: "포트폴리오 데이터는 안전한가요?",
            a: "비공개 상태에서는 본인만 열람 가능하며, 공개 전환 여부는 언제든 되돌릴 수 있습니다.",
        },
    ];
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section className="mx-auto max-w-3xl px-6 py-24">
            <div className="text-center mb-12">
                <span className="chip">FAQ</span>
                <h2 className="mt-4 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                    자주 묻는 질문
                </h2>
            </div>
            <div className="space-y-3">
                {qs.map((item, i) => (
                    <div key={i} className="surface-card overflow-hidden">
                        <button
                            onClick={() => setOpen(open === i ? null : i)}
                            className="w-full flex items-center justify-between p-5 text-left"
                        >
                            <span className="font-medium">{item.q}</span>
                            <span
                                className={`text-ink-soft transition-transform ${open === i ? "rotate-45" : ""
                                    }`}
                            >
                                +
                            </span>
                        </button>
                        {open === i && (
                            <div className="px-5 pb-5 text-sm text-ink-soft leading-relaxed">
                                {item.a}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-16 surface-card p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 grid-paper opacity-30" />
                <div className="relative">
                    <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
                        오늘 시작하면, 이번 주에 공유합니다.
                    </h3>
                    <p className="mt-3 text-ink-soft">
                        가입 후 평균 47분이면 첫 포트폴리오가 완성됩니다.
                    </p>
                    <button className="mt-6 h-12 px-7 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-lg shadow-primary/10">
                        무료로 시작하기 →
                    </button>
                </div>
            </div>
        </section>
    );
}
