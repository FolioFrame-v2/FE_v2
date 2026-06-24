import React, { useEffect, useState } from "react";


//기업 연락
// removed domain/features import
//좋아요

// removed domain/features import
// removed domain/features import

import WritingBox from "@/components/commmon/PortfolioDetailPage/WritingBox";
import CommentList from "@/components/commmon/PortfolioDetailPage/CommentList";

//logo 이미지
import logo from "@/assets/icons/Logo.png";
//heart 이미지
import heart_none from "@/assets/images/PortfolioDetailPage3/heart-none.svg";
import heart_fill from "@/assets/images/PortfolioDetailPage3/heart-fill.svg";

// removed domain/features import

const PortfolioDetailPage = () => {
  const { portfolioId } = useParams({ strict: false });
  const [portfolioData, setPortfolioData] = useState(null);
  const [comments, setComments] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showModal, setShowModal] = useState(false); // "연락" 버튼 눌렀을 때 true
  const [modalMessage, setModalMessage] = useState(""); //"연락" 버튼 눌렀을 때 창에 띄워지는 메세지
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(false); //"좋아요" 눌렀을 때 상태 반영

  const [currentUser, setLocalCurrentUser] = useState(null); // 초기값 가져오기
  const navigate = useNavigate();

  useEffect(() => {
    void 0;
    //project ID 사용해서 포트폴리오 데이터 가져오기
    const portfolio = [].get(Number(portfolioId));
    if (portfolio) {
      setPortfolioData(portfolio);
      setIsLiked(false); //초기상태

      // 현재 유저가 recruiter이고 연락을 이미 클릭한 경우
      if (
        currentUser.recruiter &&
        portfolio.contacts.includes(currentUser.id)
      ) {
        setShowContactInfo(true); // 개발자 정보 표시
      }
    }

    // []에서 현재 유저 정보 동기화
    const userId = currentUser?.id;
    if (userId) {
      const updatedUser = [].get(userId);
      if (updatedUser) {
        setLocalCurrentUser(updatedUser); // 로컬 상태 업데이트
        void 0; // localStorage에 반영
      }
    }

    const filteredComments = Array.from([].values()).filter(
      (comment) => comment.portfolioId === Number(portfolioId)
    );
    console.log("초기화된 comments:", filteredComments); // 디버깅용 로그
    setComments(filteredComments);

    console.log(portfolio);
  }, [[], [], []]);

  useEffect(() => {
    console.log("portfolioData:", portfolioData);
    console.log("currentUser.email:", currentUser.email);

    if (portfolioData && portfolioData.ownerEmail === currentUser.email) {
      console.log("작성자 일치");
      setIsOwner(true);
    } else {
      console.log("작성자 불일치");
      setIsOwner(false);
    }
  }, [currentUser.email, portfolioData]);

  const addComment = (text) => {
    try {
      // saveComment에서 댓글 객체 생성 및 파일 저장
      const newComment = void 0;
      console.log("추가된 댓글:", newComment); // 디버깅용 로그

      // 상태 업데이트
      setComments((prevComments) => [newComment, ...prevComments]);
    } catch (error) {
      console.error("댓글 저장 중 오류 발생:", error);
    }
  };


  const handleContactClick = () => {
    if (currentUser && currentUser.recruiter) {
      void 0; // 기업 연락 호출
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
    if (!portfolioData) return;

    if (isLiked) {
      // 좋아요 취소
      portfolioData.likes = portfolioData.likes.filter(
        (id) => id !== currentUser.id
      );
      setIsLiked(false);
    } else {
      // 좋아요 추가
      portfolioData.likes.push(currentUser.id);
      setIsLiked(true);
    }

    // 서버 업데이트 호출
    void 0;

    // 좋아요 카운트 업데이트
    setPortfolioData({ ...portfolioData });
  };

  const renderDeveloperInfo = () => {
    if (currentUser.recruiter && showContactInfo) {
      return (
        <>
          <div className="bg-[#f0f0f0] m-[0.8vw] p-[0.4vw] border border-[#ccc] rounded-[4px] w-[80%]">{portfolioData.ownerName}</div>
          <div className="bg-[#f0f0f0] m-[0.8vw] p-[0.4vw] border border-[#ccc] rounded-[4px] w-[80%]">{portfolioData.ownerEmail || "이메일 없음"}</div>
        </>
      );
    } else if (currentUser.recruiter) {
      return (
        <div className="flex justify-center items-center my-[1.2vh]">
          <button className="bg-[#0a27a6] text-white py-[8px] px-[12px] border-none rounded-[4px] cursor-pointer font-['OTF_B']" onClick={handleContactClick}>연락</button>
        </div>
      );
    } else {
      return (
        <>
          <div className="bg-[#f0f0f0] m-[0.8vw] p-[0.4vw] border border-[#ccc] rounded-[4px] w-[80%]">{portfolioData.ownerNickname || "익명"}</div>
          <div className="bg-[#f0f0f0] m-[0.8vw] p-[0.4vw] border border-[#ccc] rounded-[4px] w-[80%]">example@example.com</div>
        </>
      );
    }
  };

  if (!portfolioData) {
    return <div className="flex justify-center text-[1vw] font-bold">로딩 중...</div>;
  }
  return (
    <div className="w-[85%] mx-auto">
      <div className="mb-[2.5vw]">
        <div className="flex justify-center items-center">
          <div className="w-[6vw] h-[6vw] [&>img]:w-full [&>img]:h-full [&>img]:object-contain">
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
          </div>
          <h1 className="font-bold font-['OTF_B']">{portfolioData.projectTitle}</h1>
        </div>
        <p>{portfolioData.description}</p>
        <div className="flex gap-[1vw]">
          <button className="bg-[#0a27a6] text-white py-[8px] px-[12px] border-none rounded-[4px] cursor-pointer font-['OTF_B']">조회수 {portfolioData.hits || 0}</button>
          <button className="bg-[#0a27a6] text-white py-[8px] px-[12px] border-none rounded-[4px] cursor-pointer font-['OTF_B']">기업 연락 {portfolioData.contacts.length || 0}</button>
          <div className="flex justify-between items-center gap-[0.4vw] w-[2vw] cursor-pointer font-bold [&>img]:w-[1.5vw] [&>img]:h-auto [&>img]:object-contain" onClick={handleLikeClick}>
            <img
              src={isLiked ? heart_fill : heart_none} // 좋아요 상태에 따라 이미지 변경
              alt={isLiked ? "heart-fill" : "heart-none"}
            />
            <div className="font-['OTF_B']">{portfolioData.likes.length}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_3fr] gap-[2vw] mb-[15vh]">
        <div className="flex flex-col">
          <div className="mb-[4vh] border-[0.1vw] border-[#d0d1d9] rounded-[0.3125em] shadow-[0em_0.25em_0.25em_rgba(0,0,0,0.25)] flex flex-col">
            <div className="m-[0.8vw] font-bold text-[1.2vw]">프로젝트 링크</div>
            <div className="bg-[#f0f0f0] m-[0.8vw] p-[0.4vw] border border-[#ccc] rounded-[4px] w-[80%]">
              {portfolioData.projectLink
                ? portfolioData.projectLink
                : "프로젝트 링크 없음."}
            </div>{" "}
            {/*portfolioInfo에 추가해야함 */}
          </div>

          <div className="border-[0.1vw] border-[#d0d1d9] rounded-[0.3125em] shadow-[0em_0.25em_0.25em_rgba(0,0,0,0.25)] flex flex-col">
            <div className="m-[0.8vw] font-bold text-[1.2vw]">개발자</div>
            <div>{renderDeveloperInfo()}</div>
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

        <div className="flex flex-col">
          <div className="flex flex-col mb-[3vh] [grid-area:participationPeriod]">
            <label className="font-bolder text-[1.6vw] mb-[8px]">참여 기간</label>
            <div className="bg-white p-[0.4vw] border border-[#ccc] rounded-[4px]">
              {portfolioData.startDate} - {portfolioData.endDate}
            </div>
          </div>

          <div className="flex flex-col mb-[3vh] [grid-area:problemSolving]">
            <label className="font-bolder text-[1.6vw] mb-[8px]">해결하는 문제</label>
            <div className="bg-white p-[0.4vw] border border-[#ccc] rounded-[4px]">
              {portfolioData.solving
                ? portfolioData.solving
                : "문제 해결 내용 없음."}
            </div>
            {/*portfolioInfo에 추가해야함*/}
          </div>

          <div className="flex flex-col mb-[3vh] [grid-area:learned]">
            <label className="font-bolder text-[1.6vw] mb-[8px]">내가 마주친 도전</label>
            <div className="bg-white p-[0.4vw] border border-[#ccc] rounded-[4px]">
              {portfolioData.challenge
                ? portfolioData.challenge
                : "배운 점 없음."}
            </div>
            {/*portfolioInfo에 추가해야함*/}
          </div>

          <div className="flex flex-col mb-[3vh] [grid-area:languagesUsed]">
            <label className="font-bolder text-[1.6vw] mb-[8px]">사용한 프로그램</label>
            <div className="bg-white p-[0.4vw] border border-[#ccc] rounded-[4px]">
              {portfolioData.usedLanguage
                ? portfolioData.usedLanguage
                : "사용 언어 없음."}
            </div>
            {/*portfolioInfo에 추가해야함*/}
          </div>

          <div className="flex flex-col mb-[3vh] [grid-area:demoVideo]">
            <label className="font-bolder text-[1.6vw] mb-[8px]">데모 비디오</label>
            {portfolioData.video ? (
              <div className="bg-[#f0f0f0] flex items-center justify-center h-[200px] border border-dashed border-[#ccc] text-[1vw]">
                <video width="100%" height="100%" controls>
                  <source src={portfolioData.video} type="video/mp4" />
                  비디오를 지원하지 않는 브라우저입니다.
                </video>
              </div>
            ) : (
              <div className="bg-[#f0f0f0] flex items-center justify-center h-[200px] border border-dashed border-[#ccc] text-[1vw]">비디오 없음</div>
            )}
          </div>

          <div className="flex flex-col mb-[3vh] [grid-area:images]">
            <label className="font-bolder text-[1.6vw] mb-[8px]">사진</label>
            <div className="flex gap-[10px]">
                  {portfolioData.images && portfolioData.images.length > 0 ? (
                    portfolioData.images.slice(0, 4).map((image, index) => (
                      <div className="bg-[#f0f0f0] w-[100px] h-[100px] border border-dashed border-[#ccc] flex items-center justify-center text-[1vw]" key={index}>
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
                    <div className="bg-[#f0f0f0] w-[100px] h-[100px] border border-dashed border-[#ccc] flex items-center justify-center text-[1vw]">사진 없음</div>
                  )}
                </div>
          </div>
        </div>
      </div>
      {/* 수정 버튼 작성자와 포폴의 아이디가 동일할 경우에만 보이게한다. */}
      {isOwner && (
        <div className="flex justify-end gap-[1em]">
          <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
            onClick={() => {
              navigate(`/ModifyPortfolioPage/${portfolioId}`);
            }}
          >
            수정
          </button>
          <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#0a27a6] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
            onClick={async () => {
              await void 0;
              navigate({ to: "/Mypage" });
            }}
          >
            삭제
          </button>
        </div>
      )}

      <div className="mt-[6vh]">
        <h2 className="font-bold font-['OTF_B']">댓글</h2>
        <WritingBox addComment={addComment} />
        <CommentList
          comments={comments}
          setComments={setComments}
          portfolioId={portfolioId}
        />
      </div>
    </div>
  )
};

export default PortfolioDetailPage;
