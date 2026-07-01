import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Nav } from "@/components/ui/nav";
import { INITIAL_NOTIFICATIONS, toneFor, type Notification, type NotificationType } from "@/lib/notifications";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "알림 | FolioFrame" },
      { name: "description", content: "매칭, 연락, 지원상태 등 모든 알림을 이곳에서 확인하세요." },
    ],
  }),
  component: NotificationsPage,
});

const FILTERS: { key: "all" | "unread" | NotificationType; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "unread", label: "안읽음" },
  { key: "match", label: "매칭" },
  { key: "contact", label: "연락" },
  { key: "apply", label: "지원" },
  { key: "comment", label: "코멘트" },
  { key: "system", label: "시스템" },
];

function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    if (filter === "unread") return items.filter((n) => !n.read);
    return items.filter((n) => n.type === filter);
  }, [items, filter]);

  const unread = items.filter((n) => !n.read).length;

  const markRead = (id: string) =>
    setItems((xs) => xs.map((n) => (n.id === id ? { ...n, read: true } : n)));
  const markAllRead = () => setItems((xs) => xs.map((n) => ({ ...n, read: true })));
  const remove = (id: string) => setItems((xs) => xs.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <header className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-mono uppercase text-ink-soft">Inbox</p>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight">
              알림
              {unread > 0 && (
                <span className="ml-3 align-middle chip bg-coral/20 border border-coral/40 text-ink">
                  +{unread} 새알림
                </span>
              )}
            </h1>
            <p className="mt-2 text-sm text-ink-soft">
              매칭 추천, 기업 연락, 지원결과, 피드백을 실시간으로 확인하세요.
            </p>
          </div>
          <button
            onClick={markAllRead}
            disabled={unread === 0}
            className="h-9 px-4 rounded-full border border-line text-sm text-ink hover:bg-surface-2 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            모두 읽음 처리
          </button>
        </header>

        <div className="mt-6 flex flex-wrap items-center gap-2 surface-card p-2">
          {FILTERS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={
                  "h-8 px-3 rounded-full text-sm transition " +
                  (active ? "bg-primary text-primary-foreground" : "text-ink-soft hover:text-ink")
                }
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <ul className="mt-6 space-y-3">
          {filtered.length === 0 && (
            <li className="surface-card p-12 text-center text-sm text-ink-soft">
              해당하는 알림이 없습니다.
            </li>
          )}
          {filtered.map((n) => {
            const tone = toneFor(n.type);
            return (
              <li
                key={n.id}
                className={
                  "surface-card p-5 flex gap-4 transition hover:-translate-y-0.5 " +
                  (n.read ? "opacity-80" : "")
                }
              >

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-semibold tracking-tight">{n.title}</h3>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-coral" />}
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{n.message}</p>
                  <p className="mt-2 text-[10px] font-mono text-ink-soft uppercase">{n.time}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {n.href && (
                    <Link
                      to={n.href}
                      onClick={() => markRead(n.id)}
                      className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-xs grid place-items-center hover:opacity-90 transition"
                    >
                      바로가기
                    </Link>
                  )}
                  {!n.read && (
                    <button
                      onClick={() => markRead(n.id)}
                      className="h-8 px-3 rounded-md border border-line text-xs text-ink hover:bg-surface-2 transition"
                    >
                      읽음
                    </button>
                  )}
                  <button
                    onClick={() => remove(n.id)}
                    className="h-8 px-3 rounded-md border border-line text-xs text-ink-soft hover:text-ink hover:bg-surface-2 transition"
                  >
                    삭제
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
