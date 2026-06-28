import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/ui/nav";
import { FilterBar, type FilterGroup } from "@/components/ui/filter-bar";

export default BrowsePage;

type Portfolio = {
  id: string;
  title: string;
  author: string;
  region: string;
  part: string;
  field: string;
  team: string;
  stacks: string[];
  views: number;
  likes: number;
  accent: string;
};

const PORTFOLIOS: Portfolio[] = [
  { id: "p1", title: "실시간 협업 화이트보드", author: "김도현", region: "서울", part: "Frontend", field: "협업툴", team: "1인", stacks: ["React", "WebRTC", "Yjs"], views: 1240, likes: 86, accent: "var(--color-mint)" },
  { id: "p2", title: "AI 기반 코드리뷰 봇", author: "이수민", region: "경기", part: "Backend", field: "AI/ML", team: "2~3인", stacks: ["Node", "OpenAI", "Postgres"], views: 982, likes: 71, accent: "var(--color-coral)" },
  { id: "p3", title: "운동 루틴 추천 앱", author: "박지오", region: "부산", part: "Mobile", field: "헬스케어", team: "4~6인", stacks: ["Flutter", "Firebase"], views: 654, likes: 44, accent: "var(--color-mint)" },
  { id: "p4", title: "쇼핑몰 추천 엔진", author: "정유나", region: "서울", part: "Data", field: "이커머스", team: "2~3인", stacks: ["Python", "Airflow", "BigQuery"], views: 1532, likes: 121, accent: "var(--color-coral)" },
  { id: "p5", title: "DevOps 대시보드", author: "최현우", region: "대구", part: "DevOps", field: "인프라", team: "1인", stacks: ["Kubernetes", "Grafana"], views: 408, likes: 33, accent: "var(--color-mint)" },
  { id: "p6", title: "다국어 학습 SaaS", author: "한지민", region: "원격", part: "Fullstack", field: "에듀테크", team: "7인+", stacks: ["Next", "tRPC", "Stripe"], views: 2210, likes: 198, accent: "var(--color-coral)" },
  { id: "p7", title: "음악 큐레이션 플랫폼", author: "오세진", region: "인천", part: "Frontend", field: "미디어", team: "2~3인", stacks: ["Vue", "Web Audio"], views: 712, likes: 52, accent: "var(--color-mint)" },
  { id: "p8", title: "스마트 농장 IoT", author: "장민호", region: "광주", part: "Embedded", field: "IoT", team: "4~6인", stacks: ["C", "MQTT", "AWS"], views: 521, likes: 39, accent: "var(--color-coral)" },
];

const GROUPS: FilterGroup[] = [
  { key: "region", label: "지역", options: ["전체", "서울", "경기", "인천", "부산", "대구", "광주", "원격"] },
  { key: "part", label: "파트", options: ["전체", "Frontend", "Backend", "Fullstack", "Mobile", "Data", "DevOps", "Embedded"] },
  { key: "field", label: "분야", options: ["전체", "AI/ML", "이커머스", "협업툴", "헬스케어", "에듀테크", "미디어", "IoT", "인프라"] },
  { key: "team", label: "인원수", options: ["전체", "1인", "2~3인", "4~6인", "7인+"] },
];

function BrowsePage() {
  const [filters, setFilters] = useState<Record<string, string>>({ region: "전체", part: "전체", field: "전체", team: "전체" });
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return PORTFOLIOS.filter((p) => {
      if (filters.region !== "전체" && p.region !== filters.region) return false;
      if (filters.part !== "전체" && p.part !== filters.part) return false;
      if (filters.field !== "전체" && p.field !== filters.field) return false;
      if (filters.team !== "전체" && p.team !== filters.team) return false;
      if (search && !(p.title + p.author + p.stacks.join(" ")).toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [filters, search]);

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-10 space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint " />Portfolio</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">포트폴리오</h1>
            <p className="mt-2 text-ink-soft text-sm">다른 개발자들이 만든 포트폴리오를 둘러보세요.</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Link to="/portfoliopageeditor" className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium grid place-items-center hover:opacity-90 transition">
              새 포트폴리오
            </Link>
            <div className="text-xs font-mono text-ink-soft">{filtered.length} / {PORTFOLIOS.length} 결과</div>
          </div>
        </header>

        <FilterBar groups={GROUPS} value={filters} onChange={setFilters} search={search} onSearchChange={setSearch} searchPlaceholder="제목 · 작성자 · 기술 스택 검색" />

        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => {
            const templateList = ["minimal", "editorial", "terminal", "playful"];
            const assignedTemplate = templateList[i % 4];
            return (
            <Link key={p.id} to="/portfolio/$id" params={{ id: p.id }} search={{ template: assignedTemplate }} className="surface-card overflow-hidden group hover:-translate-y-0.5 transition block">
              <article>
                <div className="relative h-36 grid-paper border-b border-line overflow-hidden">
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 30%, color-mix(in oklch, ${p.accent} 35%, transparent), transparent 60%)` }} />
                  <div className="absolute left-4 top-4 chip">{p.field}</div>
                  <div className="absolute right-4 bottom-4 font-mono text-[11px] text-ink-soft">{p.part}</div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-primary transition">{p.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-ink-soft">
                    <div className="h-5 w-5 rounded-full bg-surface-2 grid place-items-center font-mono">{p.author.slice(0, 1)}</div>
                    <span>{p.author}</span>
                    <span>·</span>
                    <span>{p.region}</span>
                    <span>·</span>
                    <span>{p.team}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stacks.map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-line text-xs text-ink-soft font-mono">
                    <span>♥ {p.likes}</span>
                    <span>{p.views.toLocaleString()} views</span>
                  </div>
                </div>
              </article>
            </Link>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full surface-card p-12 text-center text-ink-soft">
              조건에 맞는 포트폴리오가 없습니다.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
