import React, { useState, useEffect } from "react";
// removed domain/features import
// removed domain/features import
import TemplateCard from "@/components/TemplateCard";
import { useNavigate } from "@tanstack/react-router";
// removed domain/features import
import MergerCreatePortfolioPageInput from "@/components/MergerCreatePortfolioPage/MergerCreatePortfolioPageInput";

import Logo from "@/assets/icons/Logo.png";

const MergerCreatePortfolioPage = () => {
  const navigate = useNavigate();
  const currentUser = { id: "mock-id", name: "MockUser", email: "mock@example.com" };
  const [selectedProjects, setSelectedProjects] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    portfolioName: "",
    usedLanguage: "",
    frontend: "",
    backend: "",
    share: false,
  });

  const [userProjects, setUserProjects] = useState([
    { projectId: "mock-project-1", title: "Mock Project 1" },
    { projectId: "mock-project-2", title: "Mock Project 2" },
  ]);


  const handleSelectProject = (projectId: any) => {
    setSelectedProjects((prev: any) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
    console.log(selectedProjects);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSavePortfolio = () => {
    if (selectedProjects.length === 0) {
      alert("최소 한 개의 프로젝트를 선택해야 합니다.");
      return;
    }
    console.log("Mock handleSavePortfolio called", formData, selectedProjects);
  };

  return (
    <div className="w-[85%] mx-auto">
      <div className="flex flex-col items-center justify-center gap-[1.5em] mb-[5em]">
        <img className="w-[5em] h-[5em] mb-[-2em]" src={Logo} alt="로고" />
        <div className="text-[#0a27a6] text-[2em] font-extrabold font-['OTF_B'] max-md:text-[1.25em] max-md:mt-[0.75em] max-md:mb-[1em]">Portfolio</div>
      </div>

      <div className="flex flex-col justify-center">
        <MergerCreatePortfolioPageInput
          formData={formData}
          onInputChange={handleInputChange}
          onToggleChange={handleInputChange}
        />
        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-4 gap-y-[3vw] gap-x-[1vw] m-[3vh] w-full">
            {userProjects.map((project) => (
              <div className={`cursor-pointer ${selectedProjects.includes(project.projectId) ? "border-2 border-[#0a27a6]" : "border-none"}`}
                key={project.projectId}
                onClick={() => handleSelectProject(project.projectId)}
              >
                <TemplateCard
                  key={project.projectId}
                  portfolioId={project.projectId}
                  templateButton="선택"
                  isButton={false}
                />
              </div>
            ))}
          </div>

          {/* <SubmitButton onClick={handleSavePortfolio}>포트폴리오 저장</SubmitButton> */}

          <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[20%] mt-[2em] font-['OTF_R'] cursor-pointer flex items-center justify-center relative disabled:bg-[#0a27a6] disabled:opacity-50 disabled:cursor-not-allowed"
            //disabled={isButtonDisabled}
            //onClick={handleSavePortfolio}
            onClick={() => {
              handleSavePortfolio(); // 프로젝트 저장 함수 호출
              navigate({ to: `/my` });
            }}
          >
            제작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MergerCreatePortfolioPage;
