import React, { useState, useEffect } from "react";
// import Logo from "../assets/icons/Logo.png";
import CreateHackathonInput from "../components/CreateHackathonPage/CreateHackathonInput";
// import { getCurrentUser } from "../components/features/currentUser";
// import { saveHackathon } from "../components/features/hackathonFeatures";
import { Navigate, useNavigate } from "@tanstack/react-router";

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
    ownerId: "mock-owner",
    ownerEmail: "mock@example.com",
    participant: []
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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


  const handleSaveHack = () => {
    console.log("Mock saved form data:", formData);
    navigate({ to: `/my` });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[1.5em] mb-[5em]">
        {/* <img src={Logo} alt="로고" className="w-[5em] h-[5em] -mb-[2em]" /> */}
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
