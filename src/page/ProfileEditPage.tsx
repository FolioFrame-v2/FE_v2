import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { REGIONS } from "@/lib/regions";

export default ProfileEditPage;

const FIELDS = ["Web", "Mobile", "Data/AI", "DevOps", "Game", "Embedded", "Security", "Blockchain"] as const;
const PARTS = ["Frontend", "Backend", "Fullstack", "iOS", "Android", "Data Engineer", "ML Engineer", "DevOps", "QA", "PM", "Designer"] as const;
const GENDERS = [
  { v: "female", l: "여성" },
  { v: "male", l: "남성" },
  { v: "none", l: "선택 안 함" },
] as const;
const CAREER = ["학생", "신입", "1-3년", "3-5년", "5년+"] as const;

const TECH_STACKS = [
  "Java", "Spring Boot", "Python", "Django", "FastAPI",
  "JavaScript", "TypeScript", "React", "Next.js", "Vue.js",
  "Node.js", "Express", "NestJS", "Android", "Kotlin",
  "Java(Android)", "iOS", "Swift", "MySQL", "PostgreSQL",
  "MongoDB", "Redis", "AWS", "Docker", "Kubernetes",
  "Git", "GitHub", "TensorFlow", "PyTorch"
];
const VISIBILITY = [
  { v: "public", l: "전체 공개" },
  { v: "link", l: "링크 소유자만" },
  { v: "private", l: "비공개" },
] as const;

export type Certification = {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  id: string;
};

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
  certifications: Certification[];
  techStacks: string[];
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
  region: "서울 강남",
  bio: "사용자 경험을 코드로 옮기는 프론트엔드 엔지니어",
  headline: "Frontend Engineer · 서울 · 강남구",
  visibility: "public",
  notifyMatch: true,
  notifyMessage: true,
  notifyMarketing: false,
  certifications: [
    { name: "정보처리기사", organization: "한국산업인력공단", issueDate: "2023-08-15", expiryDate: "", id: "12-34-5678" }
  ],
  techStacks: ["React", "TypeScript", "JavaScript"],
};

function ProfileEditPage() {
  const navigate = useNavigate();
  const [baseForm, setBaseForm] = useState<Form>(CURRENT);
  const [f, setF] = useState<Form>(CURRENT);
  const [saved, setSaved] = useState<null | "saving" | "done">(null);
  const [techInput, setTechInput] = useState("");

  const [province, setProvince] = useState(f.region.split(" ")[0] || "");
  const [district, setDistrict] = useState(f.region.split(" ").slice(1).join(" ") || "");

  useEffect(() => {
    if (province) {
      if (!REGIONS[province] || REGIONS[province].length === 0) {
        set("region", province);
      } else {
        set("region", district ? `${province} ${district}` : province);
      }
    } else {
      set("region", "");
    }
  }, [province, district]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  const togglePart = (p: string) =>
    set("parts", f.parts.includes(p) ? f.parts.filter((x) => x !== p) : [...f.parts, p]);
  const toggleTechStack = (t: string) =>
    set("techStacks", f.techStacks.includes(t) ? f.techStacks.filter((x) => x !== t) : [...f.techStacks, t]);

  const addTechStack = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && techInput.trim()) {
      e.preventDefault();
      const val = techInput.trim();
      const matched = TECH_STACKS.find(t => t.toLowerCase() === val.toLowerCase()) || val;
      if (!f.techStacks.includes(matched)) {
        set("techStacks", [...f.techStacks, matched]);
      }
      setTechInput("");
    }
  };

  const addCertRow = () => {
    set("certifications", [...f.certifications, { name: "", organization: "", issueDate: "", expiryDate: "", id: "" }]);
  };

  const updateCert = (idx: number, field: keyof Certification, value: string) => {
    const newCerts = [...f.certifications];
    newCerts[idx] = { ...newCerts[idx], [field]: value };
    set("certifications", newCerts);
  };

  const removeCert = (idx: number) => {
    const newCerts = [...f.certifications];
    newCerts.splice(idx, 1);
    set("certifications", newCerts);
  };

  const completion = useMemo(() => {
    const checks = [f.name, f.email, f.github, f.field, f.parts.length > 0, f.career, f.region, f.bio, f.headline];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [f]);

  const dirty = JSON.stringify(f) !== JSON.stringify(baseForm);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved("saving");
    setTimeout(() => {
      setSaved("done");
      setBaseForm(f);
      setTimeout(() => {
        setSaved(null);
      }, 2000);
    }, 700);
  };

  const onReset = () => {
    setF(baseForm);
    setProvince(baseForm.region.split(" ")[0] || "");
    setDistrict(baseForm.region.split(" ").slice(1).join(" ") || "");
  };

  return (
    <div className="min-h-screen text-foreground">
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
                  ["#techstacks", "관심 기술 스택"],
                  ["#certifications", "자격증"],
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
                  <div className="flex gap-2">
                    <select 
                      value={province} 
                      onChange={(e) => { setProvince(e.target.value); setDistrict(""); }}
                      className={inp + " appearance-none bg-surface pr-8"}
                    >
                      <option value="" disabled>시/도 선택</option>
                      {Object.keys(REGIONS).map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <select 
                      value={district} 
                      onChange={(e) => setDistrict(e.target.value)}
                      className={inp + " appearance-none bg-surface pr-8"}
                      disabled={!province || !REGIONS[province] || REGIONS[province].length === 0}
                    >
                      <option value="" disabled>시/구/군 선택</option>
                      {province && REGIONS[province] && REGIONS[province].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </Field>
              </Grid>
            </Section>

            <Section id="techstacks" title="관심 기술 스택">
              <Field label="기술 스택">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {f.techStacks.map((t) => (
                      <span key={t} className="chip bg-surface border-line text-ink-soft pr-1 flex items-center gap-1">
                        {t}
                        <button
                          type="button"
                          onClick={() => toggleTechStack(t)}
                          className="h-5 w-5 rounded-full hover:bg-line flex items-center justify-center transition-colors text-ink-soft/70 hover:text-ink"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input 
                    value={techInput} 
                    onChange={(e) => setTechInput(e.target.value)} 
                    onKeyDown={addTechStack}
                    placeholder="기술 스택 검색 후 선택 또는 Enter" 
                    className={inp} 
                  />
                  {techInput.trim() && TECH_STACKS.filter(t => t.toLowerCase().includes(techInput.toLowerCase()) && !f.techStacks.includes(t)).length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2 p-3 bg-surface-2 rounded-md border border-line">
                      {TECH_STACKS.filter(t => t.toLowerCase().includes(techInput.toLowerCase()) && !f.techStacks.includes(t)).map(t => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => { setTechInput(""); toggleTechStack(t); }}
                          className="text-sm px-3 py-1.5 rounded-full bg-surface border border-line hover:bg-line hover:text-ink transition"
                        >
                          + {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </Field>
              <p className="mt-2 text-xs text-ink-soft">관심 기술 스택이 포함된 기업 공고가 등록되면 알림을 받을 수 있어요.</p>
            </Section>

            <Section id="certifications" title="자격증">
              <div className="overflow-hidden rounded-lg border border-line bg-surface">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-2">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">자격증 명</th>
                      <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">기관</th>
                      <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">발급일자</th>
                      <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">만료일자</th>
                      <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">자격증 고유 번호</th>
                      <th className="px-4 py-3 text-center font-semibold text-ink whitespace-nowrap w-16">삭제</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {f.certifications.map((c, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2"><input value={c.name} onChange={(e) => updateCert(idx, 'name', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                        <td className="px-4 py-2"><input value={c.organization} onChange={(e) => updateCert(idx, 'organization', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                        <td className="px-4 py-2"><input type="date" value={c.issueDate} onChange={(e) => updateCert(idx, 'issueDate', e.target.value)} className="w-full bg-transparent focus:outline-none text-ink-soft" /></td>
                        <td className="px-4 py-2"><input type="date" value={c.expiryDate} onChange={(e) => updateCert(idx, 'expiryDate', e.target.value)} className="w-full bg-transparent focus:outline-none text-ink-soft" /></td>
                        <td className="px-4 py-2"><input value={c.id} onChange={(e) => updateCert(idx, 'id', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                        <td className="px-4 py-2 text-center">
                          <button type="button" onClick={() => removeCert(idx)} className="text-coral hover:opacity-80 text-lg leading-none">×</button>
                        </td>
                      </tr>
                    ))}
                    {f.certifications.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-ink-soft text-sm">
                          등록된 자격증이 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={addCertRow}
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm text-ink hover:bg-surface-2 transition"
              >
                + 자격증 추가
              </button>
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
                  className={inp + " min-h-[112px] resize-y py-2"}
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

            <div className="sticky bottom-4 z-10">
              <div className="surface-card p-4 flex items-center justify-between gap-3 shadow-sm">
                <div className="text-xs text-ink-soft font-mono">
                  {dirty ? "저장되지 않은 변경사항이 있어요" : "모든 변경사항이 저장됨"}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onReset}
                    disabled={!dirty}
                    className="h-9 px-4 rounded-full border border-line text-sm hover:bg-surface-2 transition disabled:opacity-40"
                  >
                    취소
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