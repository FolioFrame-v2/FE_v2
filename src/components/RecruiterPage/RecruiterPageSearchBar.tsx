import React, { useEffect, useState } from "react";
// removed domain/features import // dataList를 import 할 경로 지정

import searchImg from "@/assets/icons/Header/search.png";
import { ImCancelCircle } from "react-icons/im";

// //나중에 삭제
// const dataList = [
//   "공유자",
//   "이름",
//   "템플릿",
//   "포트폴리오",
//   "폴리오프레임",
//   "마라탕후루",
// ];

const RecruiterPageSearchBar = ({ userId, onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [nowIndex, setNowIndex] = useState(-1);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue); // 입력 값을 상태에 저장

    if (newValue.trim()) {
      // dataList 함수로부터 자동완성 결과 가져오기
      const results = Array.from(
        recruiterProjectDataList(newValue, userId) || []
      );
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
    setNowIndex(-1); // 검색어가 바뀔 때 인덱스를 초기화
  };

  const handleSearchClick = () => {
    console.log(inputValue);
    console.log(suggestions);
    onSearch(inputValue);
  };

  const handleCancelClick = () => {
    setInputValue("");
    setSuggestions([]);
    console.log("검색어 초기화");
    //search(inputValue);
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowUp") {
      setNowIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "ArrowDown") {
      setNowIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
    } else if (e.key === "Enter" && nowIndex >= 0) {
      setInputValue(suggestions[nowIndex]);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (!inputValue) {
      setSuggestions([]);
    }
  }, [inputValue]);

  return (
    <div className="mt-[0.8vh] w-[30vw]">
      <div className="w-[25vw] h-[2.5em] border-[0.0625em] border-[#c8c8c8] shadow-[0em_0.0625em_0.25em_rgba(12,12,13,0.1),0em_0.0625em_0.25em_rgba(12,12,13,0.05)] rounded-[62.5em] relative flex items-center justify-between px-[0.625em] SearchBarWrapper">
        <input
          className="w-[85%] font-['Inria_Sans',sans-serif] font-[400] text-[1vw] leading-[1em] text-[#919194] border-none outline-none bg-transparent"
          value={inputValue} // 입력 필드가 상태와 동기화
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          placeholder="포트폴리오 이름 검색"
          spellCheck="false"
        />
        <div className="w-[15%] flex items-center justify-end">
          {inputValue && (
            <div className="w-[1.9vw] text-[#d0d1d9] cursor-pointer" onClick={handleCancelClick}>
              <ImCancelCircle />
            </div>
          )}
          <img
            className="w-[1.9vw] rounded-full cursor-pointer"
            onClick={handleSearchClick}
            src={searchImg}
            alt="search"
          />
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="absolute right-[11.9%] flex flex-col w-[26vw] bg-[#e9eaee] text-[#919194] shadow-[0px_4px_8px_rgba(0,0,0,0.1)] rounded-[0.625em] mt-[0.5rem] AutoCompleteContainer">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`py-[0.2rem] px-[0.6rem] cursor-pointer hover:bg-[#e0e5f6] ${index === nowIndex ? "bg-[#e0e5f6] text-[#000]" : ""}`}
              onMouseDown={() => setInputValue(suggestion)}
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

export default RecruiterPageSearchBar;
