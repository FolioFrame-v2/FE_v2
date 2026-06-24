import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";


function LogoMark() {
  return (
    <div className="relative h-7 w-7 rounded-md bg-primary text-primary-foreground grid place-items-center font-display font-bold">
      <span className="text-[15px] leading-none">f</span>
      <span className="absolute -right-1 -bottom-1 h-2.5 w-2.5 rounded-full bg-mint border-2 border-background" />
    </div>
  );
}

const Nav = () => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate({ to: `/login` });
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-line">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <LogoMark />
          <span className="font-display font-semibold tracking-tight text-lg">FolioFrame</span>
          <span className="chip ml-2 hidden sm:inline-flex">v1.0 · beta</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
          <Link to="/" hash="how" className="hover:text-ink transition">사용 방법</Link>
          <Link to="/portfolio" className="hover:text-ink transition">포트폴리오</Link>
          <Link to="/hackathon" className="hover:text-ink transition">공모전(해커톤)</Link>
          <Link to="/recruiter" className="hover:text-ink transition">공용 & 채용</Link>
        </nav>
        <div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex h-9 px-3 text-sm text-ink-soft hover:text-ink transition"
            onClick={onClickImg}>
            로그인
          </button>
          <button className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-sm">
            무료로 시작
          </button>
        </div>
      </div>
    </header>
  )
};

export { Nav };

