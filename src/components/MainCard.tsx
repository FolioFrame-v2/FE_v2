import React from "react";
import PropTypes from "prop-types";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { getCurrentUser, setCurrentUser } from "../../components/features/currentUser";
// 템플릿 카드 1개
//templateName, description, templateThumnail을 props로!
const TemplateCard = () => {
  const navigate = useNavigate();
  const currentUser = null;

  const templateName = ["포트폴리오", "해커톤", "채용"];
  const description = ["나만의 포토폴리오 만들기", "함께 경험 쌓는 프로젝트", "나에게 맞는 채용 정보"];
  const pages = ["/PortfolioPage","/HackathonPage", "/RecruiterPage"];
  // const handleButtonClick = (index: any) => {
  //   navigate(pages[index]); // 해당 인덱스에 맞는 페이지로 이동
    
  // };
  const handleButtonClick = (index: any) => {
    if (pages[index] === "/RecruiterPage") {
      // recruiter 조건 확인
      if (!currentUser?.recruiter) {
        alert("기업회원으로 가입한 경우에만 사용할 수 있습니다");
        return;
      }
      navigate(pages[index]); // recruiter가 true인 경우에만 이동
    } else {
      navigate(pages[index]); // 다른 페이지는 바로 이동
    }
  };
  return (
    <div className="flex justify-between my-[20px] mx-0 gap-[2em]">
      {templateName.map((name, index) => (
        <div key={index} className="w-[18em] border border-[#D9D9D9] rounded-[10px] p-[20px] shadow-[0_4px_8px_rgba(0,0,0,0.1)] text-center hover:border-[#0A27A6] [&:hover_button]:bg-[#0A27A6] [&:hover_button]:text-[#fff]">
          <h3 className="text-[1.5rem] mb-[10px] font-['OTF_B']">{name}</h3>
          <p className="text-[1rem] text-[#666] mb-[20px] font-['OTF_R']">{description[index]}</p>
          <button className="text-[#0A27A6] text-[1em] font-[800] bg-[#fff] border border-[#0A27A6] rounded-[2em] h-[2em] w-[50%] -mt-[3em]" onClick={() => handleButtonClick(index)}>참여하기</button>
        </div>
      ))}
    </div>
  );
};

// TemplateCard의 프롭타입
TemplateCard.propTypes = {
  templateName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  templateThumnail: PropTypes.string.isRequired,
};

export default TemplateCard;