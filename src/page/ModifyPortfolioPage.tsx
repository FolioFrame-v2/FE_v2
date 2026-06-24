import React, { useState, useEffect } from "react";
import Logo from "@/assets/icons/Logo.png";
import ModifyPortfolioInput from "@/components/ModifyPortfolioPage/ModifyPortfolioInput";
import ModifyPortfolioTemplate from "@/components/ModifyPortfolioPage/ModifyPortfolioTemplate";
// removed domain/features import
// removed domain/features import
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
const templateInfo = [{ id: 1, name: "Mock Template" }];

const ModifyPortfolioPage = () => {
  const navigate = useNavigate();
  const { portfolioId } = useParams({ strict: false });

  const [formData, setFormData] = useState({
    projectId: Number(portfolioId) || "",
    projectOwnerName: "", // 포폴 만든 사람 이름
    projectOwnerNickname: "",
    projectOwnerEmail: "", // 포폴 만든 사람 이메일
    projectTemplate: null, //포폴 템플릿
    projectTitle: "", //포폴 이름
    description: "", //포폴 설명
    startDate: null,
    endDate: null,
    solving: "",
    challenge: "",
    share: false, // 공유 여부
    usedLanguage: "",
    category: "",
    video: null,
    coverImage: null,
    images: [] as any[],
    logo: null
  });

  const currentUser = { id: "mock-id", email: "mock@example.com", name: "Mock Name", nickname: "Mock Nickname" };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (name: any, date: any) => {
    // 날짜 객체를 복사하고 하루를 더함
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // 날짜 +1
    const formattedDate = newDate ? newDate.toISOString().split('T')[0] : "";
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: formattedDate,
    }));
  };

  const setProjectTemplate = (templateId: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      projectTemplate: templateId,
    }));
    console.log("Selected templateId:", templateId);
  };


  const handleSaveProject = () => {
    console.log("Mock handleSaveProject called", formData);
  };

  //이미지, 비디오 업로드
  const handleSavePortfolio = () => {
    console.log("Mock handleSavePortfolio called", formData);
    navigate({ to: `/my` });
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[1.5em] mb-[5em]">
        <img className="w-[5em] h-[5em] mb-[-2em]" src={Logo} alt="로고" />
        <div className="text-[#0a27a6] text-[2em] font-extrabold font-['OTF_B'] max-md:text-[1.25em] max-md:mt-[0.75em] max-md:mb-[1em]">Portfolio</div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <ModifyPortfolioInput
          onInputChange={handleInputChange}
          formData={formData}
          onDateChange={handleDateChange}
        />
        <ModifyPortfolioTemplate
          templates={templateInfo}
          setProjectTemplate={setProjectTemplate}
        />
        <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[20%] mt-[2em] font-['OTF_R'] cursor-pointer flex items-center justify-center relative" onClick={() => {
          handleSavePortfolio(); // 프로젝트 저장 함수 호출
          navigate({ to: `/my` }); // 페이지 이동
        }}>수정완료
        </button>
      </div>
    </>
  );
};

export default ModifyPortfolioPage;
