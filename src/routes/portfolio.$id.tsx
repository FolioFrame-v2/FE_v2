import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { PortfolioTemplate } from "@/components/portfolio-templates";
import { SAMPLE_PORTFOLIO, TEMPLATES } from "@/lib/portfolio-data";
import { Heart, Bookmark } from "lucide-react";
import { useState } from "react";

const searchSchema = z.object({
  template: z.string().optional().default("minimal"),
  role: z.string().optional(),
});

export const Route = createFileRoute("/portfolio/$id")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "완성된 포트폴리오 — FolioFrame" },
      { name: "description", content: "선택한 템플릿이 적용된 포트폴리오를 확인하세요." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { template, role } = Route.useSearch();
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const activeTemplate = TEMPLATES.find((t) => t.id === template) ?? TEMPLATES[0];

  const isOwner = role === 'owner' || !role; 
  const isRecruiter = role === 'recruiter';
  
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [proposed, setProposed] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Owner toolbar */}
      <div className="border-b border-line bg-background/80 backdrop-blur sticky top-16 z-30">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 text-sm">
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint" />Published</span>
            <span className="font-mono text-xs text-ink-soft">FolioFrame.app/p/{id}</span>
          </div>
          <div className="flex items-center gap-2">
            {!isOwner && !isRecruiter && (
              <>
                <span className="text-xs text-ink-soft hidden md:inline">템플릿 미리보기 모드</span>
                <div className="flex items-center gap-1 p-1 rounded-full border border-line bg-card mr-2">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => navigate({ to: "/portfolio/$id", params: { id }, search: { template: t.id, role } })}
                      className={`px-3 h-7 rounded-full text-xs font-medium transition ${activeTemplate.id === t.id ? "bg-primary text-primary-foreground" : "text-ink-soft hover:text-ink"}`}
                    >
                      {t.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="flex items-center gap-1 mr-2 border-r border-line pr-4">
              <button 
                disabled={isOwner}
                onClick={() => setLiked(!liked)}
                className={`p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs ${liked ? 'text-coral' : 'text-ink-soft'} ${isOwner ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-2'}`}
                title={isOwner ? "자신의 포트폴리오에는 좋아요를 누를 수 없습니다" : "좋아요"}
              >
                <Heart className="size-4" fill={liked ? "currentColor" : "none"} />
                <span className="font-mono">{12 + (liked ? 1 : 0)}</span>
              </button>
              <button 
                disabled={isOwner}
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs ${bookmarked ? 'text-coral' : 'text-ink-soft'} ${isOwner ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-2'}`}
                title={isOwner ? "자신의 포트폴리오에는 북마크를 누를 수 없습니다" : "북마크"}
              >
                <Bookmark className="size-4" fill={bookmarked ? "currentColor" : "none"} />
              </button>
            </div>

            {isOwner && (
              <>
                <Link to="/portfoliopageeditor" search={{ templateId: activeTemplate.id, portfolioId: id }} className="h-9 px-4 rounded-full border border-line text-xs font-medium inline-flex items-center hover:bg-surface">내용 수정</Link>
                <button
                  onClick={() => navigator.clipboard?.writeText(`http://localhost:8080/portfolio/${id}`)}
                  className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-medium"
                >
                  공유 링크 복사
                </button>
              </>
            )}
            
            {isRecruiter && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-soft hidden md:inline">이 인재가 마음에 든다면?</span>
                <button
                  onClick={() => setProposed(!proposed)}
                  className={`h-9 px-4 rounded-full text-xs font-medium transition ${
                    proposed ? "bg-surface border border-line text-ink" : "bg-primary text-primary-foreground"
                  }`}
                >
                  {proposed ? "제안회수" : "제안하기"}
                </button>
              </div>
            )}
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
