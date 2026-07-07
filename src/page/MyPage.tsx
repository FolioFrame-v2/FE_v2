import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useGetList3, useDelete3 } from "@/api/generated/portfolio/portfolio";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMyProfile, useGetSignupInfo } from "@/api/generated/talent-profile/talent-profile";
import { useGetRegions } from "@/api/generated/region/region";
import { toast } from "sonner";

import { useGetJobPostings } from "@/api/generated/job-posting/job-posting";
import { useGetPublicList } from "@/api/generated/portfolio/portfolio";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useJobBookmarks } from "@/hooks/useJobBookmarks";

import { BookmarkCheck, Bookmark, Briefcase } from "lucide-react";

const INITIAL_SAVED_COMPANIES = [
  { id: "co1", name: "Kakao", part: "Backend", region: "판교", stage: "지원완료", logo: "K", color: "var(--color-mint)", submittedPortfolio: "실시간 협업 화이트보드" },
  { id: "co2", name: "Toss", part: "Frontend", region: "강남", stage: "제안받음", logo: "T", color: "var(--color-coral)", submittedPortfolio: "" },
  { id: "co3", name: "당근마켓", part: "Fullstack", region: "서초", stage: "", logo: "당", color: "var(--color-mint)" },
  { id: "co4", name: "네이버", part: "Data", region: "분당", stage: "", logo: "N", color: "var(--color-coral)" },
];

type JobPosting = {
  id: number;
  company: string;
  title: string;
  experience: string;
  region: string;
  status: string;
  skills: string[];
  intro: string;
  accent: string;
  views: number;
  likes: number;
  createdAt: string;
};

const INITIAL_JOB_POSTINGS: JobPosting[] = [
  { id: 1, company: "Toss", title: "Frontend Developer", experience: "신입/경력", region: "서울 강남구", status: "채용 중", skills: ["React", "TypeScript", "Next.js"], intro: "토스에서 사용자 중심의 프론트엔드를 개발할 분을 모십니다.", accent: "var(--color-mint)", views: 1540, likes: 320, createdAt: "2026-06-25" },
  { id: 2, company: "Kakao", title: "Backend Engineer", experience: "3년 이상", region: "판교", status: "채용 중", skills: ["Java", "Spring Boot", "MySQL"], intro: "카카오톡 메시징 서버 성능 최적화를 함께할 전문가를 찾습니다.", accent: "var(--color-coral)", views: 890, likes: 150, createdAt: "2026-06-20" },
  { id: 3, company: "Naver", title: "iOS Engineer", experience: "5년 이상", region: "분당", status: "마감 임박", skills: ["Swift", "RxSwift", "iOS"], intro: "네이버 앱의 새로운 사용자 경험을 설계하고 구현합니다.", accent: "var(--color-mint)", views: 2100, likes: 450, createdAt: "2026-06-28" },
  { id: 4, company: "Line", title: "Data Scientist", experience: "경력 무관", region: "원격", status: "채용 중", skills: ["Python", "PyTorch", "SQL"], intro: "글로벌 메신저 라인의 대규모 데이터를 분석하고 모델을 개발합니다.", accent: "var(--color-coral)", views: 1200, likes: 280, createdAt: "2026-06-22" },
  { id: 5, company: "Daangn", title: "DevOps Engineer", experience: "5년 이상", region: "서울 서초구", status: "채용 중", skills: ["Kubernetes", "AWS", "Terraform"], intro: "당근마켓의 글로벌 인프라를 구축하고 안정적으로 운영합니다.", accent: "var(--color-mint)", views: 650, likes: 90, createdAt: "2026-06-18" },
  { id: 6, company: "Woowa Bros", title: "Fullstack Engineer", experience: "1~3년", region: "서울 송파구", status: "채용 중", skills: ["Node.js", "React", "TypeScript"], intro: "배달의민족 서비스의 신규 피처를 개발합니다.", accent: "var(--color-coral)", views: 420, likes: 50, createdAt: "2026-06-15" },
];

const INITIAL_PROPOSED_CANDIDATES = [
  { id: "pc1", name: "김도현", position: "Frontend Developer", portfolioTitle: "사용자 경험을 최우선으로 하는 프론트엔드 개발자", stage: "제안 대기", views: 120, date: "2026-07-01" },
  { id: "pc2", name: "이민수", position: "Backend Engineer", portfolioTitle: "대용량 트래픽 처리를 경험한 백엔드 엔지니어", stage: "제안 거절", views: 450, date: "2026-06-28" },
  { id: "pc3", name: "박지은", position: "Data Scientist", portfolioTitle: "데이터로 비즈니스 가치를 창출하는 데이터 사이언티스트", stage: "수락완료", views: 320, date: "2026-06-20" },
];

export default function MyPage() {
  const [isRecruiter, setIsRecruiter] = useState(false);

  useEffect(() => {
    const type = localStorage.getItem("userType");
    setIsRecruiter(type === "recruiter");
  }, []);

  const { data: portfoliosData, isLoading: portfoliosLoading } = useGetList3({ page: 0, size: 10 });
  const myPortfolios = portfoliosData?.data?.result?.content || [];

  const { data: profileRes, isLoading: isProfileLoading } = useGetMyProfile({ memberId: 0 });
  const { data: signupRes } = useGetSignupInfo({ memberId: 0 }, { query: { enabled: !profileRes?.data?.result } });
  const { data: regionsRes } = useGetRegions();
  const p = profileRes?.data?.result;
  const s = signupRes?.data?.result;
  const targetRegion = regionsRes?.data?.result?.find((r: any) => r.id === p?.regionId);
  const mappedRegion = targetRegion ? (targetRegion.parentName ? `${targetRegion.parentName} ${targetRegion.name}` : (targetRegion.fullName || targetRegion.name || "")) : "";

  const displayName = p?.name || s?.name || "이름 없음";
  const displayEmail = p?.contactEmail || "-";
  const displayPhone = p?.phoneNumber || s?.phone || "-";

  const [tab, setTab] = useState<"portfolios" | "companies">("portfolios");
  const [subTab, setSubTab] = useState<"bookmarks" | "proposals">("bookmarks");
  const [previewCompany, setPreviewCompany] = useState<any>(null);

  const { bookmarks: localBookmarks } = useBookmarks();
  const { jobBookmarks } = useJobBookmarks();

  const { data: jobPostingsData, isLoading: jobsLoading } = useGetJobPostings(
    { keyword: (p as any)?.companyName || "", pageable: { page: 0, size: 10 } },
    { query: { enabled: isRecruiter && tab === "portfolios" && !!(p as any)?.companyName } }
  );
  const myJobPostings = jobPostingsData?.data?.result?.content || [];

  const { data: publicListData, isLoading: publicListLoading } = useGetPublicList(
    { sort: "LATEST" as any, page: 0, size: 50 },
    { query: { enabled: isRecruiter && tab === "companies" } }
  );
  const publicPortfolios = publicListData?.data?.result?.content || [];

  const bookmarkedPortfolios = publicPortfolios.filter(port => port.id && localBookmarks[port.id]);
  const bookmarkedJobs = INITIAL_JOB_POSTINGS.filter(job => jobBookmarks[String(job.id)]);

  const [companies, setCompanies] = useState(INITIAL_SAVED_COMPANIES);
  const [proposedCandidates, setProposedCandidates] = useState(INITIAL_PROPOSED_CANDIDATES);
  const [cancelTarget, setCancelTarget] = useState<any>(null);
  const queryClient = useQueryClient();

  const { mutate: deletePortfolio } = useDelete3({
    mutation: {
      onSuccess: () => {
        alert("포트폴리오가 삭제되었습니다.");
        queryClient.invalidateQueries({ queryKey: ['/api/v1/portfolios'] });
      },
      onError: (err: any) => {
        alert("삭제 실패: " + err.message);
      }
    }
  });

  const handleDeletePortfolio = (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      deletePortfolio({ portfolioId: id });
    }
  };

  const handleCancelConfirm = () => {
    if (cancelTarget) {
      setCompanies((prev) => prev.map(c => c.id === cancelTarget.id ? { ...c, stage: "" } : c));
      setCancelTarget(null);
    }
  };

  const handleAcceptProposal = (id: string) => {
    setCompanies((prev) => prev.map(c => c.id === id ? { ...c, stage: "수락완료" } : c));
    alert("제안을 수락했습니다.");
  };

  return (
    <div className="min-h-screen text-foreground">

      <main className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-8">
        {/* Profile */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="surface-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-2xl">{displayName ? displayName.slice(0, 1) : "U"}</div>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">{isProfileLoading ? "로딩중..." : displayName}</h2>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat label={isRecruiter ? "공고" : "포폴"} value={myPortfolios.length.toString()} />
              <Stat label="관심" value="0" />
              <Stat label="조회" value="0" />
            </div>
            <Link to="/profileedit" className="mt-5 flex items-center justify-center h-9 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
              기본 정보 수정
            </Link>
          </div>

          <div className="surface-card p-6 space-y-3">
            <h3 className="font-display font-semibold tracking-tight">기본 정보</h3>
            <InfoRow label="직군" value={isRecruiter ? "IT / 인터넷" : (p?.parts?.map((x: any) => x.name).join(", ") || "-")} />
            <InfoRow label="지역" value={isRecruiter ? "서울 · 강남구" : (mappedRegion || "-")} />
            {isRecruiter ? (
              <InfoRow label="설립년도" value="5년" />
            ) : (
              <InfoRow label="경력" value={p?.careerYears === 0 ? "신입" : p?.careerYears ? `${p.careerYears}년차` : "-"} />
            )}
            <InfoRow label="이메일" value={isRecruiter ? "recruit@company.com" : displayEmail} />
            <InfoRow label="전화번호" value={isRecruiter ? "010-1234-5678" : displayPhone} />
            {!isRecruiter && <InfoRow label="GitHub" value={p?.githubUrl?.replace(/^https?:\/\//i, "") || "-"} />}
            <InfoRow label="웹사이트" value={isRecruiter ? "www.company.com" : (p?.portfolioWebsite?.replace(/^https?:\/\//i, "") || "-")} />
          </div>

          <div className="surface-card p-6 space-y-3">
            <h3 className="font-display font-semibold tracking-tight">관심 기술 스택</h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {isRecruiter ? (
                ["React", "TypeScript", "Node.js", "Java"].map((stack: string) => (
                  <span key={stack} className="chip bg-surface border-line text-ink text-xs">{stack}</span>
                ))
              ) : (
                <>
                  {p?.techStacks?.map((stack: any) => (
                    <span key={stack.name} className="chip bg-surface border-line text-ink text-xs">{stack.name}</span>
                  ))}
                  {(!p?.techStacks || p.techStacks.length === 0) && <span className="text-sm text-ink-soft">등록된 기술 스택이 없습니다.</span>}
                </>
              )}
            </div>
            <p className="text-xs text-ink-soft mt-2">{isRecruiter ? "관심 포트폴리오 알림 수신 중" : "관련 기업 공고 알림 수신 중"}</p>
          </div>
        </aside>

        {/* Content column */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2 surface-card p-1.5 w-fit">
            <TabBtn active={tab === "portfolios"} onClick={() => setTab("portfolios")}>
              {isRecruiter ? "기업 공고" : "내 포트폴리오"}
            </TabBtn>
            <TabBtn active={tab === "companies"} onClick={() => setTab("companies")}>
              {isRecruiter ? "관심 인재" : "관심 공고"}
            </TabBtn>
          </div>

          {tab === "portfolios" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {isRecruiter ? (
                jobsLoading ? (
                  <div className="text-sm text-ink-soft">공고 불러오는 중...</div>
                ) : (
                  [
                    { id: "job1", title: "Frontend Developer", positionName: "웹 프론트엔드 엔지니어", jobRole: "프론트엔드", employmentType: "정규직", status: "채용 중" },
                    { id: "job2", title: "Backend Engineer", positionName: "서버/백엔드 엔지니어", jobRole: "백엔드", employmentType: "정규직", status: "채용 중" },
                  ].map((job) => (
                    <Link to="/jobs/$id" params={{ id: job.id }} key={job.id} className="surface-card p-5 hover:-translate-y-0.5 transition flex flex-col block">
                      <div className="flex items-start justify-between">
                        <h3 className="font-display text-base font-semibold tracking-tight">{job.title}</h3>
                        <StatusChip status={job.status} />
                      </div>
                      <div className="text-sm text-ink-soft mb-4 mt-2">{job.positionName}</div>
                      <div className="text-xs text-ink-soft mt-auto border-t border-line pt-3 flex justify-between">
                        <span>{job.jobRole}</span>
                        <span>{job.employmentType}</span>
                      </div>
                    </Link>
                  ))
                )
              ) : portfoliosLoading ? (
                <div className="text-sm text-ink-soft">포트폴리오 불러오는 중...</div>
              ) : (
                [...myPortfolios].sort((a, b) => new Date(b.lastSavedAt || "").getTime() - new Date(a.lastSavedAt || "").getTime()).map((p) => (
                  <article key={p.id} className="surface-card p-5 hover:-translate-y-0.5 transition">
                    <div className="flex items-start justify-between">
                      <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                      <StatusChip status={p.visibility === "PUBLIC" ? "공개" : "비공개"} />
                    </div>
                    <div className="mt-3 text-xs font-mono text-ink-soft">최근 수정 · {p.lastSavedAt ? new Date(p.lastSavedAt).toLocaleDateString() : ""}</div>
                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-line">
                      <span className="text-xs text-ink-soft">{(p.viewCount || 0).toLocaleString()} views</span>
                      <div className="flex gap-2">
                        <Link to="/portfoliopageeditor" search={{ templateId: undefined, portfolioId: String(p.id) }} className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs grid place-items-center hover:opacity-90 transition">편집</Link>
                        <button onClick={() => p.id && handleDeletePortfolio(p.id)} className="h-8 px-3 rounded-md border border-coral text-coral text-xs hover:bg-coral/10 transition">삭제</button>
                      </div>
                    </div>
                  </article>
                ))
              )}
              {isRecruiter ? (
                <Link to="/jobs/new" className="surface-card border-dashed border-2 p-5 grid place-items-center text-ink-soft hover:text-ink hover:border-ink-soft transition min-h-[180px]">
                  <div className="text-center">
                    <div className="text-3xl font-display">＋</div>
                    <div className="mt-1 text-sm">새 공고 작성</div>
                  </div>
                </Link>
              ) : (
                <Link to="/templates" className="surface-card border-dashed border-2 p-5 grid place-items-center text-ink-soft hover:text-ink hover:border-ink-soft transition min-h-[180px]">
                  <div className="text-center">
                    <div className="text-3xl font-display">＋</div>
                    <div className="mt-1 text-sm">새 포트폴리오</div>
                  </div>
                </Link>
              )}
            </div>
          )}

          {tab === "companies" && (
            <div className="space-y-6">
              <div className="flex items-center gap-6 border-b border-line mb-6">
                <button
                  onClick={() => setSubTab("bookmarks")}
                  className={`pb-3 text-sm font-medium transition relative ${subTab === "bookmarks" ? "text-ink" : "text-ink-soft hover:text-ink"}`}
                >
                  북마크
                  {subTab === "bookmarks" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ink rounded-t-full" />}
                </button>
                <button
                  onClick={() => setSubTab("proposals")}
                  className={`pb-3 text-sm font-medium transition relative ${subTab === "proposals" ? "text-ink" : "text-ink-soft hover:text-ink"}`}
                >
                  {isRecruiter ? "제안 내역" : "받은 제안"}
                  {subTab === "proposals" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-ink rounded-t-full" />}
                </button>
              </div>

              {subTab === "bookmarks" ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {isRecruiter ? (
                    publicListLoading ? (
                      <div className="text-sm text-ink-soft py-10 text-center col-span-2">북마크한 인재를 불러오는 중...</div>
                    ) : bookmarkedPortfolios.length > 0 ? (
                      bookmarkedPortfolios.map(p => (
                        <Link to="/portfolio/$id" params={{ id: String(p.id) }} key={p.id} className="surface-card p-5 hover:-translate-y-0.5 transition block">
                          <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                          <div className="mt-1 text-sm text-ink-soft">{p.authorName}</div>
                          <div className="mt-4 flex items-center justify-between pt-4 border-t border-line">
                            <span className="text-xs text-ink-soft">{(p.viewCount || 0).toLocaleString()} views</span>
                            <BookmarkCheck className="size-4 text-coral" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-sm text-ink-soft py-10 text-center col-span-2 bg-surface rounded-xl">북마크한 인재가 없습니다.</div>
                    )
                  ) : (
                    bookmarkedJobs.length > 0 ? (
                      bookmarkedJobs.map(job => (
                        <Link to="/jobs/$id" params={{ id: String(job.id) }} key={job.id} className="surface-card p-5 hover:-translate-y-0.5 transition block flex flex-col h-full">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">{job.company} · {job.experience}</div>
                              <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{job.title}</h3>
                            </div>
                            <svg className="size-5 text-coral" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                          </div>
                          <div className="text-xs text-ink-soft mt-auto border-t border-line pt-3 flex justify-between">
                            <span>{job.region}</span>
                            <span>{job.status}</span>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="text-sm text-ink-soft py-10 text-center col-span-2 bg-surface rounded-xl">북마크한 공고가 없습니다.</div>
                    )
                  )}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {isRecruiter ? (
                    // 기업 회원: 제안한 인재 (Mock)
                    proposedCandidates.length > 0 ? (
                      proposedCandidates.map(candidate => (
                        <article key={candidate.id} className="surface-card p-5 hover:-translate-y-0.5 transition block flex flex-col h-full">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">{candidate.name} · {candidate.position}</div>
                              <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{candidate.portfolioTitle}</h3>
                            </div>
                            <StatusChip status={candidate.stage} />
                          </div>
                          <div className="text-xs text-ink-soft mt-auto border-t border-line pt-3 flex justify-between">
                            <span>제안일: {candidate.date}</span>
                            <span>{candidate.views} views</span>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="col-span-2 surface-card p-10 text-center text-ink-soft">
                        <div className="mx-auto w-12 h-12 bg-surface-2 rounded-full grid place-items-center mb-3">
                          <Briefcase className="size-5" />
                        </div>
                        <h4 className="font-display font-medium text-ink mb-1">제안 내역이 없습니다</h4>
                        <p className="text-sm">마음에 드는 인재에게 채용 제안을 보내보세요.</p>
                        <Link to="/" className="mt-4 inline-flex h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium items-center transition hover:opacity-90">
                          인재 탐색하기
                        </Link>
                      </div>
                    )
                  ) : (
                    // 인재 회원: 제안 받은 회사 (Mock - INITIAL_SAVED_COMPANIES 활용)
                    companies.filter(c => c.stage === "제안받음").length > 0 ? (
                      companies.filter(c => c.stage === "제안받음").map((c) => (
                        <article key={c.id} className="surface-card p-5 hover:-translate-y-0.5 transition">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl grid place-items-center font-display font-bold text-lg" style={{ background: `color-mix(in oklch, ${c.color} 30%, var(--color-surface))` }}>
                              {c.logo}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-display text-base font-semibold tracking-tight">{c.name}</h3>
                              <div className="text-xs text-ink-soft">{c.part} 포지션 제안</div>
                            </div>
                            <StatusChip status={c.stage} />
                          </div>
                          <div className="mt-4 flex items-center justify-end gap-2 pt-4 border-t border-line">
                            <button
                              onClick={() => setCancelTarget(c)}
                              className="h-8 px-3 rounded-md border border-line text-xs hover:bg-surface-2 transition"
                            >
                              거절
                            </button>
                            <button
                              onClick={() => handleAcceptProposal(c.id)}
                              className="h-8 px-3 rounded-md bg-mint text-ink text-xs hover:opacity-90 transition font-medium"
                            >
                              수락
                            </button>
                          </div>
                        </article>
                      ))
                    ) : (
                      <div className="col-span-2 surface-card p-10 text-center text-ink-soft">
                        <div className="mx-auto w-12 h-12 bg-surface-2 rounded-full grid place-items-center mb-3">
                          <Briefcase className="size-5" />
                        </div>
                        <h4 className="font-display font-medium text-ink mb-1">아직 제안받은 회사가 없습니다</h4>
                        <p className="text-sm">포트폴리오를 업데이트하고 새로운 기회를 기다려보세요.</p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      {/* Cancel Warning Modal */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-coral/10 text-coral flex items-center justify-center mx-auto mb-4 text-2xl">
              !
            </div>
            <h2 className="text-xl font-display font-semibold tracking-tight mb-2">
              {cancelTarget.stage === "지원완료" ? "지원을 취소하시겠습니까?" : "제안을 거절하시겠습니까?"}
            </h2>
            <p className="text-ink-soft text-sm mb-6">
              이 작업은 되돌릴 수 없습니다.
              <br />
              {cancelTarget.name}의 {cancelTarget.stage === "지원완료" ? "지원이 취소" : "제안이 거절"}됩니다.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setCancelTarget(null)}
                className="h-10 px-6 rounded-lg border border-line text-sm font-medium hover:bg-surface-2 transition"
              >
                닫기
              </button>
              <button
                onClick={handleCancelConfirm}
                className="h-10 px-6 rounded-lg bg-coral text-white text-sm font-medium hover:opacity-90 transition shadow-sm"
              >
                {cancelTarget.stage === "지원완료" ? "지원 취소" : "제안 거절"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Preview Modal */}
      {previewCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setPreviewCompany(null)}
              className="absolute top-5 right-5 text-ink-soft hover:text-ink transition flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-2"
            >
              ✕
            </button>
            <div className="p-6 border-b border-line/60">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg grid place-items-center font-display font-bold text-sm" style={{ background: `color-mix(in oklch, ${previewCompany.color} 30%, var(--color-surface))` }}>
                  {previewCompany.logo}
                </div>
                <div>
                  <h2 className="text-xl font-display font-semibold tracking-tight">{previewCompany.name} 제출 포트폴리오</h2>
                  <p className="text-sm text-ink-soft mt-0.5">{previewCompany.submittedPortfolio || "제출된 포트폴리오가 없습니다."}</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface-2 overflow-y-auto min-h-[400px]">
              <div className="bg-white border border-line rounded-xl shadow-sm p-10 aspect-[1/1.4] mx-auto w-full max-w-md transform transition hover:scale-[1.01] duration-300">
                <h1 className="text-3xl font-display font-bold mb-6 text-ink">{previewCompany.submittedPortfolio}</h1>
                <p className="text-ink-soft text-sm leading-relaxed mb-8">
                  안녕하세요! 저는 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자 김도현입니다.
                  {previewCompany.name}의 {previewCompany.part} 직무에 지원하기 위해 작성한 포트폴리오입니다.
                </p>
                <div className="space-y-4">
                  <div className="h-3 bg-line/40 rounded-full w-full"></div>
                  <div className="h-3 bg-line/40 rounded-full w-5/6"></div>
                  <div className="h-3 bg-line/40 rounded-full w-4/6"></div>
                  <div className="h-3 bg-line/40 rounded-full w-full mt-8"></div>
                  <div className="h-3 bg-line/40 rounded-full w-3/4"></div>
                  <div className="h-3 bg-line/40 rounded-full w-full"></div>
                </div>
                <div className="mt-12 p-6 border border-line/60 rounded-lg bg-surface/50">
                  <div className="text-xs font-mono text-ink-soft uppercase mb-2">Projects</div>
                  <div className="h-16 bg-line/30 rounded-md"></div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-line/60 flex justify-end bg-surface">
              <button
                onClick={() => setPreviewCompany(null)}
                className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-sm"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface border border-line py-2">
      <div className="font-display font-semibold text-lg">{value}</div>
      <div className="text-[10px] font-mono text-ink-soft uppercase">{label}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm border-b border-line/60 last:border-0 pb-2 last:pb-0">
      <span className="text-ink-soft text-xs font-mono uppercase">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={"h-9 px-4 rounded-full text-sm transition " + (active ? "bg-primary text-primary-foreground" : "text-ink-soft hover:text-ink")}
    >
      {children}
    </button>
  );
}

function StatusChip({ status }: { status: string }) {
  const tone =
    status === "공개" || status === "서류 제출" ? "bg-mint/20 text-ink border-mint/40" :
      status === "비공개" || status === "수락완료" ? "bg-surface-2 text-ink-soft border-line" :
        status === "제안받음" ? "bg-primary/10 text-primary border-primary/20" :
          "bg-coral/15 text-ink border-coral/40";
  return <span className={"chip border whitespace-nowrap px-3 py-1 " + tone}>{status}</span>;
}
