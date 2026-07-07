import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Cpu,
  FileText,
  ListChecks,
  MapPin,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Wallet,
  X,
} from "lucide-react";
import { Nav } from "@/components/ui/nav";
import { useCreateJobPosting } from "@/api/generated/job-posting/job-posting";

export const Route = createFileRoute("/jobs/new")({
  component: JobCreatePage,
  head: () => ({
    meta: [
      { title: "채용 공고 작성 — devfolio" },
      { name: "description", content: "기업이 새로운 채용 공고를 작성합니다." },
    ],
  }),
});

// ---------- Types ----------
type JobRole = "FRONTEND" | "BACKEND" | "FULLSTACK" | "IOS" | "ANDROID" | "DATA" | "DEVOPS" | "AI";
type EmploymentType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERN" | "FREELANCE";
type CareerLevel = "NONE" | "NEWBIE" | "JUNIOR" | "MID" | "SENIOR" | "ANY";
type Status = "ACTIVE" | "DRAFT" | "CLOSED";
type StackType = "REQUIRED" | "PREFERRED";

type HiringStep = { stepOrder: number; stepName: string; description: string };
type TechStack = { techStackId: number; name: string; stackType: StackType };

type Form = {
  title: string;
  positionName: string;
  jobRole: JobRole;
  employmentType: EmploymentType;
  careerLevel: CareerLevel;
  minCareerYear: number;
  maxCareerYear: number;
  regionId: number;
  workLocation: string;
  minSalary: number;
  maxSalary: number;
  fieldDescription: string;
  responsibilities: string[];
  qualifications: string[];
  preferredQualifications: string[];
  preferredConditions: string[];
  preferredTalents: string[];
  hiringProcess: HiringStep[];
  additionalNotes: string;
  deadline: string;
  status: Status;
  techStacks: TechStack[];
};

// ---------- Constants ----------
const ROLES: { v: JobRole; label: string }[] = [
  { v: "FRONTEND", label: "프론트엔드" },
  { v: "BACKEND", label: "백엔드" },
  { v: "FULLSTACK", label: "풀스택" },
  { v: "IOS", label: "iOS" },
  { v: "ANDROID", label: "안드로이드" },
  { v: "DATA", label: "데이터" },
  { v: "DEVOPS", label: "DevOps" },
  { v: "AI", label: "AI/ML" },
];

const EMPLOYMENT: { v: EmploymentType; label: string }[] = [
  { v: "FULL_TIME", label: "정규직" },
  { v: "CONTRACT", label: "계약직" },
  { v: "INTERN", label: "인턴" },
  { v: "PART_TIME", label: "파트타임" },
  { v: "FREELANCE", label: "프리랜서" },
];

const CAREER: { v: CareerLevel; label: string }[] = [
  { v: "NONE", label: "무관" },
  { v: "NEWBIE", label: "신입" },
  { v: "JUNIOR", label: "주니어 (1-3년)" },
  { v: "MID", label: "미들 (3-7년)" },
  { v: "SENIOR", label: "시니어 (7년+)" },
  { v: "ANY", label: "경력 무관" },
];

const REGIONS = [
  { id: 1, name: "서울" },
  { id: 2, name: "경기" },
  { id: 3, name: "인천" },
  { id: 4, name: "부산" },
  { id: 5, name: "대전" },
  { id: 6, name: "대구" },
  { id: 7, name: "광주" },
  { id: 8, name: "제주" },
  { id: 9, name: "원격근무" },
];

const STACK_LIB: { id: number; name: string }[] = [
  { id: 1, name: "React" },
  { id: 2, name: "Next.js" },
  { id: 3, name: "TypeScript" },
  { id: 4, name: "Vue" },
  { id: 5, name: "Node.js" },
  { id: 6, name: "NestJS" },
  { id: 7, name: "Spring" },
  { id: 8, name: "Kotlin" },
  { id: 9, name: "Python" },
  { id: 10, name: "Django" },
  { id: 11, name: "PostgreSQL" },
  { id: 12, name: "MySQL" },
  { id: 13, name: "MongoDB" },
  { id: 14, name: "Redis" },
  { id: 15, name: "AWS" },
  { id: 16, name: "Docker" },
  { id: 17, name: "Kubernetes" },
  { id: 18, name: "GraphQL" },
];

const INITIAL: Form = {
  title: "Toss 프론트엔드 개발자 (React/Next.js) 채용",
  positionName: "웹 프론트엔드 엔지니어",
  jobRole: "FRONTEND",
  employmentType: "FULL_TIME",
  careerLevel: "MID",
  minCareerYear: 3,
  maxCareerYear: 7,
  regionId: 1,
  workLocation: "서울 강남구 테헤란로 142, 아크플레이스",
  minSalary: 5000,
  maxSalary: 8000,
  fieldDescription: "토스팀의 코어 서비스를 함께 만들어갈 열정적인 프론트엔드 개발자를 찾고 있습니다.\n수백만 명이 사용하는 앱의 웹뷰 및 관리자 도구를 개발합니다.",
  responsibilities: [
    "토스 앱 내 웹뷰 서비스 개발 및 유지보수",
    "공통 UI 컴포넌트 설계 및 디자인 시스템 구축",
    "웹 성능 최적화 및 사용자 경험 개선",
  ],
  qualifications: [
    "React, Next.js 등 모던 웹 프론트엔드 프레임워크 사용 경험이 3년 이상이신 분",
    "TypeScript를 활용한 정적 타입 기반 개발에 익숙하신 분",
    "디자이너, 백엔드 개발자 등 다양한 직군과 원활하게 소통할 수 있는 분",
  ],
  preferredQualifications: [
    "대규모 트래픽을 처리하는 B2C 서비스 개발 경험",
    "웹 접근성(a11y) 및 SEO 최적화 경험",
  ],
  preferredConditions: [
    "오픈소스 생태계 기여 경험",
    "기술 블로그 운영 또는 사내 기술 세미나 발표 경험",
  ],
  preferredTalents: [
    "문제의 본질을 파악하고 주도적으로 해결하는 분",
    "끊임없이 학습하고 동료들과 지식을 나누는 분",
  ],
  hiringProcess: [
    { stepOrder: 1, stepName: "서류 전형", description: "이력서 및 포트폴리오 검토 (최대 1주일 소요)" },
    { stepOrder: 2, stepName: "코딩 테스트", description: "알고리즘 및 프론트엔드 실무 역량 평가" },
    { stepOrder: 3, stepName: "1차 직무 인터뷰", description: "실무진과의 기술적 깊이 확인" },
    { stepOrder: 4, stepName: "2차 컬처핏 인터뷰", description: "조직 적합성 및 성장 가능성 확인" },
  ],
  additionalNotes: "포트폴리오 제출은 필수이며, 본인이 기여한 부분을 명확히 기재해 주세요.",
  deadline: "2026-08-31",
  status: "ACTIVE",
  techStacks: [
    { techStackId: 1, name: "React", stackType: "REQUIRED" },
    { techStackId: 2, name: "Next.js", stackType: "REQUIRED" },
    { techStackId: 3, name: "TypeScript", stackType: "REQUIRED" },
  ],
};

// ---------- Page ----------
function JobCreatePage() {
  const navigate = useNavigate();
  const [f, setF] = useState<Form>(INITIAL);
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setF((s) => ({ ...s, [k]: v }));

  const completion = useMemo(() => {
    const checks = [
      !!f.title,
      !!f.positionName,
      !!f.fieldDescription,
      f.responsibilities.some((x) => x.trim()),
      f.qualifications.some((x) => x.trim()),
      !!f.deadline,
      f.maxSalary > 0,
      f.techStacks.length > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [f]);

  const { mutate: createJob } = useCreateJobPosting({
    mutation: {
      onSuccess: () => {
        setSaved(true);
        setTimeout(() => navigate({ to: "/mypage/company" }), 1600);
      },
      onError: (err: any) => {
        alert("공고 등록 실패: " + err.message);
      }
    }
  });

  const onSubmit = (status: Status) => {
    const payload = { ...f, status };
    if (!payload.deadline) {
      delete (payload as any).deadline;
    } else if (payload.deadline.length === 10) {
      payload.deadline = payload.deadline + "T23:59:59";
    }
    
    // 프론트엔드 임시 처리: API 대신 localStorage에 저장 후 /jobs/mock 상세 페이지로 이동
    localStorage.setItem("mock_job_posting", JSON.stringify(payload));
    setSaved(true);
    setTimeout(() => navigate({ to: "/jobs/$id", params: { id: "mock" } }), 1000);
  };

  return (
    <div className="min-h-screen bg-background text-ink">
      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-8">
          <div>
            <button
              onClick={() => navigate({ to: "/mypage/company" })}
              className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink mb-3"
            >
              <ChevronLeft className="h-4 w-4" /> 기업 마이페이지로
            </button>
            <h1 className="font-display text-3xl font-semibold tracking-tight">
              새 채용 공고 작성
            </h1>
            <p className="text-sm text-ink-soft mt-1">
              작성 완성도 <span className="text-ink font-medium">{completion}%</span> · 지원자에게
              노출될 내용을 꼼꼼히 확인해주세요.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onSubmit("DRAFT")}
              className="h-9 px-4 rounded-md border border-line text-sm hover:bg-accent"
            >
              임시 저장
            </button>
            <button
              onClick={() => onSubmit("ACTIVE")}
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 inline-flex items-center gap-2"
            >
              <Save className="h-4 w-4" /> 공고 게시
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar nav */}
          <aside className="col-span-12 lg:col-span-3">
            <nav className="sticky top-24 space-y-1 text-sm">
              {([
                ["basic", "기본 정보", FileText],
                ["role", "포지션 & 고용", Briefcase],
                ["location", "지역 & 연봉", MapPin],
                ["detail", "상세 내용", ListChecks],
                ["stack", "기술 스택", Cpu],
                ["process", "채용 절차", CheckCircle2],
                ["extra", "기타 & 마감", CalendarDays],
              ] as const).map(([id, label, Icon]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-ink-soft hover:text-ink hover:bg-accent"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </a>
              ))}

            </nav>
          </aside>

          {/* Form */}
          <div className="col-span-12 lg:col-span-9 space-y-8">
            {/* BASIC */}
            <Section id="basic" title="기본 정보" desc="공고 제목과 상단에 노출될 정보입니다.">
              <Field label="공고 제목" required>
                <input
                  value={f.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="예) 프론트엔드 개발자 (React) 채용"
                  className="input"
                />
              </Field>
              <Field label="포지션명" required>
                <input
                  value={f.positionName}
                  onChange={(e) => set("positionName", e.target.value)}
                  placeholder="예) Senior Frontend Engineer"
                  className="input"
                />
              </Field>
              <Field label="분야 설명" required>
                <textarea
                  value={f.fieldDescription}
                  onChange={(e) => set("fieldDescription", e.target.value)}
                  rows={4}
                  placeholder="어떤 프로덕트/조직에서 어떤 일을 하는 팀인지 소개해주세요."
                  className="input min-h-[120px]"
                />
              </Field>
            </Section>

            {/* ROLE */}
            <Section id="role" title="포지션 & 고용 형태" desc="직무와 경력 조건을 선택합니다.">
              <Field label="직무 (Job Role)" required>
                <ChipGroup
                  options={ROLES.map((r) => ({ v: r.v, label: r.label }))}
                  value={f.jobRole}
                  onChange={(v) => set("jobRole", v as JobRole)}
                />
              </Field>
              <Field label="고용 형태" required>
                <ChipGroup
                  options={EMPLOYMENT.map((r) => ({ v: r.v, label: r.label }))}
                  value={f.employmentType}
                  onChange={(v) => set("employmentType", v as EmploymentType)}
                />
              </Field>
              <Field label="경력 수준" required>
                <ChipGroup
                  options={CAREER.map((r) => ({ v: r.v, label: r.label }))}
                  value={f.careerLevel}
                  onChange={(v) => set("careerLevel", v as CareerLevel)}
                />
              </Field>
              <Grid cols={2}>
                <Field label="최소 경력 (년)">
                  <input
                    type="number"
                    min={0}
                    value={f.minCareerYear}
                    onChange={(e) => set("minCareerYear", Number(e.target.value))}
                    className="input"
                  />
                </Field>
                <Field label="최대 경력 (년)">
                  <input
                    type="number"
                    min={0}
                    value={f.maxCareerYear}
                    onChange={(e) => set("maxCareerYear", Number(e.target.value))}
                    className="input"
                  />
                </Field>
              </Grid>
            </Section>

            {/* LOCATION */}
            <Section id="location" title="근무 지역 & 연봉" desc="지역과 연봉 범위를 입력합니다.">
              <Field label="근무 지역" required>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((r) => (
                    <Chip
                      key={r.id}
                      selected={f.regionId === r.id}
                      onClick={() => set("regionId", r.id)}
                    >
                      {r.name}
                    </Chip>
                  ))}
                </div>
              </Field>
              <Field label="상세 근무지 (도로명 주소 또는 지점명)">
                <input
                  value={f.workLocation}
                  onChange={(e) => set("workLocation", e.target.value)}
                  placeholder="예) 서울 강남구 테헤란로 123, 8층"
                  className="input"
                />
              </Field>
              <Grid cols={2}>
                <Field label="최소 연봉 (만원)">
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
                    <input
                      type="number"
                      min={0}
                      value={f.minSalary}
                      onChange={(e) => set("minSalary", Number(e.target.value))}
                      className="input pl-9"
                      placeholder="4000"
                    />
                  </div>
                </Field>
                <Field label="최대 연봉 (만원)">
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
                    <input
                      type="number"
                      min={0}
                      value={f.maxSalary}
                      onChange={(e) => set("maxSalary", Number(e.target.value))}
                      className="input pl-9"
                      placeholder="7000"
                    />
                  </div>
                </Field>
              </Grid>
            </Section>

            {/* DETAIL */}
            <Section
              id="detail"
              title="상세 내용"
              desc="담당업무, 지원자격, 우대사항, 인재상을 항목별로 작성합니다."
            >
              <ListField
                label="주요 담당 업무"
                required
                placeholder="예) 사용자 대시보드 웹앱 개발 및 유지보수"
                value={f.responsibilities}
                onChange={(v) => set("responsibilities", v)}
              />
              <ListField
                label="지원 자격"
                required
                placeholder="예) React / TypeScript 실무 경험 2년 이상"
                value={f.qualifications}
                onChange={(v) => set("qualifications", v)}
              />
              <ListField
                label="우대 조건"
                placeholder="예) 대규모 트래픽 서비스 경험"
                value={f.preferredQualifications}
                onChange={(v) => set("preferredQualifications", v)}
              />
              <ListField
                label="우대 사항 상세"
                placeholder="예) 오픈소스 컨트리뷰션 경험, 사내 세미나 발표 경험"
                value={f.preferredConditions}
                onChange={(v) => set("preferredConditions", v)}
              />
              <ListField
                label="인재상"
                placeholder="예) 문제를 정의하고 스스로 답을 만드는 사람"
                value={f.preferredTalents}
                onChange={(v) => set("preferredTalents", v)}
              />
            </Section>

            {/* STACK */}
            <Section id="stack" title="기술 스택" desc="필수 / 우대 스택을 선택하세요.">
              <div className="flex flex-wrap gap-2">
                {STACK_LIB.map((s) => {
                  const cur = f.techStacks.find((t) => t.techStackId === s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        if (!cur) {
                          set("techStacks", [
                            ...f.techStacks,
                            { techStackId: s.id, name: s.name, stackType: "REQUIRED" },
                          ]);
                        } else if (cur.stackType === "REQUIRED") {
                          set(
                            "techStacks",
                            f.techStacks.map((t) =>
                              t.techStackId === s.id ? { ...t, stackType: "PREFERRED" } : t,
                            ),
                          );
                        } else {
                          set(
                            "techStacks",
                            f.techStacks.filter((t) => t.techStackId !== s.id),
                          );
                        }
                      }}
                      className={`h-8 px-3 rounded-full text-xs border transition ${!cur
                          ? "border-line text-ink-soft hover:border-ink/40"
                          : cur.stackType === "REQUIRED"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-mint/20 text-ink border-mint"
                        }`}
                    >
                      {s.name}
                      {cur && (
                        <span className="ml-1 opacity-80">
                          · {cur.stackType === "REQUIRED" ? "필수" : "우대"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-ink-soft mt-3">
                클릭하여 <b>미선택 → 필수 → 우대 → 해제</b> 순으로 변경됩니다.
              </p>
            </Section>

            {/* PROCESS */}
            <Section id="process" title="채용 절차" desc="지원자가 볼 채용 단계입니다.">
              <div className="space-y-3">
                {f.hiringProcess.map((step, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-12 gap-3 items-start rounded-lg border border-line p-3"
                  >
                    <div className="col-span-1 h-9 w-9 rounded-full bg-accent grid place-items-center text-sm font-medium">
                      {step.stepOrder}
                    </div>
                    <div className="col-span-11 md:col-span-4">
                      <input
                        value={step.stepName}
                        onChange={(e) => {
                          const next = [...f.hiringProcess];
                          next[i] = { ...step, stepName: e.target.value };
                          set("hiringProcess", next);
                        }}
                        placeholder="단계명 (예: 서류 전형)"
                        className="input"
                      />
                    </div>
                    <div className="col-span-11 md:col-span-6">
                      <input
                        value={step.description}
                        onChange={(e) => {
                          const next = [...f.hiringProcess];
                          next[i] = { ...step, description: e.target.value };
                          set("hiringProcess", next);
                        }}
                        placeholder="설명"
                        className="input"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-1 flex md:justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const next = f.hiringProcess
                            .filter((_, idx) => idx !== i)
                            .map((s, idx) => ({ ...s, stepOrder: idx + 1 }));
                          set("hiringProcess", next);
                        }}
                        className="h-9 w-9 grid place-items-center rounded-md border border-line text-ink-soft hover:text-ink"
                        aria-label="단계 삭제"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    set("hiringProcess", [
                      ...f.hiringProcess,
                      {
                        stepOrder: f.hiringProcess.length + 1,
                        stepName: "",
                        description: "",
                      },
                    ])
                  }
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <Plus className="h-4 w-4" /> 단계 추가
                </button>
              </div>
            </Section>

            {/* EXTRA */}
            <Section id="extra" title="기타 & 마감" desc="추가 안내와 채용 마감일을 설정합니다.">
              <Field label="기타 요청 사항">
                <textarea
                  value={f.additionalNotes}
                  onChange={(e) => set("additionalNotes", e.target.value)}
                  rows={4}
                  placeholder="포트폴리오 필수 첨부, 사전 과제 안내 등"
                  className="input min-h-[110px]"
                />
              </Field>
              <Grid cols={2}>
                <Field label="채용 마감일" required>
                  <input
                    type="date"
                    value={f.deadline}
                    onChange={(e) => set("deadline", e.target.value)}
                    className="input"
                  />
                </Field>
                <Field label="공고 상태">
                  <ChipGroup
                    options={[
                      { v: "ACTIVE", label: "게시" },
                      { v: "DRAFT", label: "임시저장" },
                      { v: "CLOSED", label: "마감" },
                    ]}
                    value={f.status}
                    onChange={(v) => set("status", v as Status)}
                  />
                </Field>
              </Grid>
            </Section>

            {/* Preview summary */}
            <div className="rounded-xl border border-line bg-accent/30 p-5">
              <div className="flex items-center gap-2 text-sm font-medium mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                미리보기 요약
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <Summary icon={Briefcase} label="직무" value={ROLES.find((r) => r.v === f.jobRole)?.label ?? "-"} />
                <Summary icon={Building2} label="고용 형태" value={EMPLOYMENT.find((r) => r.v === f.employmentType)?.label ?? "-"} />
                <Summary icon={MapPin} label="지역" value={REGIONS.find((r) => r.id === f.regionId)?.name ?? "-"} />
                <Summary
                  icon={Wallet}
                  label="연봉"
                  value={
                    f.maxSalary > 0
                      ? `${f.minSalary.toLocaleString()} ~ ${f.maxSalary.toLocaleString()} 만원`
                      : "협의"
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="sticky bottom-4 mt-10 flex justify-end">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-background/90 backdrop-blur px-3 py-2 shadow-lg">
            {saved && (
              <span className="text-xs text-mint-foreground bg-mint/30 px-2 py-1 rounded-full">
                저장되었습니다
              </span>
            )}
            <Link
              to="/mypage/company"
              className="h-9 px-4 rounded-md text-sm text-ink-soft hover:text-ink inline-flex items-center"
            >
              취소
            </Link>
            <button
              onClick={() => onSubmit("DRAFT")}
              className="h-9 px-4 rounded-md border border-line text-sm hover:bg-accent"
            >
              임시 저장
            </button>
            <button
              onClick={() => onSubmit("ACTIVE")}
              className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 inline-flex items-center gap-2"
            >
              <Save className="h-4 w-4" /> 공고 게시
            </button>
          </div>
        </div>
      </main>

      <style>{`
        .input {
          height: 40px;
          width: 100%;
          border-radius: 8px;
          border: 1px solid hsl(var(--border, 220 13% 91%));
          background: transparent;
          padding: 0 12px;
          font-size: 14px;
          color: inherit;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        textarea.input { height: auto; padding: 10px 12px; line-height: 1.5; }
        .input:focus { border-color: hsl(var(--ring, 222 84% 60%)); box-shadow: 0 0 0 3px hsl(var(--ring, 222 84% 60%) / 0.15); }
      `}</style>
    </div>
  );
}

// ---------- Reusable pieces ----------
function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 rounded-xl border border-line bg-background p-6">
      <div className="mb-5">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {desc && <p className="text-sm text-ink-soft mt-1">{desc}</p>}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Grid({ cols, children }: { cols: number; children: React.ReactNode }) {
  return (
    <div className={`grid gap-5 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function Chip({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 px-3 rounded-full text-xs border transition ${selected
          ? "bg-primary text-primary-foreground border-primary"
          : "border-line text-ink-soft hover:border-ink/40"
        }`}
    >
      {children}
    </button>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: { v: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Chip key={o.v} selected={value === o.v} onClick={() => onChange(o.v)}>
          {o.label}
        </Chip>
      ))}
    </div>
  );
}

function ListField({
  label,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <Field label={label} required={required}>
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(e) => {
                const next = [...value];
                next[i] = e.target.value;
                onChange(next);
              }}
              placeholder={placeholder}
              className="input"
            />
            <button
              type="button"
              onClick={() => onChange(value.filter((_, idx) => idx !== i))}
              className="h-10 w-10 grid place-items-center rounded-md border border-line text-ink-soft hover:text-ink"
              aria-label="삭제"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...value, ""])}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <Plus className="h-4 w-4" /> 항목 추가
        </button>
      </div>
    </Field>
  );
}

function Summary({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-4 w-4 text-ink-soft mt-0.5" />
      <div>
        <div className="text-xs text-ink-soft">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
