import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Logo.png";
import ModifyPortfolioInput from "../components/ModifyPortfolioPage/ModifyPortfolioInput";
import ModifyPortfolioTemplate from "../components/ModifyPortfolioPage/ModifyPortfolioTemplate";
import { updateProject }  from "../components/features/projectFeatures";
import { getCurrentUser } from "../components/features/currentUser";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { templateInfo } from "../components/commmon/dummydata/templateInfo.jsx";

const ModifyPortfolioPage = () => {
  const navigate = useNavigate();
  const { portfolioId } = useParams();
  // console.log(portfolioId); -> 잘 나옴

  useEffect(() => {
    if (portfolioId) {
      setFormData((prevData) => ({
        ...prevData,
        projectId: Number(portfolioId),
      }));
    }
  }, [portfolioId]);


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
    share: false, // 공유 여부
    usedLanguage: "",
    category: "",
    video: null,
    coverImage: null,
    images: [],
    logo: null
  });

  // const [currentUser, setCurrentUser] = useState(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      // setCurrentUser(user);
      console.log(currentUser);
    } else {
      console.log("currentUser 없음");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleDateChange = (name, date) => {
    // 날짜 객체를 복사하고 하루를 더함
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1); // 날짜 +1
    const formattedDate = newDate ? newDate.toISOString().split('T')[0] : ""; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedDate,
    }));
  };
  
  const setProjectTemplate = (templateId) => {
    setFormData((prevData) => ({
      ...prevData,
      projectTemplate: templateId,
    }));
    console.log("Selected templateId:", templateId);
  };


  const handleSaveProject = () => {
    saveProject(
      currentUser.name, // 사용자 이름
      currentUser.id, // 사용자 아이디
      currentUser.nickname, // 사용자 닉네임
      currentUser.email, // 사용자 이메일
      formData.usedTemplate, // projectTemplate
      formData.projectTitle,
      formData.description,
      formData.startDate,
      formData.endDate,
      formData.category,
      formData.usedLanguage,
      formData.projectLink,
      formData.solving,
      formData.challenge,
      formData.video,
      formData.coverImage,
      formData.images,
      formData.logo,
      formData.share
    );
    console.log(formData.startDate, formData.endDate);
  };
  
  //이미지, 비디오 업로드
  const handleSavePortfolio = () => {
      console.log("FormData 확인:", formData); // 디버깅 로그

    Object.keys(formData).forEach((field) => {
      const newValue = formData[field];
      if (newValue !== undefined && newValue !== null) {
        updateProject(formData.projectId, field, newValue);
      } else {
        console.log(`${field} 값이 비어 있습니다.`);
      }
    });
    

    console.log("시작일:", formData.startDate, "종료일:", formData.endDate);
    navigate("/MyPage");
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
            navigate("/MyPage"); // 페이지 이동
          }}>수정완료
        </button>
      </div>
    </>
  );
};

export default ModifyPortfolioPage;
