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
  experience: string;
  stacks: string[];
  views: number;
  likes: number;
  createdAt: string;
  accent: string;
};

const PORTFOLIOS: Portfolio[] = [
  { id: "p1", title: "실시간 협업 화이트보드", author: "김도현", region: "서울", part: "Frontend", field: "협업툴", experience: "신입/경력", stacks: ["React", "WebRTC", "Yjs"], views: 1240, likes: 86, createdAt: "2026-06-25", accent: "var(--color-mint)" },
  { id: "p2", title: "AI 기반 코드리뷰 봇", author: "이수민", region: "경기", part: "Backend", field: "AI/ML", experience: "1~3년", stacks: ["Node", "OpenAI", "Postgres"], views: 982, likes: 71, createdAt: "2026-06-22", accent: "var(--color-coral)" },
  { id: "p3", title: "운동 루틴 추천 앱", author: "박지오", region: "부산", part: "Mobile", field: "헬스케어", experience: "3년 이상", stacks: ["Flutter", "Firebase"], views: 654, likes: 44, createdAt: "2026-06-20", accent: "var(--color-mint)" },
  { id: "p4", title: "쇼핑몰 추천 엔진", author: "정유나", region: "서울", part: "Data", field: "이커머스", experience: "1~3년", stacks: ["Python", "Airflow", "BigQuery"], views: 1532, likes: 121, createdAt: "2026-06-28", accent: "var(--color-coral)" },
  { id: "p5", title: "DevOps 대시보드", author: "최현우", region: "대구", part: "DevOps", field: "인프라", experience: "신입/경력", stacks: ["Kubernetes", "Grafana"], views: 408, likes: 33, createdAt: "2026-06-18", accent: "var(--color-mint)" },
  { id: "p6", title: "다국어 학습 SaaS", author: "한지민", region: "원격", part: "Fullstack", field: "에듀테크", experience: "5년 이상", stacks: ["Next", "tRPC", "Stripe"], views: 2210, likes: 198, createdAt: "2026-06-30", accent: "var(--color-coral)" },
  { id: "p7", title: "음악 큐레이션 플랫폼", author: "오세진", region: "인천", part: "Frontend", field: "미디어", experience: "1~3년", stacks: ["Vue", "Web Audio"], views: 712, likes: 52, createdAt: "2026-06-15", accent: "var(--color-mint)" },
  { id: "p8", title: "스마트 농장 IoT", author: "장민호", region: "광주", part: "Embedded", field: "IoT", experience: "3년 이상", stacks: ["C", "MQTT", "AWS"], views: 521, likes: 39, createdAt: "2026-06-24", accent: "var(--color-coral)" },
];

const GROUPS: FilterGroup[] = [
  { key: "region", label: "지역", options: ["전체", "서울", "경기", "인천", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "원격"] },
  { key: "part", label: "파트", options: ["전체", "Frontend", "Backend", "Fullstack", "Mobile", "Data", "DevOps", "Embedded"] },
  { key: "field", label: "분야", options: ["전체", "AI/ML", "이커머스", "협업툴", "헬스케어", "에듀테크", "미디어", "IoT", "인프라"] },
  { key: "experience", label: "경력", options: ["전체", "신입/경력", "경력 무관", "1~3년", "3년 이상", "5년 이상"] },
];

function BrowsePage() {
  const [filters, setFilters] = useState<Record<string, string>>({ region: "전체", part: "전체", field: "전체", experience: "전체" });
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");
  const [proposalTarget, setProposalTarget] = useState<any>(null);
  const currentUser = false; // 로그인 상태 (Nav와 다르게 테스트용으로 임시 false 처리. true로 변경하면 전체 열람 가능)
  const isGuest = !currentUser;

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${proposalTarget?.author}님에게 매칭 제안이 전송되었습니다.`);
    setProposalTarget(null);
  };

  const filtered = useMemo(() => {
    let result = PORTFOLIOS.filter((p) => {
      if (filters.region !== "전체" && p.region !== filters.region) return false;
      if (filters.part !== "전체" && p.part !== filters.part) return false;
      if (filters.field !== "전체" && p.field !== filters.field) return false;
      if (filters.experience !== "전체" && p.experience !== filters.experience) return false;
      if (search && !(p.title + p.author + p.stacks.join(" ")).toLowerCase().includes(search.toLowerCase())) return false;
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
            <span className="chip"><span className="h-1.5 w-1.5 rounded-full bg-mint " />Portfolio</span>
            <h1 className="mt-3 text-4xl font-display font-semibold tracking-tight">포트폴리오</h1>
            <p className="mt-2 text-ink-soft text-sm">다른 개발자들이 만든 포트폴리오를 둘러보세요.</p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <Link to="/portfoliopageeditor" className="h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium grid place-items-center hover:opacity-90 transition">
              새 포트폴리오
            </Link>
            <div className="text-xs font-mono text-ink-soft">
              {isGuest ? Math.min(filtered.length, 3) : filtered.length} / {PORTFOLIOS.length} 결과
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
        />

        <section className="relative">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => {
              const templateList = ["minimal", "editorial", "terminal", "playful"];
              const assignedTemplate = templateList[i % 4];
              const isBlurred = isGuest && i >= 3;

              return (
                <div key={p.id} className={isBlurred ? "opacity-30 blur-[6px] pointer-events-none select-none transition-all duration-500" : ""}>
                  <Link to="/portfolio/$id" params={{ id: p.id }} search={{ template: assignedTemplate }} className="surface-card overflow-hidden group hover:-translate-y-0.5 transition block">
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
                          <span>{p.experience}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {p.stacks.map((s) => <span key={s} className="chip text-[11px]">{s}</span>)}
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-line text-xs text-ink-soft font-mono">
                          <div className="flex items-center gap-3">
                            <span>♥ {p.likes}</span>
                            <span>{p.views.toLocaleString()} views</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setProposalTarget(p);
                            }}
                            className="h-7 px-3 rounded bg-surface-2 text-primary font-medium hover:bg-primary hover:text-white transition-colors"
                          >
                            매칭 제안
                          </button>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full surface-card p-12 text-center text-ink-soft">
                조건에 맞는 포트폴리오가 없습니다.
              </div>
            )}
          </div>

          {isGuest && filtered.length > 3 && (
            <div className="absolute left-0 right-0 top-[280px] bottom-0 z-10 flex flex-col justify-start">
              <div className="sticky top-1/2 -translate-y-1/2 bg-surface/80 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl border border-line max-w-md mx-auto w-full text-center mt-32">
                <div className="w-16 h-16 mx-auto bg-surface border border-line shadow-sm rounded-2xl flex items-center justify-center text-3xl mb-5">🔒</div>
                <h2 className="text-2xl font-display font-semibold tracking-tight text-ink mb-3 break-keep">더 많은 포트폴리오를 확인하시겠어요?</h2>
                <p className="text-ink-soft text-sm leading-relaxed mb-8 break-keep">
                  FolioFrame에 가입하고 뛰어난 인재들의<br/>모든 포트폴리오를 제한 없이 열람하세요.
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
