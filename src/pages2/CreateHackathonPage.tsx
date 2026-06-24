import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Logo.png";
import CreateHackathonInput from "../components/CreateHackathonPage/CreateHackathonInput";
import { getCurrentUser } from "../components/features/currentUser";
import { saveHackathon } from "../components/features/hackathonFeatures";
import { Navigate, useNavigate } from "react-router-dom";

const CreateHackathonPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    hackName: "",
    startDate: null,
    endDate: null,
    link: "",
    maxMemNumber: "",
    description: "",
    video: null,
    pictures: [],
    coverImage: null,
    logo: null,
    part: "",
    ownerId: "",
    ownerEmail: "",
    participant: []
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    } else {
      console.log("user 없음");
    }
  }, []);
  
  useEffect(() => {
    if (currentUser) {
      setFormData((prevData) => ({
        ...prevData,
        ownerId: currentUser.id,
        ownerEmail: currentUser.email,
      }));
    }
  }, [currentUser]);
  

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
  

  const handleSaveHack = () => {
    saveHackathon(
      formData.hackName,
      formData.startDate,
      formData.endDate,
      formData.link,
      formData.maxMemNumber,
      formData.description,
      formData.video,
      formData.pictures,
      formData.coverImage,
      formData.logo,
      formData.part,
      formData.ownerId,
      formData.ownerEmail,
      formData.participant
      
    );
    console.log(formData.startDate, formData.endDate);
    navigate("/MyPage"); 
  };
  // 필수 항목에 모두 입력이 되었는지 확인하고 "제작하기" 버튼 활성화 여부를 정한다.
  useEffect(() => {
    const checkRequiredFields = () => {
      const requiredFields = [
        "hackName",
        "startDate",
        "endDate",
        "link",
        "maxMemNumber",
        "description",
        "part",
      ];
      const allFieldsFilled = requiredFields.every(
        (field) => formData[field] && formData[field].trim() !== ""
      );
      setIsButtonDisabled(!allFieldsFilled);
    };

    checkRequiredFields();
  }, [formData]);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[1.5em] mb-[5em]">
        <img src={Logo} alt="로고" className="w-[5em] h-[5em] -mb-[2em]" />
        <div className="text-[#0a27a6] text-[2em] font-[800] font-['OTF_B'] max-md:text-[1.25em] max-md:mt-[0.75em] max-md:mb-[1em]">Hackathon</div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <CreateHackathonInput 
          onInputChange={handleInputChange}
          formData={formData}
          onDateChange={handleDateChange}
        />
        <button 
          className="text-[#fff] text-[1em] font-[800] rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[20%] -mt-[6em] font-['OTF_R'] cursor-pointer flex items-center justify-center relative disabled:bg-[#0a27a6] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isButtonDisabled}
          onClick={handleSaveHack}>제작하기</button>
      </div>
    </>
  );
};

export default CreateHackathonPage;
