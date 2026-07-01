// import { useParams } from '@tanstack/react-router';
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "@tanstack/react-router";

// // removed domain/features import
// // removed domain/features import
// // removed domain/features import
// // removed domain/features import
// // removed domain/features import


// //logo 이미지
// import logo from "@/assets/icons/Logo.png";

// import person from "@/assets/icons/person.png";
// import Calendar from "@/assets/icons/Calendar.png";

// import Link from "@/assets/icons/Link.png";
// import { SiThangs } from "react-icons/si";
// import { Bookmark } from 'lucide-react';

// // removed domain/features import

// const HackathonDetailPage = () => {
//   // const hackId = Number(useParams({ strict: false }).hackId); // URL에서 hackId를 숫자로 변환
//   const [HackathonData, setHackathonData] = useState({
//     hackName: "Mock Hackathon",
//     ownerEmail: "mock@example.com",
//     ownerId: "mock-id",
//     maxMemNumber: 5,
//     part: "Frontend",
//     link: "http://example.com",
//     description: "This is a mock hackathon description.",
//     pictures: [],
//     video: "",
//     coverImage: "",
//     logo: "",
//     startDate: "2026-06-24",
//     endDate: "2026-06-30",
//     participant: ["user1", "user2"],
//   });
//   const [isOwner, setIsOwner] = useState(true);
//   const [isFull, setIsFull] = useState(false);
//   const [isUserParticipant, setIsUserParticipant] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false); // 팝업 상태 추가
//   const [isBookmarked, setIsBookmarked] = useState(false); // 북마크 상태 추가

//   const navigate = useNavigate();
//   const currentUser = { id: "mock-id", email: "mock@example.com" };

//   const userId = currentUser.id;

//   const handleParticipation = async () => {
//     console.log("Mock handleParticipation called");
//   };

//   // 사진 업로드 핸들러
//   // const handlePhotosChange = (index: any) => (e) => {
//   //   console.log("Mock handlePhotosChange", index);
//   // };

//   // 커버 이미지 업로드 핸들러
//   const handleCoverImageChange = (e: any) => {
//     console.log("Mock handleCoverImageChange");
//   };

//   // 홍보 비디오 URL 핸들러
//   const handleVideoChange = (e: any) => {
//     console.log("Mock handleVideoChange");
//   };

//   const handlePopupToggle = () => {
//     setIsPopupOpen((prev: any) => !prev);
//   };



//   return (
//     <>
//       <div className="w-[85%] mx-auto flex justify-between items-start gap-[2em]">
//         {/* 본문 */}
//         <div className="flex-1">
//           <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">{HackathonData.hackName}</h1>
//           <hr className="my-[1.5vh] border border-[#d0d1d9]"></hr>
//           <div className="flex flex-row gap-[1em]">
//             <p className="w-[4em] h-[1.5em] text-white font-bold font-['OTF_R'] text-[1em] border border-[#ccc] rounded-[0.2em] bg-[#0a27a6] flex items-center justify-center">모집인원</p>
//             <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000] mt-[1.2em]">{HackathonData.maxMemNumber + "명" || "없습니다."}</h1>
//             <p className="w-[4em] h-[1.5em] text-white font-bold font-['OTF_R'] text-[1em] border border-[#ccc] rounded-[0.2em] bg-[#0a27a6] flex items-center justify-center">모집파트</p>
//             <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000] mt-[1.2em]">{HackathonData.part || "없습니다."}</h1>
//             {/* <Mem2>현재 참여중인 인원</Mem2>
//           <MemTitle>{HackathonData.participant.length || "없습니다."}</MemTitle> */}
//           </div>
//           <div className="flex flex-row gap-[1em]">
//             <div className="relative inline-block w-[60%]">
//               <img className="absolute left-[10px] top-[50%] -translate-y-[50%] w-[20px] h-[20px]" src={Link} alt="Link" />
//               <input className="border-[1.4px] border-[#0a27a6] rounded-[1em] w-full h-[2em] pl-[35px]" value={HackathonData.link || "없습니다."} readOnly />
//             </div>
//           </div>
//           {/* 해커톤 설명 */}
//           <hr className="my-[1.5vh] border border-[#d0d1d9]"></hr>
//           <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">해커톤 설명</h1>
//           <div className="w-full h-[100vh] text-[#ccc] rounded-[2em] shadow-[0_4px_8px_rgba(0,0,0,0.2)] mb-[2em] flex flex-col items-center justify-center">
//             <p className="font-bold font-['OTF_R'] text-[1em] text-[#000]">{HackathonData.description || "없습니다"}</p>
//           </div>
//           <hr className="my-[1.5vh] border border-[#d0d1d9]"></hr>
//           <div className="flex flex-row gap-[1em]">
//             {/* 사진 */}
//             <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">사진</h1>
//             <div
//               className="flex items-start gap-[20px]"
//             >
//               <div
//                 className="flex flex-wrap gap-[10px] flex-[1] ml-[2em] w-[80%] justify-between"
//               >
//                 {HackathonData.pictures && HackathonData.pictures.length > 0 ? (
//                   HackathonData.pictures.slice(0, 4).map((image, index) => (
//                     <div className="inline-block text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle"
//                       key={index}
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         overflow: "hidden",
//                       }}
//                     >
//                       <img
//                         src={`http://localhost:3000/${image}`}
//                         alt={`프로젝트 이미지 ${index + 1}`}
//                         style={{
//                           width: "100%",
//                           height: "100%",
//                           objectFit: "cover",
//                           borderRadius: "8px",
//                         }}
//                       />
//                     </div>
//                   ))
//                 ) : (
//                   <div className="inline-block text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle" style={{ width: "100px", height: "100px" }}>+</div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex w-full">
//             {/* 홍보 비디오 */}
//             <div className="flex flex-col">
//               <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">홍보 비디오</h1>
//               {!HackathonData.video ? (
//                 <input className="border border-[#d0d1d9] rounded-[2em] outline-none h-[20em] w-[35em] indent-[1em] placeholder:indent-[1em]"
//                   type="url"
//                   value={HackathonData.video || ""}
//                   placeholder="비디오 URL을 입력하세요"
//                   onChange={handleVideoChange}
//                 />
//               ) : (
//                 <div>
//                   <video controls width="100%">
//                     <source src={HackathonData.video} type="video/mp4" />
//                     <p>비디오 재생을 지원하지 않는 브라우저입니다.</p>
//                   </video>
//                 </div>
//               )}

//             </div>

//             {/* 커버 이미지 */}
//             <div className="flex flex-col">
//               <h1 className="text-[#0a27a6] font-bold font-['OTF_B'] ml-[1em]">커버 이미지</h1>
//               <div className="flex justify-between ml-[2em] w-[80%]">
//                 {HackathonData.coverImage ? (
//                   <img
//                     src={`http://localhost:3000/${HackathonData.coverImage}`}
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       // width: "100%",
//                       // height: "100%",
//                       objectFit: "cover",
//                       borderRadius: "1em",
//                       display: "block",
//                       marginLeft: "auto",
//                       marginRight: "auto",
//                     }}
//                   />
//                 ) : (
//                   <div className="inline-block w-[5em] h-[5em] text-[#d0d1d9] bg-[#fdfdfd] cursor-pointer border border-[#d0d1d9] rounded-[1em] text-center flex items-center justify-center align-middle">+</div>
//                 )}
//               </div>
//               {/* {HackathonData.coverImage ? (
//             <img
//               src={`http://localhost:3000/${HackathonData.coverImage}`}
//               style={{
//               width: "40%",
//               height: "30%",
//               objectFit: "cover",
//               borderRadius: "1em",
//               display: "block", // 중앙 정렬에 도움
//               marginLeft: "auto", // 오른쪽 이동
//               marginRight: "auto", // 중앙 정렬 유지
//             }}
//             />
//           ) : (
//             <ImageBox>+</ImageBox>
//          )} */}
//             </div>
//           </div>
//         </div>

//         {/* 오른쪽 사이드 창 */}
//         <div className="sticky top-[10vh] w-[50vh] h-[50vh] bg-white p-[5px_10px] shadow-[0px_4px_6px_rgba(0,0,0,0.4)] overflow-y-auto rounded-[2em] flex flex-col items-center justify-center relative">
//           <button
//             onClick={() => setIsBookmarked(!isBookmarked)}
//             className="absolute top-4 right-6 p-2 rounded-full bg-white/80 hover:bg-white text-ink-soft hover:text-primary transition-colors shadow-sm"
//           >
//             <Bookmark className={`size-6 ${isBookmarked ? "fill-[#0a27a6] text-[#0a27a6]" : "text-[#d0d1d9]"}`} />
//           </button>
          
//           <h1 className="w-[6vw] h-[6vw] mb-[-1em] [&>img]:w-full [&>img]:h-full [&>img]:object-contain mt-[1em]">
//             {HackathonData.logo ? (
//               <img
//                 src={`http://localhost:3000/${HackathonData.logo}`}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                   borderRadius: "1em",
//                 }}
//               />
//             ) : (
//               <img src={logo} alt="Logo" />
//             )}

//           </h1>
//           <h1 className="text-[#0a27a6] font-bold font-['OTF_B']">{HackathonData.hackName}</h1>
//           <div className="flex flex-row gap-[1em]">
//             <div>
//               <div className="flex flex-row gap-[1em]">
//                 <img className="w-[1.5em] h-[1.4em] mt-[0.4em]" src={Calendar} alt="달력" />
//                 <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000]">
//                   모집기간 {HackathonData.startDate} - {HackathonData.endDate}
//                 </h1>
//               </div>
//               <div className="flex flex-row gap-[1em]">
//                 <img className="w-[1.5em] h-[1.5em] mt-[1em]" src={person} alt="사람" />
//                 <p className="w-[8em] h-[1.5em] text-[#000] font-bold font-['OTF_R'] text-[1em] ml-[-0.1em] flex items-center justify-center">현재 참여중인 인원 : </p>
//                 <h1 className="font-bold font-['OTF_R'] text-[1em] text-[#000] mt-[1.2em]">{HackathonData.participant.length || "없습니다."}</h1>
//               </div>

//             </div>
//           </div>
//           <button className={`text-[1em] font-extrabold rounded-[2em] border-none h-[3em] w-[50%] font-['OTF_R'] flex items-center justify-center relative ${isFull ? "bg-[#cccccc] text-[#666666] cursor-not-allowed" : "bg-[#0a27a6] text-[#ffffff] cursor-pointer"}`}
//             onClick={() => {
//               if (isOwner) {
//                 console.log("팝업 상태를 토글합니다.");
//                 handlePopupToggle();
//               } else {
//                 handleParticipation();
//               }
//             }}
//           >
//             {isOwner ? "지원현황" : isUserParticipant ? "지원완료" : "지원하기"}
//           </button>
//         </div>

//       </div>
//       <div className="w-[85%] mx-auto">
//         {/* 수정, 삭제 버튼 */}
//         {isOwner && (
//           <div className="flex mr-[2em] justify-end gap-[1em]">
//             <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
//             // onClick={() => {
//             //   navigate({ to: `/modifyhackathon/${hackId}` });
//             // }}
//             >
//               수정
//             </button>
//             {/* <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
//               onClick={async () => {
//                 // 해커톤 삭제
//                 await deleteHackathon(hackId);
//                 // Mypage로 이동
//                 navigate({ to: `/my` });
//               }}>삭제</button> */}
//           </div>
//         )}

//         {/* 지원현황을 클릭하면 지원자들을 볼 수 있도록 (내가 제작한 해커톤인 경우에만 보이게 ) */}
//         {isOwner && isPopupOpen && (
//           <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50 flex justify-center items-center z-[1000]">
//             <div className="bg-white p-[20px] rounded-[8px] w-[50vw] shadow-[0_4px_6px_rgba(0,0,0,0.1)] relative">
//               <button className="bg-none border-none text-[1.5rem] absolute top-[1em] right-[1em] cursor-pointer text-[#0a27a6]" onClick={handlePopupToggle}>X</button>
//               <div className="mt-[6vh]">
//                 <h2 className="font-bold font-['OTF_B'] text-[#0a27a6] text-center">지원자</h2>
//                 <p className="text-[#000]">
//                   {HackathonData.participant && HackathonData.participant.length > 0 ? (
//                     HackathonData.participant.map((participant, index) => (
//                       <li key={index}>{participant}</li>
//                     ))
//                   ) : (
//                     <li>지원자가 없습니다.</li>
//                   )}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}


//       </div>

//     </>

//   );
// };

// export default HackathonDetailPage;