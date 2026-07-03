import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState, useMemo } from "react";

import { THREADS, formatTime, type MessageThread } from "@/lib/messages";
import { Building2, User, Search, Inbox, PenSquare } from "lucide-react";

export const Route = createFileRoute("/messages")({
  head: () => ({
    meta: [
      { title: "메시지 | FolioFrame" },
      { name: "description", content: "모든 메시지를 이곳에서 확인하세요." },
    ],
  }),
  component: MessagesPage,
});

type FolderType = "inbox";

function MessagesPage() {
  const [folder, setFolder] = useState<FolderType>("inbox");
  const [query, setQuery] = useState("");
  const location = useLocation();
  const isDrawerOpen = location.pathname !== "/messages" && location.pathname !== "/messages/";

  const filtered = useMemo(() => {
    let list = THREADS;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.counterpart.name.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.preview.toLowerCase().includes(q)
      );
    }

    return list;
  }, [folder, query]);

  const totalUnread = THREADS.reduce((sum, t) => sum + (t.unread || 0), 0);

  return (
    <div className="min-h-screen text-foreground">

      <main className="mx-auto max-w-5xl px-6 py-10 flex gap-8 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-56 shrink-0 space-y-6">
          <div>
            <Link
              to="/messages/new"
              className="w-full h-10 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition inline-flex items-center justify-center gap-2"
            >
              <PenSquare className="size-4" />
              새 메시지
            </Link>
          </div>

          <nav className="space-y-1">
            <FolderItem
              icon={<Inbox className="size-4" />}
              label="받은함"
              active={folder === "inbox"}
              onClick={() => setFolder("inbox")}
              badge={totalUnread}
            />
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h1 className="font-display text-2xl font-bold tracking-tight">
              받은함
            </h1>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-ink-soft" />
              <input
                type="text"
                placeholder="메시지 검색..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 rounded-full border border-line bg-surface text-sm outline-none focus:border-ink transition"
              />
            </div>
          </header>

          <div className="surface-card overflow-hidden">
            <ul className="divide-y divide-line">
              {filtered.length === 0 && (
                <li className="p-12 text-center text-sm text-ink-soft">
                  해당하는 메시지가 없습니다.
                </li>
              )}
              {filtered.map((t) => (
                <li
                  key={t.id}
                  className={"transition hover:bg-surface-2 " + (t.unread ? "bg-surface-2/30" : "")}
                >
                  <Link to={`/messages/${t.id}`} className="flex items-center gap-4 p-4">
                    <div className="shrink-0 flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-xl grid place-items-center font-display font-bold text-sm"
                        style={{ background: `color-mix(in oklch, ${t.counterpart.color} 30%, var(--color-surface))` }}
                      >
                        {t.counterpart.logo}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className={"font-medium truncate " + (t.unread ? "text-ink font-semibold" : "text-ink")}>
                          {t.counterpart.name}
                        </span>
                        <span className={"chip shrink-0 text-[10px] " + (t.counterpart.role === "company" ? "bg-mint/15 border-mint/30" : "bg-coral/15 border-coral/30")}>
                          {t.counterpart.role === "company" ? <Building2 className="size-2.5" /> : <User className="size-2.5" />}
                          {t.counterpart.role === "company" ? "기업" : "인재"}
                        </span>
                        {t.unread > 0 && (
                          <span className="chip shrink-0 text-[10px] bg-coral/20 border-coral/40 text-ink">
                            {t.unread} 안 읽음
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-ink-soft truncate">
                        <span className={t.unread ? "font-medium text-ink/90" : ""}>{t.subject}</span>
                        <span className="opacity-50 mx-1">-</span>
                        <span className="truncate">{t.preview}</span>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <span className="text-xs font-mono text-ink-soft">
                        {formatTime(t.updatedAt)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <Link 
          to="/messages" 
          className="fixed inset-0 bg-ink/10 backdrop-blur-[2px] z-40 transition-opacity" 
          aria-label="Close drawer" 
        />
      )}
      
      {/* Sliding Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[55vw] min-w-[320px] max-w-[800px] bg-background border-l border-line shadow-2xl transition-transform duration-300 z-50 overflow-hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

function FolderItem({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition " +
        (active ? "bg-surface-2 text-ink font-medium" : "text-ink-soft hover:bg-surface-2 hover:text-ink")
      }
    >
      <div className="flex items-center gap-2.5">
        {icon}
        {label}
      </div>
      {badge !== undefined && badge > 0 && (
        <span className={"px-1.5 py-0.5 rounded-full text-[10px] font-mono " + (active ? "bg-primary text-primary-foreground" : "bg-surface border border-line text-ink")}>
          {badge}
        </span>
      )}
    </button>
  );
}
