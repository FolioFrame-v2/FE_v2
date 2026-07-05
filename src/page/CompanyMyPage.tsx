import { Link } from "@tanstack/react-router";
import { useState } from "react";

const INITIAL_PROPOSED_PORTFOLIOS = [
  { id: "p1", name: "김도현", role: "Frontend Engineer", stage: "제안 대기중", date: "2024.03.15", targetPortfolio: "React 기반 실시간 협업 툴", profileInitials: "김" },
  { id: "p2", name: "이서연", role: "UX/UI Designer", stage: "수락완료", date: "2024.03.14", targetPortfolio: "금융 앱 리디자인", profileInitials: "이" },
  { id: "p3", name: "박지성", role: "Backend Engineer", stage: "거절", date: "2024.03.10", targetPortfolio: "대용량 트래픽 처리 아키텍처", profileInitials: "박" },
];

export default function CompanyMyPage() {
  const [tab, setTab] = useState<"proposed">("proposed");
  const [portfolios, setPortfolios] = useState(INITIAL_PROPOSED_PORTFOLIOS);

  return (
    <div className="min-h-screen text-foreground">
      <main className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-8">
        {/* Profile */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="surface-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 text-primary grid place-items-center font-display font-bold text-2xl">T</div>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">Toss</h2>
                <p className="text-sm text-ink-soft">비바리퍼블리카</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat label="제안" value="12" />
              <Stat label="수락" value="4" />
              <Stat label="조회" value="8.2k" />
            </div>
            {/* 기업 정보 수정 페이지가 있다면 연결할 수 있습니다. */}
            <button className="w-full mt-5 flex items-center justify-center h-9 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
              기업 정보 수정
            </button>
          </div>

          <div className="surface-card p-6 space-y-3">
            <h3 className="font-display font-semibold tracking-tight">기업 정보</h3>
            <InfoRow label="산업군" value="IT / 금융" />
            <InfoRow label="지역" value="서울 · 강남구" />
            <InfoRow label="규모" value="1,000명 이상" />
            <InfoRow label="이메일" value="recruit@toss.im" />
            <InfoRow label="웹사이트" value="toss.im" />
          </div>

          <div className="surface-card p-6 space-y-3">
            <h3 className="font-display font-semibold tracking-tight">주요 채용 직군</h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Frontend", "Backend", "Data", "UX/UI"].map(stack => (
                <span key={stack} className="chip bg-surface border-line text-ink text-xs">{stack}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* Content column */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2 surface-card p-1.5 w-fit">
            <TabBtn active={tab === "proposed"} onClick={() => setTab("proposed")}>제안한 포트폴리오</TabBtn>
          </div>

          {tab === "proposed" && (
            <div className="grid gap-4 sm:grid-cols-2">
              {portfolios.map((p) => (
                <article key={p.id} className="surface-card p-5 hover:-translate-y-0.5 transition flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-surface-2 grid place-items-center font-display font-bold text-sm text-ink-soft">
                        {p.profileInitials}
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold tracking-tight">{p.name}</h3>
                        <div className="text-xs text-ink-soft">{p.role}</div>
                      </div>
                    </div>
                    <StatusChip status={p.stage} />
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-surface-2 border border-line/50 flex-1">
                    <div className="text-xs text-ink-soft mb-1">제안 대상 포트폴리오</div>
                    <div className="text-sm font-medium text-ink line-clamp-2">{p.targetPortfolio}</div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-line">
                    <span className="text-xs font-mono text-ink-soft">제안일 · {p.date}</span>
                    <div className="flex gap-2">
                      <Link to="/portfolio/$id" params={{ id: "1" }} className="h-8 px-3 rounded-md bg-surface-2 text-ink border border-line text-xs hover:bg-line/30 transition grid place-items-center">
                        포폴 보기
                      </Link>
                    </div>
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
    status === "수락완료" ? "bg-mint/20 text-ink border-mint/40" :
      status === "거절" ? "bg-surface-2 text-ink-soft border-line" :
        status === "제안 대기중" ? "bg-primary/10 text-primary border-primary/20" :
          "bg-coral/15 text-ink border-coral/40";
  return <span className={"chip border " + tone}>{status}</span>;
}
