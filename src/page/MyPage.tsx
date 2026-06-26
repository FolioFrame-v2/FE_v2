import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav as SiteNav } from "@/components/ui/nav";

export default MyPage;

const MY_PORTFOLIOS = [
  { id: "mp1", title: "실시간 협업 화이트보드", status: "공개", updated: "2026-06-20", views: 1240 },
  { id: "mp2", title: "사이드 프로젝트 모음", status: "비공개", updated: "2026-06-12", views: 0 },
  { id: "mp3", title: "졸업작품: AI 일정 추천", status: "링크 공유", updated: "2026-05-30", views: 312 },
];

const SAVED_COMPANIES = [
  { id: "co1", name: "Kakao", part: "Backend", region: "판교", stage: "관심", logo: "K", color: "var(--color-mint)" },
  { id: "co2", name: "Toss", part: "Frontend", region: "강남", stage: "지원 예정", logo: "T", color: "var(--color-coral)" },
  { id: "co3", name: "당근마켓", part: "Fullstack", region: "서초", stage: "서류 제출", logo: "당", color: "var(--color-mint)" },
  { id: "co4", name: "네이버", part: "Data", region: "분당", stage: "관심", logo: "N", color: "var(--color-coral)" },
];

function MyPage() {
  const [tab, setTab] = useState<"portfolios" | "companies">("portfolios");

  return (
    <div className="min-h-screen text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-8">
        {/* Profile column */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="surface-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-2xl">D</div>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">김도현</h2>
                <p className="text-xs text-ink-soft font-mono">@dohyun.dev</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat label="포폴" value="3" />
              <Stat label="관심" value="4" />
              <Stat label="조회" value="1.5k" />
            </div>
            <Link to="/portfoliopageeditor" className="mt-5 flex items-center justify-center h-9 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
              포트폴리오 편집
            </Link>
          </div>

          <div className="surface-card p-6 space-y-3">
            <h3 className="font-display font-semibold tracking-tight">기본 정보</h3>
            <InfoRow label="직군" value="Frontend Engineer" />
            <InfoRow label="지역" value="서울 · 강남구" />
            <InfoRow label="경력" value="2년차" />
            <InfoRow label="이메일" value="dohyun@devfolio.io" />
            <InfoRow label="GitHub" value="github.com/dohyun" />
            <InfoRow label="웹사이트" value="dohyun.dev" />
          </div>
        </aside>

        {/* Content column */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2 surface-card p-1.5 w-fit">
            <TabBtn active={tab === "portfolios"} onClick={() => setTab("portfolios")}>내 포트폴리오</TabBtn>
            <TabBtn active={tab === "companies"} onClick={() => setTab("companies")}>관심 기업</TabBtn>
          </div>

          {tab === "portfolios" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {MY_PORTFOLIOS.map((p) => (
                <article key={p.id} className="surface-card p-5 hover:-translate-y-0.5 transition">
                  <div className="flex items-start justify-between">
                    <h3 className="font-display text-lg font-semibold tracking-tight">{p.title}</h3>
                    <StatusChip status={p.status} />
                  </div>
                  <div className="mt-3 text-xs font-mono text-ink-soft">최근 수정 · {p.updated}</div>
                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-line">
                    <span className="text-xs text-ink-soft">{p.views.toLocaleString()} views</span>
                    <div className="flex gap-2">
                      <button className="h-8 px-3 rounded-md border border-line text-xs hover:bg-surface-2 transition">공유</button>
                      <Link to="/portfoliopageeditor" className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs grid place-items-center hover:opacity-90 transition">편집</Link>
                    </div>
                  </div>
                </article>
              ))}
              <Link to="/portfoliopageeditor" className="surface-card border-dashed border-2 p-5 grid place-items-center text-ink-soft hover:text-ink hover:border-ink-soft transition min-h-[180px]">
                <div className="text-center">
                  <div className="text-3xl font-display">＋</div>
                  <div className="mt-1 text-sm">새 포트폴리오</div>
                </div>
              </Link>
            </div>
          )}

          {tab === "companies" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {SAVED_COMPANIES.map((c) => (
                <article key={c.id} className="surface-card p-5 hover:-translate-y-0.5 transition">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl grid place-items-center font-display font-bold text-lg" style={{ background: `color-mix(in oklch, ${c.color} 30%, var(--color-surface))` }}>
                      {c.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-base font-semibold tracking-tight">{c.name}</h3>
                      <div className="text-xs text-ink-soft">{c.part} · {c.region}</div>
                    </div>
                    <StatusChip status={c.stage} />
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-2 pt-4 border-t border-line">
                    <button className="h-8 px-3 rounded-md border border-line text-xs hover:bg-surface-2 transition">메모</button>
                    <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs hover:opacity-90 transition">지원하기</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
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
    status === "비공개" ? "bg-surface-2 text-ink-soft border-line" :
    "bg-coral/15 text-ink border-coral/40";
  return <span className={"chip border " + tone}>{status}</span>;
}
