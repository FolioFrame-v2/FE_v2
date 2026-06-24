import React, { useState } from "react";
import arrow from "../../assets/icons/SelectBox/arrow.png";
import StyledButton from "./StyledButton";
//sort 함수 import

const categories = ["프론트엔드", "백엔드", "디자인"];
const sortOptions = ["인기순"];

const SelectBox_NoFilter = ({ onSort }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);

  const handleCategoryClick = (option) => {
    selectedCategory === option //selectedCagory 와 item 비교
      ? setSelectedCategory(null) // item이랑 같으면 null
      : setSelectedCategory(option); // item이랑 다르면 selectedCatgory에 item set
    setIsCategoryOpen(false); // 그리고 카테고리 메뉴를 닫는다.
  };

  const handleSortClick = (option) => {
    selectedSort === option ? setSelectedSort(null) : setSelectedSort(option);
    setIsSortOpen(false);
  };

  return (
    <div className="flex mt-[0.8vh] font-[700] flex-row relative w-[35vw] SelectContiner">
      {/* 카테고리 */}
      <div className="relative inline-block text-center w-full SelectWrapper">
        <button
          className="bg-white border-[0.125em] border-[#d0d1d9] rounded-[0.75em] py-[0.625em] px-0 text-[0.85vw] font-['OTF_B'] text-[#d0d1d9] cursor-pointer text-center w-[80%] float-left flex items-center justify-center"
          // 카테고리 버튼 누르면..
          onClick={() => {
            setIsCategoryOpen(!isCategoryOpen); // isCategoryOpen 토글, true -> false, false -> true
            setIsSortOpen(false); //isSortOpen = false로, 카테고리 버튼 누르면 정렬 메뉴는 닫힌다.
          }}
        >
          {selectedCategory ? selectedCategory : "카테고리"}
          <img className="w-[1vw] ml-[1vw]" src={arrow} alt="arrow" />
        </button>
        <div className={`absolute top-full w-[80%] bg-[#15243e80] rounded-[0.625em] z-10 text-[0.85vw] ${isCategoryOpen ? "block" : "hidden"}`}>
          {/* styled-components에 prop 전달, isCategoryOpen이 true이면 isOpen이 true 값으로 전달 */}
          {categories.map((item, index) => (
            <div
              key={index}
              className={`m-[0.625em] text-white cursor-pointer flex justify-center items-center box-border hover:bg-[#15243e60] ${selectedCategory === item ? "border-[0.0625em] border-white rounded-[0.5em] p-[0.75em] font-bold" : "p-[0.625em] border-[0.2em] border-transparent rounded-[0.625em]"}`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 정렬 */}
      <div className="relative inline-block text-center w-full">
        <button
          className="bg-white border-[0.125em] border-[#d0d1d9] rounded-[0.75em] py-[0.625em] px-0 text-[0.85vw] font-['OTF_B'] text-[#d0d1d9] cursor-pointer text-center w-[80%] float-left flex items-center justify-center"
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsCategoryOpen(false);
          }}
        >
          {selectedSort ? selectedSort : "정렬"}
          <img className="w-[1vw] ml-[1vw]" src={arrow} alt="arrow" />
        </button>
        <div className={`absolute top-full w-[80%] bg-[#15243e80] rounded-[0.625em] z-10 text-[0.85vw] ${isSortOpen ? "block" : "hidden"}`}>
          {sortOptions.map((item, index) => (
            <div
              key={index}
              className={`m-[0.625em] text-white cursor-pointer flex justify-center items-center box-border hover:bg-[#15243e60] ${selectedSort === item ? "border-[0.0625em] border-white rounded-[0.5em] p-[0.75em] font-bold" : "p-[0.625em] border-[0.2em] border-transparent rounded-[0.625em]"}`}
              onClick={() => handleSortClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        <StyledButton
          text={"적용"}
          onClick={() => {
            onSort(selectedCategory, selectedSort);
            // 기능구현으로 선택된 카테고리, 정렬, 필터 보냄.
            //sort(selectedCategory, selectedSort);
          }}
        />
      </div>
    </div>
  );
};

export default SelectBox_NoFilter;
