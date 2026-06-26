import { useMemo, useState } from "react";
import { Nav as SiteNav } from "@/components/ui/nav";
import { FilterBar, type FilterGroup } from "@/components/ui/filter-bar";

export default RecruiterPage;

type Candidate = {
  id: string;
  name: string;
  part: string;
  experience: string;
  region: string;
  status: string;
  skills: string[];
  intro: string;
  accent: string;
};

const CANDIDATES: Candidate[] = [
  { id: "dev1", name: "김도현", part: "Frontend", experience: "신입", region: "서울", status: "구직 중", skills: ["React", "TypeScript", "Next.js"], intro: "사용자 경험을 중시하는 프론트엔드 개발자입니다.", accent: "var(--color-mint)" },
  { id: "dev2", name: "이수민", part: "Backend", experience: "1~3년", region: "판교", status: "이직 준비 중", skills: ["Java", "Spring Boot", "MySQL"], intro: "안정적인 대용량 트래픽 처리에 관심이 많습니다.", accent: "var(--color-coral)" },
  { id: "dev3", name: "박지오", part: "Mobile", experience: "4~6년", region: "원격", status: "관심 있음", skills: ["Flutter", "Dart", "Firebase"], intro: "크로스 플랫폼 앱 개발에 전문성이 있습니다.", accent: "var(--color-mint)" },
  { id: "dev4", name: "정유나", part: "Data", experience: "신입", region: "서울", status: "구직 중", skills: ["Python", "TensorFlow", "SQL"], intro: "데이터 기반의 의사결정을 돕는 엔지니어가 되고 싶습니다.", accent: "var(--color-coral)" },
  { id: "dev5", name: "최현우", part: "DevOps", experience: "7년 이상", region: "강남", status: "이직 준비 중", skills: ["Kubernetes", "AWS", "CI/CD"], intro: "인프라 자동화와 클라우드 아키텍처 설계 전문가입니다.", accent: "var(--color-mint)" },
  { id: "dev6", name: "한지민", part: "Fullstack", experience: "1~3년", region: "부산", status: "구직 중", skills: ["Node.js", "React", "PostgreSQL"], intro: "프론트엔드부터 백엔드까지 책임지는 풀스택 개발자입니다.", accent: "var(--color-coral)" },
];

const GROUPS: FilterGroup[] = [
  { key: "region", label: "지역", options: ["전체", "서울", "판교", "강남", "부산", "원격"] },
  { key: "part", label: "파트", options: ["전체", "Frontend", "Backend", "Fullstack", "Mobile", "Data", "DevOps", "Embedded"] },
  { key: "experience", label: "경력", options: ["전체", "신입", "1~3년", "4~6년", "7년 이상"] },
  { key: "status", label: "상태", options: ["전체", "구직 중", "이직 준비 중", "관심 있음"] },
];

function RecruiterPage() {
  const [filters, setFilters] = useState<Record<string, string>>({ region: "전체", part: "전체", experience: "전체", status: "전체" });
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return CANDIDATES.filter((c) => {
      if (filters.region !== "전체" && c.region !== filters.region) return false;
      if (filters.part !== "전체" && c.part !== filters.part) return false;
      if (filters.experience !== "전체" && c.experience !== filters.experience) return false;
      if (filters.status !== "전체" && c.status !== filters.status) return false;
      if (search && !(c.name + c.intro + c.skills.join(" ")).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filters, search]);

  return (
    <div className="min-h-screen text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint" />Recruiting</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">공용 & 채용</h1>
            <p className="mt-2 text-ink-soft text-sm">뛰어난 개발자들을 탐색하고 포트폴리오를 확인해 보세요.</p>
          </div>
          <div className="text-xs font-mono text-ink-soft">{filtered.length} / {CANDIDATES.length} 결과</div>
        </header>

        <FilterBar groups={GROUPS} value={filters} onChange={setFilters} search={search} onSearchChange={setSearch} searchPlaceholder="이름 · 소개 · 기술 스택 검색" />

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <article key={c.id} className="surface-card overflow-hidden group hover:-translate-y-0.5 transition">
              <div className="relative p-5 border-b border-line overflow-hidden">
                <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, color-mix(in oklch, ${c.accent} 25%, transparent), transparent 70%)` }} />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">{c.part} · {c.experience}</div>
                    <h3 className="mt-1 font-display text-xl font-semibold tracking-tight">{c.name}</h3>
                  </div>
                  <div className={"shrink-0 text-center rounded-lg px-2.5 py-1 border " + (c.status === "구직 중" ? "border-mint text-mint bg-mint/10" : "border-line text-ink-soft")}>
                    <div className="text-[10px] font-medium">{c.status}</div>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <p className="text-sm text-ink-soft leading-relaxed line-clamp-2 h-10">{c.intro}</p>

                <div className="flex items-center gap-2 text-xs text-ink-soft pt-2">
                  <span>📍 {c.region}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {c.skills.map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
                </div>

                <div className="pt-3 border-t border-line mt-3">
                  <button className="w-full h-9 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                    포트폴리오 열람
                  </button>
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full surface-card p-12 text-center text-ink-soft">
              조건에 맞는 개발자가 없습니다.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
