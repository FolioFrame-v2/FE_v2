import React, { useEffect, useState } from "react";
import DashBoard from "@/components/MyPage/DashBoard";
import MyPageSection from "@/components/MyPage/MyPageSection";
import TemplateCard from "@/components/TemplateCard";
import HackTemplateCard from "@/components/HackTemplateCard";
import PortfolioTemplateCard from "@/components/PortfolioTemplateCard";




function MyPage() {
  const [myPortfolioList, setmyPortfolioList] = useState([
    { projectId: "mock-proj-1", title: "Mock Project 1" },
    { projectId: "mock-proj-2", title: "Mock Project 2" },
  ]);
  const [myHackathonList, setmyHackathonList] = useState([
    { hackId: "mock-hack-1", title: "Mock Hackathon 1" },
  ]);
  const [myPortfoliosList, setMyPortfoliosList] = useState([
    { portfolioId: "mock-port-1", title: "Mock Portfolio 1" },
  ]);
  const currentUser = {
    id: "mock-user-id",
    email: "mock@example.com",
    name: "Mock User",
    nickname: "MockNickname",
    recruiter: false,
  };

  const handleMyProjectSearchApply = (searchTerm: any) => {
    console.log("Search term:", searchTerm);
  };

  const handleMyHackathonSearchApply = (searchTerm: any) => {
    console.log("Search term:", searchTerm);
  };

  const handleMyProjectSortApply = (category: any, sortOption: any, filterOption: any) => {
    console.log("Sort applied:", category, sortOption, filterOption);
  };

  // 템플릿카드 렌더링
  const renderTemplateCard = (item: any) => (
    <TemplateCard
      key={item.projectId}
      portfolioId={item.projectId}
      templateButton={"보기"}
    />
  );
  const renderHackTemplateCard = (item: any) => (
    <HackTemplateCard
      key={item.hackId}
      hackId={item.hackId}
      templateButton={"보기"}
    />
  );
  const renderPortTemplateCard = (item: any) => (
    <PortfolioTemplateCard
      key={item.portfolioId}
      portfolioId={item.portfolioId}
      templateButton={"보기"}
    />
  );

  return (
    <div className="w-[85%] mx-auto">
      <div className="flex">
        <DashBoard name={currentUser.name} nickname={currentUser.nickname} />
      </div>
      {!currentUser.recruiter && (
        <>
          <MyPageSection
            title={"내가 만든 프로젝트"}
            data={myPortfolioList}
            renderItem={renderTemplateCard}
            button={true}
            buttonKey={"프로젝트"}
            onSearch={handleMyProjectSearchApply}
            onSort={handleMyProjectSortApply}
            userId={currentUser.id}
            userEmail={currentUser.email}
            userNickname={currentUser.nickname}
          />

          <MyPageSection
            title={"내가 만든 포트폴리오"}
            data={myPortfoliosList}
            renderItem={renderPortTemplateCard}
            button={true}
            buttonKey={"포트폴리오"}
            //onSearch={handleMyProjectSearchApply}
            //onSort={handleMyProjectSortApply}
            //userId={currentUser?.id}
          />
          <MyPageSection
            title={"내가 만든 해커톤"}
            data={myHackathonList}
            renderItem={renderHackTemplateCard}
            button={true}
            buttonKey={"해커톤"}
            // onSearch={handleMyHackathonSearchApply}
          />
        </>
      )}
    </div>
  );
}

export default MyPage;
