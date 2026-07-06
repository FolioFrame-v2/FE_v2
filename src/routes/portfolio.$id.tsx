import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { PortfolioTemplate } from "@/components/portfolio-templates";
import { SAMPLE_PORTFOLIO, TEMPLATES } from "@/lib/portfolio-data";
import { Heart, Bookmark } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useBookmark, useCancelBookmark } from "@/api/generated/portfolio-bookmark/portfolio-bookmark";
import { useGetDetail } from "@/api/generated/portfolio/portfolio";
import { useGetMyProfile } from "@/api/generated/talent-profile/talent-profile";
import type { PortfolioData } from "@/lib/portfolio-data";
import { useBookmarks } from "@/hooks/useBookmarks";

const searchSchema = z.object({
  template: z.string().optional(),
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

  const { data: myProfileRes } = useGetMyProfile({ memberId: 0 }, { query: { retry: false } });
  const { data: portfolioRes } = useGetDetail(Number(id));
  const portfolioData = portfolioRes?.data?.result;

  const navigate = useNavigate();
  const actualTemplateId = template || portfolioData?.templateLayoutKey || "minimal";
  const activeTemplate = TEMPLATES.find((t) => t.id === actualTemplateId) ?? TEMPLATES[0];

  const isOwner = myProfileRes?.data?.result?.talentProfileId && portfolioData?.talentProfileId 
    ? myProfileRes.data.result.talentProfileId === portfolioData.talentProfileId 
    : false;
  const isRecruiter = role === 'recruiter';
  
  const [liked, setLiked] = useState(false);
  const { bookmarks, setBookmarkState } = useBookmarks();
  const bookmarked = bookmarks[Number(id)] || false;
  const [proposed, setProposed] = useState(false);

  const { mutateAsync: addBookmark } = useBookmark();
  const { mutateAsync: removeBookmark } = useCancelBookmark();

  const mappedData: PortfolioData = portfolioData ? {
    name: (portfolioData.talentProfile as any)?.name || "이름 없음",
    title: portfolioData.title || "제목 없는 포트폴리오",
    oneLiner: portfolioData.oneLiner || "",
    detail: portfolioData.description || "",
    location: portfolioData.talentProfile?.region?.name || "",
    email: portfolioData.talentProfile?.contactEmail || "",
    github: portfolioData.talentProfile?.githubUrl || "",
    website: portfolioData.talentProfile?.portfolioWebsite || "",
    intro: portfolioData.talentProfile?.oneLiner || "",
    educations: portfolioData.educations?.map((e: any) => ({
      schoolName: e.schoolName || "",
      major: e.major || "",
      degree: e.degree === "MASTER" ? "석사" : e.degree === "DOCTOR" ? "박사" : "학사",
      admissionDate: e.startedAt || "",
      graduationDate: e.endedAt || "",
      status: e.status === "LEAVE_OF_ABSENCE" ? "휴학" : e.status === "GRADUATED" ? "졸업" : e.status === "DROPOUT" ? "중퇴" : "재학중"
    })) || [],
    experiences: portfolioData.careers?.map((c: any) => ({
      companyName: c.companyName || "",
      position: c.position || "",
      description: c.description || "",
      startDate: c.startedAt || "",
      endDate: c.endedAt || ""
    })) || [],
    stacks: portfolioData.techstacks?.map((t: any) => t.name) || [],
    roles: portfolioData.jobRole ? [portfolioData.jobRole] : [],
    projects: portfolioData.projects?.map((p: any) => ({
      title: p.name || "",
      summary: p.description || "",
      role: "",
      period: `${p.startedAt || ""} ~ ${p.endedAt || ""}`,
      stacks: [],
      link: p.githubUrl || ""
    })) || [],
    certifications: portfolioData.certificates?.map((c: any) => ({
      name: c.name || "",
      organization: c.issuer || "",
      issueDate: c.issuedAt || ""
    })) || [],
    customFields: []
  } : SAMPLE_PORTFOLIO;

  const handleBookmarkToggle = async () => {
    if (isOwner) return;
    const currentlyBookmarked = bookmarked;
    setBookmarkState(Number(id), !currentlyBookmarked);
    
    try {
      if (currentlyBookmarked) {
        await removeBookmark({ portfolioId: Number(id) });
        toast("북마크가 취소되었습니다.");
      } else {
        await addBookmark({ portfolioId: Number(id) });
        toast.success("북마크에 추가되었습니다.");
      }
    } catch (err) {
      if ((err as any)?.response?.data?.code === 'BOOKMARK409_1') {
        toast.success("이미 북마크된 포트폴리오입니다.");
        return;
      }
      console.error(err);
      setBookmarkState(Number(id), currentlyBookmarked);
      toast.error("북마크 처리에 실패했습니다.");
    }
  };

  const handleProposeToggle = () => {
    if (proposed) {
      setProposed(false);
      toast("제안을 취소했습니다.", {
        description: "인재 측 알림 내역에서 제안이 삭제됩니다."
      });
    } else {
      setProposed(true);
      toast.success("제안이 성공적으로 전송되었습니다.", {
        description: "해당 인재에게 알림이 발송되었습니다. (추후 알림 페이지 연동)"
      });
    }
  };

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
                onClick={handleBookmarkToggle}
                className={`p-1.5 rounded-full transition-colors flex items-center gap-1 text-xs ${bookmarked ? 'text-coral' : 'text-ink-soft'} ${isOwner ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-2'}`}
                title={isOwner ? "자신의 포트폴리오에는 북마크를 누를 수 없습니다" : "북마크"}
              >
                <Bookmark className="size-4" fill={bookmarked ? "currentColor" : "none"} />
              </button>
            </div>

            {isOwner && (
              <>
                <Link to="/portfoliopageeditor" search={{ templateId: activeTemplate.id, portfolioId: id }} className="h-9 px-4 rounded-full border border-line text-xs font-medium inline-flex items-center hover:bg-surface">내용 수정</Link>
              </>
            )}
            
            {isRecruiter && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-ink-soft hidden md:inline">이 인재가 마음에 든다면?</span>
                <button
                  onClick={handleProposeToggle}
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
          <PortfolioTemplate id={activeTemplate.id} data={mappedData} />
        </div>
        <p className="mt-4 text-center text-xs font-mono text-ink-soft">
          이 페이지는 <span className="text-ink">{activeTemplate.name}</span> 템플릿이 적용된 상태입니다.
        </p>
      </div>
    </div>
  );
}
