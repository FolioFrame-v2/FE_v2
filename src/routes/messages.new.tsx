import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Paperclip, Send, Sparkles, X, Building2, User, Search } from "lucide-react";

export const Route = createFileRoute("/messages/new")({
  head: () => ({
    meta: [{ title: "새 메시지 — devfolio" }],
  }),
  component: NewMessage,
});

type Recipient = { id: string; name: string; role: "company" | "talent"; tag: string; logo: string; color: string };

const CONTACTS: Recipient[] = [
  { id: "c1", name: "Linear Studio", role: "company", tag: "SaaS · 채용팀", logo: "L", color: "var(--color-mint)" },
  { id: "c2", name: "Toss", role: "company", tag: "핀테크 · Talent", logo: "T", color: "var(--color-coral)" },
  { id: "c3", name: "당근마켓", role: "company", tag: "커뮤니티 · 채용", logo: "당", color: "var(--color-mint)" },
  { id: "c4", name: "네이버", role: "company", tag: "포털 · Data팀", logo: "N", color: "var(--color-coral)" },
  { id: "c5", name: "김도현", role: "talent", tag: "Frontend · 2년차", logo: "김", color: "var(--color-mint)" },
  { id: "c6", name: "이서연", role: "talent", tag: "Backend · 신입", logo: "이", color: "var(--color-coral)" },
];

const TEMPLATES = [
  { label: "채용 제안", body: "안녕하세요, 포트폴리오 인상 깊게 봤습니다. 저희 팀 포지션에 관심 있으시면 짧게 얘기 나눌 수 있을까요?" },
  { label: "커피챗 요청", body: "안녕하세요! 부담 없이 팀과 커피챗 어떠세요? 편하신 시간대 알려주시면 감사하겠습니다." },
  { label: "포트폴리오 문의", body: "안녕하세요, 프로젝트 관련해 몇 가지 여쭤봐도 될까요? 아래 내용이 궁금합니다.\n\n- " },
];

function NewMessage() {
  const nav = useNavigate();
  const [to, setTo] = useState<Recipient[]>([]);
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [] as Recipient[];
    const k = query.toLowerCase();
    return CONTACTS.filter(
      (c) => !to.find((x) => x.id === c.id) && (c.name.toLowerCase().includes(k) || c.tag.toLowerCase().includes(k)),
    ).slice(0, 5);
  }, [query, to]);

  const canSend = to.length > 0 && subject.trim() && body.trim();

  const submit = () => {
    if (!canSend) return;
    setSent(true);
    setTimeout(() => nav({ to: "/messages" }), 900);
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
        {/* Header */}
        <header className="px-5 py-4 border-b border-line flex items-center gap-3 shrink-0">
          <Link to="/messages" className="h-8 w-8 rounded-full grid place-items-center hover:bg-surface shrink-0">
            <ArrowLeft className="size-4" />
          </Link>
          <h1 className="font-display font-semibold text-lg">새 메시지</h1>
          <span className="chip text-[10px] ml-2">기업 ↔ 인재</span>
        </header>

        {/* To */}
        <div className="px-5 py-3 border-b border-line">
          <div className="flex items-start gap-3">
            <div className="text-xs text-ink-soft font-mono uppercase w-14 pt-2">받는 이</div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-1.5 items-center">
                {to.map((r) => (
                  <span key={r.id} className="chip bg-surface border-line pl-1.5">
                    <span
                      className="h-5 w-5 rounded-md grid place-items-center text-[10px] font-bold"
                      style={{ background: `color-mix(in oklch, ${r.color} 30%, var(--color-surface))` }}
                    >
                      {r.logo}
                    </span>
                    {r.name}
                    <button onClick={() => setTo((t) => t.filter((x) => x.id !== r.id))} className="ml-0.5 hover:text-coral">
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                <div className="relative flex-1 min-w-[180px]">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={to.length ? "" : "이름, 회사, 직군으로 검색"}
                    className="w-full h-8 text-sm outline-none bg-transparent"
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-10 top-full mt-1 left-0 right-0 surface-card p-1.5 shadow-lg max-h-64 overflow-y-auto">
                      {suggestions.map((s) => (
                        <li key={s.id}>
                          <button
                            onClick={() => {
                              setTo((t) => [...t, s]);
                              setQuery("");
                            }}
                            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-surface text-left"
                          >
                            <div
                              className="h-8 w-8 rounded-lg grid place-items-center font-display font-bold text-xs"
                              style={{ background: `color-mix(in oklch, ${s.color} 30%, var(--color-surface))` }}
                            >
                              {s.logo}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm text-ink flex items-center gap-1.5">
                                {s.name}
                                <span className={"chip text-[9px] " + (s.role === "company" ? "bg-mint/15 border-mint/30" : "bg-coral/15 border-coral/30")}>
                                  {s.role === "company" ? <Building2 className="size-2.5" /> : <User className="size-2.5" />}
                                  {s.role === "company" ? "기업" : "인재"}
                                </span>
                              </div>
                              <div className="text-xs text-ink-soft">{s.tag}</div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {to.length === 0 && query === "" && (
                    <div className="mt-1 text-[11px] text-ink-soft flex items-center gap-1">
                      <Search className="size-3" /> 예: Linear, 프론트엔드, 김도현
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="px-5 py-3 border-b border-line flex items-center gap-3">
          <div className="text-xs text-ink-soft font-mono uppercase w-14">제목</div>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="한 줄 제목을 입력하세요"
            className="flex-1 h-9 text-sm outline-none bg-transparent"
          />
        </div>

        {/* Templates */}
        <div className="px-5 py-3 border-b border-line flex items-center gap-2 flex-wrap">
          <span className="text-xs text-ink-soft inline-flex items-center gap-1">
            <Sparkles className="size-3.5" /> 템플릿
          </span>
          {TEMPLATES.map((t) => (
            <button
              key={t.label}
              onClick={() => setBody(t.body)}
              className="chip hover:bg-surface hover:border-ink-soft transition"
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="px-5 py-4 flex-1 overflow-y-auto">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`간단한 인사와 함께 목적을 명확하게 적어주세요.\n\n예)\n- 어떤 프로젝트/포지션에 관심이 있는지\n- 원하는 미팅 시간대\n- 첨부하고 싶은 자료`}
            rows={12}
            className="w-full text-sm outline-none bg-transparent resize-none leading-relaxed"
          />
        </div>

        {/* Footer */}
        <footer className="px-5 py-3 border-t border-line flex items-center justify-between bg-surface/40 shrink-0">
          <div className="flex items-center gap-1 text-ink-soft">
            <button className="h-8 px-2.5 rounded-lg hover:bg-surface inline-flex items-center gap-1.5 text-xs">
              <Paperclip className="size-3.5" /> 파일 첨부
            </button>
            <span className="text-[11px] font-mono ml-2">
              {body.length}자
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/messages" className="h-9 px-4 rounded-full border border-line text-sm hover:bg-surface transition">
              취소
            </Link>
            <button
              onClick={submit}
              disabled={!canSend || sent}
              className="h-9 px-5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition disabled:opacity-40 inline-flex items-center gap-2"
            >
              <Send className="size-4" />
              {sent ? "보냈어요!" : "메시지 보내기"}
            </button>
          </div>
        </footer>
    </div>
  );
}
