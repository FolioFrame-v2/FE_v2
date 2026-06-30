export type NotificationType = "match" | "contact" | "apply" | "comment" | "system";

export type Notification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  href?: string;
};

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "match",
    title: "새로운 매칭 추천",
    message: "Toss의 Frontend 직군이 지원자님의 포트폴리오와 92% 일치해요.",
    time: "5분 전",
    read: false,
    href: "/mypage",
  },
  {
    id: "n2",
    type: "contact",
    title: "기업에서 연락이 도착했어요",
    message: "Kakao 채용팀이 '실시간 협업 화이트보드' 프로젝트에 관심을 보였어요.",
    time: "1시간 전",
    read: false,
    href: "/mypage",
  },
  {
    id: "n3",
    type: "apply",
    title: "지원상태 업데이트",
    message: "당근마켓 Fullstack 직군 서류 합격! 다음 단계는 코딩 테스트입니다.",
    time: "어제",
    read: false,
    href: "/mypage",
  },
  {
    id: "n4",
    type: "comment",
    title: "포트폴리오에 새 피드백",
    message: "민호님이 '졸업작품: AI 일정 추천' 프로젝트에 코멘트를 남겼어요.",
    time: "2일 전",
    read: true,
    href: "/browse",
  },
  {
    id: "n5",
    type: "system",
    title: "AI 진단 리포트 완료",
    message: "이번 달 포트폴리오 진단 결과가 준비됐어요. 5개 개선 포인트를 확인하세요.",
    time: "3일 전",
    read: true,
    href: "/portfoliopageeditor",
  },
];

const TONE: Record<NotificationType, { label: string; bg: string; fg: string }> = {
  match: { label: "매칭", bg: "var(--color-mint)", fg: "var(--color-ink)" },
  contact: { label: "연락", bg: "var(--color-coral)", fg: "var(--color-ink)" },
  apply: { label: "지원", bg: "var(--color-mint)", fg: "var(--color-ink)" },
  comment: { label: "코멘트", bg: "var(--color-surface-2)", fg: "var(--color-ink)" },
  system: { label: "시스템", bg: "var(--color-surface-2)", fg: "var(--color-ink-soft)" },
};

export function toneFor(type: NotificationType) {
  return TONE[type];
}
