import React, { useState, useEffect } from "react";
import Logo from "@/assets/icons/Logo.png";
import ModifyHackathonInput from "@/components/ModifyHackathonPage/ModifyHackathonInput.jsx";
// removed domain/features import
// // removed domain/features import
import { Navigate, useNavigate } from "@tanstack/react-router";
// removed domain/features import
import { useParams } from "@tanstack/react-router";

const ModifyHackathonPage = () => {
  const navigate = useNavigate();
  const hackId = "mock-hack-id";
  
  const [formData, setFormData] = useState({
    hackId: Number(hackId) || "", 
    hackName: "",
    startDate: null,
    endDate: null,
    link: "",
    maxMemNumber: "",
    description: "",
    video: null,
    pictures: null,
    coverImage: null,
    logo: null,
    ownerId: "mock-id",
    ownerEmail: "mock@example.com",
    participant: [],
  });

  const currentUser = { id: "mock-id", email: "mock@example.com" };

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
    console.log("Mock handleSaveHack called", formData);
    navigate({ to: `/my` });
  };



  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[1.5em] mb-[5em]">
        <img className="w-[5em] h-[5em] mb-[-2em]" src={Logo} alt="로고" />
        <div className="text-[#0a27a6] text-[2em] font-extrabold font-['OTF_B'] max-md:text-[1.25em] max-md:mt-[0.75em] max-md:mb-[1em]">Hackathon</div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <ModifyHackathonInput 
          onInputChange={handleInputChange}
          formData={formData}
          onDateChange={handleDateChange}
        />
        <button className="text-white text-[1em] font-extrabold rounded-[2em] border-none bg-[#0a27a6] h-[3em] w-[20%] mt-[2em] font-['OTF_R'] cursor-pointer flex items-center justify-center relative" onClick={handleSaveHack}>수정완료</button>
      </div>
    </>
  );
};

export default ModifyHackathonPage;
