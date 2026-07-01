
import { useMemo, useState } from "react";
import { Nav } from "@/components/ui/nav";
import { FilterBar, type FilterGroup } from "@/components/ui/filter-bar";

export default ContestsPage;

type Contest = {
  id: string;
  type: string;
  title: string;
  host: string;
  region: string;
  field: string;
  team: string;
  deadline: string;
  dDay: number;
  accent: string;
  views: number;
  likes: number;
  createdAt: string;
};

const CONTESTS: Contest[] = [
  { id: "c1", type: "해커톤", title: "2026 카카오 해커톤", host: "Kakao", region: "서울", field: "AI/ML", team: "4~6인", deadline: "2026-07-30", dDay: 34, accent: "var(--color-mint)", views: 1540, likes: 320, createdAt: "2026-06-25" },
  { id: "c2", type: "공모전", title: "오픈소스 컨트리뷰톤", host: "OSSCA", region: "원격", field: "오픈소스", team: "2~3인", deadline: "2026-08-12", dDay: 47, accent: "var(--color-coral)", views: 890, likes: 150, createdAt: "2026-06-20" },
  { id: "c3", type: "공모전", title: "교육 데이터 분석 챌린지", host: "교육부", region: "전국", field: "에듀테크", team: "1인", deadline: "2026-07-05", dDay: 9, accent: "var(--color-mint)", views: 2100, likes: 450, createdAt: "2026-06-28" },
  { id: "c4", type: "공모전", title: "모바일 앱 공모전", host: "Samsung", region: "경기", field: "라이프스타일", team: "2~3인", deadline: "2026-09-01", dDay: 67, accent: "var(--color-coral)", views: 1200, likes: 280, createdAt: "2026-06-22" },
  { id: "c5", type: "해커톤", title: "클라우드 아키텍처 콘테스트", host: "AWS", region: "서울", field: "인프라", team: "4~6인", deadline: "2026-07-20", dDay: 24, accent: "var(--color-mint)", views: 650, likes: 90, createdAt: "2026-06-18" },
  { id: "c6", type: "공모전", title: "헬스케어 IoT 챌린지", host: "보건복지부", region: "부산", field: "헬스케어", team: "7인+", deadline: "2026-10-10", dDay: 106, accent: "var(--color-coral)", views: 420, likes: 50, createdAt: "2026-06-15" },
  { id: "c7", type: "해커톤", title: "글로벌 핀테크 해커톤", host: "Toss", region: "서울", field: "기타", team: "4~6인", deadline: "2026-08-01", dDay: 36, accent: "var(--color-mint)", views: 3100, likes: 800, createdAt: "2026-06-30" },
  { id: "c8", type: "공모전", title: "스마트시티 아이디어 공모전", host: "국토교통부", region: "세종", field: "라이프스타일", team: "1인", deadline: "2026-08-20", dDay: 55, accent: "var(--color-coral)", views: 560, likes: 110, createdAt: "2026-06-10" },
  { id: "c9", type: "해커톤", title: "블록체인 Web3 해커톤", host: "Line", region: "경기", field: "기타", team: "2~3인", deadline: "2026-09-15", dDay: 81, accent: "var(--color-mint)", views: 980, likes: 210, createdAt: "2026-06-24" },
  { id: "c10", type: "공모전", title: "메타버스 콘텐츠 창작", host: "Naver Z", region: "원격", field: "AI/ML", team: "2~3인", deadline: "2026-11-01", dDay: 128, accent: "var(--color-coral)", views: 1800, likes: 340, createdAt: "2026-06-27" },
];

const GROUPS: FilterGroup[] = [
  { key: "type", label: "유형", options: ["전체", "공모전", "해커톤"] },
  { key: "region", label: "지역", options: ["전체", "서울", "경기", "인천", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "원격", "전국", "부산", "세종"] },
  { key: "field", label: "분야", options: ["전체", "AI/ML", "헬스케어", "에듀테크", "라이프스타일", "오픈소스", "인프라", "기타"] },
  { key: "team", label: "인원수", options: ["전체", "1인", "2~3인", "4~6인", "7인+"] },
];

function ContestsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({ type: "전체", region: "전체", field: "전체", team: "전체" });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");

  const filtered = useMemo(() => {
    let result = CONTESTS.filter((c) => {
      if (filters.type && filters.type !== "전체" && c.type !== filters.type) return false;
      if (filters.region !== "전체" && c.region !== filters.region) return false;
      if (filters.field !== "전체" && c.field !== filters.field) return false;
      if (filters.team !== "전체" && c.team !== filters.team) return false;
      if (search && !(c.title + c.host).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });

    if (sort === "조회수순") {
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
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-coral" />Contests</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">공모전 & 해커톤</h1>
            <p className="mt-2 text-ink-soft text-sm">진행 중인 공모전을 한눈에 확인하고 팀을 꾸려 보세요.</p>
          </div>
          <div className="text-xs font-mono text-ink-soft">{filtered.length} / {CONTESTS.length} 결과</div>
        </header>

        <FilterBar 
          groups={GROUPS} 
          value={filters} 
          onChange={setFilters} 
          search={search} 
          onSearchChange={setSearch} 
          searchPlaceholder="공모전명 · 주최사 검색" 
          sortOptions={["최신순", "인기순", "조회수순"]}
          sort={sort}
          onSortChange={setSort}
        />

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <article key={c.id} className="surface-card overflow-hidden group hover:-translate-y-0.5 transition">
              <div className="relative p-5 border-b border-line overflow-hidden">
                <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${c.accent} 25%, transparent), transparent 70%)` }} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">{c.host}</div>
                    <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{c.title}</h3>
                  </div>
                  <div className={"shrink-0 text-center rounded-lg px-2.5 py-1.5 border " + (c.dDay <= 14 ? "border-coral text-coral" : "border-line text-ink-soft")}>
                    <div className="text-[10px] font-mono">D-DAY</div>
                    <div className="font-display font-bold text-lg leading-none">{c.dDay}</div>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Info label="유형" value={c.type} />
                  <Info label="지역" value={c.region} />
                  <Info label="분야" value={c.field} />
                  <Info label="인원" value={c.team} />
                </div>
                <div className="flex items-center justify-end pt-3 border-t border-line">
                  <div className="text-xs font-mono text-ink-soft">~{c.deadline}</div>
                </div>
                <button className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                  자세히 보기
                </button>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full surface-card p-12 text-center text-ink-soft">
              조건에 맞는 공모전이 없습니다.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface border border-line px-2.5 py-1.5">
      <div className="text-[10px] font-mono text-ink-soft uppercase">{label}</div>
      <div className="text-ink">{value}</div>
    </div>
  );
}
