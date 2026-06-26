import { Link } from "@tanstack/react-router";

function LogoMark() {
  return (
    <div className="relative h-7 w-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-display font-bold">
      <span className="text-[15px] leading-none">d</span>
      <span className="absolute -right-1 -bottom-1 h-2.5 w-2.5 rounded-full bg-mint border-2 border-background" />
    </div>
  );
}

export function SiteNav() {
  const linkCls = "text-sm text-ink-soft hover:text-ink transition";
  const activeCls = "text-ink font-medium";
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-line">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display font-semibold tracking-tight text-lg">devfolio</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7">
          <Link to="/browse" className={linkCls} activeProps={{ className: activeCls }}>포트폴리오</Link>
          <Link to="/contests" className={linkCls} activeProps={{ className: activeCls }}>공모전</Link>
          <Link to="/editor" className={linkCls} activeProps={{ className: activeCls }}>에디터</Link>
          <Link to="/mypage" className={linkCls} activeProps={{ className: activeCls }}>마이페이지</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/editor" className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-sm inline-flex items-center">
            새 포트폴리오
          </Link>
        </div>
      </div>
    </header>
  );
}
