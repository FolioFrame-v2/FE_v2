import React from "react";
import Logo from "@/assets/icons/Logo.png";
import SearchBar from "@/components/SearchBar";

const PageHeader = ({ pageTitle, large, onSearch, onCancelSearch }: any) => {
  return (
    <>
      <div className={`flex z-[2] relative top-0 left-0 flex-col items-center justify-center w-full h-[10em] gap-[1em] max-md:${large ? 'mb-[3em]' : 'mb-[0em]'}`}>
        <img className="w-[5em] h-[5em] -mb-[2em]" src={Logo} alt="로고" />
        <div className="text-[#0a27a6] text-[2em] font-[800] font-['OTF_B'] max-md:text-[1.25em] max-md:mt-[0.75em] max-md:mb-[1em]">{pageTitle}</div>
        <SearchBar
          onChange={(e) => console.log(e.target.value)}
          onClick={() => console.log("검색 버튼 클릭")}
          onSearch={onSearch}
          onCancelSearch={onCancelSearch}
        />
      </div>
    </>
  );
};

export default PageHeader;
