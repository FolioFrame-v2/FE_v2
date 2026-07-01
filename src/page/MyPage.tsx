import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/ui/nav";

export default MyPage;

const MY_PORTFOLIOS = [
  { id: "mp1", title: "실시간 협업 화이트보드", status: "공개", updated: "2026-06-20", views: 1240 },
  { id: "mp2", title: "사이드 프로젝트 모음", status: "비공개", updated: "2026-06-12", views: 0 },
  { id: "mp3", title: "졸업작품: AI 일정 추천", status: "링크 공유", updated: "2026-05-30", views: 312 },
];

const INITIAL_SAVED_COMPANIES = [
  { id: "co1", name: "Kakao", part: "Backend", region: "판교", stage: "지원완료", logo: "K", color: "var(--color-mint)", submittedPortfolio: "실시간 협업 화이트보드" },
  { id: "co2", name: "Toss", part: "Frontend", region: "강남", stage: "제안받음", logo: "T", color: "var(--color-coral)", submittedPortfolio: "" },
  { id: "co3", name: "당근마켓", part: "Fullstack", region: "서초", stage: "", logo: "당", color: "var(--color-mint)" },
  { id: "co4", name: "네이버", part: "Data", region: "분당", stage: "", logo: "N", color: "var(--color-coral)" },
];

function MyPage() {
  const [tab, setTab] = useState<"portfolios" | "companies">("portfolios");
  const [previewCompany, setPreviewCompany] = useState<any>(null);
  const [companies, setCompanies] = useState(INITIAL_SAVED_COMPANIES);
  const [cancelTarget, setCancelTarget] = useState<any>(null);

  const handleCancelConfirm = () => {
    if (cancelTarget) {
      setCompanies((prev) => prev.map(c => c.id === cancelTarget.id ? { ...c, stage: "" } : c));
      setCancelTarget(null);
    }
  };

  const handleAcceptProposal = (id: string) => {
    setCompanies((prev) => prev.map(c => c.id === id ? { ...c, stage: "수락완료" } : c));
    alert("제안을 수락했습니다.");
  };

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-12 gap-8">
        {/* Profile */}
        <aside className="lg:col-span-4 space-y-5">
          <div className="surface-card p-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-2xl">D</div>
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight">김도현</h2>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              <Stat label="포폴" value="3" />
              <Stat label="관심" value="4" />
              <Stat label="조회" value="1.5k" />
            </div>
            <Link to="/profileedit" className="mt-5 flex items-center justify-center h-9 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
              기본 정보 수정
            </Link>
          </div>

          <div className="surface-card p-6 space-y-3">
            <h3 className="font-display font-semibold tracking-tight">기본 정보</h3>
            <InfoRow label="직군" value="Frontend Engineer" />
            <InfoRow label="지역" value="서울 · 강남구" />
            <InfoRow label="경력" value="2년차" />
            <InfoRow label="자격증" value="정보처리기사" />
            <InfoRow label="이메일" value="dohyun@devfolio.io" />
            <InfoRow label="GitHub" value="github.com/dohyun" />
            <InfoRow label="웹사이트" value="dohyun.dev" />
          </div>
        </aside>

        {/* Content column */}
        <section className="lg:col-span-8 space-y-6">
          <div className="flex items-center gap-2 surface-card p-1.5 w-fit">
            <TabBtn active={tab === "portfolios"} onClick={() => setTab("portfolios")}>내 포트폴리오</TabBtn>
            <TabBtn active={tab === "companies"} onClick={() => setTab("companies")}>관심 공고</TabBtn>
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
              {companies.map((c) => (
                <article key={c.id} className="surface-card p-5 hover:-translate-y-0.5 transition">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl grid place-items-center font-display font-bold text-lg" style={{ background: `color-mix(in oklch, ${c.color} 30%, var(--color-surface))` }}>
                      {c.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-base font-semibold tracking-tight">{c.name}</h3>
                      <div className="text-xs text-ink-soft">{c.part} · {c.region}</div>
                    </div>
                    {c.stage && <StatusChip status={c.stage} />}
                  </div>
                  <div className="mt-4 flex items-center justify-end gap-2 pt-4 border-t border-line">
                    <button className="h-8 px-3 rounded-md border border-line text-xs hover:bg-surface-2 transition">메모</button>
                    {c.stage === "지원완료" ? (
                      <>
                        <button
                          onClick={() => setPreviewCompany(c)}
                          className="h-8 px-3 rounded-md bg-surface-2 text-ink border border-line text-xs hover:bg-line/30 transition"
                        >
                          제출 포폴 보기
                        </button>
                        <button
                          onClick={() => setCancelTarget(c)}
                          className="h-8 px-3 rounded-md border border-coral text-coral text-xs hover:bg-coral/10 transition"
                        >
                          지원 취소
                        </button>
                      </>
                    ) : c.stage === "제안받음" ? (
                      <>
                        <button
                          onClick={() => setCancelTarget(c)}
                          className="h-8 px-3 rounded-md border border-line text-xs hover:bg-surface-2 transition"
                        >
                          거절
                        </button>
                        <button
                          onClick={() => handleAcceptProposal(c.id)}
                          className="h-8 px-3 rounded-md bg-mint text-ink text-xs hover:opacity-90 transition font-medium"
                        >
                          수락
                        </button>
                      </>
                    ) : c.stage === "수락완료" ? (
                      <span className="text-xs text-ink-soft">채용 담당자가 연락할 예정입니다.</span>
                    ) : (
                      <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs hover:opacity-90 transition">지원하기</button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Cancel Warning Modal */}
      {cancelTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-coral/10 text-coral flex items-center justify-center mx-auto mb-4 text-2xl">
              !
            </div>
            <h2 className="text-xl font-display font-semibold tracking-tight mb-2">
              {cancelTarget.stage === "지원완료" ? "지원을 취소하시겠습니까?" : "제안을 거절하시겠습니까?"}
            </h2>
            <p className="text-ink-soft text-sm mb-6">
              이 작업은 되돌릴 수 없습니다.
              <br />
              {cancelTarget.name}의 {cancelTarget.stage === "지원완료" ? "지원이 취소" : "제안이 거절"}됩니다.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setCancelTarget(null)}
                className="h-10 px-6 rounded-lg border border-line text-sm font-medium hover:bg-surface-2 transition"
              >
                닫기
              </button>
              <button
                onClick={handleCancelConfirm}
                className="h-10 px-6 rounded-lg bg-coral text-white text-sm font-medium hover:opacity-90 transition shadow-sm"
              >
                {cancelTarget.stage === "지원완료" ? "지원 취소" : "제안 거절"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Preview Modal */}
      {previewCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-surface w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-xl overflow-hidden flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setPreviewCompany(null)}
              className="absolute top-5 right-5 text-ink-soft hover:text-ink transition flex items-center justify-center w-8 h-8 rounded-full hover:bg-surface-2"
            >
              ✕
            </button>
            <div className="p-6 border-b border-line/60">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg grid place-items-center font-display font-bold text-sm" style={{ background: `color-mix(in oklch, ${previewCompany.color} 30%, var(--color-surface))` }}>
                  {previewCompany.logo}
                </div>
                <div>
                  <h2 className="text-xl font-display font-semibold tracking-tight">{previewCompany.name} 제출 포트폴리오</h2>
                  <p className="text-sm text-ink-soft mt-0.5">{previewCompany.submittedPortfolio || "제출된 포트폴리오가 없습니다."}</p>
                </div>
              </div>
            </div>
            <div className="p-8 bg-surface-2 overflow-y-auto min-h-[400px]">
              <div className="bg-white border border-line rounded-xl shadow-sm p-10 aspect-[1/1.4] mx-auto w-full max-w-md transform transition hover:scale-[1.01] duration-300">
                <h1 className="text-3xl font-display font-bold mb-6 text-ink">{previewCompany.submittedPortfolio}</h1>
                <p className="text-ink-soft text-sm leading-relaxed mb-8">
                  안녕하세요! 저는 사용자 경험을 최우선으로 생각하는 프론트엔드 개발자 김도현입니다.
                  {previewCompany.name}의 {previewCompany.part} 직무에 지원하기 위해 작성한 포트폴리오입니다.
                </p>
                <div className="space-y-4">
                  <div className="h-3 bg-line/40 rounded-full w-full"></div>
                  <div className="h-3 bg-line/40 rounded-full w-5/6"></div>
                  <div className="h-3 bg-line/40 rounded-full w-4/6"></div>
                  <div className="h-3 bg-line/40 rounded-full w-full mt-8"></div>
                  <div className="h-3 bg-line/40 rounded-full w-3/4"></div>
                  <div className="h-3 bg-line/40 rounded-full w-full"></div>
                </div>
                <div className="mt-12 p-6 border border-line/60 rounded-lg bg-surface/50">
                  <div className="text-xs font-mono text-ink-soft uppercase mb-2">Projects</div>
                  <div className="h-16 bg-line/30 rounded-md"></div>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-line/60 flex justify-end bg-surface">
              <button
                onClick={() => setPreviewCompany(null)}
                className="h-10 px-6 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-sm"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
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
      status === "비공개" || status === "수락완료" ? "bg-surface-2 text-ink-soft border-line" :
        status === "제안받음" ? "bg-primary/10 text-primary border-primary/20" :
          "bg-coral/15 text-ink border-coral/40";
  return <span className={"chip border " + tone}>{status}</span>;
}
