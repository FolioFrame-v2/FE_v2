import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  Globe,
  Lock,
  Mail,
  MapPin,
  Pencil,
  Plus,
  Save,
  SpellCheck,
  Sparkles,
  Trash2,
  Users,
  Wand2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Visibility = "private" | "link" | "public";

type Project = {
  id: string;
  name: string;
  role: string;
  period: string;
  summary: string;
  stack: string;
  link: string;
};

type CustomField = {
  id: string;
  label: string;
  type: "text" | "textarea";
  value: string;
};

const DEFAULT_STACK = ["TypeScript", "React", "Node.js", "PostgreSQL"];
const SUGGEST_STACK = ["Next.js", "TanStack", "Tailwind", "GraphQL", "Docker", "AWS", "Kotlin", "Go", "Rust", "Python"];

const BASE_SECTIONS = [
  { id: "meta", label: "포트폴리오 정보" },
  { id: "profile", label: "프로필" },
  { id: "career", label: "경력 요약" },
  { id: "projects", label: "프로젝트" },
  { id: "stack", label: "기술 스택" },
  { id: "visibility", label: "공개 설정" },
];

// Mock AI improvement — wraps text into a more polished STAR-style version.
function improve(text: string, kind: "oneLiner" | "detail" | "intro" | "career" | "project" | "custom" = "custom"): string {
  const t = text.trim();
  if (!t) return "";
  switch (kind) {
    case "oneLiner":
      return `${t} — 측정 가능한 임팩트와 협업 경험을 한 줄로 압축`;
    case "detail":
      return `${t}\n\n특히 최근 1년간은 성능·신뢰성 지표(p99 응답, 에러율) 개선과 팀 온보딩 문서화를 주도하며 조직 차원의 임팩트를 만들어 왔습니다.`;
    case "intro":
      return `${t} 사용자 가치를 빠르게 검증하고, 데이터로 의사결정하는 것을 좋아합니다.`;
    case "career":
      return t
        .split("\n")
        .map((line) => (line.trim() ? `${line} — 핵심 성과 1줄 추가 추천` : line))
        .join("\n");
    case "project":
      return `${t}\n→ 문제(Problem)·접근(Approach)·결과(Result) 구조로 재배열하고, 정량 지표(예: 응답 38%↓, 비용 22%↓)를 강조해 보세요.`;
    default:
      return `${t}\n\n[AI 추천] 더 구체적인 사례·수치·기간을 덧붙이면 신뢰도가 올라갑니다.`;
  }
}

function EditorPage() {
  // 포트폴리오 메타
  const [title, setTitle] = useState("백엔드 엔지니어 김지훈의 포트폴리오");
  const [oneLiner, setOneLiner] = useState("결제·정산 시스템을 다루는 5년 차 백엔드 엔지니어");
  const [detail, setDetail] = useState(
    "대용량 트래픽 환경에서의 결제·정산 도메인 설계와 운영 경험을 정리했습니다. Kotlin/Spring 기반 서비스 개발과 SRE 협업 경험이 강점입니다.",
  );
  const [jobRole, setJobRole] = useState("백엔드 엔지니어");

  // 프로필
  const [location, setLocation] = useState("서울, 대한민국");
  const [email, setEmail] = useState("jihoon@example.com");
  const [github, setGithub] = useState("https://github.com/jihoon");
  const [website, setWebsite] = useState("https://jihoon.dev");
  const [intro, setIntro] = useState(
    "안녕하세요. 안정적인 서비스를 만드는 데 관심이 많은 백엔드 엔지니어 김지훈입니다.",
  );

  // 경력
  const [career, setCareer] = useState(
    "- 2022.03 ~ 현재 : 토스페이먼츠 / 결제 플랫폼 팀\n- 2020.01 ~ 2022.02 : 우아한형제들 / 정산 시스템 팀\n- 2019.01 ~ 2019.12 : 스타트업 인턴",
  );
  const [careerChecked, setCareerChecked] = useState(false);

  // 프로젝트
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "p1",
      name: "결제 게이트웨이 리뉴얼",
      role: "백엔드 리드",
      period: "2023.06 ~ 2024.02",
      summary: "Kotlin/Spring 기반 게이트웨이 리뉴얼로 평균 응답 시간 38% 개선",
      stack: "Kotlin, Spring, Kafka, Redis",
      link: "https://github.com/jihoon/payment-gateway",
    },
    {
      id: "p2",
      name: "정산 파이프라인 자동화",
      role: "백엔드 엔지니어",
      period: "2022.09 ~ 2023.03",
      summary: "Airflow + Kafka 기반 정산 파이프라인 도입, 운영 공수 60% 절감",
      stack: "Python, Airflow, Kafka",
      link: "",
    },
  ]);

  // 기술 스택
  const [stack, setStack] = useState<string[]>(DEFAULT_STACK);
  const [stackInput, setStackInput] = useState("");

  // 공개 설정
  const [visibility, setVisibility] = useState<Visibility>("link");
  const [allowRecruiter, setAllowRecruiter] = useState(true);
  const [hideContact, setHideContact] = useState(false);

  // ✨ 사용자 추가 필드
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<"text" | "textarea">("textarea");

  // ✨ AI 진단 결과 (필드 키 → 추천 문장)
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [diagnosing, setDiagnosing] = useState(false);

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      { id: `p${Date.now()}`, name: "", role: "", period: "", summary: "", stack: "", link: "" },
    ]);
  };
  const updateProject = (id: string, patch: Partial<Project>) =>
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const removeProject = (id: string) => setProjects((prev) => prev.filter((p) => p.id !== id));

  const addStack = (value: string) => {
    const v = value.trim();
    if (!v || stack.includes(v)) return;
    setStack((s) => [...s, v]);
    setStackInput("");
  };
  const removeStack = (value: string) => setStack((s) => s.filter((t) => t !== value));

  // --- 커스텀 필드 ---
  const addCustomField = () => {
    const label = newLabel.trim();
    if (!label) return;
    const id = `cf_${Date.now()}`;
    setCustomFields((prev) => [...prev, { id, label, type: newType, value: "" }]);
    setNewLabel("");
    setNewType("textarea");
    setAddOpen(false);
  };
  const updateCustomField = (id: string, patch: Partial<CustomField>) =>
    setCustomFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  const removeCustomField = (id: string) => {
    setCustomFields((prev) => prev.filter((f) => f.id !== id));
    setSuggestions((s) => {
      const n = { ...s };
      delete n[`custom:${id}`];
      return n;
    });
  };

  // --- AI 진단 ---
  const runDiagnose = async () => {
    setDiagnosing(true);
    await new Promise((r) => setTimeout(r, 700)); // 가짜 호출 딜레이
    const next: Record<string, string> = {};
    if (oneLiner.trim()) next["oneLiner"] = improve(oneLiner, "oneLiner");
    if (detail.trim()) next["detail"] = improve(detail, "detail");
    if (intro.trim()) next["intro"] = improve(intro, "intro");
    if (career.trim()) next["career"] = improve(career, "career");
    projects.forEach((p) => {
      if (p.summary.trim()) next[`project:${p.id}`] = improve(p.summary, "project");
    });
    customFields.forEach((f) => {
      if (f.value.trim()) next[`custom:${f.id}`] = improve(f.value, "custom");
    });
    setSuggestions(next);
    setDiagnosing(false);
  };

  // 적용(체크) / 거절(닫기)
  const applySuggestion = (key: string) => {
    const text = suggestions[key];
    if (text == null) return;
    if (key === "oneLiner") setOneLiner(text);
    else if (key === "detail") setDetail(text);
    else if (key === "intro") setIntro(text);
    else if (key === "career") setCareer(text);
    else if (key.startsWith("project:")) {
      const pid = key.slice("project:".length);
      updateProject(pid, { summary: text });
    } else if (key.startsWith("custom:")) {
      const cid = key.slice("custom:".length);
      updateCustomField(cid, { value: text });
    }
    dismissSuggestion(key);
  };
  const dismissSuggestion = (key: string) =>
    setSuggestions((s) => {
      const n = { ...s };
      delete n[key];
      return n;
    });

  const completion = computeCompletion({
    title, oneLiner, detail, jobRole, email, intro, career, projects, stack,
  });

  const sections = [
    ...BASE_SECTIONS,
    ...customFields.map((f) => ({ id: `custom-${f.id}`, label: f.label })),
  ];

  const suggestionCount = Object.keys(suggestions).length;

  return (
    <div className="min-h-screen">
      {/* Topbar */}
      <header className="sticky top-0 z-30 border-b border-line bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">홈으로</span>
            </Link>
            <span className="hidden h-5 w-px bg-line sm:inline-block" />
            <div className="flex items-center gap-2">
              <span className="chip">draft</span>
              <span className="font-display text-sm font-semibold text-ink">{title || "제목 없는 포트폴리오"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={runDiagnose}
              disabled={diagnosing}
              className="gap-2 bg-[var(--color-mint)] text-[oklch(0.2_0.05_150)] hover:bg-[var(--color-mint)]/90"
            >
              <Wand2 className="size-4" />
              {diagnosing ? "AI 분석 중…" : "AI 진단받기"}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Eye className="size-4" /> 미리보기
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Save className="size-4" /> 임시 저장
            </Button>
            <Button size="sm" className="gap-2">
              <Globe className="size-4" /> 공개하기
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="surface-card p-4">
            <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">진행률</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-ink">{completion}%</span>
              <span className="text-xs text-ink-soft">완성도</span>
            </div>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full bg-[var(--color-mint)] transition-[width]"
                style={{ width: `${completion}%` }}
              />
            </div>

            {suggestionCount > 0 && (
              <div className="mt-4 rounded-md border border-[color-mix(in_oklch,var(--color-mint)_50%,transparent)] bg-[color-mix(in_oklch,var(--color-mint)_18%,transparent)] px-3 py-2 text-xs text-ink">
                <span className="font-semibold">AI 추천 {suggestionCount}건</span>
                <p className="mt-0.5 text-ink-soft">각 필드 아래에서 체크하여 반영</p>
              </div>
            )}

            <nav className="mt-5 flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="truncate rounded-md px-2 py-1.5 text-sm text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setAddOpen((o) => !o)}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-line py-1.5 text-xs text-ink-soft hover:border-ink/40 hover:text-ink"
            >
              <Plus className="size-3.5" /> 필드 추가
            </button>
          </div>
        </aside>

        {/* Form */}
        <main className="space-y-8">
          {/* 포트폴리오 정보 */}
          <Section id="meta" title="포트폴리오 정보" hint="공유될 포트폴리오의 기본 정보입니다.">
            <Field label="포트폴리오 제목" required>
              <Input value={title} maxLength={80} onChange={(e) => setTitle(e.target.value)} placeholder="예) 백엔드 엔지니어 김지훈의 포트폴리오" />
            </Field>
            <Field label="한 줄 소개" required hint={`${oneLiner.length}/120`}>
              <Input value={oneLiner} maxLength={120} onChange={(e) => setOneLiner(e.target.value)} placeholder="당신을 한 줄로 표현해 주세요" />
              <AiSuggestion
                suggestion={suggestions["oneLiner"]}
                onApply={() => applySuggestion("oneLiner")}
                onDismiss={() => dismissSuggestion("oneLiner")}
              />
            </Field>
            <Field label="상세 설명" hint={`${detail.length}/600`}>
              <Textarea value={detail} maxLength={600} onChange={(e) => setDetail(e.target.value)} rows={5} placeholder="어떤 일을 해왔고, 어떤 강점이 있는지 적어주세요." />
              <AiSuggestion
                suggestion={suggestions["detail"]}
                onApply={() => applySuggestion("detail")}
                onDismiss={() => dismissSuggestion("detail")}
              />
            </Field>
            <Field label="직군 / 전문 분야" required>
              <div className="flex flex-wrap gap-2">
                {["프론트엔드", "백엔드", "풀스택", "모바일", "데이터", "AI/ML", "DevOps", "임베디드"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setJobRole(r)}
                    className={`chip cursor-pointer transition-colors ${
                      jobRole === r ? "border-ink bg-ink text-background" : "hover:border-ink/40"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </Field>
          </Section>

          {/* 프로필 */}
          <Section id="profile" title="프로필" hint="기본 인적사항 및 연락 수단.">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="거주 지역" icon={<MapPin className="size-3.5" />}>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="예) 서울, 대한민국" />
              </Field>
              <Field label="이메일" required icon={<Mail className="size-3.5" />}>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </Field>
              <Field label="GitHub URL">
                <Input value={github} onChange={(e) => setGithub(e.target.value)} placeholder="https://github.com/username" />
              </Field>
              <Field label="개인 웹사이트 URL">
                <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://your.site" />
              </Field>
            </div>
            <Field label="프로필 소개" hint={`${intro.length}/240`}>
              <Textarea value={intro} maxLength={240} onChange={(e) => setIntro(e.target.value)} rows={3} placeholder="간단한 자기소개" />
              <AiSuggestion
                suggestion={suggestions["intro"]}
                onApply={() => applySuggestion("intro")}
                onDismiss={() => dismissSuggestion("intro")}
              />
            </Field>
          </Section>

          {/* 경력 요약 */}
          <Section
            id="career"
            title="경력 요약"
            hint="주요 경력 및 이력을 입력하세요. 줄바꿈으로 구분합니다."
            action={
              <button
                type="button"
                onClick={() => setCareerChecked(true)}
                className="chip cursor-pointer hover:border-ink/40"
              >
                <SpellCheck className="size-3.5" />
                맞춤법 검사
              </button>
            }
          >
            <Textarea
              value={career}
              onChange={(e) => { setCareer(e.target.value); setCareerChecked(false); }}
              rows={7}
              placeholder={"- 2022.03 ~ 현재 : 회사명 / 팀명\n- 2020.01 ~ 2022.02 : 회사명 / 팀명"}
              className="font-mono text-sm"
            />
            <AiSuggestion
              suggestion={suggestions["career"]}
              onApply={() => applySuggestion("career")}
              onDismiss={() => dismissSuggestion("career")}
            />
            {careerChecked && (
              <div className="mt-3 flex items-start gap-2 rounded-md border border-line bg-[color-mix(in_oklch,var(--color-mint)_14%,transparent)] px-3 py-2 text-sm text-ink">
                <Check className="mt-0.5 size-4 shrink-0" />
                맞춤법 검사 완료 · 0건의 교정 제안
              </div>
            )}
          </Section>

          {/* 프로젝트 */}
          <Section
            id="projects"
            title="프로젝트 / 작업 사례"
            hint="대표 프로젝트를 3~5개 정도 추천드려요."
            action={
              <Button size="sm" variant="outline" onClick={addProject} className="gap-2">
                <Plus className="size-4" />
                프로젝트 추가
              </Button>
            }
          >
            <div className="space-y-4">
              {projects.map((p, idx) => (
                <ProjectCard
                  key={p.id}
                  index={idx + 1}
                  project={p}
                  suggestion={suggestions[`project:${p.id}`]}
                  onApplySuggestion={() => applySuggestion(`project:${p.id}`)}
                  onDismissSuggestion={() => dismissSuggestion(`project:${p.id}`)}
                  onChange={(patch) => updateProject(p.id, patch)}
                  onRemove={() => removeProject(p.id)}
                />
              ))}
              {projects.length === 0 && (
                <button
                  type="button"
                  onClick={addProject}
                  className="grid-paper flex w-full items-center justify-center rounded-lg border border-dashed border-line py-10 text-sm text-ink-soft hover:text-ink"
                >
                  <span className="inline-flex items-center gap-2">
                    <Plus className="size-4" /> 첫 번째 프로젝트를 추가해보세요
                  </span>
                </button>
              )}
            </div>
          </Section>

          {/* 기술 스택 */}
          <Section id="stack" title="기술 스택" hint="사용해본 도구를 추가하세요. 엔터로 등록합니다.">
            <div className="flex flex-wrap gap-2">
              {stack.map((t) => (
                <span key={t} className="chip border-ink/30 bg-surface-2 text-ink">
                  {t}
                  <button type="button" onClick={() => removeStack(t)} className="ml-1 text-ink-soft hover:text-ink" aria-label={`${t} 제거`}>×</button>
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addStack(stackInput); } }}
                placeholder="예) TypeScript"
              />
              <Button type="button" variant="outline" onClick={() => addStack(stackInput)} className="gap-2">
                <Plus className="size-4" /> 추가
              </Button>
            </div>
            <div className="mt-4">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">추천</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {SUGGEST_STACK.filter((s) => !stack.includes(s)).map((s) => (
                  <button key={s} type="button" onClick={() => addStack(s)} className="chip cursor-pointer hover:border-ink/40">+ {s}</button>
                ))}
              </div>
            </div>
          </Section>

          {/* 공개 설정 */}
          <Section id="visibility" title="공개 설정 및 접근 제어" hint="누가 이 포트폴리오를 볼 수 있는지 정합니다.">
            <div className="grid gap-3 sm:grid-cols-3">
              <VisibilityOption active={visibility === "private"} onClick={() => setVisibility("private")} icon={<Lock className="size-4" />} title="비공개" desc="나만 볼 수 있음" />
              <VisibilityOption active={visibility === "link"} onClick={() => setVisibility("link")} icon={<Sparkles className="size-4" />} title="링크 공유" desc="링크가 있는 사람만" />
              <VisibilityOption active={visibility === "public"} onClick={() => setVisibility("public")} icon={<Globe className="size-4" />} title="전체 공개" desc="검색·매칭에 노출" />
            </div>
            <div className="mt-5 space-y-3">
              <Toggle icon={<Users className="size-4" />} title="채용 담당자 매칭 허용" desc="기업 담당자에게 추천 후보로 노출됩니다." checked={allowRecruiter} onChange={setAllowRecruiter} />
              <Toggle icon={<Mail className="size-4" />} title="연락처 비공개" desc="이메일·전화번호를 가립니다. 연락은 플랫폼 메시지로만." checked={hideContact} onChange={setHideContact} />
            </div>
          </Section>

          {/* 사용자 추가 필드들 — 각 필드가 별도 섹션으로 렌더링 */}
          {customFields.map((f) => (
            <Section
              key={f.id}
              id={`custom-${f.id}`}
              title={f.label}
              hint="사용자가 추가한 필드"
              action={
                <button
                  type="button"
                  onClick={() => removeCustomField(f.id)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-surface-2 hover:text-[var(--color-coral)]"
                  aria-label={`${f.label} 필드 삭제`}
                >
                  <Trash2 className="size-3.5" /> 삭제
                </button>
              }
            >
              <Field label={f.label}>
                {f.type === "textarea" ? (
                  <Textarea value={f.value} rows={4} onChange={(e) => updateCustomField(f.id, { value: e.target.value })} placeholder="내용을 입력하세요" />
                ) : (
                  <Input value={f.value} onChange={(e) => updateCustomField(f.id, { value: e.target.value })} placeholder="내용을 입력하세요" />
                )}
                <AiSuggestion
                  suggestion={suggestions[`custom:${f.id}`]}
                  onApply={() => applySuggestion(`custom:${f.id}`)}
                  onDismiss={() => dismissSuggestion(`custom:${f.id}`)}
                />
              </Field>
            </Section>
          ))}

          {/* 필드 추가 카드 */}
          <section id="add-field" className="surface-card p-6 sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-semibold text-ink">필드 추가</h2>
                <p className="mt-1 text-sm text-ink-soft">원하는 항목(수상, 자격증, 블로그, 오픈소스 등)을 직접 추가할 수 있어요.</p>
              </div>
              {!addOpen && (
                <Button size="sm" variant="outline" onClick={() => setAddOpen(true)} className="gap-2">
                  <Plus className="size-4" /> 새 필드
                </Button>
              )}
            </div>
            {addOpen && (
              <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto]">
                <Input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomField(); } }}
                  placeholder="필드 이름 (예: 수상 / 자격증 / 블로그)"
                  autoFocus
                />
                <div className="flex rounded-md border border-line p-0.5">
                  <button
                    type="button"
                    onClick={() => setNewType("text")}
                    className={`rounded px-3 py-1.5 text-xs ${newType === "text" ? "bg-ink text-background" : "text-ink-soft hover:text-ink"}`}
                  >
                    한 줄
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType("textarea")}
                    className={`rounded px-3 py-1.5 text-xs ${newType === "textarea" ? "bg-ink text-background" : "text-ink-soft hover:text-ink"}`}
                  >
                    여러 줄
                  </button>
                </div>
                <Button onClick={addCustomField} className="gap-2"><Plus className="size-4" /> 추가</Button>
                <Button variant="ghost" onClick={() => { setAddOpen(false); setNewLabel(""); }}>취소</Button>
              </div>
            )}
          </section>

          {/* Bottom action */}
          <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-ink-soft">자동 저장됨 · 마지막 저장 방금 전</p>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2"><Eye className="size-4" />미리보기</Button>
              <Button className="gap-2"><Globe className="size-4" />공개하기</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function AiSuggestion({
  suggestion,
  onApply,
  onDismiss,
}: {
  suggestion?: string;
  onApply: () => void;
  onDismiss: () => void;
}) {
  if (!suggestion) return null;
  return (
    <div className="mt-2 rounded-lg border border-[color-mix(in_oklch,var(--color-mint)_55%,transparent)] bg-[color-mix(in_oklch,var(--color-mint)_12%,transparent)] p-3">
      <div className="flex items-start gap-2">
        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint)] text-[oklch(0.2_0.05_150)]">
          <Wand2 className="size-3" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-soft">AI 추천</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-ink">{suggestion}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={onApply}
            title="이 추천으로 교체"
            className="inline-flex size-7 items-center justify-center rounded-md border border-ink bg-ink text-background hover:opacity-90"
          >
            <Check className="size-4" />
          </button>
          <button
            type="button"
            onClick={onDismiss}
            title="무시"
            className="inline-flex size-7 items-center justify-center rounded-md border border-line text-ink-soft hover:text-ink"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({
  id, title, hint, action, children,
}: {
  id: string; title: string; hint?: string; action?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section id={id} className="surface-card p-6 sm:p-7 scroll-mt-24">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
          {hint && <p className="mt-1 text-sm text-ink-soft">{hint}</p>}
        </div>
        {action}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Field({
  label, required, hint, icon, children,
}: {
  label: string; required?: boolean; hint?: string; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-1.5 text-sm text-ink">
          {icon}
          {label}
          {required && <span className="text-[var(--color-coral)]">*</span>}
        </Label>
        {hint && <span className="font-mono text-[11px] text-ink-soft">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function ProjectCard({
  index, project, onChange, onRemove, suggestion, onApplySuggestion, onDismissSuggestion,
}: {
  index: number;
  project: Project;
  onChange: (patch: Partial<Project>) => void;
  onRemove: () => void;
  suggestion?: string;
  onApplySuggestion: () => void;
  onDismissSuggestion: () => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="rounded-lg border border-line bg-surface/60 p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="chip">#{index.toString().padStart(2, "0")}</span>
          <span className="truncate font-display text-sm font-semibold text-ink">
            {project.name || "프로젝트명을 입력하세요"}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-ink-soft hover:bg-surface-2 hover:text-ink"
          >
            <Pencil className="size-3.5" /> 편집
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center justify-center rounded-md p-1.5 text-ink-soft hover:bg-surface-2 hover:text-[var(--color-coral)]"
            aria-label="프로젝트 삭제"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>

      {open && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="프로젝트명" required>
            <Input value={project.name} onChange={(e) => onChange({ name: e.target.value })} placeholder="예) 결제 게이트웨이 리뉴얼" />
          </Field>
          <Field label="역할">
            <Input value={project.role} onChange={(e) => onChange({ role: e.target.value })} placeholder="예) 백엔드 리드" />
          </Field>
          <Field label="기간">
            <Input value={project.period} onChange={(e) => onChange({ period: e.target.value })} placeholder="예) 2023.06 ~ 2024.02" />
          </Field>
          <Field label="관련 링크">
            <Input value={project.link} onChange={(e) => onChange({ link: e.target.value })} placeholder="https://..." />
          </Field>
          <div className="sm:col-span-2">
            <Field label="요약 설명" hint={`${project.summary.length}/240`}>
              <Textarea
                value={project.summary}
                maxLength={240}
                rows={3}
                onChange={(e) => onChange({ summary: e.target.value })}
                placeholder="문제 · 해결 · 성과를 1~3문장으로 적어주세요"
              />
              <AiSuggestion suggestion={suggestion} onApply={onApplySuggestion} onDismiss={onDismissSuggestion} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="사용 기술">
              <Input value={project.stack} onChange={(e) => onChange({ stack: e.target.value })} placeholder="예) Kotlin, Spring, Kafka" />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
}

function VisibilityOption({
  active, onClick, icon, title, desc,
}: {
  active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border p-4 text-left transition-colors ${
        active ? "border-ink bg-ink text-background" : "border-line bg-surface/60 hover:border-ink/40"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-display text-sm font-semibold">{title}</span>
      </div>
      <p className={`mt-1.5 text-xs ${active ? "text-background/70" : "text-ink-soft"}`}>{desc}</p>
    </button>
  );
}

function Toggle({
  icon, title, desc, checked, onChange,
}: {
  icon: React.ReactNode; title: string; desc: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-line bg-surface/60 p-4">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-ink-soft">{icon}</span>
        <div>
          <p className="font-display text-sm font-semibold text-ink">{title}</p>
          <p className="mt-0.5 text-xs text-ink-soft">{desc}</p>
        </div>
      </div>
      <span className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? "bg-ink" : "bg-surface-2"}`}>
        <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className={`inline-block size-5 transform rounded-full bg-background transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </span>
    </label>
  );
}

function computeCompletion(data: {
  title: string; oneLiner: string; detail: string; jobRole: string; email: string;
  intro: string; career: string; projects: Project[]; stack: string[];
}) {
  const checks = [
    data.title.trim().length > 0,
    data.oneLiner.trim().length > 0,
    data.detail.trim().length >= 20,
    data.jobRole.trim().length > 0,
    /\S+@\S+\.\S+/.test(data.email),
    data.intro.trim().length > 0,
    data.career.trim().length > 0,
    data.projects.length > 0 && data.projects.every((p) => p.name.trim().length > 0),
    data.stack.length >= 3,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

export default EditorPage;
