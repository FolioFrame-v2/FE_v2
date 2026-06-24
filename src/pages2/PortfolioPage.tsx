import React, { useRef, useEffect, useState } from "react";
import SearchBar from "../components/commmon/SearchBar";
import SelectBox from "../components/commmon/SelectBox";
import TemplateCard from "../components/commmon/TemplateCard";
import StyledButton from "../components/commmon/StyledButton";
import { dummydata } from "../components/commmon/dummydata/dummydata"; // dummydata 파일을 import
import { Navigate, useNavigate } from "react-router-dom";
import {
  oriProjects,
  searchSortManager,
  initializeData,
} from "../components/domain/startProgram";
//import { initializeData } from "../components/domain/startProgram";

import PageHeader from "../components/commmon/PageHeader";
import {
  getCurrentUser,
  setCurrentUser,
} from "../components/features/currentUser";

const PortfolioPage = () => {
  const navigate = useNavigate();

  const [sharedPortfolioList, setsharedPortfolioList] = useState([]);

  //LinkedList를 배열로 바꾸는 함수
  const linkedListToArray = (linkedList) => {
    const array = [];
    let currentNode = linkedList.head;
    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return array;
  };

  useEffect(() => {
    initializeData();
    const sharedPortfolios = Array.from(oriProjects.values()).filter(
      (portfolio) => portfolio.share === true
    );
    console.log(sharedPortfolios);
    setsharedPortfolioList(sharedPortfolios);

    const initialList = searchSortManager.sort(null, null, sharedPortfolios);
    setsharedPortfolioList(linkedListToArray(initialList));
  }, []);

  const handleSortApply = (category, sortOption, filterOption) => {
    const sortedLinkedList = searchSortManager.sort(
      category,
      sortOption,
      filterOption
    );
    setsharedPortfolioList(linkedListToArray(sortedLinkedList));
  };

  const handleSearchApply = (searchTerm) => {
    const searchedLinkedList = searchSortManager.search(searchTerm);
    setsharedPortfolioList(linkedListToArray(searchedLinkedList));
  };

  const handleCancelSearch = () => {
    const resetList = searchSortManager.resetToLatest(); // 최신순 정렬된 리스트
    setsharedPortfolioList(linkedListToArray(resetList));
  };

  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken")
  );

  const currentUser = getCurrentUser();

  const handleCreatePortfolioClick = () => {
    console.log(currentUser);
    if (!currentUser?.email || !currentUser?.nickname) {
      alert("이메일과 닉네임을 등록해 주세요.");
    } else {
      navigate("/CreatePortfolioPage");
    }
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
