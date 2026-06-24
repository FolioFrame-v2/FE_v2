import React, { useEffect, useState } from "react";
import TemplateCard from "@/components/TemplateCard";
import RecruiterSection from "@/components/RecruiterPage/RecruiterSection";

function RecruiterPage() {
  const [myPortfolioList, setMyPortfolioList] = useState([
    { projectId: "mock-1", title: "Mock Portfolio 1" },
    { projectId: "mock-2", title: "Mock Portfolio 2" },
  ]);
  const userId = "mock-user-id";

  const handleSearchApply = (searchTerm: any) => {
    console.log("Search term:", searchTerm);
  };

  const handleSortApply = (category: any, sortOption: any, filterOption: any) => {
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

  return (
    <div className="MyPageContainer w-[85%] mx-auto">
      <RecruiterSection
        title={"내가 연락한 포트폴리오"}
        data={myPortfolioList}
        renderItem={renderTemplateCard}
        button={true}
        onSearch={handleSearchApply}
        onSort={handleSortApply}
        userId={userId}
      />

      <RecruiterSection title={"내가 찜한 포트폴리오"} button={false} />
    </div>
  );
}

export default RecruiterPage;
