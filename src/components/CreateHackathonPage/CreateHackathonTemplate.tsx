import React from "react";
import SearchBar from "../commmon/SearchBar.jsx";
import CreatePortfolioSlide from "./CreateHackathonSlide.jsx";
const CreatePortfolioTemplate = () => {
    return(
        <>
        <div className="w-[80%] py-[40px] px-[40px] m-0 border-[1.5px] border-[#d0d1d9] rounded-[2em] h-[30em] flex flex-col items-center">
            <SearchBar/>
            <CreatePortfolioSlide/>
        </div>
        </>
       
    );
};

export default CreatePortfolioTemplate;
