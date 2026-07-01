import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/ui/nav";
import { TEMPLATES } from "@/lib/portfolio-data";

export const Route = createFileRoute("/templates/")({
  head: () => ({
    meta: [
      { title: "템플릿 선택 — FolioFrame" },
      { name: "description", content: "포트폴리오에 적용할 템플릿을 선택하세요." },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string>("minimal");

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-10 space-y-10">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-coral" />Template</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">템플릿</h1>
            <p className="mt-2 text-ink-soft text-sm">작성한 포트폴리오에 적용할 디자인을 골라주세요. 언제든 다시 바꿀 수 있어요.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate({ to: "/portfoliopageeditor" })}
              className="h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium inline-flex items-center hover:opacity-90"
            >
              이 템플릿으로 적용하기 →
            </button>
          </div>
        </header>

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {TEMPLATES.map((t) => {
            const active = selected === t.id;
            return (
              <article
                key={t.id}
                onClick={() => setSelected(t.id)}
                className={`surface-card overflow-hidden cursor-pointer transition group ${active ? "ring-2 ring-primary -translate-y-0.5" : "hover:-translate-y-0.5"}`}
              >
                <TemplateThumb id={t.id} accent={t.accent} />
                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight">{t.name}</h3>
                      <p className="text-sm text-ink-soft mt-0.5">{t.tagline}</p>
                    </div>
                    <span className={`h-5 w-5 rounded-full border-2 grid place-items-center ${active ? "border-primary bg-primary" : "border-line"}`}>
                      {active && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft leading-relaxed">{t.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {t.bestFor.map((b) => <span key={b} className="chip text-[11px]">{b}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-line">
                    <Link
                      to="/templates/$id"
                      params={{ id: t.id }}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-mono text-ink-soft hover:text-ink"
                    >
                      템플릿 미리보기 →
                    </Link>
                    <span className="text-[11px] font-mono text-ink-soft">{t.id}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}

function TemplateThumb({ id, accent }: { id: string; accent: string }) {
  if (id === "terminal") {
    return (
      <div className="h-44 bg-[oklch(0.18_0.015_260)] p-4 font-mono text-[10px] text-[oklch(0.92_0.01_95)] border-b border-line">
        <div className="flex gap-1 mb-2">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.74_0.17_30)]" />
          <span className="h-2 w-2 rounded-full bg-[oklch(0.85_0.15_85)]" />
          <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.16_145)]" />
        </div>
        <div className="text-[oklch(0.86_0.16_145)]">➜ ~ cat about.md</div>
        <div className="opacity-80">name : 김도현</div>
        <div className="opacity-80">role : Backend / DevOps</div>
        <div className="text-[oklch(0.86_0.16_145)] mt-2">➜ ~ ls projects/</div>
        <div className="opacity-70">whiteboard  reviewbot  design-system</div>
      </div>
    );
  }
  if (id === "editorial") {
    return (
      <div className="h-44 grid-paper border-b border-line p-4 relative" style={{ background: `linear-gradient(180deg, transparent, color-mix(in oklch, ${accent} 12%, transparent))` }}>
        <div className="text-[9px] font-mono text-coral uppercase tracking-widest">Issue 01</div>
        <div className="text-[18px] font-display font-bold leading-tight mt-1">사용자 경험을<br />코드로 옮기는</div>
        <div className="absolute right-3 bottom-3 grid grid-cols-2 gap-1.5 w-24">
          <div className="h-8 bg-card border border-line rounded" />
          <div className="h-8 bg-card border border-line rounded" />
        </div>
      </div>
    );
  }
  if (id === "playful") {
    return (
      <div className="h-44 border-b border-line p-4 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, color-mix(in oklch, var(--color-mint) 40%, white), color-mix(in oklch, var(--color-coral) 30%, white))" }}>
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/40 blur-xl" />
        <div className="text-[10px] font-mono">👋 안녕하세요</div>
        <div className="text-[18px] font-display font-bold leading-tight mt-1">새로운 협업의 <br />경험을 만듭니다</div>
        <div className="absolute right-3 bottom-3 flex gap-1.5">
          <div className="h-6 w-6 rounded-lg bg-white/70" />
          <div className="h-6 w-6 rounded-lg bg-coral/70" />
        </div>
      </div>
    );
  }
  return (
    <div className="h-44 bg-background border-b border-line p-5">
      <div className="text-[8px] font-mono text-ink-soft uppercase tracking-[0.2em]">Portfolio</div>
      <div className="text-[20px] font-display font-semibold mt-1 leading-tight">사용자 경험을<br />코드로 옮기는</div>
      <div className="mt-3 space-y-1">
        <div className="h-1 w-2/3 bg-line rounded-full" />
        <div className="h-1 w-1/2 bg-line rounded-full" />
        <div className="h-1 w-3/5 bg-line rounded-full" />
      </div>
    </div>
  );
}