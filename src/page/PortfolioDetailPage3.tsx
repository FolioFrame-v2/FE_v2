import { useParams, useNavigate } from '@tanstack/react-router';
import React, { useEffect, useState, useRef } from "react";


// removed domain/features import
// removed domain/features import
//기업 연락
// removed domain/features import
//좋아요


import WritingBox from "@/components/PortfolioDetailPage/WritingBox";
import CommentList from "@/components/PortfolioDetailPage/CommentList";

//arrow 이미지
import greaterThanSign from "@/assets/images/PortfolioDetailPage3/greaterThanSign.svg";
import lessThanSign from "@/assets/images/PortfolioDetailPage3/lessThanSign.svg";

//logo 이미지
import logo from "@/assets/icons/Logo.png";
//heart 이미지
import heart_none from "@/assets/images/PortfolioDetailPage3/heart-none.svg";
import heart_fill from "@/assets/images/PortfolioDetailPage3/heart-fill.svg";
//sample 이미지
import sample from "@/assets/images/PortfolioDetailPage3/sample.png";
//sample 비디오
import sampleVideo from "@/assets/images/PortfolioDetailPage3/sampleVideo.mp4";

// removed domain/features import

const PortfolioDetailPage3 = () => {
  const portfolioId = "mock-portfolio-id";
  const [portfolioData, setPortfolioData] = useState({
    projectTitle: "Mock Portfolio 3",
    description: "Mock Description",
    ownerName: "Mock Owner",
    ownerNickname: "MockNickname",
    ownerEmail: "owner@example.com",
    contacts: ["mock-contact"],
    likes: ["mock-like"],
    projectLink: "https://mock.link",
    startDate: "2026-06-20",
    endDate: "2026-06-30",
    solving: "Mock solving problem",
    challenge: "Mock challenge",
    usedLanguage: "React, Node.js",
    video: "",
    images: [] as any[],
    logo: "",
    hits: 100,
    certifications: "정보처리기사 (2026.05), SQLD (2025.10)",
    education: "한국대학교 컴퓨터공학과 학사 졸업 (2022.03 - 2026.02)",
  });
  const [comments, setComments] = useState<any[]>([]); // []로 부터 받아온 필터된 포트폴리오
  const [enlargedImage, setEnlargedImage] = useState(null); //
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showModal, setShowModal] = useState(false); // "연락" 버튼 눌렀을 때 true
  const [modalMessage, setModalMessage] = useState(""); //"연락" 버튼 눌렀을 때 창에 띄워지는 메세지
  const [isOwner, setIsOwner] = useState(true);
  const [isLiked, setIsLiked] = useState(false); //"좋아요" 눌렀을 때 상태 반영

  const mediaRef = useRef(null); //비디오, 사진 부분 스크롤
  const currentUser = { id: "mock-id", email: "owner@example.com", recruiter: false, name: "MockUser" };
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (mediaRef.current) {
      mediaRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (mediaRef.current) {
      const maxScrollLeft =
        mediaRef.current.scrollWidth - mediaRef.current.clientWidth;
      const currentScrollLeft = mediaRef.current.scrollLeft;
      const scrollAmount = 300;
      const newScrollLeft = Math.min(
        currentScrollLeft + scrollAmount,
        maxScrollLeft
      );
      mediaRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };


  const addComment = (text: any) => {
    console.log("Mock add comment:", text);
    setComments((prev: any) => [{ id: Date.now(), text, author: "MockUser" }, ...prev]);
  };

  //기업 연락
  const handleContactClick = () => {
    if (currentUser && currentUser.recruiter) {
      setShowContactInfo(true); // 개발자 정보 표시
      setShowModal(true);
      setModalMessage("채용자 페이지에 저장되었습니다.");
    } else {
      setShowModal(true);
      setModalMessage("기업 회원만 연락 버튼을 사용할 수 있습니다.");
    }
  };

  //좋아요 클릭
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const renderDeveloperInfo = () => {
    if (currentUser.recruiter && showContactInfo) {
      return (
        <>
          <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{portfolioData.ownerName || "이름 없음.."}</div>
          <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{portfolioData.ownerEmail || "이메일 없음.."}</div>
        </>
      );
    } else if (currentUser.recruiter) {
      return (
        <div className="flex justify-center items-center my-[1.2vh]">
          <button className="bg-[#0a27a6] text-white py-[8px] px-[12px] border-none rounded-[4px] font-['OTF_B']" onClick={handleContactClick}>연락</button>
        </div>
      );
    } else {
      return (
        <>
          <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{portfolioData.ownerNickname || "익명"}</div>
          <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">example@example.com</div>
        </>
      );
    }
  };

  if (!portfolioData) {
    return <div className="text-center text-[18px] p-[50px]">로딩 중...</div>;
  }

  console.log(portfolioData.projectTemplate);

  return (
    <div className="w-[85%] mx-auto">
      <div className="text-center mb-[20px]">
        <div className="flex justify-center items-center">
          <h1 className="w-[6vw] h-[6vw] [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
            {portfolioData.logo ? (
              <img
                src={`http://localhost:3000/${portfolioData.logo}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "1em",
                }}
              />
            ) : (
              <img src={logo} alt="projectLogo" />
            )}
          </h1>
          <h1 className="text-[5vw] font-[Impact]">{portfolioData.projectTitle}</h1>
        </div>
        <h3 className="text-[1.4vw] text-[#666] mb-[5vh]">{portfolioData.description}</h3>
      </div>

      <div className="flex gap-[1vw] mb-[3vh]">
        <button className="bg-[#0a27a6] text-white py-[8px] px-[12px] border-none rounded-[4px] font-['OTF_B']">조회수 {portfolioData.hits || 0}</button>
        <button className="bg-[#0a27a6] text-white py-[8px] px-[12px] border-none rounded-[4px] font-['OTF_B']">기업 연락 {portfolioData.contacts.length || 0}</button>
        <div className="flex justify-between items-center gap-[0.4vw] w-[2vw] cursor-pointer font-bold [&>img]:w-[1.5vw] [&>img]:h-auto [&>img]:object-contain" onClick={handleLikeClick}>
          <img
            src={isLiked ? heart_fill : heart_none} // 좋아요 상태에 따라 이미지 변경
            alt={isLiked ? "heart-fill" : "heart-none"}
          />
          <div className="font-['OTF_B']">{portfolioData.likes.length}</div>
        </div>
      </div>

      <div className="p-[2vh] mb-[4vh] bg-[rgb(245,247,247)]">
        <div className="grid grid-cols-2 mb-[5vh]">
          <div className="flex flex-col items-center mb-[2vh] font-[Impact]">
            <div className="text-[2vw] font-bold">프로젝트 링크</div>
            <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{portfolioData.projectLink || "링크 없음"}</div>
          </div>
          <div className="flex flex-col items-center mb-[2vh] font-[Impact]">
            <div className="text-[2vw] font-bold">개발자</div>
            <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{renderDeveloperInfo()}</div>
          </div>
          <div className="flex flex-col items-center mb-[2vh] font-[Impact]">
            <div className="text-[2vw] font-bold">참여 기간</div>
            <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">
              {portfolioData.startDate} - {portfolioData.endDate}
            </div>
          </div>
          <div className="flex flex-col items-center mb-[2vh] font-[Impact]">
            <div className="text-[2vw] font-bold">사용한 스택</div>
            <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{portfolioData.usedLanguage || ""}</div>
          </div>
          <div className="flex flex-col items-center mb-[2vh] font-[Impact]">
            <div className="text-[2vw] font-bold">학력</div>
            <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{portfolioData.education || "학력 정보 없음"}</div>
          </div>
          <div className="flex flex-col items-center mb-[2vh] font-[Impact]">
            <div className="text-[2vw] font-bold">자격증</div>
            <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{portfolioData.certifications || "자격증 정보 없음"}</div>
          </div>
        </div>

        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000] ModalOverlay">
            <div className="bg-white text-[1.3vw] font-bold p-[1vw] w-[25vw] rounded-[0.3125em] text-center shadow-[0_4px_6px_rgba(0,0,0,0.1)] z-[1001] [&>button]:mt-[1.5vw] [&>button]:py-[0.5vw] [&>button]:px-[1vw] [&>button]:bg-[#0a27a6] [&>button]:text-white [&>button]:border-none [&>button]:rounded-[0.3125em] [&>button]:cursor-pointer hover:[&>button]:bg-[#0056b3]">
              <p>{modalMessage}</p>
              <button onClick={() => setShowModal(false)}>확인</button>
            </div>
          </div>
        )}

        <div className="relative flex items-center">
          <button className="absolute top-1/2 -translate-y-1/2 flex justify-center items-center bg-white border-none cursor-pointer p-[1vw] shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-full z-10 hover:-translate-y-1/2 hover:scale-110 left-0" onClick={scrollLeft} style={{ left: '-25px' }}>
            <img className="w-[1.5vw] h-[1.5vw]" src={lessThanSign} alt="Scroll Left" />
          </button>
          <div className="flex overflow-x-scroll overscroll-x-contain snap-x snap-mandatory scroll-pl-[var(--carousel-start-offset)] scroll-pr-[var(--carousel-end-offset)] [scrollbar-width:none] gap-[1vw] p-[1vw] rounded-[0.3125em] mb-[5vh] scroll-smooth" ref={mediaRef}>
            <div className="flex items-center justify-center gap-[1vw] p-[1vw] shrink-0 overflow-x-auto rounded-[0.3125em] bg-[#0a27a6] text-white">
              <div className="w-[25vw] h-[20vh] bg-[#0a27a6] text-white flex items-center justify-center rounded-[0.3125em] overflow-hidden shrink-0 [&>video]:w-full [&>video]:h-full [&>video]:object-cover">
                <video width="100%" height="100%" controls>
                  <source src={sampleVideo} type="video/mp4" />
                </video>
              </div>
            </div>

            {portfolioData.images &&
              portfolioData.images.length > 0 &&
              portfolioData.images.slice(0, 4).map((image, index) => (
                <div className="flex items-center justify-center gap-[1vw] p-[1vw] shrink-0 overflow-x-auto rounded-[0.3125em] bg-[#0a27a6] text-white" key={index}>
                  <div className="rounded-[0.3125em] w-[25vw] h-[20vh] flex items-center justify-center overflow-hidden shrink-0 cursor-pointer [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
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
                </div>
              ))}
          </div>
          <button className="absolute top-1/2 -translate-y-1/2 flex justify-center items-center bg-white border-none cursor-pointer p-[1vw] shadow-[0_4px_6px_rgba(0,0,0,0.1)] rounded-full z-10 hover:-translate-y-1/2 hover:scale-110 right-0" onClick={scrollRight} style={{ right: '-25px' }}>
            <img className="w-[1.5vw] h-[1.5vw]" src={greaterThanSign} alt="Scroll Right" />
          </button>
        </div>

        {enlargedImage && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center z-10" onClick={() => setEnlargedImage(null)}>
            <img className="max-w-[90%] max-h-[90%] rounded-[10px]" src={enlargedImage} alt="Enlarged project image" />
          </div>
        )}

        <div className="mb-[20px]">
          <div className="flex flex-col my-[2vw] mx-[1vw] font-[Impact]">
            <div className="text-[2vw] font-bold">해결하는 문제</div>
            <div className="rounded-[0.3125em] shadow-[0_0.5em_1em_rgba(0,0,0,0.1)] bg-white p-[1vw] mt-[2vw] min-w-[80%]">{portfolioData.solving || "해결한 문제 없음"}</div>
          </div>
          <div className="flex flex-col my-[2vw] mx-[1vw] font-[Impact]">
            <div className="text-[2vw] font-bold">내가 마주친 도전</div>
            <div className="rounded-[0.3125em] shadow-[0_0.5em_1em_rgba(0,0,0,0.1)] bg-white p-[1vw] mt-[2vw] min-w-[80%]">{portfolioData.challenge || "도전 내용 없음"}</div>
          </div>
        </div>
      </div>

      {/* 수정 버튼 작성자와 포폴의 아이디가 동일할 경우에만 보이게한다. */}
      {isOwner && (
        <div className="flex justify-end gap-[1em]">
          <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
            onClick={() => {
              navigate({ to: `/modifyportfolio/${portfolioId}` });
            }}
          >
            수정
          </button>
          <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
            onClick={async () => {
              await void 0;
              navigate({ to: `/my` });
            }}
          >
            삭제
          </button>
        </div>
      )}

      <div className="mt-[20px]">
        <h2 className="text-[18px]">댓글</h2>
        <WritingBox addComment={addComment} />
        <CommentList
          comments={comments}
          setComments={setComments}
          portfolioId={portfolioId}
        />
      </div>
    </div>
  );
};
export default PortfolioDetailPage3;
