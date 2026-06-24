import { useNavigate } from '@tanstack/react-router';
import React, { useRef, useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import SelectBox from "@/components/SelectBox";
import TemplateCard from "@/components/TemplateCard";
import StyledButton from "@/components/StyledButton";

//// removed domain/features import

import PageHeader from "@/components/PageHeader";


const PortfolioPage = () => {
  const navigate = useNavigate();

  const [sharedPortfolioList, setsharedPortfolioList] = useState([
    { projectId: "mock-port-1", title: "Mock Portfolio 1", share: true },
    { projectId: "mock-port-2", title: "Mock Portfolio 2", share: true },
    { projectId: "mock-port-3", title: "Mock Portfolio 3", share: true },
    { projectId: "mock-port-4", title: "Mock Portfolio 4", share: true },
  ]);

  const handleSortApply = (category: any, sortOption: any, filterOption: any) => {
    console.log("Sort applied:", category, sortOption, filterOption);
  };

  const handleSearchApply = (searchTerm: any) => {
    console.log("Search term:", searchTerm);
  };

  const handleCancelSearch = () => {
    console.log("Cancel search");
  };

  const accessToken = "mock-token";
  const currentUser = { recruiter: false, email: "mock@example.com", nickname: "MockUser" };

  const handleCreatePortfolioClick = () => {
    navigate({ to: `/createportfolio` });
  };

  return (
    <div className="TemplatePageContainer w-[85%] mx-auto">
      <PageHeader
        pageTitle="Portfolio"
        onSearch={handleSearchApply}
        onCancelSearch={handleCancelSearch}
      />

      <div className="flex items-center mt-[10vh]">
        <SelectBox onSort={handleSortApply} />
      </div>
      <hr className="my-[0.625em] border border-[#d0d1d9]"></hr>
      <div className="flex justify-center items-center">
        {sharedPortfolioList.length === 0 ? (
          <div className="col-span-full grid place-content-center mt-[5vh]">
            <div className="text-[1.5vw] font-['OTF_R'] items-center w-full h-full">검색 결과가 없습니다.</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-y-[3vw] gap-x-[1vw] mt-[2em] w-full">
            {sharedPortfolioList
              .filter((portfolio) => portfolio.share === true)
              .map((portfolio) => (
                <TemplateCard
                  key={portfolio.projectId}
                  portfolioId={portfolio.projectId}
                  templateButton={"보기"}
                />
              ))}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        {/* 포트폴리오 제작 페이지로 넘어갈 수 있는 버튼 추가 */}
        {accessToken && currentUser?.recruiter === false && (
          <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[20%] mt-[2em] font-['OTF_R'] flex items-center justify-center relative" onClick={handleCreatePortfolioClick}>
            포트폴리오 제작하기
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
