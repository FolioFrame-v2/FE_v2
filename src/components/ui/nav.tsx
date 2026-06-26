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

  const currentUser = null;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-line">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* <LogoMark /> */}
          <span className="text-[#0A27A6] tracking-tight text-[18px] font-['OTF_B']">FolioFrame</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
          <Link to="/" hash="how" className="hover:text-ink transition">사용 방법</Link>
          <Link to="/browse" className="hover:text-ink transition">포트폴리오</Link>
          <Link to="/portfoliopageeditor" className="hover:text-ink transition">AI 진단</Link>
          <Link to="/contests" className="hover:text-ink transition">공모전(해커톤)</Link>
          <Link to="/recruiter" className="hover:text-ink transition">고용 & 채용</Link>
        </nav>
        <div className="flex items-center gap-2">
          {currentUser ? (
            <Link to="/mypage" className="h-9 px-4 rounded-full bg-surface-2 text-ink text-sm font-medium hover:bg-surface transition shadow-sm grid place-items-center">
              마이페이지
            </Link>
          ) : (
            <button className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition shadow-sm" onClick={onClickImg}>
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  )
};

export { Nav };

