import React, { useEffect, useState } from "react";

import HackPageHeader from "@/components/commmon/HackPageHeader.jsx";
import HackTemplateCard from "@/components/commmon/HackTemplateCard.jsx";




const HackathonPage = () => {
  const navigate = useNavigate();

  const [sharedHackathonList, setsharedHackathonList] = useState([]);

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
    void 0; // 데이터를 초기화
    console.log("[] 값:", []); //-> O

    const sharedHackathonArray = Array.from([]); // Map을 배열로 변환
    console.log("sharedHackathonArray 값:", sharedHackathonArray); //-> O

    setsharedHackathonList(sharedHackathonArray); // 상태 업데이트

    const initialList = [];
    setsharedHackathonList(linkedListToArray(initialList));
  }, []);

  const handleSortApply = (category, sortOption) => {
    const sortedLinkedList = [].sort(
      category,
      sortOption
    );
    setsharedHackathonList(linkedListToArray(sortedLinkedList));
  };

  const handleSearchApply = (searchTerm) => {
    const searchedLinkedList = [];
    setsharedHackathonList(linkedListToArray(searchedLinkedList));
  };

  const handleCancelSearch = () => {
    const resetList = []; // 최신순 정렬된 리스트
    setsharedHackathonList(linkedListToArray(resetList));
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
          <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[20%] font-['OTF_R'] flex items-center justify-center relative" onClick={() => navigate({ to: "/CreateHackathonPage" })}>
            해커톤 제작하기
          </button>
        </div>
      </div>
    </>
  );
};

export default HackathonPage;
