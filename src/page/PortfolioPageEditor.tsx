import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
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
  Trash2,
  Wand2,
  X,
  Upload,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useSearch, useBlocker, useNavigate } from "@tanstack/react-router";
import {
  useGetDetail,
  useUpdate3 as useUpdate,
  useConfirmSave,
  useCreate3 as useCreate
} from "@/api/generated/portfolio/portfolio";
import { useGetList4 as useGetList1, useCreate4 as useCreate1, useUpdate4 as useUpdate1, useDelete4 as useDelete1 } from "@/api/generated/portfolio-project/portfolio-project";
import { useGetList5 as useGetList2, useCreate5 as useCreate2, useUpdate5 as useUpdate2, useDelete5 as useDelete2 } from "@/api/generated/portfolio-education/portfolio-education";
import { useGetList6 as useGetList3, useCreate6 as useCreate3, useUpdate6 as useUpdate3, useDelete6 as useDelete3 } from "@/api/generated/portfolio-certificate/portfolio-certificate";
import { useGetList7 as useGetList4, useCreate7 as useCreate4, useUpdate7 as useUpdate4, useDelete7 as useDelete4 } from "@/api/generated/portfolio-career/portfolio-career";
import { useGetList9 as useGetList6 } from "@/api/generated/template/template";
import { useGetMyProfile } from "@/api/generated/talent-profile/talent-profile";
import { useGetRegions } from "@/api/generated/region/region";
import { useGenerate } from "@/api/generated/portfolio-ai-feedback/portfolio-ai-feedback";
import { TEMPLATES } from "@/lib/portfolio-data";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Visibility = "private" | "link" | "public";

type Project = {
  _id?: number; // Backend DB ID
  id: string; // Local temp ID
  name: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  link: string;
};

type CustomField = {
  id: string;
  label: string;
  type: "text" | "textarea";
  value: string;
};

type Certificate = {
  _id?: number; // Backend DB ID
  name: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  id: string; // Credential ID
};

type Version = {
  id: number;
  timestamp: string;
  type: "original" | "revision" | "diagnose";
  title: string;
  snapshot: any;
  suggestions?: Record<string, string>;
  revisions?: Version[];
};

type Education = {
  _id?: number;
  schoolName: string;
  major: string;
  degree: string;
  admissionDate: string;
  graduationDate: string;
  status: string;
};

type Experience = {
  _id?: number;
  companyName: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string;
};

const DEFAULT_STACK = ["TypeScript", "React", "Node.js", "PostgreSQL"];
const SUGGEST_STACK = ["Next.js", "TanStack", "Tailwind", "GraphQL", "Docker", "AWS", "Kotlin", "Go", "Rust", "Python"];
const ALL_STACKS = ["React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt.js", "TypeScript", "JavaScript", "Python", "Java", "Kotlin", "Go", "Rust", "C++", "C#", "Spring", "Node.js", "Express", "NestJS", "Django", "Flask", "Ruby on Rails", "PHP", "Laravel", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "GraphQL", "REST API", "Tailwind", "Sass", "Figma", "Git", "Linux", "WebRTC", "Yjs"];

const BASE_SECTIONS = [
  { id: "meta", label: "포트폴리오 정보" },
  { id: "profile", label: "프로필" },
  { id: "certifications", label: "자격증" },
  { id: "educations", label: "학력" },
  { id: "experiences", label: "경력 상세" },
  { id: "projects", label: "프로젝트" },
  { id: "stack", label: "기술 스택" },
];


function EditorPage() {
  const searchParams = useSearch({ from: '/portfoliopageeditor' }) as { templateId?: string, portfolioId?: string };
  const portfolioId = searchParams.portfolioId ? Number(searchParams.portfolioId) : null;
  const navigate = useNavigate();

  const { data: portfolioData, isLoading } = useGetDetail(portfolioId!, {
    query: {
      enabled: !!portfolioId
    }
  });

  const { mutateAsync: createPortfolioApi } = useCreate();
  const { mutateAsync: updatePortfolioApi } = useUpdate();
  const { mutateAsync: confirmSavePortfolioApi } = useConfirmSave();

  // Phase 2 Query Hooks
  const { data: projectsData } = useGetList1(portfolioId || -1, { query: { enabled: !!portfolioId } });
  const { data: educationsData } = useGetList2(portfolioId || -1, { query: { enabled: !!portfolioId } });
  const { data: certsData } = useGetList3(portfolioId || -1, { query: { enabled: !!portfolioId } });
  const { data: careersData } = useGetList4(portfolioId || -1, { query: { enabled: !!portfolioId } });
  const { data: myProfileRes } = useGetMyProfile({ memberId: 0 }, { query: { enabled: !portfolioId, retry: false } });
  const { data: regionsRes } = useGetRegions({}, { query: { enabled: !portfolioId } });

  // Phase 2 Mutation Hooks
  const { mutateAsync: createProjApi } = useCreate1();
  const { mutateAsync: updateProjApi } = useUpdate1();
  const { mutateAsync: deleteProjApi } = useDelete1();

  const { mutateAsync: createEduApi } = useCreate2();
  const { mutateAsync: updateEduApi } = useUpdate2();
  const { mutateAsync: deleteEduApi } = useDelete2();

  const { mutateAsync: createCertApi } = useCreate3();
  const { mutateAsync: updateCertApi } = useUpdate3();
  const { mutateAsync: deleteCertApi } = useDelete3();

  const { mutateAsync: createCareerApi } = useCreate4();
  const { mutateAsync: updateCareerApi } = useUpdate4();
  const { mutateAsync: deleteCareerApi } = useDelete4();

  const { mutateAsync: generateAiFeedback } = useGenerate();

  // ✨ 기본 정보
  const [title, setTitle] = useState("");
  const [oneLiner, setOneLiner] = useState("");
  const [detail, setDetail] = useState("");
  const [jobRole, setJobRole] = useState("");

  // 프로필
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [intro, setIntro] = useState("");

  // 자격증
  const [certifications, setCertifications] = useState<Certificate[]>([]);

  const addCertRow = () => setCertifications([...certifications, { name: "", organization: "", issueDate: "", expiryDate: "", id: "" }]);
  const removeCert = (idx: number) => setCertifications(certifications.filter((_, i) => i !== idx));
  const updateCert = (idx: number, field: keyof Omit<Certificate, '_id'>, value: string) => {
    const newCerts = [...certifications];
    newCerts[idx][field] = value;
    setCertifications(newCerts);
  };

  // 학력
  const [educations, setEducations] = useState<Education[]>([]);
  const addEduRow = () => setEducations([...educations, { schoolName: "", major: "", degree: "", admissionDate: "", graduationDate: "", status: "" }]);
  const removeEdu = (idx: number) => setEducations(educations.filter((_, i) => i !== idx));
  const updateEdu = (idx: number, field: keyof Omit<Education, '_id'>, value: string) => {
    const next = [...educations];
    next[idx][field] = value;
    setEducations(next);
  };

  // 경력
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const addExpRow = () => setExperiences([...experiences, { companyName: "", position: "", description: "", startDate: "", endDate: "" }]);
  const removeExp = (idx: number) => setExperiences(experiences.filter((_, i) => i !== idx));
  const updateExp = (idx: number, field: keyof Omit<Experience, '_id'>, value: string) => {
    const next = [...experiences];
    next[idx][field] = value;
    setExperiences(next);
  };

  // 프로젝트
  const [projects, setProjects] = useState<Project[]>([]);

  // 기술 스택
  const [stack, setStack] = useState<string[]>([]);
  const [stackInput, setStackInput] = useState("");

  // 공개 설정
  const [visibility, setVisibility] = useState<Visibility>("link");
  const [allowRecruiter, setAllowRecruiter] = useState(true);
  const [hideContact, setHideContact] = useState(false);

  // ✨ 사용자 추가 필드
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  const templateId = searchParams.templateId || "minimal";

  useEffect(() => {
    if (portfolioData?.data?.result) {
      const p = portfolioData.data.result;
      setTitle(p.title || "");
      setOneLiner(p.oneLiner || "");
      setDetail(p.description || "");
      setJobRole(p.jobRole || "");

      if (p.talentProfile) {
        setEmail(p.talentProfile.contactEmail || "");
        setGithub(p.talentProfile.githubUrl || "");
        setWebsite(p.talentProfile.portfolioWebsite || "");
        setLocation(p.talentProfile.region?.name || "");
        setIntro(p.talentProfile.oneLiner || "");
      }
    }
  }, [portfolioData]);

  useEffect(() => {
    if (educationsData?.data?.result) {
      setEducations(educationsData.data.result.map((e: any) => ({
        _id: e.id,
        schoolName: e.schoolName || "",
        major: e.major || "",
        degree: e.degree === "MASTER" ? "석사" : e.degree === "DOCTOR" ? "박사" : "학사",
        admissionDate: e.startedAt || "",
        graduationDate: e.endedAt || "",
        status: e.status === "LEAVE_OF_ABSENCE" ? "휴학" : e.status === "GRADUATED" ? "졸업" : e.status === "DROPOUT" ? "중퇴" : "재학중"
      })));
    }
  }, [educationsData]);

  useEffect(() => {
    if (careersData?.data?.result) {
      setExperiences(careersData.data.result.map((c: any) => ({
        _id: c.id,
        companyName: c.companyName || "",
        position: c.position || "",
        startDate: c.startedAt || "",
        endDate: c.endedAt || "",
        description: c.description || ""
      })));
    }
  }, [careersData]);

  const hasPrefilled = useRef(false);

  useEffect(() => {
    console.log("portfolioId:", portfolioId, "myProfileRes:", myProfileRes?.data?.result, "hasPrefilled:", hasPrefilled.current);
    if (!portfolioId && myProfileRes?.data?.result && regionsRes?.data?.result && !hasPrefilled.current) {
      hasPrefilled.current = true;
      const p = myProfileRes.data.result;
      const r = regionsRes.data.result;
      console.log("Setting default fields from profile:", p);

      setEmail(p.contactEmail || "");
      setGithub(p.githubUrl || "");
      setWebsite(p.portfolioWebsite || "");
      if (p.oneLiner) setIntro(p.oneLiner);
      if (p.regionId) {
        const targetRegion = r.find((region: any) => region.id === p.regionId);
        const mappedRegion = targetRegion ? (targetRegion.parentName ? `${targetRegion.parentName} ${targetRegion.name}` : (targetRegion.fullName || targetRegion.name || "")) : "";
        setLocation(mappedRegion);
      }

      if (p.techStacks && stack.length === 0) {
        setStack(p.techStacks.map((t: any) => t.name));
      }

      if (p.educations && educations.length === 0) {
        setEducations(p.educations.map((e: any) => ({
          schoolName: e.schoolName || "",
          major: e.major || "",
          degree: e.degree === "MASTER" ? "석사" : e.degree === "DOCTOR" ? "박사" : "학사",
          admissionDate: e.startedAt || "",
          graduationDate: e.endedAt || "",
          status: e.status === "LEAVE_OF_ABSENCE" ? "휴학" : e.status === "GRADUATED" ? "졸업" : e.status === "DROPOUT" ? "중퇴" : "재학중"
        })));
      }

      if (p.careers && experiences.length === 0) {
        setExperiences(p.careers.map((c: any) => ({
          companyName: c.companyName || "",
          position: c.position || "",
          startDate: c.startedAt || "",
          endDate: c.endedAt || "",
          description: c.description || ""
        })));
      }

      if (p.certificates && certifications.length === 0) {
        setCertifications(p.certificates.map((c: any) => ({
          name: c.name || "",
          organization: c.issuer || "",
          issueDate: c.issuedAt || "",
          expiryDate: c.expiresAt || "",
          id: c.credentialId || ""
        })));
      }
    }
  }, [portfolioId, myProfileRes]);

  useEffect(() => {
    if (projectsData?.data?.result) {
      setProjects(projectsData.data.result.map((p: any) => ({
        _id: p.id,
        id: `p_${p.id}`,
        name: p.name || "",
        role: "",
        period: `${p.startedAt || ""} ~ ${p.endedAt || ""}`,
        summary: p.description || "",
        stack: [],
        link: p.githubUrl || p.projectUrl || ""
      })));
    }
  }, [projectsData]);

  useEffect(() => {
    if (certsData?.data?.result) {
      setCertifications(certsData.data.result.map((c: any) => ({
        _id: c.id,
        id: c.credentialId || "",
        name: c.name || "",
        organization: c.issuer || "",
        issueDate: c.issuedAt || "",
        expiryDate: c.expiresAt || ""
      })));
    }
  }, [certsData]);

  useEffect(() => {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template && customFields.length === 0) {
      setCustomFields(template.defaultFields.map((f, i) => ({
        id: `cf_default_${i}_${Date.now()}`,
        label: f.label,
        type: f.type,
        value: "",
      })));
    }
  }, [templateId]);

  const isSaving = useRef(false);

  useBlocker({
    shouldBlockFn: () => {
      if (isSaving.current) return false;
      return !window.confirm("저장하지 않은 변경사항이 있습니다. 정말 나가시겠습니까?");
    },
    enableBeforeUnload: () => !isSaving.current,
  });

  const [addOpen, setAddOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newType, setNewType] = useState<"text" | "textarea">("textarea");

  // ✨ AI 진단 결과 (필드 키 → 추천 문장)
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [diagnosing, setDiagnosing] = useState(false);

  // ✨ 버전 관리
  const [versions, setVersions] = useState<Version[]>([]);
  const [activeVersionId, setActiveVersionId] = useState<number | null>(null);
  const [publishedVersionId, setPublishedVersionId] = useState<number | null>(null);


  const saveVersion = (type: "diagnose", currentSuggestions?: Record<string, string>) => {
    const snapshot = {
      title, oneLiner, detail, jobRole, location, email, github, website, certifications, educations, experiences, intro, projects, stack, customFields
    };

    const newId = Date.now();

    setVersions(prev => {
      // 진단은 최대 3개까지만 가능
      if (type === "diagnose" && prev.filter(v => v.type === "diagnose").length >= 3) {
        alert("AI 진단은 최대 3회까지만 가능합니다.");
        return prev;
      }

      const newVersion: Version = {
        id: newId,
        timestamp: new Date().toISOString(),
        type,
        title: `AI 진단 ${prev.filter(v => v.type === "diagnose").length + 1}`,
        snapshot,
        suggestions: currentSuggestions,
        revisions: []
      };

      if (prev.length === 0) {
        const originalVersion: Version = {
          id: newId - 1000,
          timestamp: new Date().toISOString(),
          type: "original",
          title: "원본",
          snapshot,
          revisions: []
        };
        return [originalVersion, newVersion];
      }

      return [...prev, newVersion];
    });

    return newId;
  };

  const addRevision = (parentId: number) => {
    let parentSnapshot = {
      title, oneLiner, detail, jobRole, location, email, github, website, certifications, educations, experiences, intro, projects, stack, customFields
    };

    const parentVersion = versions.find(v => v.id === parentId);
    if (parentVersion) {
      parentSnapshot = parentVersion.snapshot;
    }

    const newRevId = Date.now();
    setVersions(prev => prev.map(v => {
      if (v.id === parentId) {
        const newRev: Version = {
          id: newRevId,
          timestamp: new Date().toISOString(),
          type: "revision",
          title: "수정본",
          snapshot: parentSnapshot,
        };
        return { ...v, revisions: [...(v.revisions || []), newRev] };
      }
      return v;
    }));

    // 수정본 만들기를 클릭하면 해당 버전을 화면에 반영
    if (parentVersion) {
      setTitle(parentSnapshot.title);
      setOneLiner(parentSnapshot.oneLiner);
      setDetail(parentSnapshot.detail);
      setJobRole(parentSnapshot.jobRole);
      setLocation(parentSnapshot.location);
      setEmail(parentSnapshot.email);
      setGithub(parentSnapshot.github);
      setWebsite(parentSnapshot.website);
      setCertifications(parentSnapshot.certifications || []);
      setEducations(parentSnapshot.educations || []);
      setExperiences(parentSnapshot.experiences || []);
      setIntro(parentSnapshot.intro);
      setProjects(parentSnapshot.projects);
      setStack(parentSnapshot.stack);
      setCustomFields(parentSnapshot.customFields);
    }
    setActiveVersionId(newRevId);
  };
  const syncEntities = async (targetPortfolioId: number) => {
    if (!targetPortfolioId) return;

    // --- Educations ---
    const origEduIds = educationsData?.data?.result?.map((e: any) => e.id) || [];
    const curEduIds = educations.map(e => e._id).filter(Boolean) as number[];
    const eduDeletes = origEduIds.filter((id: number) => !curEduIds.includes(id));

    await Promise.all(eduDeletes.map((id: number) => deleteEduApi({ portfolioId: targetPortfolioId, educationId: id })));
    await Promise.all(educations.map(e => {
      const payload = {
        schoolName: e.schoolName,
        major: e.major,
        degree: e.degree === '석사' ? 'MASTER' : e.degree === '박사' ? 'DOCTOR' : 'BACHELOR',
        startedAt: e.admissionDate || undefined,
        endedAt: e.graduationDate || undefined,
        status: e.status === '휴학' ? 'LEAVE_OF_ABSENCE' : e.status === '졸업' ? 'GRADUATED' : e.status === '중퇴' ? 'DROPOUT' : 'ATTENDING'
      };
      if (e._id) {
        return updateEduApi({ portfolioId: targetPortfolioId, educationId: e._id, data: payload as any });
      } else {
        return createEduApi({ portfolioId: targetPortfolioId, data: payload as any });
      }
    }));

    // --- Careers ---
    const origCarIds = careersData?.data?.result?.map((c: any) => c.id) || [];
    const curCarIds = experiences.map(e => e._id).filter(Boolean) as number[];
    const carDeletes = origCarIds.filter((id: number) => !curCarIds.includes(id));

    await Promise.all(carDeletes.map((id: number) => deleteCareerApi({ portfolioId: targetPortfolioId, careerId: id })));
    await Promise.all(experiences.map(e => {
      const payload = {
        companyName: e.companyName,
        position: e.position,
        description: e.description,
        startedAt: e.startDate || undefined,
        endedAt: e.endDate || undefined
      };
      if (e._id) {
        return updateCareerApi({ portfolioId: targetPortfolioId, careerId: e._id, data: payload as any });
      } else {
        return createCareerApi({ portfolioId: targetPortfolioId, data: payload as any });
      }
    }));

    // --- Projects ---
    const origProjIds = projectsData?.data?.result?.map((p: any) => p.id) || [];
    const curProjIds = projects.map(p => p._id).filter(Boolean) as number[];
    const projDeletes = origProjIds.filter((id: number) => !curProjIds.includes(id));

    await Promise.all(projDeletes.map((id: number) => deleteProjApi({ portfolioId: targetPortfolioId, projectId: id })));
    await Promise.all(projects.map(p => {
      const [start, end] = p.period.split('~').map(s => s.trim());
      const payload = {
        title: p.name,
        role: p.role || undefined,
        content: p.summary,
        startedAt: start || undefined,
        endedAt: end || undefined,
        projectUrl: p.link || undefined
      };
      if (p._id) {
        return updateProjApi({ portfolioId: targetPortfolioId, projectId: p._id, data: payload as any });
      } else {
        return createProjApi({ portfolioId: targetPortfolioId, data: payload as any });
      }
    }));

    // --- Certificates ---
    const origCertIds = certsData?.data?.result?.map((c: any) => c.id) || [];
    const curCertIds = certifications.map(c => c._id).filter(Boolean) as number[];
    const certDeletes = origCertIds.filter((id: number) => !curCertIds.includes(id));

    await Promise.all(certDeletes.map((id: number) => deleteCertApi({ portfolioId: targetPortfolioId, certificateId: id })));
    await Promise.all(certifications.map(c => {
      const payload = {
        name: c.name,
        issuer: c.organization,
        issuedAt: c.issueDate || undefined,
        expiresAt: c.expiryDate || undefined,
        credentialId: c.id
      };
      if (c._id) {
        return updateCertApi({ portfolioId: targetPortfolioId, certificateId: c._id, data: payload as any });
      } else {
        return createCertApi({ portfolioId: targetPortfolioId, data: payload as any });
      }
    }));
  };


  // ✨ 저장 핸들러
  const handleSave = async () => {
    if (activeVersionId) {
      const snapshot = {
        title, oneLiner, detail, jobRole, location, email, github, website, certifications, educations, experiences, intro, projects, stack, customFields
      };
      setVersions(prev => prev.map(v => {
        if (v.id === activeVersionId) {
          return { ...v, snapshot, timestamp: new Date().toISOString() };
        }
        if (v.revisions) {
          const updatedRevisions = v.revisions.map(r => r.id === activeVersionId ? { ...r, snapshot, timestamp: new Date().toISOString() } : r);
          return { ...v, revisions: updatedRevisions };
        }
        return v;
      }));
    }

    let activePortfolioId = portfolioId;

    try {
      if (!activePortfolioId) {
        let tid = 1;
        if (templateId === "minimal") tid = 1;
        else if (templateId === "editorial") tid = 2;
        else if (templateId === "terminal") tid = 3;
        else if (templateId === "playful") tid = 4;

        const res = await createPortfolioApi({
          data: {
            title: title || "제목 없는 포트폴리오",
            templateId: tid,
            visibility: visibility === "public" ? "PUBLIC" : "PRIVATE",
            jobRole: jobRole as any || "BACKEND"
          }
        });
        activePortfolioId = res.data?.result?.id || null;

        if (!activePortfolioId) {
          throw new Error("포트폴리오 생성 결과에 ID가 없습니다.");
        }
      }

      await syncEntities(activePortfolioId);

      await updatePortfolioApi({
        portfolioId: activePortfolioId,
        data: {
          title: title || "제목 없는 포트폴리오",
          oneLiner: oneLiner,
          description: detail,
          jobRole: jobRole as any || "BACKEND",
          visibility: visibility === "public" ? "PUBLIC" : "PRIVATE",
        } as any
      });

      await confirmSavePortfolioApi({ portfolioId: activePortfolioId });
      alert("포트폴리오가 성공적으로 저장되었습니다!");

      if (!portfolioId && activePortfolioId) {
        isSaving.current = true;
        navigate({
          to: "/portfoliopageeditor",
          search: { portfolioId: String(activePortfolioId), templateId: undefined },
          replace: true
        });
        setTimeout(() => { isSaving.current = false; }, 500);
      }
    } catch (err: any) {
      alert("포트폴리오 저장 중 오류가 발생했습니다: " + (err.message || "알 수 없는 오류"));
    }
  };

  const updateRevisionTitle = (parentId: number, revId: number, newTitle: string) => {
    setVersions(prev => prev.map(v => {
      if (v.id === parentId && v.revisions) {
        return { ...v, revisions: v.revisions.map(r => r.id === revId ? { ...r, title: newTitle } : r) };
      }
      return v;
    }));
  };

  const removeRevision = (parentId: number, revId: number) => {
    if (revId === publishedVersionId) setPublishedVersionId(null);
    setVersions(prev => prev.map(v => {
      if (v.id === parentId && v.revisions) {
        return { ...v, revisions: v.revisions.filter(r => r.id !== revId) };
      }
      return v;
    }));
  };

  const updateVersionTitle = (id: number, newTitle: string) => {
    setVersions(prev => prev.map(v => v.id === id ? { ...v, title: newTitle } : v));
  };

  const removeVersion = (id: number) => {
    if (id === publishedVersionId) setPublishedVersionId(null);
    setVersions(prev => prev.map(v => {
      if (v.id === id && v.revisions?.some(r => r.id === publishedVersionId)) {
        setPublishedVersionId(null);
      }
      return v;
    }).filter(v => v.id !== id));
  };

  const handlePublish = () => {
    if (!activeVersionId) {
      alert("게시할 버전을 선택해주세요.");
      return;
    }
    setPublishedVersionId(activeVersionId);
    alert("현재 적용된 버전이 성공적으로 게시되었습니다!");
  };

  const loadVersion = (v: Version) => {
    if (confirm("이 버전으로 되돌리시겠습니까? 현재 작성 중인 내용은 덮어씌워집니다.")) {
      setTitle(v.snapshot.title);
      setOneLiner(v.snapshot.oneLiner);
      setDetail(v.snapshot.detail);
      setJobRole(v.snapshot.jobRole);
      setLocation(v.snapshot.location);
      setEmail(v.snapshot.email);
      setGithub(v.snapshot.github);
      setWebsite(v.snapshot.website);
      setCertifications(v.snapshot.certifications || []);
      setEducations(v.snapshot.educations || []);
      setExperiences(v.snapshot.experiences || []);
      setIntro(v.snapshot.intro);
      setProjects(v.snapshot.projects);
      setStack(v.snapshot.stack);
      setCustomFields(v.snapshot.customFields);
      setSuggestions(v.suggestions || {}); // 버전을 불러올 때 해당 버전의 AI 추천/총평 텍스트 복원
      setActiveVersionId(v.id);
    }
  };

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      { id: `p${Date.now()}`, name: "", role: "", period: "", summary: "", stack: [], link: "" },
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

  const filteredStacks = ALL_STACKS.filter((s) =>
    s.toLowerCase().includes(stackInput.toLowerCase()) && !stack.includes(s)
  );

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
    if (!portfolioId) {
      alert("AI 진단을 받으려면 먼저 포트폴리오를 우측 상단의 [저장하기] 버튼으로 저장해주세요.");
      return;
    }

    setDiagnosing(true);
    try {
      const res = await generateAiFeedback({ portfolioId });
      // 백엔드 응답 구조가 wrapper 유무에 따라 다를 수 있으므로 유연하게 추출
      const feedbackData = (res.data as any)?.result || res.data;

      const next: Record<string, string> = {};

      if (feedbackData?.fields && Array.isArray(feedbackData.fields)) {
        let projectSummaryIndex = 0; // 프로젝트 식별자가 없을 경우 순서대로 매핑하기 위한 인덱스

        feedbackData.fields.forEach((field: any) => {
          // camelCase와 snake_case 모두 지원
          const revisedText = field.aiRevisedText || field.ai_revised_text;
          const targetType = field.targetType || field.field_type;
          
          if (!revisedText) return;

          switch (targetType) {
            case 'PORTFOLIO_ONE_LINER':
              next["oneLiner"] = revisedText;
              break;
            case 'PORTFOLIO_DESCRIPTION':
              next["detail"] = revisedText;
              break;
            case 'PROFILE_ONE_LINER':
              next["intro"] = revisedText;
              break;
            case 'PROJECT_SUMMARY':
              if (field.portfolioProjectId) {
                const localProj = projects.find(p => p._id === field.portfolioProjectId);
                if (localProj) {
                  next[`project:${localProj.id}`] = revisedText;
                }
              } else {
                // 백엔드에서 projectId를 안 보내줄 경우 화면에 있는 순서대로 임시 매핑
                if (projectSummaryIndex < projects.length) {
                  const localProj = projects[projectSummaryIndex];
                  next[`project:${localProj.id}`] = revisedText;
                  projectSummaryIndex++;
                }
              }
              break;
            case 'CUSTOM_FIELD':
              // 커스텀 필드는 DB 매핑 이슈로 임시 보류
              break;
          }
        });
      }

      if (feedbackData?.comment) {
        next["summary"] = feedbackData.comment;
        if (feedbackData.score !== undefined) {
          next["score"] = String(feedbackData.score);
        }
      } else {
        next["summary"] = "AI 진단이 완료되었습니다. 각 항목의 추천 결과를 확인해보세요.";
      }

      setSuggestions(next);
      const newId = saveVersion("diagnose", next);
      if (newId) setActiveVersionId(newId);
    } catch (e: any) {
      console.error(e);
      alert("AI 진단 중 오류가 발생했습니다: " + (e.response?.data?.message || e.message));
    } finally {
      setDiagnosing(false);
    }
  };

  // 적용(체크) / 거절(닫기)
  const applySuggestion = (key: string) => {
    const text = suggestions[key];
    if (text == null) return;
    if (key === "oneLiner") setOneLiner(text);
    else if (key === "detail") setDetail(text);
    else if (key === "intro") setIntro(text);
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
    title, oneLiner, detail, jobRole, email, intro, experiences, projects, stack,
  });

  const sections = [
    ...BASE_SECTIONS,
    ...customFields.map((f) => ({ id: `custom-${f.id}`, label: f.label })),
    { id: "visibility", label: "공개 설정" },
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
            <Button variant="outline" size="sm" className="gap-2" onClick={handleSave}>
              <Save className="size-4" /> 저장하기
            </Button>
            <Button size="sm" className="gap-2">
              <Globe className="size-4" /> 게시하기
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-8 xl:grid-cols-[220px_1fr_260px] lg:grid-cols-[220px_1fr]">
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

            {/* <button
              type="button"
              onClick={() => setAddOpen((o) => !o)}
              className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-dashed border-line py-1.5 text-xs text-ink-soft hover:border-ink/40 hover:text-ink"
            >
              <Plus className="size-3.5" /> 필드 추가
            </button> */}
            {/* Versions removed from here */}

          </div>
        </aside>

        {/* Form */}
        <main className="space-y-8">
          {/* 포트폴리오 정보 */}
          <Section id="meta" title="포트폴리오 정보" hint="공유될 포트폴리오의 기본 정보입니다.">
            <Field label="포트폴리오 제목" required>
              <Input value={title} maxLength={500} onChange={(e) => setTitle(e.target.value)} placeholder="예) 백엔드 엔지니어 김지훈의 포트폴리오" />
            </Field>
            <Field label="한 줄 소개" required hint={`${oneLiner.length}/500`}>
              <Input value={oneLiner} maxLength={500} onChange={(e) => setOneLiner(e.target.value)} placeholder="당신을 한 줄로 표현해 주세요" />
              <AiSuggestion
                suggestion={suggestions["oneLiner"]}
                onApply={() => applySuggestion("oneLiner")}
                onDismiss={() => dismissSuggestion("oneLiner")}
              />
            </Field>
            <Field label="상세 설명" hint={`${detail.length}/500`}>
              <Textarea value={detail} maxLength={500} onChange={(e) => setDetail(e.target.value)} rows={5} placeholder="어떤 일을 해왔고, 어떤 강점이 있는지 적어주세요." />
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
                    className={`chip cursor-pointer transition-colors ${jobRole === r ? "border-ink bg-ink text-background" : "hover:border-ink/40"
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
            <Field label="프로필 소개" hint={`${intro.length}/500`}>
              <Textarea value={intro} maxLength={500} onChange={(e) => setIntro(e.target.value)} rows={3} placeholder="간단한 자기소개" />
              <AiSuggestion
                suggestion={suggestions["intro"]}
                onApply={() => applySuggestion("intro")}
                onDismiss={() => dismissSuggestion("intro")}
              />
            </Field>
          </Section>

          {/* 학력 */}
          <Section id="educations" title="학력" hint="학력 사항을 추가해 주세요.">
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
                  {educations.map((ed, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2"><input value={ed.schoolName} onChange={(e) => updateEdu(idx, 'schoolName', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                      <td className="px-4 py-2"><input value={ed.major} onChange={(e) => updateEdu(idx, 'major', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="입력" /></td>
                      <td className="px-4 py-2"><input value={ed.degree} onChange={(e) => updateEdu(idx, 'degree', e.target.value)} className="w-full bg-transparent focus:outline-none placeholder:text-ink-soft/50" placeholder="학사/석사 등" /></td>
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
                  {educations.length === 0 && (
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

          {/* 경력 상세 */}
          <Section id="experiences" title="경력 상세" hint="경력 사항을 상세하게 추가해 주세요.">
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
                  {experiences.map((exp, idx) => (
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
                  {experiences.length === 0 && (
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

          {/* 자격증 */}
          <Section id="certifications" title="자격증" hint="보유하신 자격증을 표 형태로 추가해 주세요.">
            <div className="overflow-hidden rounded-lg border border-line bg-surface">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-2">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">자격증 명</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">기관</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">발급일자</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">만료일자</th>
                    <th className="px-4 py-3 font-semibold text-ink whitespace-nowrap">자격증 번호</th>
                    <th className="px-4 py-3 text-center font-semibold text-ink whitespace-nowrap w-16">삭제</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {certifications.map((c, idx) => (
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
                  {certifications.length === 0 && (
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
              <Plus className="size-4" /> 자격증 추가
            </button>
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
            <div className="mt-3 relative w-full sm:w-[300px]">
              <Input
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addStack(stackInput); } }}
                placeholder="기술 스택 검색 및 추가 (예: TypeScript)"
              />
              {stackInput && (
                <div className="absolute top-full mt-1 w-full max-h-[200px] overflow-y-auto rounded-md border border-line bg-background shadow-lg z-10">
                  {filteredStacks.length > 0 ? (
                    filteredStacks.map((s) => (
                      <button
                        key={s}
                        type="button"
                        className="w-full px-3 py-2 text-left text-sm text-ink hover:bg-surface-2"
                        onClick={() => addStack(s)}
                      >
                        {s}
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-ink-soft">
                      "{stackInput}" 스택을 새로 추가합니다 (Enter)
                    </div>
                  )}
                </div>
              )}
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

          {/* 공개 설정 */}
          <Section id="visibility" title="공개 설정 및 접근 제어" hint="누가 이 포트폴리오를 볼 수 있는지 정합니다.">
            <div className="grid gap-2 sm:grid-cols-2">
              <VisibilityOption active={visibility === "private"} onClick={() => setVisibility("private")} icon={<Lock className="size-4" />} title="비공개" desc="나만 볼 수 있음" />
              <VisibilityOption active={visibility === "public"} onClick={() => setVisibility("public")} icon={<Globe className="size-4" />} title="전체 공개" desc="검색·매칭에 노출" />
            </div>
          </Section>

          {/* 필드 추가 카드 */}
          {/* <section id="add-field" className="surface-card p-6 sm:p-7">
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
          </section> */}

          {/* AI 진단 총평 */}
          {(diagnosing || suggestions["summary"]) && (
            <Section id="ai-summary" title="AI 진단 총평" hint="전체 포트폴리오에 대한 AI의 분석 결과입니다.">
              {diagnosing ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-line/60 rounded w-3/4"></div>
                  <div className="h-4 bg-line/60 rounded w-full"></div>
                  <div className="h-4 bg-line/60 rounded w-5/6"></div>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-[color-mix(in_oklch,var(--color-mint)_12%,transparent)] border border-[color-mix(in_oklch,var(--color-mint)_55%,transparent)] text-ink text-sm leading-relaxed">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex size-5 items-center justify-center rounded-full bg-[var(--color-mint)] text-[oklch(0.2_0.05_150)]">
                      <Wand2 className="size-3" />
                    </span>
                    <span className="font-semibold">종합 분석 및 조언</span>
                    {suggestions["score"] && (
                      <span className="ml-2 rounded-full bg-surface-2 px-2.5 py-0.5 font-display text-xs font-bold text-ink">
                        총점: {suggestions["score"]}점
                      </span>
                    )}
                  </div>
                  {suggestions["summary"]}
                </div>
              )}
            </Section>
          )}
        </main>

        {/* Right Sidebar for Version History */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="surface-card p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="font-mono text-xs uppercase tracking-wider text-ink-soft">AI 진단 기록</p>
            </div>

            <div className="space-y-3">
              {versions.map((v, idx) => (
                <div key={v.id} className={`p-3 rounded-md border text-sm ${v.id === publishedVersionId ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)] bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]' : v.type === 'original' ? 'border-[color:var(--color-mint)] bg-[color-mix(in_oklch,var(--color-mint)_10%,transparent)]' : 'border-line bg-surface'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 min-w-0 pr-2">
                      <input
                        id={`title-input-v-${v.id}`}
                        value={v.title}
                        onChange={(e) => updateVersionTitle(v.id, e.target.value)}
                        className="font-medium text-ink bg-transparent focus:outline-none w-full truncate"
                      />
                      <p className="text-[10px] text-ink-soft mt-0.5 font-mono">
                        {new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {v.type !== 'original' && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 hover:bg-line rounded text-ink-soft hover:text-ink transition">
                              <MoreVertical className="size-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem
                              onClick={() => document.getElementById(`title-input-v-${v.id}`)?.focus()}
                            >
                              이름 변경
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => removeVersion(v.id)}
                              className="text-[var(--color-coral)] focus:text-[var(--color-coral)] focus:bg-[color-mix(in_oklch,var(--color-coral)_10%,transparent)]"
                            >
                              그룹 삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>

                  <button onClick={() => loadVersion(v)} className="w-full text-center py-1.5 bg-surface-2 hover:bg-line transition text-ink rounded text-xs mb-1.5">
                    불러오기
                  </button>

                  {/* Render nested revisions */}
                  {v.revisions && v.revisions.length > 0 && (
                    <div className="mt-3 mb-2 space-y-2 border-t border-line/50 pt-2">
                      {v.revisions.map(rev => (
                        <div key={rev.id} className={`p-2 rounded border ${rev.id === publishedVersionId ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)] bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]' : 'border-line/50 bg-background'}`}>
                          <div className="flex justify-between items-start mb-1.5">
                            <div className="flex-1 min-w-0 pr-2">
                              <input
                                id={`title-input-r-${rev.id}`}
                                value={rev.title}
                                onChange={(e) => updateRevisionTitle(v.id, rev.id, e.target.value)}
                                className="font-medium text-ink bg-transparent focus:outline-none w-full truncate text-xs"
                              />
                              <p className="text-[9px] text-ink-soft mt-0.5 font-mono">
                                {new Date(rev.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="p-1 hover:bg-line rounded text-ink-soft hover:text-ink transition">
                                  <MoreVertical className="size-3.5" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-32">
                                <DropdownMenuItem
                                  onClick={() => document.getElementById(`title-input-r-${rev.id}`)?.focus()}
                                >
                                  이름 변경
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => removeRevision(v.id, rev.id)}
                                  className="text-[var(--color-coral)] focus:text-[var(--color-coral)] focus:bg-[color-mix(in_oklch,var(--color-coral)_10%,transparent)]"
                                >
                                  삭제
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <button onClick={() => loadVersion(rev)} className="w-full text-center py-1.5 bg-surface hover:bg-surface-2 transition text-ink rounded text-[11px]">
                            불러오기
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      addRevision(v.id);
                    }}
                    className="w-full text-center py-1.5 border border-line bg-surface hover:bg-surface-2 transition text-ink rounded text-xs mt-1"
                  >
                    + 수정본 만들기
                  </button>
                </div>
              ))}
              {versions.length === 0 && (
                <div className="py-8 text-center text-xs text-ink-soft">
                  버전 기록이 없습니다.
                </div>
              )}
            </div>
          </div>
        </aside>
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
  const [stackInput, setStackInput] = useState("");

  const addStack = (s: string) => {
    if (!s.trim()) return;
    if (!project.stack.includes(s)) {
      onChange({ stack: [...project.stack, s] });
    }
    setStackInput("");
  };

  const removeStack = (s: string) => {
    onChange({ stack: project.stack.filter((t: string) => t !== s) });
  };

  const filteredStacks = DEFAULT_STACK.filter(
    s => s.toLowerCase().includes(stackInput.toLowerCase()) && !project.stack.includes(s)
  );

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
            <Field label="요약 설명" hint={`${project.summary.length}/500`}>
              <Textarea
                value={project.summary}
                maxLength={500}
                rows={3}
                onChange={(e) => onChange({ summary: e.target.value })}
                placeholder="문제 · 해결 · 성과를 1~3문장으로 적어주세요"
              />
              <AiSuggestion suggestion={suggestion} onApply={onApplySuggestion} onDismiss={onDismissSuggestion} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="사용 기술" hint="사용해본 도구를 추가하세요. 엔터로 등록합니다.">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.stack.map((t) => (
                  <span key={t} className="chip border-ink/30 bg-surface-2 text-ink">
                    {t}
                    <button type="button" onClick={() => removeStack(t)} className="ml-1 text-ink-soft hover:text-ink" aria-label={`${t} 제거`}>×</button>
                  </span>
                ))}
              </div>
              <div className="relative w-full">
                <Input
                  value={stackInput}
                  onChange={(e) => setStackInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addStack(stackInput); } }}
                  placeholder="기술 스택 검색 및 추가 (예: TypeScript)"
                />
                {stackInput && (
                  <div className="absolute top-full mt-1 w-full max-h-[200px] overflow-y-auto rounded-md border border-line bg-background shadow-lg z-10">
                    {filteredStacks.length > 0 ? (
                      filteredStacks.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="w-full px-3 py-2 text-left text-sm text-ink hover:bg-surface-2"
                          onClick={() => addStack(s)}
                        >
                          {s}
                        </button>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-ink-soft">
                        "{stackInput}" 스택을 새로 추가합니다 (Enter)
                      </div>
                    )}
                  </div>
                )}
              </div>
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
      className={`rounded-lg border p-4 text-left transition-colors ${active ? "border-ink bg-ink text-background" : "border-line bg-surface/60 hover:border-ink/40"
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
  intro: string; experiences: Experience[]; projects: Project[]; stack: string[];
}) {
  const checks = [
    data.title.trim().length > 0,
    data.oneLiner.trim().length > 0,
    data.detail.trim().length >= 20,
    data.jobRole.trim().length > 0,
    /\S+@\S+\.\S+/.test(data.email),
    data.intro.trim().length > 0,
    data.experiences.length > 0,
    data.projects.length > 0 && data.projects.every((p) => p.name.trim().length > 0),
    data.stack.length >= 3,
  ];
  const done = checks.filter(Boolean).length;
  return Math.round((done / checks.length) * 100);
}

export default EditorPage;
