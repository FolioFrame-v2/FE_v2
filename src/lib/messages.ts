export type MessageRole = "company" | "talent";

export type MessageThread = {
  id: string;
  counterpart: {
    name: string;
    handle: string;
    role: MessageRole; // 상대의 역할
    logo: string;
    color: string;
    tag: string; // e.g. 회사 소속/직군
  };
  subject: string;
  preview: string;
  updatedAt: string;
  unread: number;
  starred?: boolean;
  labels?: string[]; // 예: "채용 제안", "포트폴리오 문의"
  messages: Message[];
};

export type Message = {
  id: string;
  from: MessageRole | "me";
  body: string;
  at: string; // ISO
  attachments?: { name: string; size: string }[];
};

// 현재 사용자는 "인재" 관점. 상대가 company면 기업이 인재에게 보낸 메시지.
export const THREADS: MessageThread[] = [
  {
    id: "t1",
    counterpart: {
      name: "Linear Studio",
      handle: "recruit@linear-studio.io",
      role: "company",
      logo: "L",
      color: "var(--color-mint)",
      tag: "SaaS · 채용팀",
    },
    subject: "프론트엔드 포지션 제안드립니다",
    preview: "포트폴리오 잘 봤습니다. 저희 팀 프론트엔드 포지션에 관심 있으시면...",
    updatedAt: "2026-07-01T10:22:00",
    unread: 2,
    starred: true,
    labels: ["채용 제안"],
    messages: [
      {
        id: "m1",
        from: "company",
        at: "2026-06-30T14:10:00",
        body:
          "안녕하세요, Linear Studio 채용 담당 김하늘입니다.\n\n포트폴리오 인상 깊게 봤습니다. 특히 실시간 협업 화이트보드 프로젝트의 구조 설계가 저희 팀 방향과 잘 맞아 연락드려요. 편하신 시간에 15분 정도 짧게 얘기 나눌 수 있을까요?",
      },
      {
        id: "m2",
        from: "me",
        at: "2026-06-30T20:04:00",
        body: "안녕하세요! 관심 가져 주셔서 감사합니다. 이번 주 금요일 오후 3시 이후로 가능합니다.",
      },
      {
        id: "m3",
        from: "company",
        at: "2026-07-01T10:22:00",
        body:
          "좋습니다. 금요일 오후 3시로 초대장 보내드릴게요. 포지션 JD와 팀 소개서 첨부합니다. 편하게 봐주세요!",
        attachments: [
          { name: "linear-frontend-jd.pdf", size: "312 KB" },
          { name: "team-intro.pdf", size: "1.1 MB" },
        ],
      },
    ],
  },
  {
    id: "t2",
    counterpart: {
      name: "Toss",
      handle: "talent@toss.im",
      role: "company",
      logo: "T",
      color: "var(--color-coral)",
      tag: "핀테크 · Talent",
    },
    subject: "커피챗 제안",
    preview: "가볍게 팀과 커피챗 어떠세요? 부담 없이...",
    updatedAt: "2026-06-28T09:15:00",
    unread: 0,
    labels: ["커피챗"],
    messages: [
      {
        id: "m1",
        from: "company",
        at: "2026-06-28T09:15:00",
        body: "가볍게 팀과 커피챗 어떠세요? 부담 없이 저희 팀 이야기 나눠보고 싶어요.",
      },
    ],
  },
  {
    id: "t3",
    counterpart: {
      name: "당근마켓",
      handle: "hi@daangn.com",
      role: "company",
      logo: "당",
      color: "var(--color-mint)",
      tag: "커뮤니티 · 채용",
    },
    subject: "포트폴리오 문의",
    preview: "AI 일정 추천 프로젝트 관련해 몇 가지 여쭤봐도 될까요?",
    updatedAt: "2026-06-24T16:40:00",
    unread: 1,
    labels: ["문의"],
    messages: [
      {
        id: "m1",
        from: "company",
        at: "2026-06-24T16:40:00",
        body: "안녕하세요, AI 일정 추천 프로젝트 관련해 몇 가지 여쭤봐도 될까요? 데이터 파이프라인 설계가 궁금해요.",
      },
    ],
  },
];

export function formatWhen(iso: string) {
  const d = new Date(iso);
  const diff = (Date.now() - d.getTime()) / 1000;
  if (diff < 60) return "방금";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  const days = Math.floor(diff / 86400);
  if (days < 7) return `${days}일 전`;
  return `${d.getMonth() + 1}.${d.getDate()}`;
}

export function formatTime(iso: string) {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${d.getMonth() + 1}월 ${d.getDate()}일 ${hh}:${mm}`;
}
