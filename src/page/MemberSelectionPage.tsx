import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { User, Briefcase, CheckCircle2 } from "lucide-react";

const MemberSelectionPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6 font-['OTF_R']">
            {/* Header */}
            <div className="text-center mb-12">
                <p 
                    className="text-5xl font-extrabold font-['OTF_B'] text-[#0A27A6] cursor-pointer tracking-tight" 
                    onClick={() => navigate({ to: `/` })}
                >
                    FolioFrame
                </p>
                <p className="mt-4 text-gray-500 text-lg">가입하실 회원 유형을 선택해 주세요</p>
            </div>

            {/* Cards Container */}
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl justify-center items-stretch">
                
                {/* Developer Card */}
                <div className="flex-1 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(10,39,166,0.12)] flex flex-col group">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <User className="w-8 h-8 text-[#0A27A6]" />
                    </div>
                    <h2 className="text-3xl font-bold font-['OTF_B'] text-gray-900 mb-2">일반회원</h2>
                    <p className="text-gray-500 mb-8 h-12">포트폴리오를 관리하고 팀원을 찾아보세요.</p>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                        {[
                            "포트폴리오 제작 및 공유",
                            "해커톤 참여",
                            "프로젝트 관리",
                            "채용자와의 연결"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-[#0A27A6] mr-3 flex-shrink-0" />
                                <span className="text-lg">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button 
                        className="w-full py-4 px-6 rounded-xl bg-[#0A27A6] text-white font-bold text-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]"
                        onClick={() => navigate({ to: `/signupdeveloper` })}
                    >
                        일반회원 가입하기
                    </button>
                </div>

                {/* Recruiter Card */}
                <div className="flex-1 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(10,39,166,0.12)] flex flex-col group">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="w-8 h-8 text-[#0A27A6]" />
                    </div>
                    <h2 className="text-3xl font-bold font-['OTF_B'] text-gray-900 mb-2">기업회원</h2>
                    <p className="text-gray-500 mb-8 h-12">뛰어난 인재를 찾고 해커톤을 개최해보세요.</p>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                        {[
                            "포트폴리오 열람",
                            "해커톤 개최 및 열람",
                            "일반회원 정보 열람",
                            "일반회원과 연결"
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center text-gray-700">
                                <CheckCircle2 className="w-5 h-5 text-[#0A27A6] mr-3 flex-shrink-0" />
                                <span className="text-lg">{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button 
                        className="w-full py-4 px-6 rounded-xl bg-[#0A27A6] text-white font-bold text-lg transition-all duration-300 hover:bg-blue-800 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.98]"
                        onClick={() => navigate({ to: `/signuprecruiter` })}
                    >
                        기업회원 가입하기
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MemberSelectionPage;
