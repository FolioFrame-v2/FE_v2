import React, { useState, useEffect } from "react";
import Logo from "@/assets/icons/Logo.png";
import CreatePortfolioInput from "@/components/CreatePortfolioPage/CreatePortfolioInput";
import CreatePortfolioTemplate from "@/components/CreatePortfolioPage/CreatePortfolioTemplate";
// removed domain/features import
// removed domain/features import
import { Navigate, useNavigate } from "@tanstack/react-router";
const templateInfo = [ { id: 1, name: "Mock Template" } ];


const CreatePortfolioPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    share: false,
    usedLanguage: "",
    category: "",
    video: null,
    coverImage: null,
    images: [] as any[],
    logo: null,
  });

  const currentUser = { name: "Mock Name", id: "mock-id", nickname: "MockNick", email: "mock@example.com" };
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "images") {
      setUploadedImages(value); // 업로드된 이미지를 상태로 저장
      console.log("업로드된 이미지 경로가 상태에 저장됨:", value);
    }
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };
// YYYY-MM-DD 형식 -> 서버와 연결할 때 오류가 나옴! 수정함
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
    console.log("Mock handleSaveProject 호출됨", formData);
    navigate({ to: `/my` }); 
  };
  //이미지, 비디오 업로드
  
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[1.5em] mb-[5em]">
        <img src={Logo} alt="로고" className="w-[5em] h-[5em] -mb-[2em]" />
        <div className="text-[#0a27a6] text-[2em] font-[800] font-['OTF_B'] max-md:text-[1.25em] max-md:mt-[0.75em] max-md:mb-[1em]">Portfolio</div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <CreatePortfolioInput
          onInputChange={handleInputChange}
          formData={formData}
          onDateChange={handleDateChange}
        />
        <CreatePortfolioTemplate
          templates={templateInfo} 
          setProjectTemplate={setProjectTemplate} 
        />
        <button  
          className="text-[#fff] text-[1em] font-[800] rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[20%] mt-[2em] font-['OTF_R'] cursor-pointer flex items-center justify-center relative disabled:bg-[#0a27a6] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isButtonDisabled}
          onClick={handleSaveProject}
        >제작하기
        </button>
      </div>
    </>
  );
};

export default CreatePortfolioPage;