import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/Logo.png";
import ModifyHackathonInput from "../components/ModifyHackathonPage/ModifyHackathonInput.jsx";
import { getCurrentUser } from "../components/features/currentUser";
// import { saveHackathon } from "../components/features/hackathonFeatures";
import { Navigate, useNavigate } from "react-router-dom";
import { updateHackathon } from "../components/features/hackathonFeatures";
import { useParams } from "react-router-dom";

const ModifyHackathonPage = () => {
  const navigate = useNavigate();
  const { hackId } = useParams();
  useEffect(() => {
    if (hackId) {
      setFormData((prevData) => ({
        ...prevData,
        hackId: Number(hackId),
      }));
    }
  }, [hackId]);

  console.log(hackId);
  
  const [formData, setFormData] = useState({
    hackId: "", 
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
    ownerId: "",
    ownerEmail: "",
    participant: [],
  });

  const currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser) {
      // setCurrentUser(user);
      console.log(currentUser);
    } else {
      console.log("currentUser 없음");
    }
  }, []);


  useEffect(() => {
    if (currentUser && (!formData.ownerId || !formData.ownerEmail)) {
      setFormData((prevData) => ({
        ...prevData,
        ownerId: currentUser.id,
        ownerEmail: currentUser.email,
      }));
    }
  }, [currentUser, formData.ownerId, formData.ownerEmail]); 
  


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

  Object.keys(formData).forEach((field) => {
    const newValue = formData[field];
    if (newValue !== undefined && newValue !== null) {
      updateHackathon(formData.hackId, field, newValue);
    } else {
      console.log(`${field} 값이 비어 있습니다.`);
    }
  });
  

    navigate("/MyPage");
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
