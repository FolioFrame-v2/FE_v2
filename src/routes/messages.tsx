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

        {/* Content (Split View) */}
        <div className="flex-1 min-w-0 flex gap-6 h-[calc(100vh-8rem)]">
          
          {/* List Column */}
          <div className={`flex flex-col h-full ${isDrawerOpen ? "hidden lg:flex w-[380px] shrink-0" : "w-full"}`}>
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-ink-soft" />
                <input
                  type="text"
                  placeholder="이름, 제목, 내용 검색"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 rounded-2xl border border-line bg-surface text-sm outline-none focus:border-ink transition shadow-sm"
                />
              </div>
            </header>

            <div className="surface-card rounded-2xl border border-line overflow-hidden flex-1 overflow-y-auto">
              <ul className="divide-y divide-line">
                {filtered.length === 0 && (
                  <li className="p-12 text-center text-sm text-ink-soft">
                    해당하는 메시지가 없습니다.
                  </li>
                )}
                {filtered.map((t) => (
                  <li
                    key={t.id}
                    className={`transition hover:bg-surface-2 ${t.unread ? "bg-surface-2/30" : ""} ${location.pathname.includes(t.id) ? "bg-surface-2" : ""}`}
                  >
                    <Link to={`/messages/${t.id}`} className="flex flex-col p-4 gap-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="shrink-0 flex items-center gap-3">
                          <div
                            className="h-9 w-9 rounded-full grid place-items-center font-display font-bold text-sm"
                            style={{ background: `color-mix(in oklch, ${t.counterpart.color} 30%, var(--color-surface))` }}
                          >
                            {t.counterpart.logo}
                          </div>
                          <span className={"font-medium text-sm truncate " + (t.unread ? "text-ink font-semibold" : "text-ink")}>
                            {t.counterpart.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-ink-soft whitespace-nowrap mt-1">
                          {formatTime(t.updatedAt)}
                        </span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5 pl-12">
                        <span className={"text-sm truncate " + (t.unread ? "font-medium text-ink/90" : "text-ink-soft")}>
                          {t.subject}
                        </span>
                        <span className="text-xs text-ink-soft truncate opacity-80">
                          {t.preview}
                        </span>
                        
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={"chip shrink-0 text-[10px] " + (t.counterpart.role === "company" ? "bg-mint/15 border-mint/30" : "bg-coral/15 border-coral/30")}>
                            {t.counterpart.role === "company" ? <Building2 className="size-2.5" /> : <User className="size-2.5" />}
                            {t.counterpart.role === "company" ? "기업" : "인재"}
                          </span>
                          <span className="chip shrink-0 text-[10px] border-line">
                            {t.counterpart.tag || "채용 제안"}
                          </span>
                          {t.unread > 0 && (
                            <span className="ml-auto flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full bg-coral text-[9px] font-bold text-white">
                              {t.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Detail Column (Desktop Split View) */}
          {isDrawerOpen && (
            <div className="hidden lg:flex flex-1 min-w-0 surface-card rounded-2xl border border-line overflow-hidden shadow-sm">
              <Outlet />
            </div>
          )}
        </div>
      </main>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <Link 
          to="/messages" 
          className="fixed inset-0 bg-ink/10 backdrop-blur-[2px] z-40 transition-opacity lg:hidden" 
          aria-label="Close drawer" 
        />
      )}
      
      {/* Mobile Sliding Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[85vw] max-w-[480px] bg-background border-l border-line shadow-2xl transition-transform duration-300 z-50 overflow-hidden lg:hidden ${
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
