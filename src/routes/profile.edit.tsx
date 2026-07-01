import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/ui/nav";

export const Route = createFileRoute("/profile/edit")({
  head: () => ({
    meta: [
      { title: "프로필 편집 — devfolio" },
      { name: "description", content: "기본 정보, 링크, 지원 분야, 알림 설정을 관리하세요." },
    ],
  }),
  component: ProfileEditPage,
});

const FIELDS = ["Web", "Mobile", "Data/AI", "DevOps", "Game", "Embedded", "Security", "Blockchain"] as const;
const PARTS = ["Frontend", "Backend", "Fullstack", "iOS", "Android", "Data Engineer", "ML Engineer", "DevOps", "QA", "PM", "Designer"] as const;
const GENDERS = [
  { v: "female", l: "여성" },
  { v: "male", l: "남성" },
  { v: "none", l: "선택 안 함" },
] as const;
const CAREER = ["학생", "신입", "1-3년", "3-5년", "5년+"] as const;
const REGIONS = ["서울", "경기/인천", "부산", "대구", "대전", "광주", "기타", "원격"] as const;
const VISIBILITY = [
  { v: "public", l: "전체 공개" },
  { v: "link", l: "링크 소유자만" },
  { v: "private", l: "비공개" },
] as const;

type Form = {
  name: string;
  handle: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  github: string;
  website: string;
  linkedin: string;
  field: string;
  parts: string[];
  career: string;
  region: string;
  bio: string;
  headline: string;
  visibility: string;
  notifyMatch: boolean;
  notifyMessage: boolean;
  notifyMarketing: boolean;
};

const CURRENT: Form = {
  name: "김도현",
  handle: "dohyun.dev",
  email: "dohyun@devfolio.io",
  phone: "010-1234-5678",
  age: "26",
  gender: "male",
  github: "https://github.com/dohyun",
  website: "https://dohyun.dev",
  linkedin: "",
  field: "Web",
  parts: ["Frontend"],
  career: "1-3년",
  region: "서울",
  bio: "사용자 경험을 코드로 옮기는 프론트엔드 엔지니어",
  headline: "Frontend Engineer · 서울 · 강남구",
  visibility: "public",
  notifyMatch: true,
  notifyMessage: true,
  notifyMarketing: false,
};

function ProfileEditPage() {
  const navigate = useNavigate();
  const [f, setF] = useState<Form>(CURRENT);
  const [saved, setSaved] = useState<null | "saving" | "done">(null);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const togglePart = (p: string) =>
    set("parts", f.parts.includes(p) ? f.parts.filter((x) => x !== p) : [...f.parts, p]);

  const completion = useMemo(() => {
    const checks = [f.name, f.email, f.github, f.field, f.parts.length > 0, f.career, f.region, f.bio, f.headline];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [f]);

  const dirty = JSON.stringify(f) !== JSON.stringify(CURRENT);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved("saving");
    setTimeout(() => {
      setSaved("done");
      setTimeout(() => navigate({ to: "/mypage" }), 700);
    }, 700);
  };

  const onReset = () => setF(CURRENT);

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <div className="chip border border-line bg-surface-2 text-ink-soft mb-3">계정 · 프로필 편집</div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">개인 프로필</h1>
            <p className="mt-2 text-ink-soft text-sm">포트폴리오 상단·검색 카드·채용 매칭에 이 정보가 사용돼요.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-mono text-[11px] text-ink-soft">완성도</div>
              <div className="font-display text-xl font-semibold">{completion}%</div>
              <div className="mt-1 w-40 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                <div className="h-full bg-primary transition-all" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </div>
        </header>

        <form onSubmit={onSubmit} className="grid lg:grid-cols-12 gap-6">
          {/* Sidebar summary */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="surface-card p-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground grid place-items-center font-display font-bold text-2xl">
                  {f.name.slice(0, 1) || "D"}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-lg font-semibold truncate">{f.name || "이름"}</div>
                  <div className="text-xs font-mono text-ink-soft truncate">@{f.handle || "handle"}</div>
                </div>
              </div>
              <button type="button" className="mt-4 w-full h-9 rounded-full border border-line text-sm hover:bg-surface-2 transition">
                프로필 사진 변경
              </button>
              <p className="mt-2 text-[11px] text-ink-soft text-center">PNG / JPG, 최대 2MB</p>
            </div>

            <nav className="surface-card p-4 text-sm">
              <div className="text-[11px] font-mono uppercase text-ink-soft px-2 pb-2">섹션</div>
              <ul className="space-y-0.5">
                {[
                  ["#basic", "기본 정보"],
                  ["#links", "링크"],
                  ["#career", "분야 & 경력"],
                  ["#bio", "소개"],
                  ["#privacy", "공개 & 알림"],
                  ["#danger", "계정"],
                ].map(([h, l]) => (
                  <li key={h}>
                    <a href={h} className="block px-2 py-1.5 rounded-md text-ink-soft hover:text-ink hover:bg-surface-2 transition">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <div className="lg:col-span-8 space-y-6">
            <Section id="basic" title="기본 정보">
              <Grid>
                <Field label="이름" required>
                  <input value={f.name} onChange={(e) => set("name", e.target.value)} className={inp} />
                </Field>
                <Field label="핸들 (URL)">
                  <div className="flex">
                    <span className="inline-flex items-center h-10 px-3 rounded-l-md border border-r-0 border-line bg-surface-2 text-xs font-mono text-ink-soft">
                      devfolio.io/@
                    </span>
                    <input value={f.handle} onChange={(e) => set("handle", e.target.value)} className={inp + " rounded-l-none"} />
                  </div>
                </Field>
                <Field label="이메일" required>
                  <input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} className={inp} />
                </Field>
                <Field label="휴대폰">
                  <input value={f.phone} onChange={(e) => set("phone", e.target.value)} className={inp} />
                </Field>
                <Field label="나이">
                  <input type="number" min={14} max={99} value={f.age} onChange={(e) => set("age", e.target.value)} className={inp} />
                </Field>
                <Field label="성별">
                  <div className="flex gap-2 flex-wrap">
                    {GENDERS.map((g) => (
                      <Chip key={g.v} active={f.gender === g.v} onClick={() => set("gender", g.v)}>{g.l}</Chip>
                    ))}
                  </div>
                </Field>
              </Grid>
            </Section>

            <Section id="links" title="링크">
              <Grid>
                <Field label="GitHub" required>
                  <input value={f.github} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/username" className={inp} />
                </Field>
                <Field label="개인 웹사이트">
                  <input value={f.website} onChange={(e) => set("website", e.target.value)} placeholder="https://yourname.dev" className={inp} />
                </Field>
                <Field label="LinkedIn">
                  <input value={f.linkedin} onChange={(e) => set("linkedin", e.target.value)} placeholder="https://linkedin.com/in/…" className={inp} />
                </Field>
              </Grid>
            </Section>

            <Section id="career" title="분야 & 경력">
              <Field label="지원 분야" required>
                <div className="flex gap-2 flex-wrap">
                  {FIELDS.map((x) => (
                    <Chip key={x} active={f.field === x} onClick={() => set("field", x)}>{x}</Chip>
                  ))}
                </div>
              </Field>
              <Field label={`파트 (${f.parts.length} 선택)`} required>
                <div className="flex gap-2 flex-wrap">
                  {PARTS.map((x) => (
                    <Chip key={x} active={f.parts.includes(x)} onClick={() => togglePart(x)}>{x}</Chip>
                  ))}
                </div>
              </Field>
              <Grid>
                <Field label="경력">
                  <div className="flex gap-2 flex-wrap">
                    {CAREER.map((x) => (
                      <Chip key={x} active={f.career === x} onClick={() => set("career", x)}>{x}</Chip>
                    ))}
                  </div>
                </Field>
                <Field label="희망 근무 지역">
                  <div className="flex gap-2 flex-wrap">
                    {REGIONS.map((x) => (
                      <Chip key={x} active={f.region === x} onClick={() => set("region", x)}>{x}</Chip>
                    ))}
                  </div>
                </Field>
              </Grid>
            </Section>

            <Section id="bio" title="소개">
              <Field label="한 줄 헤드라인">
                <input value={f.headline} onChange={(e) => set("headline", e.target.value)} placeholder="예) Frontend Engineer · 서울" className={inp} />
              </Field>
              <Field label="자기소개">
                <textarea
                  rows={4}
                  value={f.bio}
                  onChange={(e) => set("bio", e.target.value)}
                  maxLength={240}
                  className={inp + " min-h-[112px] resize-y"}
                />
                <div className="mt-1 text-right text-[11px] font-mono text-ink-soft">{f.bio.length} / 240</div>
              </Field>
            </Section>

            <Section id="privacy" title="공개 & 알림">
              <Field label="프로필 공개 범위">
                <div className="flex gap-2 flex-wrap">
                  {VISIBILITY.map((v) => (
                    <Chip key={v.v} active={f.visibility === v.v} onClick={() => set("visibility", v.v)}>{v.l}</Chip>
                  ))}
                </div>
              </Field>
              <div className="space-y-2 pt-2">
                <Toggle
                  label="채용 매칭 알림"
                  desc="기업이 나를 후보로 추천했을 때 알림을 받아요."
                  checked={f.notifyMatch}
                  onChange={(v) => set("notifyMatch", v)}
                />
                <Toggle
                  label="메시지 알림"
                  desc="댓글·연락·지원 응답 알림을 받아요."
                  checked={f.notifyMessage}
                  onChange={(v) => set("notifyMessage", v)}
                />
                <Toggle
                  label="마케팅 정보 수신"
                  desc="공모전·이벤트 소식을 이메일로 받아요."
                  checked={f.notifyMarketing}
                  onChange={(v) => set("notifyMarketing", v)}
                />
              </div>
            </Section>

            <Section id="danger" title="계정" tone="danger">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-line bg-surface p-4">
                <div>
                  <div className="text-sm font-medium">비밀번호 변경</div>
                  <div className="text-xs text-ink-soft mt-0.5">이메일로 재설정 링크를 보내드려요.</div>
                </div>
                <button type="button" className="h-9 px-4 rounded-full border border-line text-sm hover:bg-surface-2 transition">재설정 링크 받기</button>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-lg border border-[color:var(--color-coral)]/40 bg-[color:var(--color-coral)]/5 p-4">
                <div>
                  <div className="text-sm font-medium">계정 삭제</div>
                  <div className="text-xs text-ink-soft mt-0.5">모든 포트폴리오·매칭 기록이 영구 삭제돼요.</div>
                </div>
                <button type="button" className="h-9 px-4 rounded-full border border-[color:var(--color-coral)]/60 text-[color:var(--color-coral)] text-sm hover:bg-[color:var(--color-coral)]/10 transition">
                  계정 삭제
                </button>
              </div>
            </Section>

            {/* Sticky action bar */}
            <div className="sticky bottom-4 z-10">
              <div className="surface-card p-4 flex items-center justify-between gap-3 shadow-sm">
                <div className="text-xs text-ink-soft font-mono">
                  {dirty ? "저장되지 않은 변경사항이 있어요" : "모든 변경사항이 저장됨"}
                </div>
                <div className="flex items-center gap-2">
                  <Link to="/mypage" className="h-9 px-4 rounded-full border border-line text-sm grid place-items-center hover:bg-surface-2 transition">취소</Link>
                  <button
                    type="button"
                    onClick={onReset}
                    disabled={!dirty}
                    className="h-9 px-4 rounded-full border border-line text-sm hover:bg-surface-2 transition disabled:opacity-40"
                  >
                    되돌리기
                  </button>
                  <button
                    type="submit"
                    disabled={!dirty || saved === "saving"}
                    className="h-9 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-40"
                  >
                    {saved === "saving" ? "저장 중…" : saved === "done" ? "저장됨 ✓" : "변경사항 저장"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

const inp =
  "w-full h-10 px-3 rounded-md bg-surface border border-line text-sm placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-mint)]/40 focus:border-[color:var(--color-mint)]/60 transition";

function Section({
  id, title, children, tone,
}: { id?: string; title: string; children: React.ReactNode; tone?: "danger" }) {
  return (
    <section id={id} className="surface-card p-6 scroll-mt-24">
      <header className="mb-5 flex items-center gap-2">
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        {tone === "danger" && <span className="chip border border-[color:var(--color-coral)]/40 text-[color:var(--color-coral)]">주의</span>}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase text-ink-soft mb-2">
        {label}{required && <span className="text-[color:var(--color-coral)] ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "h-8 px-3 rounded-full text-xs border transition " +
        (active
          ? "bg-primary text-primary-foreground border-transparent"
          : "bg-surface border-line text-ink-soft hover:text-ink hover:border-ink-soft")
      }
    >
      {children}
    </button>
  );
}

function Toggle({
  label, desc, checked, onChange,
}: { label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-lg border border-line bg-surface p-4 cursor-pointer">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {desc && <div className="text-xs text-ink-soft mt-0.5">{desc}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={
          "shrink-0 relative h-6 w-11 rounded-full transition " +
          (checked ? "bg-primary" : "bg-surface-2 border border-line")
        }
      >
        <span
          className={
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition " +
            (checked ? "left-[22px]" : "left-0.5")
          }
        />
      </button>
    </label>
  );
}
