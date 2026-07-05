import React, { useState, useEffect } from "react";
import Logo from "@/assets/icons/Logo.png";
import CreatePortfolioInput from "@/components/CreatePortfolioPage/CreatePortfolioInput";
import CreatePortfolioTemplate from "@/components/CreatePortfolioPage/CreatePortfolioTemplate";
// removed domain/features import
// removed domain/features import
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useCreate3 as useCreate } from "@/api/generated/portfolio/portfolio";
import { useGetList9 } from "@/api/generated/template/template";

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

  const { data: templateData } = useGetList9();
  const templateInfo = (templateData?.data?.result?.content || []).map((t: any) => ({
    templateId: t.id,
    templateName: t.name,
    description: t.description,
    picture: null // TODO: Add template thumbnails if provided by API
  }));


  const { mutate: createPortfolio, isPending } = useCreate({
    mutation: {
      onSuccess: (res: any) => {
        const newPortfolioId = res.data?.result?.id;
        if (newPortfolioId) {
          alert("포트폴리오가 생성되었습니다!");
          navigate({ to: `/portfoliopageeditor`, search: { portfolioId: newPortfolioId } });
        } else {
          alert("포트폴리오 생성에 성공했으나 ID를 가져오지 못했습니다.");
          navigate({ to: `/mypage` });
        }
      },
      onError: (err: any) => {
        alert("생성 실패: " + err.message);
      }
    }
  });

  const handleSaveProject = () => {
    if (!formData.projectTitle || !formData.projectTemplate) {
      alert("포트폴리오 이름과 템플릿을 선택해주세요.");
      return;
    }
    
    let tid = 1;
    if (formData.projectTemplate === "minimal") tid = 1;
    else if (formData.projectTemplate === "editorial") tid = 2;
    else if (formData.projectTemplate === "terminal") tid = 3;
    else if (formData.projectTemplate === "playful") tid = 4;
    else if (!isNaN(Number(formData.projectTemplate))) tid = Number(formData.projectTemplate);

    createPortfolio({
      data: {
        title: formData.projectTitle,
        templateId: tid,
        visibility: formData.share ? "PUBLIC" : "PRIVATE",
      }
    });
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
          disabled={isButtonDisabled || isPending}
          onClick={handleSaveProject}
        >{isPending ? "생성 중..." : "제작하기"}
        </button>
      </div>
    </>
  );
};

export default CreatePortfolioPage;