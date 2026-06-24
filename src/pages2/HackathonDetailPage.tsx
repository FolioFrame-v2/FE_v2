import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  oriHackathons,
  oriComments,
  initializeData,
} from "../components/domain/startProgram";
import { getCurrentUser } from "../components/features/currentUser";
import { patchContacts } from "../components/features/recruiterFeatures";
import Comment from "../components/domain/Comment";
import saveComment from "../components/features/saveComment";
import { deleteHackathon, isIncludedParticipant } from "../components/features/hackathonFeatures";


//logo 이미지
import logo from "../assets/icons/Logo.png";

import person from "../assets/icons/person.png";
import Calendar from "../assets/icons/Calendar.png";

import  Link  from "../assets/icons/Link.png";
import { SiThangs } from "react-icons/si";

import {updateParticipant} from "../components/features/hackathonFeatures";

const HackathonDetailPage = () => {
  const hackId = Number(useParams().hackId); // URL에서 hackId를 숫자로 변환
  const [HackathonData, setHackathonData] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isUserParticipant, setIsUserParticipant] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 추가

  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const userId = currentUser.id;



  console.log(userId);
  console.log(hackId);

  useEffect(() => {
    // hackId를 사용하여 해당 해커톤 데이터를 가져오기
    const Hackathon = oriHackathons.get(Number(hackId)); 
    console.log(typeof hackId);
    if (Hackathon) {
      setHackathonData(Hackathon);
      console.log(Hackathon);
    }
  }, [hackId]);


  useEffect(() => {
    if (HackathonData && currentUser) {
      
    if (HackathonData && HackathonData.ownerEmail === currentUser.email|| 
        HackathonData.ownerId === currentUser.id) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [HackathonData?.ownerEmail, HackathonData?.ownerId, currentUser?.email, currentUser?.id]);


  useEffect(() => {
    if (HackathonData && userId) {
      const isParticipant = isIncludedParticipant(Number(hackId), userId);
      setIsUserParticipant(isParticipant);
    }
  }, [HackathonData, userId]);
  
  
  const handleParticipation = async () => {
    if (HackathonData.participant.length < HackathonData.maxMemNumber && !isUserParticipant) {
      try {
        await updateParticipant(Number(hackId), userId);
  
        // 상태 업데이트
        setHackathonData((prev) => ({
          ...prev,
          participant: [...prev.participant, userId],
        }));
  
        setIsUserParticipant(true); // 참여 상태를 바로 업데이트
      } catch (error) {
        console.error("참여 업데이트 중 오류 발생:", error);
      }
    }
  };
  
  useEffect(() => {
    if (HackathonData && userId) {
      // 참여 여부를 상태에 반영
      const isParticipant = HackathonData.participant.includes(userId);
      setIsUserParticipant(isParticipant);
    }
  }, [HackathonData, userId]);
 
  
  // console.log(hackId);
  
  if (!HackathonData) {
    return <div className="flex justify-center text-[1vw] font-bold">로딩 중...</div>;
  }
  // 사진 업로드 핸들러
  const handlePhotosChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const newPictures = [...(HackathonData.pictures || [])];
      newPictures[index] = URL.createObjectURL(file);

      setHackathonData((prevData) => ({
        ...prevData,
        pictures: newPictures,
      }));
    }
  };

  // 커버 이미지 업로드 핸들러
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imageURL = URL.createObjectURL(file);

      setHackathonData((prevData) => ({
        ...prevData,
        coverImage: imageURL,
      }));
    }
  };

  // 홍보 비디오 URL 핸들러
  const handleVideoChange = (e) => {
    const videoURL = e.target.value;

    setHackathonData((prevData) => ({
      ...prevData,
      video: videoURL,
    }));
  };


  const handlePopupToggle = () => {
    setIsPopupOpen((prev) => !prev);
  };

  if (!HackathonData) {
    return <div className="flex justify-center text-[1vw] font-bold">로딩 중...</div>;
  }


  
  return (
    <>
    <div className="w-[85%] mx-auto flex justify-between items-start gap-[2em]">
      {/* 본문 */}
      <div className="flex-1">
        <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">{HackathonData.hackName}</h1>
        <hr className="my-[1.5vh] border border-[#d0d1d9]"></hr>
        <div className="flex flex-row gap-[1em]">
          <p className="w-[4em] h-[1.5em] text-white font-bold font-['OTF_R'] text-[1em] border border-[#ccc] rounded-[0.2em] bg-[#0a27a6] flex items-center justify-center">모집인원</p>
          <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000] mt-[1.2em]">{HackathonData.maxMemNumber + "명" || "없습니다."}</h1>
          <p className="w-[4em] h-[1.5em] text-white font-bold font-['OTF_R'] text-[1em] border border-[#ccc] rounded-[0.2em] bg-[#0a27a6] flex items-center justify-center">모집파트</p>
          <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000] mt-[1.2em]">{HackathonData.part || "없습니다."}</h1>
          {/* <Mem2>현재 참여중인 인원</Mem2>
          <MemTitle>{HackathonData.participant.length || "없습니다."}</MemTitle> */}
        </div>
        <div className="flex flex-row gap-[1em]">
        <div className="relative inline-block w-[60%]">
          <img className="absolute left-[10px] top-[50%] -translate-y-[50%] w-[20px] h-[20px]" src={Link} alt="Link" />
          <input className="border-[1.4px] border-[#0a27a6] rounded-[1em] w-full h-[2em] pl-[35px]" value={HackathonData.link || "없습니다."} readOnly />
        </div>
        </div>
      {/* 해커톤 설명 */}
      <hr className="my-[1.5vh] border border-[#d0d1d9]"></hr>
      <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">해커톤 설명</h1>
      <div className="w-full h-[100vh] text-[#ccc] rounded-[2em] shadow-[0_4px_8px_rgba(0,0,0,0.2)] mb-[2em] flex flex-col items-center justify-center">
        <p className="font-bold font-['OTF_R'] text-[1em] text-[#000]">{HackathonData.description || "없습니다"}</p>
      </div>
      <hr className="my-[1.5vh] border border-[#d0d1d9]"></hr>
      <div className="flex flex-row gap-[1em]">
      {/* 사진 */}
      <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">사진</h1>
        <div
          className="flex items-start gap-[20px]"
        >
          <div
            className="flex flex-wrap gap-[10px] flex-[1] ml-[2em] w-[80%] justify-between"
          >
            {HackathonData.pictures && HackathonData.pictures.length > 0 ? (
              HackathonData.pictures.slice(0, 4).map((image, index) => (
                <div className="inline-block text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle"
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                    overflow: "hidden", 
                  }}
                >
                  <img
                    src={`http://localhost:3000/${image}`}
                    alt={`프로젝트 이미지 ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="inline-block text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle" style={{ width: "100px", height: "100px" }}>+</div>
            )}
          </div>
        </div>
        </div>

        <div className="flex w-full">
          {/* 홍보 비디오 */}
          <div className="flex flex-col">
            <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">홍보 비디오</h1>
           {!HackathonData.video ? (
              <input className="border border-[#d0d1d9] rounded-[2em] outline-none h-[20em] w-[35em] indent-[1em] placeholder:indent-[1em]"
                type="url"
                value={HackathonData.video || ""}
                placeholder="비디오 URL을 입력하세요"
                onChange={handleVideoChange}
              />
            ) : (
              <div>
                <video controls width="100%">
                  <source src={HackathonData.video} type="video/mp4" />
                  <p>비디오 재생을 지원하지 않는 브라우저입니다.</p>
                </video>
              </div>
            )}
              
          </div>

          {/* 커버 이미지 */}
          <div className="flex flex-col">
            <h1 className="text-[#0a27a6] font-bold font-['OTF_B'] ml-[1em]">커버 이미지</h1>
            <div className="flex justify-between ml-[2em] w-[80%]">
               {HackathonData.coverImage ? (
            <img
              src={`http://localhost:3000/${HackathonData.coverImage}`}
              style={{
                width: "100px",
                height: "100px",
              // width: "100%",
              // height: "100%",
              objectFit: "cover",
              borderRadius: "1em",
              display: "block", 
              marginLeft: "auto", 
              marginRight: "auto", 
            }}
            />
          ) : (
            <div className="inline-block w-[5em] h-[5em] text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle">+</div>
         )}
            </div>
            {/* {HackathonData.coverImage ? (
            <img
              src={`http://localhost:3000/${HackathonData.coverImage}`}
              style={{
              width: "40%",
              height: "30%",
              objectFit: "cover",
              borderRadius: "1em",
              display: "block", // 중앙 정렬에 도움
              marginLeft: "auto", // 오른쪽 이동
              marginRight: "auto", // 중앙 정렬 유지
            }}
            />
          ) : (
            <ImageBox>+</ImageBox>
         )} */}
          </div>
        </div>
      </div>
  
      {/* 오른쪽 사이드 창 */}
      <div className="sticky top-0 w-[50vh] h-[50vh] bg-white p-[5px_10px] shadow-[0px_4px_6px_rgba(0,0,0,0.4)] overflow-y-auto rounded-[2em] flex flex-col items-center justify-center">
        <h1 className="w-[6vw] h-[6vw] mb-[-1em] [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
          {HackathonData.logo ? (
            <img
             src={`http://localhost:3000/${HackathonData.logo}`}
             style={{
             width: "100%",
             height: "100%",
             objectFit: "cover",
             borderRadius: "1em",
            }}
            />
          ) : (
            <img src={logo} alt="Logo" />
         )}

        </h1>
        <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">{HackathonData.hackName}</h1>
        <div className="flex flex-row gap-[1em]">
          <div>
            <div className="flex flex-row gap-[1em]">
              <img className="w-[1.5em] h-[1.4em] mt-[0.4em]" src={Calendar} alt="달력" />
              <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000]">
                모집기간 {HackathonData.startDate} - {HackathonData.endDate}
              </h1>
            </div>
            <div className="flex flex-row gap-[1em]">
              <img className="w-[1.5em] h-[1.5em] mt-[1em]" src={person} alt="사람" />
              <p className="w-[8em] h-[1.5em] text-[#000] font-bold font-['OTF_R'] text-[1em] ml-[-0.1em] flex items-center justify-center">현재 참여중인 인원 : </p>
              <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000] mt-[1.2em]">{HackathonData.participant.length || "없습니다."}</h1>
            </div>
           
          </div>
        </div>
        <button className={`text-[1em] font-extrabold rounded-[2em] border-none h-[3em] w-[50%] font-['OTF_R'] flex items-center justify-center relative ${isFull ? "bg-[#cccccc] text-[#666666] cursor-not-allowed" : "bg-[#0a27a6] text-[#ffffff] cursor-pointer"}`}
          onClick={() => {
            if (isOwner) {
              console.log("팝업 상태를 토글합니다.");
              handlePopupToggle();
            } else {
              handleParticipation();
            }
          }}
        >
          {isOwner ? "지원현황" : isUserParticipant ? "지원완료" : "지원하기"}
        </button>
      </div>

    </div>
    <div className="w-[85%] mx-auto">
    {/* 수정, 삭제 버튼 */}
    {isOwner && (
      <div className="flex mr-[2em] justify-end gap-[1em]">
        <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
          onClick={() => {
            navigate(`/ModifyHackathonPage/${hackId}`);
          }}
        >
        수정
        </button>
        <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
          onClick={async () => {
            // 해커톤 삭제
            await deleteHackathon(hackId);
            // Mypage로 이동
          navigate("/Mypage");
      }}>삭제</button>
      </div>
    )}

    {/* 지원현황을 클릭하면 지원자들을 볼 수 있도록 (내가 제작한 해커톤인 경우에만 보이게 ) */}
    {isOwner && isPopupOpen && (
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex justify-center items-center z-[1000]">
        <div className="bg-white p-[20px] rounded-[8px] w-[50vw] shadow-[0_4px_6px_rgba(0,0,0,0.1)] relative">
          <button className="bg-none border-none text-[1.5rem] absolute top-[1em] right-[1em] cursor-pointer text-[#0a27a6]" onClick={handlePopupToggle}>X</button>
          <div className="mt-[6vh]">
            <h2 className="font-bold font-['OTF_B'] text-[#0a27a6] text-center">지원자</h2>
            <p className="text-[#000]">
              {HackathonData.participant && HackathonData.participant.length > 0 ? (
                HackathonData.participant.map((participant, index) => (
                  <li key={index}>{participant}</li>
                ))
              ) : (
                <li>지원자가 없습니다.</li>
              )}
            </p>
          </div>
        </div>
      </div>
    )}


    </div>
        

          className="flex items-start gap-[20px]"
        >
          <div
            className="flex flex-wrap gap-[10px] flex-[1] ml-[2em] w-[80%] justify-between"
          >
            {HackathonData.pictures && HackathonData.pictures.length > 0 ? (
              HackathonData.pictures.slice(0, 4).map((image, index) => (
                <div className="inline-block text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle"
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                    overflow: "hidden", 
                  }}
                >
                  <img
                    src={`http://localhost:3000/${image}`}
                    alt={`프로젝트 이미지 ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="inline-block text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle" style={{ width: "100px", height: "100px" }}>+</div>
            )}
          </div>
        </div>
        </div>

        <div className="flex w-full">
          {/* 홍보 비디오 */}
          <div className="flex flex-col">
            <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">홍보 비디오</h1>
           {!HackathonData.video ? (
              <input className="border border-[#d0d1d9] rounded-[2em] outline-none h-[20em] w-[35em] indent-[1em] placeholder:indent-[1em]"
                type="url"
                value={HackathonData.video || ""}
                placeholder="비디오 URL을 입력하세요"
                onChange={handleVideoChange}
              />
            ) : (
              <div>
                <video controls width="100%">
                  <source src={HackathonData.video} type="video/mp4" />
                  <p>비디오 재생을 지원하지 않는 브라우저입니다.</p>
                </video>
              </div>
            )}
              
          </div>

          {/* 커버 이미지 */}
          <div className="flex flex-col">
            <h1 className="text-[#0a27a6] font-bold font-['OTF_B'] ml-[1em]">커버 이미지</h1>
            <div className="flex justify-between ml-[2em] w-[80%]">
               {HackathonData.coverImage ? (
            <img
              src={`http://localhost:3000/${HackathonData.coverImage}`}
              style={{
                width: "100px",
                height: "100px",
              // width: "100%",
              // height: "100%",
              objectFit: "cover",
              borderRadius: "1em",
              display: "block", 
              marginLeft: "auto", 
              marginRight: "auto", 
            }}
            />
          ) : (
            <div className="inline-block w-[5em] h-[5em] text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle">+</div>
         )}
            </div>
            {/* {HackathonData.coverImage ? (
            <img
              src={`http://localhost:3000/${HackathonData.coverImage}`}
              style={{
              width: "40%",
              height: "30%",
              objectFit: "cover",
              borderRadius: "1em",
              display: "block", // 중앙 정렬에 도움
              marginLeft: "auto", // 오른쪽 이동
              marginRight: "auto", // 중앙 정렬 유지
            }}
            />
          ) : (
            <ImageBox>+</ImageBox>
         )} */}
          </div>
        </div>
      </div>
  
      {/* 오른쪽 사이드 창 */}
      <div className="sticky top-0 w-[50vh] h-[50vh] bg-white p-[5px_10px] shadow-[0px_4px_6px_rgba(0,0,0,0.4)] overflow-y-auto rounded-[2em] flex flex-col items-center justify-center">
        <h1 className="w-[6vw] h-[6vw] mb-[-1em] [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
          {HackathonData.logo ? (
            <img
             src={`http://localhost:3000/${HackathonData.logo}`}
             style={{
             width: "100%",
             height: "100%",
             objectFit: "cover",
             borderRadius: "1em",
            }}
            />
          ) : (
            <img src={logo} alt="Logo" />
         )}

        </h1>
        <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">{HackathonData.hackName}</h1>
        <div className="flex flex-row gap-[1em]">
          <div>
            <div className="flex flex-row gap-[1em]">
              <img className="w-[1.5em] h-[1.4em] mt-[0.4em]" src={Calendar} alt="달력" />
              <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000]">
                모집기간 {HackathonData.startDate} - {HackathonData.endDate}
              </h1>
            </div>
            <div className="flex flex-row gap-[1em]">
              <img className="w-[1.5em] h-[1.5em] mt-[1em]" src={person} alt="사람" />
              <p className="w-[8em] h-[1.5em] text-[#000] font-bold font-['OTF_R'] text-[1em] ml-[-0.1em] flex items-center justify-center">현재 참여중인 인원 : </p>
              <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000] mt-[1.2em]">{HackathonData.participant.length || "없습니다."}</h1>
            </div>
           
          </div>
        </div>
        <button className={`text-[1em] font-extrabold rounded-[2em] border-none h-[3em] w-[50%] font-['OTF_R'] flex items-center justify-center relative ${isFull ? "bg-[#cccccc] text-[#666666] cursor-not-allowed" : "bg-[#0a27a6] text-[#ffffff] cursor-pointer"}`}
          onClick={() => {
            if (isOwner) {
              console.log("팝업 상태를 토글합니다.");
              handlePopupToggle();
            } else {
              handleParticipation();
            }
          }}
        >
          {isOwner ? "지원현황" : isUserParticipant ? "지원완료" : "지원하기"}
        </button>
      </div>

    </div>
    <div className="w-[85%] mx-auto">
    {/* 수정, 삭제 버튼 */}
    {isOwner && (
      <div className="flex mr-[2em] justify-end gap-[1em]">
        <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
          onClick={() => {
            navigate(`/ModifyHackathonPage/${hackId}`);
          }}
        >
        수정
        </button>
        <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
          onClick={async () => {
            // 해커톤 삭제
            await deleteHackathon(hackId);
            // Mypage로 이동
          navigate("/Mypage");
      }}>삭제</button>
      </div>
    )}

    {/* 지원현황을 클릭하면 지원자들을 볼 수 있도록 (내가 제작한 해커톤인 경우에만 보이게 ) */}
    {isOwner && isPopupOpen && (
      <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex justify-center items-center z-[1000]">
        <div className="bg-white p-[20px] rounded-[8px] w-[50vw] shadow-[0_4px_6px_rgba(0,0,0,0.1)] relative">
          <button className="bg-none border-none text-[1.5rem] absolute top-[1em] right-[1em] cursor-pointer text-[#0a27a6]" onClick={handlePopupToggle}>X</button>
          <div className="mt-[6vh]">
            <h2 className="font-bold font-['OTF_B'] text-[#0a27a6] text-center">지원자</h2>
            <p className="text-[#000]">
              {HackathonData.participant && HackathonData.participant.length > 0 ? (
                HackathonData.participant.map((participant, index) => (
                  <li key={index}>{participant}</li>
                ))
              ) : (
                <li>지원자가 없습니다.</li>
              )}
            </p>
          </div>
        </div>
      </div>
    )}


    </div>
        

    </>
    
  );
};

export default HackathonDetailPage;