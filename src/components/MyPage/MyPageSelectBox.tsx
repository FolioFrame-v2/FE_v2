import React, { useState, useRef, useEffect } from "react";
import arrow from "../../assets/icons/SelectBox/arrow.png";
import StyledButton from "../commmon/StyledButton";

const categories = ["프론트엔드", "백엔드", "디자인"];
const sortOptions = ["인기순", "댓글순"];
const filterOptions = ["언어", "Java", "Python", "JavaScript"];

//기능구현으로부터 sort 함수 받음.
const MyPageSelectBox = ({ onSort }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const categoryRef = useRef(null);
  const sortRef = useRef(null);
  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 선택한 필터 옵션에 따라 필터 메뉴를 닫음
  useEffect(() => {
    const hasCareer = selectedFilters.some((item) =>
      ["있음", "없음"].includes(item)
    );
    const hasLanguage = selectedFilters.some((item) =>
      ["Java", "Python", "JavaScript"].includes(item)
    );
    const hasDegree = selectedFilters.some((item) =>
      ["학사", "석사", "박사"].includes(item)
    );

    if (hasCareer && hasLanguage && hasDegree) {
      setIsFilterOpen(false); // 최소 1개씩 선택되면 메뉴 닫기
    }
  }, [selectedFilters]); // selectedFilters가 변경될 때마다 실행

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

  const handleFilterClick = (option) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
    //setIsFilterOpen(false);
  };

  return (
    <div className="flex mt-[0.8vh] font-bold flex-row relative w-[35vw]">
      {/* 카테고리 */}
      <div className="relative inline-block text-center w-full" ref={categoryRef}>
        <button
          className="bg-white border-[0.125em] border-[#d0d1d9] rounded-[0.75em] py-[0.625em] px-0 text-[0.85vw] font-['OTF_B'] text-[#d0d1d9] cursor-pointer text-center w-[80%] float-left flex items-center justify-center"
          // 카테고리 버튼 누르면..
          onClick={() => {
            setIsCategoryOpen(!isCategoryOpen); // isCategoryOpen 토글, true -> false, false -> true
            setIsSortOpen(false); //isSortOpen = false로, 카테고리 버튼 누르면 정렬 메뉴는 닫힌다.
            setIsFilterOpen(false); //isFilterOpen = false로, 카테고리 버튼 누르면 필터 메뉴는 닫힌다.
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
              className={`m-[0.625em] text-white text-[0.85vw] cursor-pointer flex justify-center items-center box-border hover:rounded-[0.625em] hover:border-white ${
                selectedCategory === item
                  ? "border-[0.0625em] border-white rounded-[0.5em] p-[0.75em] font-bold"
                  : "border-[0.2em] border-transparent rounded-[0.625em] p-[0.625em]"
              }`}
              onClick={() => handleCategoryClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 정렬 */}
      <div className="relative inline-block text-center w-full" ref={sortRef}>
        <button
          className="bg-white border-[0.125em] border-[#d0d1d9] rounded-[0.75em] py-[0.625em] px-0 text-[0.85vw] font-['OTF_B'] text-[#d0d1d9] cursor-pointer text-center w-[80%] float-left flex items-center justify-center"
          onClick={() => {
            setIsSortOpen(!isSortOpen);
            setIsCategoryOpen(false);
            setIsFilterOpen(false);
          }}
        >
          {selectedSort ? selectedSort : "정렬"}
          <img className="w-[1vw] ml-[1vw]" src={arrow} alt="arrow" />
        </button>
        <div className={`absolute top-full w-[80%] bg-[#15243e80] rounded-[0.625em] z-10 text-[0.85vw] ${isSortOpen ? "block" : "hidden"}`}>
          {sortOptions.map((item, index) => (
            <div
              key={index}
              className={`m-[0.625em] text-white text-[0.85vw] cursor-pointer flex justify-center items-center box-border hover:rounded-[0.625em] hover:border-white ${
                selectedSort === item
                  ? "border-[0.0625em] border-white rounded-[0.5em] p-[0.75em] font-bold"
                  : "border-[0.2em] border-transparent rounded-[0.625em] p-[0.625em]"
              }`}
              onClick={() => handleSortClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 필터 */}
      <div className="relative inline-block text-center w-full" ref={filterRef}>
        <button
          className="bg-white border-[0.125em] border-[#d0d1d9] rounded-[0.75em] py-[0.625em] px-0 text-[0.85vw] font-['OTF_B'] text-[#d0d1d9] cursor-pointer text-center w-[80%] float-left flex items-center justify-center"
          onClick={() => {
            setIsFilterOpen(!isFilterOpen);
            setIsCategoryOpen(false);
            setIsSortOpen(false);
          }}
        >
          {"필터"}
          <img className="w-[1vw] ml-[1vw]" src={arrow} alt="arrow" />
        </button>
        <div className={`absolute top-full w-[80%] bg-[#15243e80] rounded-[0.625em] z-10 text-[0.85vw] ${isFilterOpen ? "block" : "hidden"}`}>
          {filterOptions.map((item, index) =>
            item === "언어" ? (
              <div key={index} className="m-[0.625em] p-[0.625em] text-white text-[0.85vw] flex justify-center items-center bg-[#d0d1d9] rounded-[0.625em]">{item}</div>
            ) : (
              <div
                key={index}
                className={`m-[0.625em] text-white text-[0.85vw] cursor-pointer flex justify-center items-center box-border hover:rounded-[0.625em] hover:border-white ${
                  selectedFilters.includes(item)
                    ? "border-[0.0625em] border-white rounded-[0.5em] p-[0.75em] font-bold"
                    : "border-[0.2em] border-transparent rounded-[0.625em] p-[0.625em]"
                }`}
                onClick={() => handleFilterClick(item)}
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>

      <div className="w-full">
        <StyledButton
          text={"적용"}
          onClick={() => {
            console.log(selectedCategory, selectedSort, selectedFilters);
            // 기능구현으로 선택된 카테고리, 정렬, 필터 보냄.
            onSort(selectedCategory, selectedSort, selectedFilters); // 정렬 적용 함수 호출
          }}
        />
      </div>
    </div>
  );
};

export default MyPageSelectBox;
