import { useNavigate } from '@tanstack/react-router';
import React, { useEffect, useState } from "react";

import HackPageHeader from "@/components/HackPageHeader.jsx";
import HackTemplateCard from "@/components/HackTemplateCard.jsx";
import SelectBox_NoFilter from "@/components/SelectBox _NoFilter.tsx";
import HackathonPageSlide from "@/components/HackathonPage/HackathonPageSlide";


const HackathonPage = () => {
  const navigate = useNavigate();

  const [sharedHackathonList, setsharedHackathonList] = useState([
    { hackId: "mock-hack-1", title: "Mock Hackathon 1" },
    { hackId: "mock-hack-2", title: "Mock Hackathon 2" },
    { hackId: "mock-hack-3", title: "Mock Hackathon 3" },
    { hackId: "mock-hack-4", title: "Mock Hackathon 4" },
  ]);

  const handleSortApply = (category: any, sortOption: any) => {
    console.log("Sort applied:", category, sortOption);
  };

  const handleSearchApply = (searchTerm: any) => {
    console.log("Search term:", searchTerm);
  };

  const handleCancelSearch = () => {
    console.log("Cancel search");
  };

  const currentUser = null;

  return (
    <>
      <HackPageHeader
        pageTitle="Hackathon"
        onSearch={handleSearchApply}
        onCancelSearch={handleCancelSearch}
      />
      <div className="w-[85%] mx-auto">
        <div className="flex items-center mt-[10vh]">
          <SelectBox_NoFilter onSort={handleSortApply} />
        </div>
        <hr className="my-[0.625em] border border-[#d0d1d9]"></hr>

        {/* 12개의 카드를 그리드 형태로 출력 */}
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-4 gap-y-[3vw] gap-x-[1vw] mt-[2em] w-full">
              {sharedHackathonList.map((Hackathon) => (
                <HackTemplateCard
                  key={Hackathon.hackId}
                  hackId={Hackathon.hackId}
                  templateButton={"보기"}
                />
              ))}
            </div>
          </div>
        </div>
        {/* 기존 해커톤 */}
        <hr className="mt-[5em] mb-0 border border-[#d0d1d9]"></hr>

        <HackathonPageSlide />

        <div className="flex justify-center">
          {/* 포트폴리오 제작 페이지로 넘어갈 수 있는 버튼 추가 */}
          <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[20%] font-['OTF_R'] flex items-center justify-center relative" onClick={() => navigate({ to: `/createhackathon` })}>
            해커톤 제작하기
          </button>
        </div>
      </div>
    </>
  );
};

export default HackathonPage;
