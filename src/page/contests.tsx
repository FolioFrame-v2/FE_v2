import { useMemo, useState, useEffect } from "react";
import { Nav } from "@/components/ui/nav";
import { FilterBar, type FilterGroup } from "@/components/ui/filter-bar";
import { useGetActivities, useGetBookmarkedActivities, useIncrementViewCount } from "@/api/generated/activity/activity";
import type { ActivityResDTO } from "@/api/generated/models";

export default ContestsPage;

const GROUPS: FilterGroup[] = [
  { key: "type", label: "유형", options: ["전체", "공모전", "해커톤"] },
  { key: "region", label: "지역", options: ["전체", "서울", "경기", "인천", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "원격", "부산", "세종"] },
  { key: "field", label: "분야", options: ["전체", "AI/ML", "헬스케어", "에듀테크", "라이프스타일", "오픈소스", "인프라", "기타"] },
  { key: "team", label: "인원수", options: ["전체", "1인", "2~3인", "4~6인", "7인+"] },
];

function ContestsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({ type: "전체", region: "전체", field: "전체", team: "전체" });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");
  const [showBookmarked, setShowBookmarked] = useState(false);

  const [page, setPage] = useState(1);

  const categoryParam = filters.type === "공모전" ? "CONTEST" : filters.type === "해커톤" ? "HACKATHON" : undefined;
  const sortParam = sort === "조회순" ? "MOST_VIEWED" : sort === "인기순" ? "POPULAR" : "LATEST";

  // 검색 조건이나 탭이 변경되면 페이지를 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [categoryParam, sortParam, showBookmarked]);

  const { data: activitiesData } = useGetActivities({
    category: categoryParam,
    sort: sortParam,
    page: page,
    size: 9,
  }, { query: { enabled: !showBookmarked } });

  const { data: bookmarkedData } = useGetBookmarkedActivities({
    page: page,
    size: 9,
  }, { query: { enabled: showBookmarked } });

  const activities: ActivityResDTO[] = showBookmarked
    ? bookmarkedData?.data.result?.content || []
    : activitiesData?.data.result?.content || [];

  const filtered = useMemo(() => {
    let result = activities.filter((c) => {
      if (filters.region !== "전체" && c.region !== filters.region) return false;
      if (filters.field !== "전체" && c.field !== filters.field) return false;
      if (filters.team !== "전체" && c.teamSize !== filters.team) return false;
      if (search && !(c.title + (c.organizer || "")).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
    return result;
  }, [activities, filters, search]);

  const totalPages = showBookmarked
    ? bookmarkedData?.data.result?.totalPages || 1
    : activitiesData?.data.result?.totalPages || 1;

  const { mutateAsync: incrementView } = useIncrementViewCount();

  const handleViewDetails = async (c: ActivityResDTO) => {
    if (c.activityId) {
      try {
        await incrementView({ activityId: c.activityId });
      } catch (e) {
        console.error("Failed to increment view count", e);
      }
    }
    if (c.sourceUrl) {
      window.open(c.sourceUrl, '_blank');
    }
  };

  const getDDay = (endDate?: string) => {
    if (!endDate) return 0;
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-coral" />Contests</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">공모전 & 해커톤</h1>
            <p className="mt-2 text-ink-soft text-sm">진행 중인 공모전을 한눈에 확인하고 팀을 꾸려 보세요.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={"px-4 py-2 rounded-full text-sm font-medium transition " + (showBookmarked ? "bg-primary text-primary-foreground" : "bg-surface border border-line text-ink hover:bg-surface-2")}
            >
              북마크한 목록 보기
            </button>
            <div className="text-xs font-mono text-ink-soft">{filtered.length} 결과</div>
          </div>
        </header>

        <FilterBar
          groups={GROUPS}
          value={filters}
          onChange={setFilters}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="공모전명 · 주최사 검색"
          sortOptions={["최신순", "인기순", "조회순"]}
          sort={sort}
          onSortChange={setSort}
        />

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const dDay = getDDay(c.recruitmentEnd);
            const accent = c.category === "HACKATHON" ? "var(--color-mint)" : "var(--color-coral)";

            return (
              <article key={c.activityId} className="surface-card overflow-hidden group hover:-translate-y-0.5 transition">
                <div className="relative p-5 border-b border-line overflow-hidden">
                  <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${accent} 25%, transparent), transparent 70%)` }} />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">{c.organizer}</div>
                      <h3 className="mt-1 font-display text-lg font-semibold tracking-tight line-clamp-2">{c.title}</h3>
                    </div>
                    <div className={"shrink-0 text-center rounded-lg px-2.5 py-1.5 border " + (dDay <= 14 ? "border-coral text-coral" : "border-line text-ink-soft")}>
                      <div className="text-[10px] font-mono">D-DAY</div>
                      <div className="font-display font-bold text-lg leading-none">{dDay >= 0 ? dDay : "End"}</div>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Info label="유형" value={c.category === "HACKATHON" ? "해커톤" : c.category === "CONTEST" ? "공모전" : (c.category || "-")} />
                    <Info label="지역" value={c.region || "-"} />
                    <Info label="분야" value={c.field || "-"} />
                    <Info label="인원" value={c.teamSize || "-"} />
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-line">
                    <div className="text-xs font-mono text-ink-soft flex items-center gap-3">
                      <span>조회 {c.viewCount || 0}</span>
                      <span>북마크 {c.bookmarkCount || 0}</span>
                    </div>
                    <div className="text-xs font-mono text-ink-soft">~{c.recruitmentEnd?.split('T')[0] || "상시"}</div>
                  </div>
                  <button
                    onClick={() => handleViewDetails(c)}
                    className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                  >
                    자세히 보기
                  </button>
                </div>
              </article>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full surface-card p-12 text-center text-ink-soft">
              조건에 맞는 공모전이 없습니다.
            </div>
          )}
        </section>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border border-line bg-surface text-ink text-sm hover:bg-surface-2 disabled:opacity-50 disabled:pointer-events-none transition"
            >
              이전
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition ${page === i + 1 ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-surface-2 text-ink-soft'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg border border-line bg-surface text-ink text-sm hover:bg-surface-2 disabled:opacity-50 disabled:pointer-events-none transition"
            >
              다음
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface border border-line px-2.5 py-1.5 truncate">
      <div className="text-[10px] font-mono text-ink-soft uppercase">{label}</div>
      <div className="text-ink truncate">{value}</div>
    </div>
  );
}
