import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Nav } from "@/components/ui/nav";
import { FilterBar, type FilterGroup } from "@/components/ui/filter-bar";

export default RecruiterPage;

type JobPosting = {
  id: string;
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

const JOB_POSTINGS: JobPosting[] = [
  { id: "job1", company: "Toss", title: "Frontend Developer", experience: "신입/경력", region: "서울 강남구", status: "채용 중", skills: ["React", "TypeScript", "Next.js"], intro: "토스에서 사용자 중심의 프론트엔드를 개발할 분을 모십니다.", accent: "var(--color-mint)", views: 1540, likes: 320, createdAt: "2026-06-25" },
  { id: "job2", company: "Kakao", title: "Backend Engineer", experience: "3년 이상", region: "판교", status: "채용 중", skills: ["Java", "Spring Boot", "MySQL"], intro: "카카오톡 메시징 서버 성능 최적화를 함께할 전문가를 찾습니다.", accent: "var(--color-coral)", views: 890, likes: 150, createdAt: "2026-06-20" },
  { id: "job3", company: "Naver", title: "iOS Engineer", experience: "5년 이상", region: "분당", status: "마감 임박", skills: ["Swift", "RxSwift", "iOS"], intro: "네이버 앱의 새로운 사용자 경험을 설계하고 구현합니다.", accent: "var(--color-mint)", views: 2100, likes: 450, createdAt: "2026-06-28" },
  { id: "job4", company: "Line", title: "Data Scientist", experience: "경력 무관", region: "원격", status: "채용 중", skills: ["Python", "PyTorch", "SQL"], intro: "글로벌 메신저 라인의 대규모 데이터를 분석하고 모델을 개발합니다.", accent: "var(--color-coral)", views: 1200, likes: 280, createdAt: "2026-06-22" },
  { id: "job5", company: "Daangn", title: "DevOps Engineer", experience: "5년 이상", region: "서울 서초구", status: "채용 중", skills: ["Kubernetes", "AWS", "Terraform"], intro: "당근마켓의 글로벌 인프라를 구축하고 안정적으로 운영합니다.", accent: "var(--color-mint)", views: 650, likes: 90, createdAt: "2026-06-18" },
  { id: "job6", company: "Woowa Bros", title: "Fullstack Engineer", experience: "1~3년", region: "서울 송파구", status: "채용 중", skills: ["Node.js", "React", "TypeScript"], intro: "배달의민족 서비스의 신규 피처를 개발합니다.", accent: "var(--color-coral)", views: 420, likes: 50, createdAt: "2026-06-15" },
];

const GROUPS: FilterGroup[] = [
  { key: "region", label: "지역", options: ["전체", "서울 강남구", "서울 서초구", "서울 송파구", "판교", "분당", "원격"] },
  { key: "experience", label: "경력", options: ["전체", "신입/경력", "경력 무관", "1~3년", "3년 이상", "5년 이상"] },
  { key: "status", label: "상태", options: ["전체", "채용 중", "마감 임박"] },
];

function RecruiterPage() {
  const [filters, setFilters] = useState<Record<string, string>>({ region: "전체", experience: "전체", status: "전체" });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");

  const filtered = useMemo(() => {
    let result = JOB_POSTINGS.filter((job) => {
      if (filters.region !== "전체" && job.region !== filters.region) return false;
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
  }, [filters, search, sort]);

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint" />Jobs</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">기업 공고</h1>
            <p className="mt-2 text-ink-soft text-sm">다양한 기업의 공고를 확인하고 지원해 보세요.</p>
          </div>
          <div className="text-xs font-mono text-ink-soft">{filtered.length} / {JOB_POSTINGS.length} 공고</div>
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
                  <div className={"shrink-0 text-center rounded-lg px-2.5 py-1 border " + (job.status === "채용 중" ? "border-mint text-mint bg-mint/10" : "border-line text-ink-soft")}>
                    <div className="text-[10px] font-medium">{job.status}</div>
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
                  <Link to="/jobs/$id" params={{ id: job.id }} className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition grid place-items-center">
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
