import { useNavigate } from '@tanstack/react-router';
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Logo from "@/assets/icons/Logo.png";
import { Bookmark } from 'lucide-react';

const HackTemplateCard = ({ hackId, templateButton }: any) => {
  const navigate = useNavigate();
  const [hackData, setHackData] = useState<any>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const currentUser: any = null; // 현재 사용자 정보 가져오기

  useEffect(() => {
    // 해커톤 정보를 hackId로 가져옴 (Mock Data)
    const hackathon = {
      hackId: hackId,
      coverImage: "",
      hackName: "Mock Hackathon",
      description: "Mock Description"
    };
    if (hackathon) {
      setHackData(hackathon);
    }
  }, [hackId]);

  const handleViewClick = () => {
    console.log(currentUser);
    console.log("patchHits 불러옴.");
    if (currentUser && hackData) {
      // patchHackHits(currentUser.id, hackId);
    }

    // 해커톤 상세 페이지로 이동
    navigate({ to: `/hackathondetail` });
  };

  if (!hackData) {
    return <div className="flex justify-center text-[1vw] font-bold">로딩 중...</div>; // 로딩 상태 표시
  }

  return (
    <div className="w-[20vw] h-[35vh] bg-[#ffffff] rounded-[1em] shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col items-center justify-between group relative">
      <div className="mt-[1vh] w-[18vw] h-[15vh] bg-[#f9f9f9] border-[0.0625em] border-[#d0d1d9] rounded-[1em] flex justify-center items-center relative">
        <img className="w-full h-[2.58em] object-contain" src={hackData.coverImage || Logo} alt="Hackathon" />
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsBookmarked(!isBookmarked);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-ink-soft hover:text-primary transition-colors shadow-sm"
        >
          <Bookmark className={`size-4 ${isBookmarked ? "fill-[#0a27a6] text-[#0a27a6]" : "text-[#d0d1d9]"}`} />
        </button>
      </div>
      <h3 className="mt-[0.5em] mb-[0.5em] font-['OTF_B'] font-[700] text-[1.2vw] leading-[1.1875em] text-center text-[#000000]">{hackData.hackName || "빈 제목"}</h3>
      <div className="font-['Inria_Sans',sans-serif] font-[300] text-[0.9vw] leading-[1.0625em] text-center text-[#d0d1d9] w-[18vw] overflow-scroll [&::-webkit-scrollbar]:hidden">{hackData.description || "빈 설명"}</div>
      <button className="mt-[1vh] mb-[1vh] w-[18vw] h-[4.5vh] bg-[#0a27a6] rounded-[62.5em] border-none text-[#ffffff] font-['OTF_B'] font-[700] text-[1em] leading-[1.1875em] text-center cursor-pointer hover:bg-[#092091]" onClick={handleViewClick}>{templateButton}</button>
    </div>
  );
};

export default HackTemplateCard;
