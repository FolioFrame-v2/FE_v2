import React, { useEffect, useState, useRef } from "react";
import { dataList } from "../features/dataList"; // dataList를 import 할 경로 지정
import { searchSortManager } from "../domain/startProgram";

import searchImg from "../../assets/icons/Header/search.png";
import { ImCancelCircle } from "react-icons/im";

//나중에 삭제
// const dataList = [
//   "공유자",
//   "이름",
//   "템플릿",
//   "포트폴리오",
//   "폴리오프레임",
//   "마라탕후루",
// ];

const SearchBar = ({ onSearch, onCancelSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [nowIndex, setNowIndex] = useState(-1);

  const searchBarRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // 입력 값을 상태에 저장

    if (newValue.trim()) {
      // dataList 함수로부터 자동완성 결과 가져오기
      const results = Array.from(dataList(newValue) || []);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
    setNowIndex(-1); // 검색어가 바뀔 때 인덱스를 초기화
  };

  const handleSearchClick = () => {
    console.log(inputValue);
    console.log(suggestions);
    onSearch(inputValue); // PortfolioPage로 검색어 전달
  };

  const handleCancelClick = () => {
    setInputValue("");
    setSuggestions([]);
    console.log("검색어 초기화");
    //search(inputValue);
    if (onCancelSearch) {
      onCancelSearch(); // 최신순 정렬 실행
    }
  };

  //기존 코드
  // const handleKeyUp = (e) => {
  //   if (e.key === "ArrowUp") {
  //     setNowIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  //   } else if (e.key === "ArrowDown") {
  //     setNowIndex((prevIndex) =>
  //       Math.min(prevIndex + 1, suggestions.length - 1)
  //     );
  //   } else if (e.key === "Enter" && nowIndex >= 0) {
  //     setInputValue(suggestions[nowIndex]);
  //     setSuggestions([]);
  //   }
  // };

  // 키보드 검색어 이동
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setNowIndex((prevIndex) => (prevIndex + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      setNowIndex((prevIndex) =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter" && nowIndex >= 0) {
      setInputValue(suggestions[nowIndex]);
      setSuggestions([]);
      setNowIndex(-1);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setNowIndex(-1);
    }
  };

  // useEffect(() => {
  //   if (!inputValue) {
  //     setSuggestions([]);
  //   }
  // }, [inputValue]);

  useEffect(() => {
    if (nowIndex >= 0 && suggestions[nowIndex]) {
      setInputValue(suggestions[nowIndex]);
    } else {
      setInputValue(inputValue);
    }
  }, [nowIndex]);

  //검색창 외부 클릭 시 검색창을 닫음
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-[40vw] relative" ref={searchBarRef}>
      <div
        className={`h-[6.8vh] w-full relative flex items-center px-[1.25em] SearchBarWrapper ${suggestions.length > 0 ? "shadow-[0px_-4px_8px_rgba(0,0,0,0.1)] rounded-[15px_15px_0_0]" : "shadow-[0px_4px_8px_rgba(0,0,0,0.1),0px_-4px_8px_rgba(0,0,0,0.1)] rounded-[62.5em]"}`}
      >
        <input
          className="w-[85%] font-['Inria_Sans',sans-serif] font-[400] text-[1.2vw] text-[#919194] border-none outline-none bg-transparent placeholder:text-[0.8em] placeholder:indent-[0.1em]"
          value={inputValue} // 입력 필드가 상태와 동기화
          onChange={handleInputChange}
          ref={inputRef}
          // onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          placeholder="포트폴리오 이름 검색"
          spellCheck="false"
        />
        <div className="w-[15%] flex items-center justify-end cursor-pointer">
          {inputValue && (
            <div className="w-[1.9vw] text-[#d0d1d9] cursor-pointer" onClick={handleCancelClick}>
              <ImCancelCircle />
            </div>
          )}
          <img
            className="w-[2vw] rounded-full"
            onClick={handleSearchClick}
            src={searchImg}
            alt="search"
          />
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="absolute top-full w-[40vw] flex flex-col items-center px-[1.25em] bg-[#fff] text-[#919194] shadow-[0px_4px_8px_rgba(0,0,0,0.1)] rounded-[0_0_15px_15px] mt-[0] z-10 AutoCompleteContainer">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`py-[0.2rem] px-[0.6rem] cursor-pointer w-full block indent-[0.1em] hover:bg-[#e0e5f6] last:mb-[0.5em] ${index === nowIndex ? "bg-[#e0e5f6] text-[#000]" : ""}`}
              onMouseDown={() => {
                setInputValue(suggestion);
                setSuggestions([]);
              }}
              style={{
                backgroundColor: index === nowIndex ? "#d3d3d3" : "white",
                color: index === nowIndex ? "black" : "gray",
              }}
            >
              {suggestion
                .split(new RegExp(`(${inputValue})`, "g"))
                .map((part, i) =>
                  part.toLowerCase() === inputValue.toLowerCase() ? (
                    <span className="font-bold text-[#0a27a6]" key={i}>{part}</span>
                  ) : (
                    part
                  )
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
