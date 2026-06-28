import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Nav } from "@/components/ui/nav";
import { PortfolioTemplate } from "@/components/portfolio-templates";
import { SAMPLE_PORTFOLIO, TEMPLATES } from "@/lib/portfolio-data";

const searchSchema = z.object({
  template: z.string().optional().default("minimal"),
});

export const Route = createFileRoute("/portfolio/$id")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "완성된 포트폴리오 — devfolio" },
      { name: "description", content: "선택한 템플릿이 적용된 포트폴리오를 확인하세요." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { template } = Route.useSearch();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const activeTemplate = TEMPLATES.find((t) => t.id === template) ?? TEMPLATES[0];

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Owner toolbar */}
      <div className="border-b border-line bg-background/80 backdrop-blur sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 text-sm">
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint" />Published</span>
            <span className="font-mono text-xs text-ink-soft">devfolio.app/p/{id}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-ink-soft hidden md:inline">템플릿</span>
            <div className="flex items-center gap-1 p-1 rounded-full border border-line bg-card">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => navigate({ to: "/portfolio/$id", params: { id }, search: { template: t.id } })}
                  className={`px-3 h-7 rounded-full text-xs font-medium transition ${activeTemplate.id === t.id ? "bg-primary text-primary-foreground" : "text-ink-soft hover:text-ink"}`}
                >
                  {t.name.split(" ")[0]}
                </button>
              ))}
            </div>
            <Link to="/templates" className="h-9 px-3 rounded-full border border-line text-xs inline-flex items-center hover:bg-surface">템플릿 변경</Link>
            <Link to="/portfoliopageeditor" className="h-9 px-3 rounded-full border border-line text-xs inline-flex items-center hover:bg-surface">내용 수정</Link>
            <button
              onClick={() => navigator.clipboard?.writeText(`https://devfolio.app/p/${id}`)}
              className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-medium"
            >
              공유 링크 복사
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl p-6">
        <div className="rounded-2xl border border-line overflow-hidden shadow-sm bg-card">
          <PortfolioTemplate id={activeTemplate.id} data={SAMPLE_PORTFOLIO} />
        </div>
        <p className="mt-4 text-center text-xs font-mono text-ink-soft">
          이 페이지는 <span className="text-ink">{activeTemplate.name}</span> 템플릿이 적용된 상태입니다.
        </p>
      </div>
    </div>
  );
}
