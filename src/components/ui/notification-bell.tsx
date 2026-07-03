import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { INITIAL_NOTIFICATIONS, toneFor, type Notification } from "@/lib/notifications";

export function NotificationBell({ signedIn = true }: { signedIn?: boolean }) {
  const [items, setItems] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [open, setOpen] = useState(false);
  if (!signedIn) return null;

  const unread = items.filter((n) => !n.read).length;
  const markAllRead = () => setItems((xs) => xs.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setItems((xs) => xs.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label={`알림 ${unread}개`}
          className="relative h-9 w-9 rounded-full border border-line hover:bg-surface-2 transition grid place-items-center"
        >
          <BellIcon />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-coral text-white text-[10px] font-mono font-semibold grid place-items-center border-2 border-background">
              +{unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[360px] p-0 surface-card border-line"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-line">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-semibold tracking-tight">알림</h3>
            {unread > 0 && (
              <span className="chip bg-coral/20 text-ink border border-coral/40">{unread}</span>
            )}
          </div>
          <button
            onClick={markAllRead}
            className="text-xs text-ink-soft hover:text-ink transition"
          >
            모두 읽음
          </button>
        </div>
        <ul className="max-h-[380px] overflow-y-auto divide-y divide-line">
          {items.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-ink-soft">알림이 없어요</li>
          )}
          {items.map((n) => {
            const tone = toneFor(n.type);
            const body = (
              <div className="flex gap-3 px-4 py-3 hover:bg-surface-2/60 transition">

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-ink truncate">{n.title}</p>
                    {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-coral shrink-0" />}
                  </div>
                  <p className="mt-0.5 text-xs text-ink-soft line-clamp-2">{n.message}</p>
                  <p className="mt-1 text-[10px] font-mono text-ink-soft uppercase">{n.time}</p>
                </div>
              </div>
            );
            return (
              <li key={n.id}>
                {n.href ? (
                  <Link
                    to={n.href}
                    onClick={() => {
                      markRead(n.id);
                      setOpen(false);
                    }}
                    className="block"
                  >
                    {body}
                  </Link>
                ) : (
                  <button onClick={() => markRead(n.id)} className="block w-full text-left">
                    {body}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <div className="px-4 py-2.5 border-t border-line">
          <Link
            to="/messages"
            onClick={() => setOpen(false)}
            className="block text-center text-xs text-ink hover:text-primary transition"
          >
            전체 메시지 보기 →
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}
