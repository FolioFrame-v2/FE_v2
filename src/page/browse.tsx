import { Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Check, ChevronDown, X } from "lucide-react";

import { REGIONS } from "@/lib/regions";
import { FilterBar, type FilterGroup } from "@/components/ui/filter-bar";
import { useGetPublicList } from "@/api/generated/portfolio/portfolio";
import { useBookmark, useCancelBookmark } from "@/api/generated/portfolio-bookmark/portfolio-bookmark";
import { useBookmarks } from "@/hooks/useBookmarks";
import { toast } from "sonner";

export default BrowsePage;

// 목업 PORTFOLIOS 데이터 및 Portfolio 타입 제거

const GROUPS: FilterGroup[] = [
  { key: "part", label: "파트", options: ["전체", "Frontend", "Backend", "Fullstack", "Mobile", "Data", "DevOps", "Embedded"] },
  { key: "field", label: "분야", options: ["전체", "AI/ML", "이커머스", "협업툴", "헬스케어", "에듀테크", "미디어", "IoT", "인프라"] },
  { key: "experience", label: "경력", options: ["전체", "없음", "1년 미만", "1~3년", "3~5년", "5~7년", "7~10년", "10년 이상"] },
];

function BrowsePage() {
  const [filters, setFilters] = useState<Record<string, string>>({ part: "전체", field: "전체", experience: "전체" });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");
  const [showBookmarked, setShowBookmarked] = useState(false);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);

  const ALL_DISTRICTS = useMemo(() => {
    const set = new Set<string>();
    Object.values(REGIONS).forEach(list => list.forEach(d => {
      if (d !== "전체") set.add(d);
    }));
    return Array.from(set).sort();
  }, []);

  const selectedRegion = province
    ? district && district !== "전체"
      ? district
      : province
    : district && district !== "전체"
      ? district
      : "";

  const clearRegion = () => {
    setProvince("");
    setDistrict("");
  };
  const [proposalTarget, setProposalTarget] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);

  // 클라이언트 환경에서 localStorage 확인하여 로그인 상태 설정
  useEffect(() => {
    const type = localStorage.getItem("userType");
    setCurrentUser(!!type);
    setIsRecruiter(type === "recruiter");
  }, []);

  const isGuest = !currentUser;

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${proposalTarget?.author}님에게 매칭 제안이 전송되었습니다.`);
    setProposalTarget(null);
  };

  // API 호출용 sort 매핑
  const apiSort = sort === "최신순" ? "LATEST" : sort === "인기순" ? "POPULAR" : "MOST_VIEWED";

  const { data: publicListData, isLoading } = useGetPublicList({
    sort: apiSort as any,
    page: 0,
    size: 20
  });

  const apiPortfolios = publicListData?.data?.result?.content || [];

  // 북마크 상태 (전역 상태 공유)
  const { bookmarks: localBookmarks, setBookmarkState } = useBookmarks();
  const [localBookmarkCounts, setLocalBookmarkCounts] = useState<Record<number, number>>({});

  const { mutateAsync: addBookmark } = useBookmark();
  const { mutateAsync: removeBookmark } = useCancelBookmark();

  const handleBookmarkToggle = async (p: any, e: React.MouseEvent) => {
    e.preventDefault();
    if (isGuest) {
      alert("로그인이 필요합니다.");
      return;
    }
    const pid = p.id;
    const currentlyBookmarked = localBookmarks[pid] || false; // Backend lacks isBookmarked, assume false initially

    // Optimistic UI
    setBookmarkState(pid, !currentlyBookmarked);
    setLocalBookmarkCounts(prev => ({
      ...prev,
      [pid]: (prev[pid] ?? (p.bookmarkCount || 0)) + (currentlyBookmarked ? -1 : 1)
    }));

    try {
      if (currentlyBookmarked) {
        await removeBookmark({ portfolioId: pid });
        toast("북마크가 취소되었습니다.");
      } else {
        await addBookmark({ portfolioId: pid });
        toast.success("북마크에 추가되었습니다.");
      }
    } catch (err) {
      if ((err as any)?.response?.data?.code === 'BOOKMARK409_1') {
        toast.success("이미 북마크된 포트폴리오입니다.");
        return;
      }
      console.error(err);
      // Revert Optimistic UI
      setBookmarkState(pid, currentlyBookmarked);
      setLocalBookmarkCounts(prev => ({
        ...prev,
        [pid]: (prev[pid] ?? (p.bookmarkCount || 0))
      }));
      toast.error("북마크 처리에 실패했습니다.");
    }
  };

  const filtered = useMemo(() => {
    let result = apiPortfolios.filter((p: any) => {
      // 북마크 필터링
      if (showBookmarked && !localBookmarks[p.id]) return false;
      // 프론트엔드 필터링 적용
      if (selectedRegion && selectedRegion !== "전체") {
        if (!p.authorRegion?.name?.includes(selectedRegion)) return false;
      }
      if (filters.part !== "전체" && p.jobRole !== filters.part) return false;
      if (filters.experience !== "전체" && p.careerLevel !== filters.experience) return false;
      if (search && !(p.title + p.authorName + (p.techstacks?.map((t: any) => t.name).join(" "))).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    return result;
  }, [apiPortfolios, filters, search, selectedRegion, showBookmarked, localBookmarks]);

  return (
    <div className="min-h-screen text-foreground">

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint " />Portfolio</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">포트폴리오</h1>
            <p className="mt-2 text-ink-soft text-sm">다른 개발자들이 만든 포트폴리오를 둘러보세요.</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowBookmarked(!showBookmarked)}
                className={"px-4 py-2 h-10 rounded-lg text-sm font-medium transition " + (showBookmarked ? "bg-primary text-primary-foreground" : "bg-surface border border-line text-ink hover:bg-surface-2")}
              >
                북마크한 포트폴리오
              </button>
              <Link to="/templates" className="h-10 px-5 rounded-lg bg-[#0A27A6] text-surface text-sm font-medium grid place-items-center hover:opacity-90 transition">
                새 포트폴리오
              </Link>
            </div>
            <div className="text-xs font-mono text-ink-soft">
              {isGuest ? Math.min(filtered.length, 3) : filtered.length} / {publicListData?.data?.result?.totalElements || filtered.length} 결과
            </div>
          </div>
        </header>

        <FilterBar
          groups={GROUPS}
          value={filters}
          onChange={setFilters}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="제목 · 작성자 · 기술 스택 검색"
          sortOptions={["최신순", "인기순", "조회순"]}
          sort={sort}
          onSortChange={setSort}
          layoutClassName="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 relative z-20"
          customFiltersPosition="start"
          customFilters={
            <div className="space-y-1.5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">지역</div>
                {selectedRegion && (
                  <span className="text-[10px] font-mono text-ink-soft">선택: {selectedRegion}</span>
                )}
              </div>
              <div className="flex flex-nowrap items-center gap-1.5">
                <div className="relative">
                  <button
                    onClick={() => { setOpenProvince(!openProvince); setOpenDistrict(false); }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition focus:outline-none ${province ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-line text-ink-soft hover:text-ink hover:border-ink-soft"
                      }`}
                  >
                    {province || "시/도"}
                    <ChevronDown className="size-3 opacity-70" />
                  </button>
                  {openProvince && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenProvince(false)} />
                      <div className="absolute top-full left-0 mt-2 w-48 max-h-60 overflow-y-auto bg-surface border border-line rounded-xl shadow-lg z-50 py-2 flex flex-col hide-scrollbar">
                        {Object.keys(REGIONS).map(r => (
                          <button
                            key={r}
                            onClick={() => { setProvince(r); setDistrict(""); setOpenProvince(false); }}
                            className={`w-full flex items-center justify-between px-4 py-2 text-sm transition ${province === r ? "font-medium text-primary bg-primary/5" : "text-ink hover:bg-surface"
                              }`}
                          >
                            <span>{r}</span>
                            {province === r && <Check className="size-4" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => {
                      setOpenDistrict(!openDistrict);
                      setOpenProvince(false);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border transition focus:outline-none ${district ? "bg-primary text-primary-foreground border-primary" : "bg-surface border-line text-ink-soft hover:text-ink hover:border-ink-soft"
                      }`}
                  >
                    {district || "시/구/군"}
                    <ChevronDown className="size-3 opacity-70" />
                  </button>
                  {openDistrict && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenDistrict(false)} />
                      <div className="absolute top-full left-0 mt-2 w-56 max-h-60 overflow-y-auto bg-surface border border-line rounded-xl shadow-lg z-50 py-2 flex flex-col hide-scrollbar">
                        {(province && REGIONS[province] ? REGIONS[province] : ALL_DISTRICTS).map(d => (
                          <button
                            key={d}
                            onClick={() => {
                              setDistrict(d);
                              if (!province && d !== "전체") {
                                const foundProv = Object.keys(REGIONS).find(p => REGIONS[p].includes(d));
                                if (foundProv) setProvince(foundProv);
                              }
                              setOpenDistrict(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-2 text-sm transition ${district === d ? "font-medium text-primary bg-primary/5" : "text-ink hover:bg-surface"
                              }`}
                          >
                            <span>{d}</span>
                            {district === d && <Check className="size-4" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {province && (
                  <button
                    onClick={clearRegion}
                    className="flex items-center gap-0.5 px-2 py-1 text-[10px] text-ink-soft hover:text-ink border border-line rounded-full hover:bg-surface transition ml-1"
                  >
                    <X className="size-3" />
                    초기화
                  </button>
                )}
              </div>
            </div>
          }
        />

        <section className="relative min-h-[500px]">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div className="col-span-full py-12 text-center text-ink-soft text-sm">
                포트폴리오 불러오는 중...
              </div>
            ) : filtered.length === 0 ? (
              <div className="col-span-full py-12 text-center text-ink-soft">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-sm">조건에 맞는 포트폴리오가 없습니다.</p>
              </div>
            ) : (
              (isGuest ? filtered.slice(0, 3) : filtered).map((p: any, i: number) => {
                const accentColor = i % 2 === 0 ? "var(--color-mint)" : "var(--color-coral)";
                const isBlurred = isGuest && i >= 3;
                return (
                  <div key={p.id} className={isBlurred ? "opacity-30 blur-[6px] pointer-events-none select-none transition-all duration-500" : ""}>
                    <Link
                      to="/portfolio/$id"
                      params={{ id: String(p.id) }}
                      className="surface-card group flex flex-col justify-between overflow-hidden hover:-translate-y-1 transition duration-300 block h-full"
                    >
                      <article className="flex flex-col h-full">
                        <div className="p-5 flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="h-10 w-10 rounded-full grid place-items-center font-display font-bold text-lg" style={{ background: `color-mix(in oklch, ${accentColor} 30%, var(--color-surface))` }}>
                              {p.authorName ? p.authorName[0] : "?"}
                            </div>
                            <button
                              onClick={(e) => handleBookmarkToggle(p, e)}
                              className={`p-2 -mr-2 transition ${localBookmarks[p.id] ? 'text-coral' : 'text-ink-soft hover:text-ink'}`}
                            >
                              <svg className="size-5" fill={localBookmarks[p.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                            </button>
                          </div>
                          <h3 className="font-display text-lg font-semibold tracking-tight leading-tight group-hover:text-primary transition">{p.title}</h3>
                          <p className="mt-1.5 text-sm text-ink-soft font-medium">{p.authorName}</p>

                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {(p.techstacks || []).slice(0, 3).map((stack: any) => (
                              <span key={stack.id} className="chip bg-surface border-line text-[10px] text-ink">{stack.name}</span>
                            ))}
                            {(p.techstacks || []).length > 3 && (
                              <span className="chip bg-surface border-line text-[10px] text-ink-soft">+{p.techstacks.length - 3}</span>
                            )}
                          </div>
                        </div>

                        <div className="px-5 py-4 border-t border-line bg-surface-2 flex items-center justify-between mt-auto">
                          <div className="flex gap-4 text-xs font-mono text-ink-soft">
                            <span className="flex items-center gap-1.5"><svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>{(p.viewCount || 0).toLocaleString()}</span>
                            <span className="flex items-center gap-1.5"><svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>{(localBookmarkCounts[p.id] ?? p.bookmarkCount ?? 0).toLocaleString()}</span>
                          </div>
                          {isRecruiter && (
                            <button
                              onClick={(e) => { e.preventDefault(); setProposalTarget(p); }}
                              className="text-[11px] font-medium text-primary hover:underline underline-offset-2"
                            >
                              매칭 제안
                            </button>
                          )}
                        </div>
                      </article>
                    </Link>
                  </div>
                );
              })
            )}
          </div>

          {isGuest && filtered.length > 3 && (
            <div className="absolute left-0 right-0 top-[280px] bottom-0 z-10 flex flex-col justify-start">
              <div className="sticky top-1/2 -translate-y-1/2 bg-surface/80 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-line max-w-md mx-auto w-full text-center mt-32">
                <div className="w-16 h-16 mx-auto bg-surface border border-line shadow-sm rounded-2xl flex items-center justify-center text-3xl mb-5">🔒</div>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink mb-3 break-keep">더 많은 포트폴리오를 확인하시겠어요?</h2>
                <p className="text-ink-soft text-sm leading-relaxed mb-8 break-keep">
                  FolioFrame에 가입하고 뛰어난 인재들의<br />모든 포트폴리오를 제한 없이 열람하세요.
                </p>
                <div className="space-y-3">
                  <Link to="/onboarding" className="h-12 w-full rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center hover:opacity-90 transition shadow-sm">
                    3초만에 회원가입
                  </Link>
                  <Link to="/login" className="h-12 w-full rounded-xl border border-line bg-surface text-ink font-medium flex items-center justify-center hover:bg-surface-2 transition">
                    기존 계정으로 로그인
                  </Link>
                </div>
              </div>
            </div>
          )}
        </section>

        {proposalTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-surface w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="p-6 border-b border-line/60 flex items-center justify-between">
                <h2 className="text-xl font-display font-semibold tracking-tight">매칭 제안하기</h2>
                <button
                  onClick={() => setProposalTarget(null)}
                  className="text-ink-soft hover:text-ink transition flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-2"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleProposalSubmit} className="p-6 space-y-4">
                <div>
                  <p className="text-sm font-medium mb-1">대상 인재</p>
                  <p className="text-sm text-ink-soft">{proposalTarget.author} ({proposalTarget.part})</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">제안 메시지</label>
                  <textarea
                    className="w-full h-32 p-3 border border-line rounded-lg bg-surface-2 focus:bg-white transition-colors outline-none focus:border-primary resize-none text-sm"
                    placeholder="인재에게 전달할 매칭 제안 메시지를 작성해주세요..."
                    required
                  ></textarea>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setProposalTarget(null)}
                    className="h-10 px-5 rounded-lg border border-line text-sm font-medium hover:bg-surface-2 transition"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-sm"
                  >
                    보내기
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
