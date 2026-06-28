
import { useMemo, useState } from "react";
import { Nav } from "@/components/ui/nav";
import { FilterBar, type FilterGroup } from "@/components/ui/filter-bar";

export default ContestsPage;

type Contest = {
  id: string;
  title: string;
  host: string;
  region: string;
  part: string;
  field: string;
  team: string;
  prize: string;
  deadline: string;
  dDay: number;
  accent: string;
};

const CONTESTS: Contest[] = [
  { id: "c1", title: "2026 카카오 해커톤", host: "Kakao", region: "서울", part: "Fullstack", field: "AI/ML", team: "4~6인", prize: "5,000만원", deadline: "2026-07-30", dDay: 34, accent: "var(--color-mint)" },
  { id: "c2", title: "오픈소스 컨트리뷰톤", host: "OSSCA", region: "원격", part: "Backend", field: "오픈소스", team: "2~3인", prize: "1,000만원", deadline: "2026-08-12", dDay: 47, accent: "var(--color-coral)" },
  { id: "c3", title: "교육 데이터 분석 챌린지", host: "교육부", region: "전국", part: "Data", field: "에듀테크", team: "1인", prize: "2,000만원", deadline: "2026-07-05", dDay: 9, accent: "var(--color-mint)" },
  { id: "c4", title: "모바일 앱 공모전", host: "Samsung", region: "수원", part: "Mobile", field: "라이프스타일", team: "2~3인", prize: "3,000만원", deadline: "2026-09-01", dDay: 67, accent: "var(--color-coral)" },
  { id: "c5", title: "클라우드 아키텍처 콘테스트", host: "AWS", region: "서울", part: "DevOps", field: "인프라", team: "4~6인", prize: "1,500만원", deadline: "2026-07-20", dDay: 24, accent: "var(--color-mint)" },
  { id: "c6", title: "헬스케어 IoT 챌린지", host: "보건복지부", region: "부산", part: "Embedded", field: "헬스케어", team: "7인+", prize: "1억원", deadline: "2026-10-10", dDay: 106, accent: "var(--color-coral)" },
];

const GROUPS: FilterGroup[] = [
  { key: "region", label: "지역", options: ["전체", "서울", "수원", "부산", "전국", "원격"] },
  { key: "part", label: "파트", options: ["전체", "Frontend", "Backend", "Fullstack", "Mobile", "Data", "DevOps", "Embedded"] },
  { key: "field", label: "분야", options: ["전체", "AI/ML", "헬스케어", "에듀테크", "라이프스타일", "오픈소스", "인프라"] },
  { key: "team", label: "인원수", options: ["전체", "1인", "2~3인", "4~6인", "7인+"] },
];

function ContestsPage() {
  const [filters, setFilters] = useState<Record<string, string>>({ region: "전체", part: "전체", field: "전체", team: "전체" });
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return CONTESTS.filter((c) => {
      if (filters.region !== "전체" && c.region !== filters.region) return false;
      if (filters.part !== "전체" && c.part !== filters.part) return false;
      if (filters.field !== "전체" && c.field !== filters.field) return false;
      if (filters.team !== "전체" && c.team !== filters.team) return false;
      if (search && !(c.title + c.host).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filters, search]);

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

        <FilterBar groups={GROUPS} value={filters} onChange={setFilters} search={search} onSearchChange={setSearch} searchPlaceholder="공모전명 · 주최사 검색" />

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
                  <Info label="지역" value={c.region} />
                  <Info label="파트" value={c.part} />
                  <Info label="분야" value={c.field} />
                  <Info label="인원" value={c.team} />
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-line">
                  <div>
                    <div className="text-[10px] font-mono text-ink-soft uppercase">상금</div>
                    <div className="font-display font-semibold">{c.prize}</div>
                  </div>
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
