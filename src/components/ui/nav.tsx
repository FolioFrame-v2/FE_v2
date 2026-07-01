import { Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { NotificationBell } from "./notification-bell";

const Nav = () => {
  const navigate = useNavigate();
  const onClickImg = () => {
    navigate({ to: `/login` });
  };

  const currentUser = true;
  // const currentUser = false;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-line">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* <LogoMark /> */}
          <span className="text-[#0A27A6] tracking-tight text-[18px] font-['OTF_B']">FolioFrame</span>
        </Link>
        <nav className="font-['OTF_R'] hidden md:flex items-center gap-8 text-sm text-ink-soft">
          <Link to="/" hash="how" className="hover:text-ink transition active:text-ink">사용 방법</Link>
          <Link to="/browse" className="hover:text-ink transition active:text-ink">포트폴리오</Link>
          <Link to="/templates" className="hover:text-ink transition active:text-ink">템플릿</Link>
          <Link to="/contests" className="hover:text-ink transition active:text-ink">공모전</Link>
          <Link to="/recruiter" className="hover:text-ink transition active:text-ink">기업 공고</Link>
        </nav>
        <div className="flex items-center gap-2">
          <NotificationBell signedIn={currentUser} />
          {currentUser ? (
            <Link to="/mypage" className="h-9 px-4 rounded-full font-['OTF_R'] bg-primary text-white text-sm transition shadow-sm grid place-items-center">
              마이페이지
            </Link>
          ) : (
            <button className="h-9 px-4 font-['OTF_R'] rounded-full bg-primary text-primary-foreground text-sm transition shadow-sm" onClick={onClickImg}>
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  )
};

export { Nav };

