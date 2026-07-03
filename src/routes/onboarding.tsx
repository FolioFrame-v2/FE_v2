import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Check } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { REGIONS } from "@/lib/regions";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "프로필 작성 — FolioFrame" },
      { name: "description", content: "회원가입 후 기본 프로필을 입력하고 FolioFrame를 시작하세요." },
    ],
  }),
  component: OnboardingPage,
});

const FIELDS = ["Web", "Mobile", "Data/AI", "DevOps", "Game", "Embedded", "Security", "Blockchain"] as const;
const PARTS = ["Frontend", "Backend", "Fullstack", "iOS", "Android", "Data Engineer", "ML Engineer", "DevOps", "QA", "PM", "Designer"] as const;
const GENDERS = [
  { v: "female", l: "여성" },
  { v: "male", l: "남성" },
  { v: "none", l: "선택 안 함" },
] as const;
const CAREER = ["없음", "1년 미만", "1~3년", "3~5년", "5~7년", "7~10년", "10년 이상"] as const;

const TECH_STACKS = [
  "Java", "Spring Boot", "Python", "Django", "FastAPI",
  "JavaScript", "TypeScript", "React", "Next.js", "Vue.js",
  "Node.js", "Express", "NestJS", "Android", "Kotlin",
  "Java(Android)", "iOS", "Swift", "MySQL", "PostgreSQL",
  "MongoDB", "Redis", "AWS", "Docker", "Kubernetes",
  "Git", "GitHub", "TensorFlow", "PyTorch"
];

export type Certification = {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  id: string;
};

export type Education = {
  schoolName: string;
  major: string;
  degree: string;
  admissionDate: string;
  graduationDate: string;
  status: string;
};

export type Experience = {
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
};

type Form = {
  name: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  github: string;
  website: string;
  field: string;
  parts: string[];
  career: string;
  experiences: Experience[];
  region: string;
  bio: string;
  agree: boolean;
  certifications: Certification[];
  educations: Education[];
  techStacks: string[];
};

const INIT: Form = {
  name: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  github: "",
  website: "",
  field: "",
  parts: [],
  career: "",
  experiences: [],
  region: "",
  bio: "",
  agree: false,
  certifications: [],
  educations: [],
  techStacks: [],
};

function OnboardingPage() {
  const navigate = useNavigate();
  const [f, setF] = useState<Form>(INIT);
  const [submitted, setSubmitted] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [fieldInput, setFieldInput] = useState("");
  const [partInput, setPartInput] = useState("");

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

  const addField = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && fieldInput.trim()) {
      e.preventDefault();
      const val = fieldInput.trim();
      const matched = FIELDS.find(t => t.toLowerCase() === val.toLowerCase()) || val;
      set("field", matched);
      setFieldInput("");
    }
  };

  const addPart = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && partInput.trim()) {
      e.preventDefault();
      const val = partInput.trim();
      const matched = PARTS.find(t => t.toLowerCase() === val.toLowerCase()) || val;
      if (!f.parts.includes(matched)) {
        set("parts", [...f.parts, matched]);
      }
      setPartInput("");
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
    set("certifications", f.certifications.filter((_, i) => i !== idx));
  };

  const addEduRow = () => {
    set("educations", [...f.educations, { schoolName: "", major: "", degree: "", admissionDate: "", graduationDate: "", status: "" }]);
  };
  const updateEdu = (idx: number, field: keyof Education, value: string) => {
    const next = [...f.educations];
    next[idx] = { ...next[idx], [field]: value };
    set("educations", next);
  };
  const removeEdu = (idx: number) => {
    set("educations", f.educations.filter((_, i) => i !== idx));
  };

  const addExpRow = () => {
    set("experiences", [...f.experiences, { companyName: "", position: "", description: "", startDate: "", endDate: "" }]);
  };
  const updateExp = (idx: number, field: keyof Experience, value: string) => {
    const next = [...f.experiences];
    next[idx] = { ...next[idx], [field]: value };
    set("experiences", next);
  };
  const removeExp = (idx: number) => {
    set("experiences", f.experiences.filter((_, i) => i !== idx));
  };

  const completion = useMemo(() => {
    const checks = [f.name, f.email, f.age, f.gender, f.github, f.field, f.parts.length > 0, f.career, f.region];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [f]);

  const required = f.name && f.email && f.field && f.parts.length > 0 && f.agree;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!required) return;
    setSubmitted(true);
    setTimeout(() => navigate({ to: "/mypage" }), 900);
  };

  return (
    <div className="min-h-screen text-foreground">
      <main className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex items-end justify-between gap-4 mb-8">
          <div>
            <div className="chip border border-line bg-surface-2 text-ink-soft mb-3">STEP 2 / 2 · 프로필 작성</div>
            <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight">FolioFrame에 오신 걸 환영해요</h1>
            <p className="mt-2 text-ink-soft text-sm">기본 정보를 입력하면 맞춤 템플릿과 채용 추천이 정확해져요.</p>
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
          <Section title="기본 정보" desc="공식 프로필에 표시되는 핵심 정보예요.">
            <Grid>
              <Field label="이름" required>
                <input value={f.name} onChange={(e) => set("name", e.target.value)} placeholder="홍길동" className={inp} />
              </Field>
              <Field label="거주 지역">
                <div className="flex flex-wrap gap-3">
                  {/* 첫 번째 선택바: 시/도 */}
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

                  {/* 두 번째 선택바: 시/구/군 상세 지역 */}
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
                  
                  {province === "원격" && (
                    <div className="flex items-center text-sm text-ink-soft px-1">원격 근무를 희망합니다.</div>
                  )}
                </div>
              </Field>
              <Field label="이메일" required>
                <input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="you@devfolio.io" className={inp} />
              </Field>
              <Field label="휴대폰">
                <input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="010-1234-5678" className={inp} />
              </Field>
              <Field label="나이">
                <input type="number" min={14} max={99} value={f.age} onChange={(e) => set("age", e.target.value)} placeholder="25" className={inp} />
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

          <Section title="링크" desc="GitHub은 채용 추천 정확도에 큰 영향을 줘요.">
            <Grid>
              <Field label="GitHub 주소" required>
                <input value={f.github} onChange={(e) => set("github", e.target.value)} placeholder="https://github.com/username" className={inp} />
              </Field>
              <Field label="개인 웹사이트">
                <input value={f.website} onChange={(e) => set("website", e.target.value)} placeholder="https://yourname.dev" className={inp} />
              </Field>
            </Grid>
          </Section>

          <Section title="지원 분야 & 파트" desc="해당하는 항목을 모두 선택해 주세요.">
            <Field label="지원 분야" required>
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
                      placeholder="지원 분야 검색 후 선택 또는 Enter" 
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
            <Field label={`파트 (${f.parts.length} 선택)`} required>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {f.parts.map((p) => (
                    <span key={p} className="chip bg-surface border-line text-ink-soft pr-1 flex items-center gap-1">
                      {p}
                      <button
                        type="button"
                        onClick={() => togglePart(p)}
                        className="h-5 w-5 rounded-full hover:bg-line flex items-center justify-center transition-colors text-ink-soft/70 hover:text-ink"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input 
                  value={partInput} 
                  onChange={(e) => setPartInput(e.target.value)} 
                  onKeyDown={addPart}
                  placeholder="파트 검색 후 선택 또는 Enter" 
                  className={inp} 
                />
                {partInput.trim() && PARTS.filter(t => t.toLowerCase().includes(partInput.toLowerCase()) && !f.parts.includes(t)).length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2 p-3 bg-surface-2 rounded-md border border-line">
                    {PARTS.filter(t => t.toLowerCase().includes(partInput.toLowerCase()) && !f.parts.includes(t)).map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => { setPartInput(""); togglePart(t); }}
                        className="text-sm px-3 py-1.5 rounded-full bg-surface border border-line hover:bg-line hover:text-ink transition"
                      >
                        + {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Field>
            <Field label="경력">
              <div className="flex gap-2 flex-wrap">
                {CAREER.map((x) => (
                  <Chip key={x} active={f.career === x} onClick={() => set("career", x)}>{x}</Chip>
                ))}
              </div>
            </Field>
          </Section>

          <Section title="관심 기술 스택" desc="기업 공고가 올라왔을 때 관심 기술 스택과 관련된 내용이면 알림을 받을 수 있어요.">
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
          </Section>

          <Section title="자격증" desc="보유하신 자격증을 표 형태로 추가해 주세요.">
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

          <Section title="학력" desc="학력 사항을 추가해 주세요.">
            <div className="overflow-hidden rounded-lg border border-line bg-surface">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">학교명</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">전공</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">학위</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">입학일</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">졸업일</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">상태</th>
                    <th className="px-4 py-3 text-center font-semibold text-ink whitespace-nowrap w-16">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {f.educations.map((ed, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2"><input value={ed.schoolName} onChange={(e) => updateEdu(idx, 'schoolName', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                      <td className="px-4 py-2"><input value={ed.major} onChange={(e) => updateEdu(idx, 'major', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                      <td className="px-4 py-2"><input value={ed.degree} onChange={(e) => updateEdu(idx, 'degree', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입학/학사/석사 등" /></td>
                      <td className="px-4 py-2"><input type="date" value={ed.admissionDate} onChange={(e) => updateEdu(idx, 'admissionDate', e.target.value)} className="w-full bg-transparent focus:outline-none text-ink-soft" /></td>
                      <td className="px-4 py-2"><input type="date" value={ed.graduationDate} onChange={(e) => updateEdu(idx, 'graduationDate', e.target.value)} className="w-full bg-transparent focus:outline-none text-ink-soft" /></td>
                      <td className="px-4 py-2">
                        <select value={ed.status} onChange={(e) => updateEdu(idx, 'status', e.target.value)} className="w-full bg-transparent focus:outline-none text-ink-soft">
                          <option value="">선택</option>
                          <option value="재학중">재학중</option>
                          <option value="휴학">휴학</option>
                          <option value="졸업">졸업</option>
                          <option value="중퇴">중퇴</option>
                          <option value="수료">수료</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button type="button" onClick={() => removeEdu(idx)} className="text-coral hover:opacity-80 text-lg leading-none">×</button>
                      </td>
                    </tr>
                  ))}
                  {f.educations.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-6 text-center text-ink-soft text-sm">
                        등록된 학력이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addEduRow}
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm text-ink hover:bg-surface-2 transition"
            >
              + 학력 추가
            </button>
          </Section>

          <Section title="경력 상세" desc="경력 사항을 상세하게 추가해 주세요.">
            <div className="overflow-hidden rounded-lg border border-line bg-surface">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">회사명</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">포지션</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">입사일</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">퇴사일</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">상세 설명</th>
                    <th className="px-4 py-3 text-center font-semibold text-ink whitespace-nowrap w-16">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {f.experiences.map((exp, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2"><input value={exp.companyName} onChange={(e) => updateExp(idx, 'companyName', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                      <td className="px-4 py-2"><input value={exp.position} onChange={(e) => updateExp(idx, 'position', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                      <td className="px-4 py-2"><input type="date" value={exp.startDate} onChange={(e) => updateExp(idx, 'startDate', e.target.value)} className="w-full bg-transparent focus:outline-none text-ink-soft" /></td>
                      <td className="px-4 py-2">
                        <input type="date" value={exp.endDate} onChange={(e) => updateExp(idx, 'endDate', e.target.value)} className="w-full bg-transparent focus:outline-none text-ink-soft" />
                        {!exp.endDate && <span className="text-[10px] text-ink-soft/70 block mt-1">비워두면 재직</span>}
                      </td>
                      <td className="px-4 py-2"><textarea value={exp.description} onChange={(e) => updateExp(idx, 'description', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50 min-h-[40px] resize-y text-xs" placeholder="주요 업무 및 성과" /></td>
                      <td className="px-4 py-2 text-center align-top">
                        <button type="button" onClick={() => removeExp(idx)} className="text-coral hover:opacity-80 text-lg leading-none mt-1">×</button>
                      </td>
                    </tr>
                  ))}
                  {f.experiences.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-6 text-center text-ink-soft text-sm">
                        등록된 경력이 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addExpRow}
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-4 py-2 text-sm text-ink hover:bg-surface-2 transition"
            >
              + 경력 추가
            </button>
          </Section>

          <Section title="한 줄 소개" desc="포트폴리오 상단·검색 카드에 노출돼요.">
            <Field label="소개">
              <textarea
                rows={3}
                value={f.bio}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="예) 사용자 경험을 코드로 옮기는 프론트엔드 엔지니어"
                className={inp + " min-h-[88px] resize-y py-2"}
              />
              <div className="mt-1 text-right text-[11px] font-mono text-ink-soft">{f.bio.length} / 120</div>
            </Field>
          </Section>

          <div className="surface-card p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={f.agree} onChange={(e) => set("agree", e.target.checked)} className="h-4 w-4 accent-[color:var(--color-mint)]" />
              <span>개인정보 수집·이용에 동의합니다. <span className="text-ink-soft">(필수)</span></span>
            </label>
            <div className="flex items-center gap-2">
              <Link to="/" className="h-10 px-4 rounded-full border border-line text-sm grid place-items-center hover:bg-surface-2 transition">나중에</Link>
              <button
                type="submit"
                disabled={!required || submitted}
                className="h-10 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitted ? "저장 중…" : "프로필 저장하고 시작하기"}
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
