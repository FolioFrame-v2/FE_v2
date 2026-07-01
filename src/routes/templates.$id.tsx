import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Nav } from "@/components/ui/nav";
import { PortfolioTemplate } from "@/components/portfolio-templates";
import { SAMPLE_PORTFOLIO, TEMPLATES, type TemplateMeta } from "@/lib/portfolio-data";

export const Route = createFileRoute("/templates/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${params.id} 템플릿 — FolioFrame` }],
  }),
  component: TemplateDetailPage,
});

const DETAILS: Record<string, {
  hero: string;
  story: string;
  features: { title: string; body: string }[];
  sections: string[];
  pairs: { font: string; tone: string; layout: string };
  recommended: string[];
}> = {
  minimal: {
    hero: "여백이 만들어내는 신뢰감",
    story:
      "타이포그래피와 줄 간격만으로 구성된 한 장. 채용 담당자가 30초 안에 핵심을 파악할 수 있도록 정보 위계를 단정하게 정리했어요.",
    features: [
      { title: "1컬럼 리딩 흐름", body: "위에서 아래로 자연스럽게 읽히는 구조." },
      { title: "모노 디테일", body: "메타 정보는 모노스페이스로 정돈." },
      { title: "프린트 친화", body: "PDF로 출력해도 깨지지 않는 레이아웃." },
    ],
    sections: ["헤더 · 한 줄 소개", "소개 본문", "기술 스택", "경력 타임라인", "프로젝트 리스트"],
    pairs: { font: "Space Grotesk + JetBrains Mono", tone: "차분 · 신뢰", layout: "Single Column" },
    recommended: ["프론트엔드 주니어", "디자이너 협업 경험", "정돈된 인상"],
  },
  editorial: {
    hero: "잡지 한 권을 펼친 듯한 큐레이션",
    story:
      "큰 헤드라인과 사이드 메타, 그리드 카드로 프로젝트의 맥락을 강조합니다. 글이 풍부한 분이 스토리텔링하기에 좋아요.",
    features: [
      { title: "대형 디스플레이 헤드", body: "첫 화면에서 인상적인 카피로 시선 고정." },
      { title: "그리드 워크 카드", body: "프로젝트마다 번호와 기간을 강조." },
      { title: "코랄 액센트", body: "포인트 컬러로 키워드를 부각." },
    ],
    sections: ["매거진 헤더", "About 매니페스토", "Selected Works 그리드", "Career 연표"],
    pairs: { font: "Space Grotesk Display", tone: "감성 · 큐레이션", layout: "Editorial Grid" },
    recommended: ["풀스택", "프로덕트 엔지니어", "기획·디자인 협업"],
  },
  terminal: {
    hero: "$ cat portfolio.md",
    story:
      "CLI 한 화면처럼 구성된 모노스페이스 테마. 시스템 깊이와 인프라 감각을 가진 분께 어울려요.",
    features: [
      { title: "프롬프트 시퀀스", body: "ls / cat 같은 명령어로 섹션을 구분." },
      { title: "다크 캔버스", body: "눈에 편안한 다크 톤 + 민트 액센트." },
      { title: "키워드 태그", body: "#stack 형식으로 기술을 가볍게 노출." },
    ],
    sections: ["about.md", "ls stacks/", "cat career.log", "ls -lh projects/"],
    pairs: { font: "JetBrains Mono", tone: "긱 · 시스템", layout: "Terminal Window" },
    recommended: ["백엔드", "DevOps · SRE", "인프라 / 보안"],
  },
  playful: {
    hero: "컬러 블록으로 드러내는 개성",
    story:
      "라운드한 카드와 그라데이션, 이모지 디테일로 친근한 인상을 만듭니다. 사이드 프로젝트가 많은 분께 잘 어울려요.",
    features: [
      { title: "그라데이션 히어로", body: "민트 × 코랄의 부드러운 배경." },
      { title: "라운드 카드", body: "프로젝트마다 컬러 블록 썸네일." },
      { title: "이모지 디테일", body: "연락처에 가벼운 이모지로 톤 완화." },
    ],
    sections: ["인사 카드", "About + Contact", "Projects 컬러 그리드", "Career 카드"],
    pairs: { font: "Space Grotesk + Inter", tone: "프렌들리 · 컬러풀", layout: "Bento Blocks" },
    recommended: ["주니어 개발자", "모바일 / 크리에이티브", "사이드 프로젝트 多"],
  },
};

function TemplateDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const meta = TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
  const detail = DETAILS[meta.id] ?? DETAILS.minimal;
  const others = TEMPLATES.filter((t) => t.id !== meta.id);

  const apply = () =>
    navigate({ to: "/portfoliopageeditor" });

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Sticky toolbar */}
      <div className="border-b border-line bg-background/85 backdrop-blur sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link to="/templates" className="text-ink-soft hover:text-ink">← 템플릿 목록</Link>
            <span className="text-ink-soft">/</span>
            <span className="font-medium">{meta.name}</span>
            <span className="chip text-[10px]">{meta.vibe}</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#preview" className="hidden md:inline h-9 px-4 rounded-full border border-line text-sm leading-9">전체 미리보기</a>
            <button onClick={apply} className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium">
              이 템플릿으로 적용
            </button>
          </div>
        </div>
      </div>

      {/* Template-specific hero */}
      <TemplateHero meta={meta} detail={detail} onApply={apply} />

      {/* Spec / Features */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-ink-soft">Story</div>
            <p className="mt-3 text-lg leading-relaxed text-ink-soft max-w-2xl">{detail.story}</p>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-ink-soft mb-4">Features</div>
            <div className="grid sm:grid-cols-3 gap-4">
              {detail.features.map((f) => (
                <div key={f.title} className="surface-card p-5">
                  <div className="h-8 w-8 rounded-lg border border-line grid place-items-center text-xs font-mono"
                    style={{ background: `color-mix(in oklch, ${meta.accent} 18%, transparent)` }}>
                    ✦
                  </div>
                  <h3 className="mt-3 font-display font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-ink-soft mb-4">포함된 섹션</div>
            <div className="surface-card divide-y divide-line">
              {detail.sections.map((s, i) => (
                <div key={s} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="font-mono text-xs text-ink-soft w-6">{(i + 1).toString().padStart(2, "0")}</span>
                  <span className="text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="surface-card p-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-ink-soft">Spec</div>
            <SpecRow k="Font" v={detail.pairs.font} />
            <SpecRow k="Tone" v={detail.pairs.tone} />
            <SpecRow k="Layout" v={detail.pairs.layout} />
            <SpecRow k="Accent" v={
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-full border border-line" style={{ background: meta.accent }} />
                <span className="font-mono text-xs">{meta.accent.replace("var(--color-", "").replace(")", "")}</span>
              </span>
            } />
          </div>

          <div className="surface-card p-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-ink-soft">추천 대상</div>
            <ul className="space-y-2 text-sm">
              {detail.recommended.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: meta.accent }} />{r}
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-ink-soft">Best For</div>
            <div className="flex flex-wrap gap-1.5">
              {meta.bestFor.map((b) => <span key={b} className="chip text-[11px]">{b}</span>)}
            </div>
          </div>

          <button onClick={apply} className="w-full h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            이 템플릿으로 만들기 →
          </button>
        </aside>
      </section>

      {/* Full preview */}
      <section id="preview" className="border-t border-line bg-surface/40">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="text-xs font-mono uppercase tracking-[0.2em] text-ink-soft">Live preview</div>
              <h2 className="mt-2 text-2xl font-display font-semibold">샘플 데이터로 본 전체 화면</h2>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-ink-soft">
              <span className="h-2 w-2 rounded-full bg-coral" />
              <span className="h-2 w-2 rounded-full bg-mint" />
              <span className="h-2 w-2 rounded-full bg-ink/40" />
            </div>
          </div>
          <div className="rounded-2xl border border-line overflow-hidden shadow-sm bg-card">
            <PortfolioTemplate id={meta.id} data={SAMPLE_PORTFOLIO} />
          </div>
        </div>
      </section>

      {/* Other templates */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-display font-semibold">다른 템플릿 둘러보기</h2>
          <Link to="/templates" className="text-sm text-ink-soft hover:text-ink">전체 보기 →</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {others.map((t) => (
            <Link
              key={t.id}
              to="/templates/$id"
              params={{ id: t.id }}
              className="surface-card p-5 hover:-translate-y-0.5 transition group"
            >
              <div className="h-2 w-10 rounded-full mb-4" style={{ background: t.accent }} />
              <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-ink-soft mt-1">{t.tagline}</p>
              <div className="mt-3 text-xs font-mono text-ink-soft group-hover:text-ink">자세히 보기 →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SpecRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-ink-soft">{k}</span>
      <span className="font-medium text-right">{v}</span>
    </div>
  );
}

/* ───────── Per-template heroes ───────── */

function TemplateHero({ meta, detail, onApply }: { meta: TemplateMeta; detail: typeof DETAILS[string]; onApply: () => void }) {
  if (meta.id === "terminal") {
    return (
      <section className="bg-[oklch(0.16_0.015_260)] text-[oklch(0.92_0.01_95)] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
          <div>
            <div className="font-mono text-xs text-[oklch(0.86_0.16_145)]">~/templates/terminal</div>
            <h1 className="mt-4 font-mono text-4xl md:text-5xl font-semibold leading-tight">{detail.hero}</h1>
            <p className="mt-4 text-white/70 max-w-xl leading-relaxed">{meta.tagline}</p>
            <div className="mt-6 flex gap-2">
              <button onClick={onApply} className="h-10 px-5 rounded-md bg-[oklch(0.86_0.16_145)] text-black text-sm font-mono">$ apply --template=terminal</button>
              <a href="#preview" className="h-10 px-5 rounded-md border border-white/15 text-sm font-mono leading-10">view --full</a>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/40 overflow-hidden font-mono text-xs">
            <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/10 bg-white/[0.03]">
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.17_30)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.85_0.15_85)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.78_0.16_145)]" />
              <span className="ml-3 opacity-60">terminal.preview</span>
            </div>
            <div className="p-5 space-y-1.5">
              <div><span className="text-[oklch(0.86_0.16_145)]">➜</span> ls templates/</div>
              <div className="opacity-70">minimal  editorial  terminal*  playful</div>
              <div><span className="text-[oklch(0.86_0.16_145)]">➜</span> cat terminal/about</div>
              <div className="opacity-80">vibe: monospace, dark, infra</div>
              <div className="opacity-80">accent: mint #6ee7b7</div>
              <div><span className="text-[oklch(0.86_0.16_145)]">➜</span> _<span className="animate-pulse">▌</span></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (meta.id === "editorial") {
    return (
      <section className="border-b border-line" style={{ background: "color-mix(in oklch, var(--color-coral) 6%, var(--background))" }}>
        <div className="mx-auto max-w-7xl px-6 py-20 grid md:grid-cols-[1fr_auto] gap-10 items-end">
          <div>
            <div className="chip" style={{ borderColor: "var(--color-coral)", color: "var(--color-coral)" }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-coral)" }} />
              Issue 02 · Editorial Mag
            </div>
            <h1 className="mt-5 text-5xl md:text-7xl font-display font-bold leading-[1.02] tracking-tight">{detail.hero}</h1>
            <p className="mt-5 text-lg text-ink-soft max-w-2xl">{meta.tagline}</p>
          </div>
          <div className="text-right font-mono text-xs text-ink-soft space-y-1">
            <div>Vol. 01 — 2026</div>
            <div>Editorial / Magazine</div>
            <div>Coral · Cream</div>
          </div>
        </div>
      </section>
    );
  }

  if (meta.id === "playful") {
    return (
      <section className="border-b border-line relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, color-mix(in oklch, var(--color-mint) 30%, transparent), color-mix(in oklch, var(--color-coral) 22%, transparent))" }} />
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="chip bg-white/70">🎨 Playful Grid</div>
          <h1 className="mt-5 text-5xl md:text-6xl font-display font-bold leading-[1.05] max-w-3xl">{detail.hero}</h1>
          <p className="mt-5 text-lg text-ink-soft max-w-2xl">{meta.tagline}</p>
          <div className="mt-8 grid grid-cols-4 gap-3 max-w-xl">
            <div className="h-16 rounded-2xl bg-white/70 border border-white/60" />
            <div className="h-16 rounded-2xl border border-line" style={{ background: "var(--color-mint)" }} />
            <div className="h-16 rounded-2xl border border-line" style={{ background: "var(--color-coral)" }} />
            <div className="h-16 rounded-2xl bg-white/70 border border-white/60" />
          </div>
        </div>
      </section>
    );
  }

  // minimal
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-[1fr_1fr] gap-16 items-start">
        <div>
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-ink-soft">Minimal Sheet</div>
          <h1 className="mt-4 text-5xl md:text-6xl font-display font-semibold tracking-tight leading-[1.05]">{detail.hero}</h1>
          <p className="mt-5 text-lg text-ink-soft max-w-xl leading-relaxed">{meta.tagline}</p>
        </div>
        <div className="space-y-2 font-mono text-sm text-ink-soft">
          <div className="flex justify-between border-b border-line py-2"><span>vibe</span><span className="text-ink">minimal</span></div>
          <div className="flex justify-between border-b border-line py-2"><span>columns</span><span className="text-ink">01</span></div>
          <div className="flex justify-between border-b border-line py-2"><span>accent</span><span className="text-ink">ink</span></div>
          <div className="flex justify-between border-b border-line py-2"><span>density</span><span className="text-ink">airy</span></div>
        </div>
      </div>
    </section>
  );
}
