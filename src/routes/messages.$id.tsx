import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Star,
  Archive,
  Trash2,
  Reply,
  Paperclip,
  Send,
  Building2,
  User,
  ArrowLeft,
  MoreHorizontal,
  Download,
} from "lucide-react";
import { THREADS, formatTime, type Message } from "@/lib/messages";

export const Route = createFileRoute("/messages/$id")({
  head: () => ({
    meta: [{ title: "대화 — devfolio" }],
  }),
  component: MessageDetail,
});

function MessageDetail() {
  const { id } = Route.useParams();
  const thread = useMemo(() => THREADS.find((t) => t.id === id), [id]);
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState<Message[]>(thread?.messages ?? []);
  const [starred, setStarred] = useState(thread?.starred ?? false);

  if (!thread) {
    return (
      <div className="surface-card p-10 text-center text-ink-soft">
        <p>대화를 찾을 수 없어요.</p>
        <Link to="/messages" className="mt-4 inline-block text-ink underline">받은함으로</Link>
      </div>
    );
  }

  const send = () => {
    const body = reply.trim();
    if (!body) return;
    setMessages((prev) => [
      ...prev,
      { id: `me-${Date.now()}`, from: "me", body, at: new Date().toISOString() },
    ]);
    setReply("");
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Header */}
      <header className="px-5 py-4 border-b border-line flex items-center gap-3">
        <Link to="/messages" className="h-8 w-8 rounded-full grid place-items-center hover:bg-surface shrink-0">
          <ArrowLeft className="size-4" />
        </Link>
        <div
          className="h-10 w-10 rounded-xl grid place-items-center font-display font-bold text-sm flex-none"
          style={{ background: `color-mix(in oklch, ${thread.counterpart.color} 30%, var(--color-surface))` }}
        >
          {thread.counterpart.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-semibold text-ink truncate">{thread.counterpart.name}</h2>
            <span className={"chip text-[10px] " + (thread.counterpart.role === "company" ? "bg-mint/15 border-mint/30" : "bg-coral/15 border-coral/30")}>
              {thread.counterpart.role === "company" ? <Building2 className="size-3" /> : <User className="size-3" />}
              {thread.counterpart.role === "company" ? "기업" : "인재"}
            </span>
          </div>
          <div className="text-xs text-ink-soft truncate">{thread.counterpart.tag} · {thread.counterpart.handle}</div>
        </div>
        <div className="flex items-center gap-1">
          <IconBtn onClick={() => setStarred((s) => !s)} active={starred}>
            <Star className={"size-4 " + (starred ? "fill-current" : "")} />
          </IconBtn>
          <IconBtn><Archive className="size-4" /></IconBtn>
          <IconBtn><Trash2 className="size-4" /></IconBtn>
          <IconBtn><MoreHorizontal className="size-4" /></IconBtn>
        </div>
      </header>

      {/* Subject */}
      <div className="px-5 py-3 border-b border-line">
        <div className="text-xs text-ink-soft font-mono uppercase">제목</div>
        <div className="font-display text-lg text-ink">{thread.subject}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-surface/30">
        {messages.map((m) => {
          const mine = m.from === "me";
          return (
            <div key={m.id} className={"flex gap-3 " + (mine ? "flex-row-reverse" : "")}>
              <div
                className={"h-8 w-8 rounded-full grid place-items-center font-display font-bold text-xs flex-none " + (mine ? "bg-primary text-primary-foreground" : "")}
                style={mine ? undefined : { background: `color-mix(in oklch, ${thread.counterpart.color} 40%, var(--color-surface))` }}
              >
                {mine ? "나" : thread.counterpart.logo}
              </div>
              <div className={"max-w-[75%] " + (mine ? "items-end text-right" : "")}>
                <div className={"inline-block text-left rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap " + (mine ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-background border border-line rounded-tl-sm")}>
                  {m.body}
                  {m.attachments && (
                    <div className="mt-3 space-y-1.5">
                      {m.attachments.map((a) => (
                        <div key={a.name} className={"flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs " + (mine ? "bg-white/15" : "bg-surface")}>
                          <Paperclip className="size-3.5" />
                          <span className="flex-1 truncate">{a.name}</span>
                          <span className="opacity-70">{a.size}</span>
                          <Download className="size-3.5" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-1 text-[10px] font-mono text-ink-soft">{formatTime(m.at)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Composer */}
      <footer className="border-t border-line p-4 bg-background">
        <div className="rounded-2xl border border-line focus-within:border-ink transition overflow-hidden">
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder={`${thread.counterpart.name}에게 답장 보내기...`}
            rows={3}
            className="w-full px-4 py-3 text-sm outline-none resize-none bg-transparent"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                send();
              }
            }}
          />
          <div className="flex items-center justify-between px-3 py-2 border-t border-line bg-surface/40">
            <div className="flex items-center gap-1 text-ink-soft">
              <IconBtn><Paperclip className="size-4" /></IconBtn>
              <IconBtn><Reply className="size-4" /></IconBtn>
              <span className="text-[11px] font-mono ml-1">⌘ + Enter 로 전송</span>
            </div>
            <button
              onClick={send}
              disabled={!reply.trim()}
              className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-40 inline-flex items-center gap-2"
            >
              <Send className="size-4" /> 보내기
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

function IconBtn({ children, onClick, active }: { children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={"h-8 w-8 rounded-full grid place-items-center transition " + (active ? "text-coral bg-coral/10" : "text-ink-soft hover:bg-surface hover:text-ink")}
    >
      {children}
    </button>
  );
}
