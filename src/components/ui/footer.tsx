function LogoMark() {
  return (
    <div className="relative h-7 w-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-display font-bold">
      <span className="text-[15px] leading-none">f</span>
      <span className="absolute -right-1 -bottom-1 h-2.5 w-2.5 rounded-full bg-mint border-2 border-background" />
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display font-semibold">devfolio</span>
          <span className="text-xs font-mono text-ink-soft ml-2">© 2025</span>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-ink-soft">
          <a href="#" className="hover:text-ink transition">About</a>
          <a href="#" className="hover:text-ink transition">기업 서비스</a>
          <a href="#" className="hover:text-ink transition">개인정보처리방침</a>
          <a href="#" className="hover:text-ink transition">이용약관</a>
          <a href="#" className="hover:text-ink transition">문의</a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };

