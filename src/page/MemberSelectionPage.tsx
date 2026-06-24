import React from "react";

import Business from "@/assets/images/MemberSelectionPage/Business.png";
import General from "@/assets/images/MemberSelectionPage/General.png";
import { Navigate, useNavigate} from "@tanstack/react-router";

const MemberSelectionPage = () => {

    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center w-[85%] py-[3%] px-[20px] mx-auto gap-[2em]">
                <p className="text-[4em] font-extrabold font-['OTF_B'] text-[#0A27A6] flex cursor-pointer" onClick={() => navigate({ to: "/" })}>FolioFrame</p>
                <div className="flex gap-[2em] w-full h-full mt-[-2em] items-center justify-center">
                    <button className="flex flex-col items-center rounded-[1em] cursor-pointer w-[30em] h-[25em] border-2 border-[#0A27A6] bg-white">
                        <p className="text-[2em] font-bold mb-[0.5em] py-[0.5em] px-[2em] font-['OTF_B']">일반회원</p>
                        <ol>
                           <li className="text-[1.5em] text-black font-['OTF_R'] text-left mb-[1em]">포트폴리오 제작 및 공유</li>
                           <li className="text-[1.5em] text-black font-['OTF_R'] text-left mb-[1em]">해커톤 참여</li>
                           <li className="text-[1.5em] text-black font-['OTF_R'] text-left mb-[1em]">프로젝트 관리</li>
                           <li className="text-[1.5em] text-black font-['OTF_R'] text-left mb-[1em]">채용자와의 연결</li>
                        </ol>
                        <button className="text-white text-[1em] font-extrabold font-['OTF_R'] bg-[#0A27A6] border border-[#0A27A6] rounded-[2em] h-[4em] w-[50%] mt-[-1.5em] transition-all duration-300 ease-out hover:bg-white hover:text-[#0A27A6] hover:py-[12px] hover:px-[20px] hover:font-bold hover:opacity-80" onClick={() => navigate({ to: "/signUpDeveloperPage" })}>참여하기</button>
                    </button>
                    <button className="flex flex-col items-center rounded-[1em] cursor-pointer w-[30em] h-[25em] border-2 border-[#0A27A6] bg-white">
                        <p className="text-[2em] font-bold mb-[0.5em] py-[0.5em] px-[2em] font-['OTF_B']">기업회원</p>
                        <ol>
                           <li className="text-[1.5em] text-black font-['OTF_R'] text-left mb-[1em]">포트폴리오 열람</li>
                           <li className="text-[1.5em] text-black font-['OTF_R'] text-left mb-[1em]">해커톤 열람</li>
                           <li className="text-[1.5em] text-black font-['OTF_R'] text-left mb-[1em]">일반회원 정보 열람 </li>
                           <li className="text-[1.5em] text-black font-['OTF_R'] text-left mb-[1em]">일반회원과 연결</li>
                        </ol>
                        <button className="text-white text-[1em] font-extrabold font-['OTF_R'] bg-[#0A27A6] border border-[#0A27A6] rounded-[2em] h-[4em] w-[50%] mt-[-1.5em] transition-all duration-300 ease-out hover:bg-white hover:text-[#0A27A6] hover:py-[12px] hover:px-[20px] hover:font-bold hover:opacity-80" onClick={() => navigate({ to: "/SignUpRecruiterPage" })}>참여하기</button>
                    </button>
                </div>
        </div>
    );
};

export default MemberSelectionPage;
