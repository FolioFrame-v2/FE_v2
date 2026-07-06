import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Check, X } from "lucide-react";

import { FilterBar, type FilterGroup } from "@/components/ui/filter-bar";
import { REGIONS } from "@/lib/regions";

export default RecruiterPage;

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
  bookmarked?: boolean;
};

const INITIAL_JOB_POSTINGS: JobPosting[] = [
  { id: 1, company: "Toss", title: "Frontend Developer", experience: "신입/경력", region: "서울 강남구", status: "채용 중", skills: ["React", "TypeScript", "Next.js"], intro: "토스에서 사용자 중심의 프론트엔드를 개발할 분을 모십니다.", accent: "var(--color-mint)", views: 1540, likes: 320, createdAt: "2026-06-25", bookmarked: false },
  { id: 2, company: "Kakao", title: "Backend Engineer", experience: "3년 이상", region: "판교", status: "채용 중", skills: ["Java", "Spring Boot", "MySQL"], intro: "카카오톡 메시징 서버 성능 최적화를 함께할 전문가를 찾습니다.", accent: "var(--color-coral)", views: 890, likes: 150, createdAt: "2026-06-20", bookmarked: false },
  { id: 3, company: "Naver", title: "iOS Engineer", experience: "5년 이상", region: "분당", status: "마감 임박", skills: ["Swift", "RxSwift", "iOS"], intro: "네이버 앱의 새로운 사용자 경험을 설계하고 구현합니다.", accent: "var(--color-mint)", views: 2100, likes: 450, createdAt: "2026-06-28", bookmarked: false },
  { id: 4, company: "Line", title: "Data Scientist", experience: "경력 무관", region: "원격", status: "채용 중", skills: ["Python", "PyTorch", "SQL"], intro: "글로벌 메신저 라인의 대규모 데이터를 분석하고 모델을 개발합니다.", accent: "var(--color-coral)", views: 1200, likes: 280, createdAt: "2026-06-22", bookmarked: false },
  { id: 5, company: "Daangn", title: "DevOps Engineer", experience: "5년 이상", region: "서울 서초구", status: "채용 중", skills: ["Kubernetes", "AWS", "Terraform"], intro: "당근마켓의 글로벌 인프라를 구축하고 안정적으로 운영합니다.", accent: "var(--color-mint)", views: 650, likes: 90, createdAt: "2026-06-18", bookmarked: false },
  { id: 6, company: "Woowa Bros", title: "Fullstack Engineer", experience: "1~3년", region: "서울 송파구", status: "채용 중", skills: ["Node.js", "React", "TypeScript"], intro: "배달의민족 서비스의 신규 피처를 개발합니다.", accent: "var(--color-coral)", views: 420, likes: 50, createdAt: "2026-06-15", bookmarked: false },
];

const GROUPS: FilterGroup[] = [
  { key: "status", label: "상태", options: ["전체", "채용 중", "마감 임박"], optionsClassName: "flex-nowrap" },
  { key: "experience", label: "경력", options: ["전체", "없음", "1년 미만", "1~3년", "3~5년", "5~7년", "7~10년", "10년 이상"], optionsClassName: "flex-nowrap" },
];

import { useToggleBookmark } from "@/api/generated/job-posting/job-posting";
import { toast } from "sonner";
import { useJobBookmarks } from "@/hooks/useJobBookmarks";

function RecruiterPage() {
  const [filters, setFilters] = useState<Record<string, string>>({ experience: "전체", status: "전체" });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");
  const [showBookmarked, setShowBookmarked] = useState(false);

  const { mutateAsync: toggleBookmark } = useToggleBookmark();
  const { jobBookmarks, setJobBookmarkState } = useJobBookmarks();

  const handleBookmarkToggle = async (job: JobPosting, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const currentlyBookmarked = jobBookmarks[String(job.id)] || false;

    // 낙관적 업데이트
    setJobBookmarkState(job.id, !currentlyBookmarked);

    try {
      await toggleBookmark({ jobPostingId: job.id });
      if (!currentlyBookmarked) {
        toast.success("북마크에 추가되었습니다.");
      } else {
        toast("북마크가 취소되었습니다.");
      }
    } catch (error) {
      console.error(error);
      // 에러 시 롤백
      setJobBookmarkState(job.id, currentlyBookmarked);
      toast.error("북마크 처리에 실패했습니다.");
    }
  };

  // 지역 필터 상태 (온보딩과 동일한 구조)
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

  // 선택된 지역 문자열 (필터링에 사용)
  const selectedRegion = province
    ? district && district !== "전체"
      ? `${province} ${district}`
      : province
    : "";

  const clearRegion = () => {
    setProvince("");
    setDistrict("");
  };

  const filtered = useMemo(() => {
    let result = INITIAL_JOB_POSTINGS.filter((job) => {
      // 북마크 필터링
      if (showBookmarked && !jobBookmarks[String(job.id)]) return false;
      // 지역 필터링: 선택된 province/district가 있으면 부분 일치
      if (province) {
        const jobRegion = job.region.toLowerCase();
        if (district && district !== "전체") {
          // 시/도 + 구/군 둘 다 선택
          if (!jobRegion.includes(province.toLowerCase()) || !jobRegion.includes(district.toLowerCase())) return false;
        } else {
          // 시/도만 선택
          if (!jobRegion.includes(province.toLowerCase())) return false;
        }
      }
      if (filters.experience !== "전체" && job.experience !== filters.experience) return false;
      if (filters.status !== "전체" && job.status !== filters.status) return false;
      if (search && !(job.company + job.title + job.intro + job.skills.join(" ")).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    if (sort === "조회순") {
      result.sort((a, b) => b.views - a.views);
    } else if (sort === "인기순") {
      result.sort((a, b) => b.likes - a.likes);
    } else {
      // 최신순
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    return result;
  }, [filters, search, sort, showBookmarked, jobBookmarks, province, district]);

  return (
    <div className="min-h-screen text-foreground">

      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint" />Jobs</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">기업 공고</h1>
            <p className="mt-2 text-ink-soft text-sm">다양한 기업의 공고를 확인하고 지원해 보세요.</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowBookmarked(!showBookmarked)}
              className={"px-4 py-2 rounded-full text-sm font-medium transition " + (showBookmarked ? "bg-primary text-primary-foreground" : "bg-surface border border-line text-ink hover:bg-surface-2")}
            >
              북마크한 공고 보기
            </button>
            <div className="text-xs font-mono text-ink-soft">{filtered.length} / {INITIAL_JOB_POSTINGS.length} 공고</div>
          </div>
        </header>

        <FilterBar
          groups={GROUPS}
          value={filters}
          onChange={setFilters}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="기업명 · 직무 · 기술 스택 검색"
          sortOptions={["최신순", "인기순", "조회순"]}
          sort={sort}
          onSortChange={setSort}
          layoutClassName="flex flex-wrap gap-6 items-start pb-2 relative z-20"
          customFiltersPosition={1}
          customFilters={
            <div className="space-y-1.5 shrink-0">
              <div className="flex items-center gap-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">지역</div>
                {/* 현재 선택된 지역 표시 */}
                {selectedRegion && (
                  <span className="text-[10px] font-mono text-ink-soft">선택: {selectedRegion}</span>
                )}
              </div>
              <div className="flex flex-nowrap items-center gap-1.5">
                {/* 시/도 선택 */}
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
                      <div className="absolute top-full left-0 mt-2 w-48 max-h-60 overflow-y-auto bg-surface border border-line rounded-xl shadow-lg z-50 py-2 flex flex-col">
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

                {/* 시/구/군 선택 (항상 표시됨) */}
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
                      <div className="absolute top-full left-0 mt-2 w-56 max-h-60 overflow-y-auto bg-surface border border-line rounded-xl shadow-lg z-50 py-2 flex flex-col">
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

                {/* 선택 초기화 */}
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

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((job) => (
            <article key={job.id} className="surface-card overflow-hidden group hover:-translate-y-0.5 transition">
              <div className="relative p-5 border-b border-line overflow-hidden">
                <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${job.accent} 25%, transparent), transparent 70%)` }} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">{job.company} · {job.experience}</div>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">{job.title}</h3>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button 
                      onClick={(e) => handleBookmarkToggle(job, e)}
                      className={`p-1.5 rounded-full transition-colors ${jobBookmarks[String(job.id)] ? 'text-coral bg-coral/10' : 'text-ink-soft hover:bg-surface-2 hover:text-ink'}`}
                    >
                      <svg className="size-5" fill={jobBookmarks[String(job.id)] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    </button>
                    <div className={"shrink-0 text-center rounded-lg px-2.5 py-1 border " + (job.status === "채용 중" ? "border-mint text-mint bg-mint/10" : "border-line text-ink-soft")}>
                      <div className="text-[10px] font-medium">{job.status}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-ink-soft leading-relaxed line-clamp-2 h-10">{job.intro}</p>

                <div className="flex items-center gap-2 text-xs text-ink-soft pt-2">
                  <span>📍 {job.region}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skills.map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
                </div>

                <div className="pt-3 border-t border-line mt-3">
                  <Link to="/jobs/$id" params={{ id: String(job.id) }} className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition grid place-items-center">
                    공고 보기
                  </Link>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full surface-card p-12 text-center text-ink-soft">
              조건에 맞는 기업 공고가 없습니다.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
