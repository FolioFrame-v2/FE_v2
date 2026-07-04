import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Check } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { REGIONS } from "@/lib/regions";

export const Route = createFileRoute("/onboarding-recruiter")({
  head: () => ({
    meta: [
      { title: "기업 프로필 작성 — FolioFrame" },
      { name: "description", content: "회원가입 후 기업 프로필을 입력하고 인재를 찾아보세요." },
    ],
  }),
  component: OnboardingRecruiterPage,
});

const FIELDS = ["Web", "Mobile", "Data/AI", "DevOps", "Game", "Embedded", "Security", "Blockchain"] as const;

const TECH_STACKS = [
  "Java", "Spring Boot", "Python", "Django", "FastAPI",
  "JavaScript", "TypeScript", "React", "Next.js", "Vue.js",
  "Node.js", "Express", "NestJS", "Android", "Kotlin",
  "Java(Android)", "iOS", "Swift", "MySQL", "PostgreSQL",
  "MongoDB", "Redis", "AWS", "Docker", "Kubernetes",
  "Git", "GitHub", "TensorFlow", "PyTorch"
];

type Form = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  businessNumber: string;
  website: string;
  field: string;
  techStacks: string[];
  region: string;
  bio: string;
  agree: boolean;
};

const INIT: Form = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  businessNumber: "",
  website: "",
  field: "",
  techStacks: [],
  region: "",
  bio: "",
  agree: false,
};

function OnboardingRecruiterPage() {
  const navigate = useNavigate();
  const [f, setF] = useState<Form>(INIT);
  const [submitted, setSubmitted] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [fieldInput, setFieldInput] = useState("");

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

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

  const [openProvince, setOpenProvince] = useState(false);
  const [openDistrict, setOpenDistrict] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((p) => ({ ...p, [k]: v }));
  
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

  const addField = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && fieldInput.trim()) {
      e.preventDefault();
      const val = fieldInput.trim();
      const matched = FIELDS.find(t => t.toLowerCase() === val.toLowerCase()) || val;
      set("field", matched);
      setFieldInput("");
    }
  };

  const completion = useMemo(() => {
    const checks = [f.companyName, f.contactName, f.email, f.businessNumber, f.website, f.field, f.region];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [f]);

  const required = f.companyName && f.contactName && f.email && f.businessNumber && f.agree;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!required) return;
    setSubmitted(true);
    setTimeout(() => navigate({ to: "/" }), 900);
  };

  return (
    <div className="min-h-screen text-foreground">
      <main className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="chip border border-line bg-surface-2 text-ink-soft mb-3">STEP 2 / 2 · 기업 프로필 작성</div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">기업 파트너로 오신 걸 환영해요</h1>
            <p className="mt-2 text-ink-soft text-sm">기본 정보를 입력하면 기업에 맞는 맞춤 인재 추천이 제공됩니다.</p>
          </div>
          <div className="hidden md:block text-right">
            <div className="font-mono text-xs text-ink-soft">완성도</div>
            <div className="font-display text-2xl font-semibold">{completion}%</div>
            <div className="mt-1 w-40 h-1.5 rounded-full bg-surface-2 overflow-hidden">
              <div className="h-full bg-primary transition-all" style={{ width: `${completion}%` }} />
            </div>
          </div>
        </header>

        <form onSubmit={onSubmit} className="space-y-6">
          <Section title="기업 및 담당자 정보" desc="공식 기업 프로필에 표시되는 핵심 정보예요.">
            <Grid>
              <Field label="기업명" required>
                <input value={f.companyName} onChange={(e) => set("companyName", e.target.value)} placeholder="주식회사 예시" className={inp} />
              </Field>
              <Field label="사업자 등록번호" required>
                <input value={f.businessNumber} onChange={(e) => set("businessNumber", e.target.value)} placeholder="000-00-00000" className={inp} />
              </Field>
              <Field label="담당자 이름" required>
                <input value={f.contactName} onChange={(e) => set("contactName", e.target.value)} placeholder="김담당" className={inp} />
              </Field>
              <Field label="담당자 이메일" required>
                <input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="recruiter@company.com" className={inp} />
              </Field>
              <Field label="연락처">
                <input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="010-1234-5678" className={inp} />
              </Field>
              <Field label="회사 웹사이트">
                <input value={f.website} onChange={(e) => set("website", e.target.value)} placeholder="https://company.com" className={inp} />
              </Field>
              <Field label="회사 위치">
                <div className="flex flex-wrap gap-3">
                  <div className="relative">
                    <button 
                      onClick={(e) => { e.preventDefault(); setOpenProvince(!openProvince); setOpenDistrict(false); }}
                      className="flex items-center gap-2 px-4 py-2 bg-background border border-line rounded-full text-sm font-medium text-ink hover:bg-surface transition focus:outline-none focus:border-ink"
                    >
                      {province || "시/도 선택"}
                      <ChevronDown className="size-4 text-ink-soft" />
                    </button>
                    {openProvince && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setOpenProvince(false)} />
                        <div className="absolute top-full left-0 mt-2 w-48 max-h-60 overflow-y-auto bg-surface border border-line rounded-xl shadow-lg z-50 py-2 flex flex-col hide-scrollbar">
                          {Object.keys(REGIONS).map(r => (
                            <button 
                              key={r} 
                              onClick={(e) => { 
                                e.preventDefault(); 
                                setProvince(r); 
                                setDistrict(""); 
                                setOpenProvince(false);
                              }}
                              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition ${
                                province === r ? "font-medium text-primary bg-primary/5" : "text-ink hover:bg-surface"
                              }`}
                            >
                              <span>{r}</span>
                              {province === r && <Check className="size-4" />}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {province && REGIONS[province] && REGIONS[province].length > 0 && (
                    <div className="relative">
                      <button 
                        onClick={(e) => { e.preventDefault(); setOpenDistrict(!openDistrict); setOpenProvince(false); }}
                        className="flex items-center gap-2 px-4 py-2 bg-background border border-line rounded-full text-sm font-medium text-ink hover:bg-surface transition focus:outline-none focus:border-ink"
                      >
                        {district || "시/구/군 선택"}
                        <ChevronDown className="size-4 text-ink-soft" />
                      </button>
                      {openDistrict && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setOpenDistrict(false)} />
                          <div className="absolute top-full left-0 mt-2 w-56 max-h-60 overflow-y-auto bg-surface border border-line rounded-xl shadow-lg z-50 py-2 flex flex-col hide-scrollbar">
                            {REGIONS[province].map(d => (
                              <button 
                                key={d} 
                                onClick={(e) => { 
                                  e.preventDefault(); 
                                  setDistrict(d); 
                                  set("region", `${province} ${d}`.trim()); 
                                  setOpenDistrict(false); 
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition ${
                                  district === d ? "font-medium text-primary bg-primary/5" : "text-ink hover:bg-surface"
                                }`}
                              >
                                <span>{d}</span>
                                {district === d && <Check className="size-4" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </Field>
            </Grid>
          </Section>

          <Section title="채용 관심 분야" desc="어떤 분야의 인재를 주로 찾으시나요?">
            <Field label="채용 분야">
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {f.field && (
                    <span className="chip bg-surface border-line text-ink-soft pr-1 flex items-center gap-1 w-fit">
                      {f.field}
                      <button
                        type="button"
                        onClick={() => set("field", "")}
                        className="h-5 w-5 rounded-full hover:bg-line flex items-center justify-center transition-colors text-ink-soft/70 hover:text-ink"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
                {!f.field && (
                  <>
                    <input 
                      value={fieldInput} 
                      onChange={(e) => setFieldInput(e.target.value)} 
                      onKeyDown={addField}
                      placeholder="분야 검색 후 선택 또는 Enter" 
                      className={inp} 
                    />
                    {fieldInput.trim() && FIELDS.filter(t => t.toLowerCase().includes(fieldInput.toLowerCase())).length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-2 p-3 bg-surface-2 rounded-md border border-line">
                        {FIELDS.filter(t => t.toLowerCase().includes(fieldInput.toLowerCase())).map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => { setFieldInput(""); set("field", t); }}
                            className="text-sm px-3 py-1.5 rounded-full bg-surface border border-line hover:bg-line hover:text-ink transition"
                          >
                            + {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </Field>

            <Field label="요구 기술 스택">
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
          </Section>

          <Section title="기업 소개" desc="인재들에게 노출되는 기업 소개글입니다.">
            <Field label="소개글">
              <textarea
                rows={4}
                value={f.bio}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="예) 뛰어난 기술력을 바탕으로 시장을 혁신하는 스타트업입니다."
                className={inp + " min-h-[88px] resize-y py-2"}
              />
              <div className="mt-1 text-right text-[11px] font-mono text-ink-soft">{f.bio.length} / 500</div>
            </Field>
          </Section>

          <div className="surface-card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={f.agree} onChange={(e) => set("agree", e.target.checked)} className="h-4 w-4 accent-[color:var(--color-mint)]" />
              <span>개인정보 및 기업정보 수집·이용에 동의합니다. <span className="text-ink-soft">(필수)</span></span>
            </label>
            <div className="flex items-center gap-2">
              <Link to="/" className="h-10 px-4 rounded-full border border-line text-sm grid place-items-center hover:bg-surface-2 transition">나중에</Link>
              <button
                type="submit"
                disabled={!required || submitted}
                className="h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitted ? "저장 중…" : "기업 프로필 저장하고 시작하기"}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

const inp =
  "w-full h-10 px-3 rounded-md bg-surface border border-line text-sm placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-mint)]/40 focus:border-[color:var(--color-mint)]/60 transition";

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="surface-card p-6">
      <header className="mb-5">
        <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
        {desc && <p className="text-xs text-ink-soft mt-1">{desc}</p>}
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
