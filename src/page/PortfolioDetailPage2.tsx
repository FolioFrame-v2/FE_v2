import React, { useEffect, useState } from "react";


//기업 연락
// removed domain/features import
//좋아요

// removed domain/features import
// removed domain/features import

import WritingBox from "@/components/commmon/PortfolioDetailPage/WritingBox";
import CommentList from "@/components/commmon/PortfolioDetailPage/CommentList";

//image
import Notepad3 from "@/assets/images/PortfolioDetailPage2/Notepad3.png";
import Notepad5 from "@/assets/images/PortfolioDetailPage2/Notepad5.png";
import Notepad12 from "@/assets/images/PortfolioDetailPage2/Notepad12.png";
import Notepad16 from "@/assets/images/PortfolioDetailPage2/Notepad16.png";

//heart 이미지
import heart_none from "@/assets/images/PortfolioDetailPage3/heart-none.svg";
import heart_fill from "@/assets/images/PortfolioDetailPage3/heart-fill.svg";

// removed domain/features import

const PortfolioDetailPage2 = () => {
  const { portfolioId } = useParams({ strict: false });
  const [portfolioData, setPortfolioData] = useState(null);
  const [comments, setComments] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showModal, setShowModal] = useState(false); // "연락" 버튼 눌렀을 때 true
  const [modalMessage, setModalMessage] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(false); //"좋아요" 눌렀을 때 상태 반영

  const [currentUser, setLocalCurrentUser] = useState(null); // 초기값 가져오기
  const navigate = useNavigate();
  useEffect(() => {
    void 0;
    //project ID 사용해서 포트폴리오 데이터 가져오기
    const portfolio = [].get(Number(portfolioId));
    console.log("portfolioId: ", Number(portfolioId));
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
    setComments(filteredComments);

    console.log(portfolio);
  }, [[], [], []]);

  useEffect(() => {
    console.log("portfolioData:", portfolioData);
    console.log("currentUser.email:", currentUser.email);
    console.log("portfolioId: ", Number(portfolioId));

    if (portfolioData && portfolioData.ownerEmail === currentUser.email) {
      console.log("작성자 일치");
      setIsOwner(true);
    } else {
      console.log("작성자 불일치");
      setIsOwner(false);
    }
  }, [currentUser.email, portfolioData]);

  // const addComment = (newCommentObj) => {
  //   // const newComment = {
  //   //   commentId: Date.now(),
  //   //   portfolioId: Number(portfolioId),
  //   //   userId: currentUser.id,
  //   //   text: newCommentObj.text,
  //   //   date: new Date().toISOString(),
  //   // };

  //   // 클라이언트 측 상태 업데이트
  //   //[].set(newComment.commentId, newComment);
  //   setComments((prevComments) => [newCommentObj, ...prevComments]);

  //   // 파일에 댓글 저장
  //   void 0;, newCommentObj.userId, newCommentObj.text);
  // };

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

  //기업 연락
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
        <div className="flex my-[2vh] mx-[0.5vw]">
          <button className="bg-[#000] text-white py-[8px] px-[12px] border-none rounded-[4px] cursor-pointer font-['OTF_R']" onClick={handleContactClick}>연락</button>
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

  // console.log(portfolioData.projectTemplate);

  if (!portfolioData) {
    return <div className="flex justify-center text-[1vw] font-bold">로딩 중...</div>;
  }
  return (
    <>
      <div className="w-[80%] py-[40px] px-[40px] mx-auto border-[5px] border-[#000] rounded-[2em] h-[80%] flex flex-col">
        <div className="mb-[2.5vw]">
          <div className="flex gap-[1vw]">
            <button className="bg-[#000] text-white py-[8px] px-[12px] border-none rounded-[4px] cursor-pointer font-['OTF_R']">조회수 {portfolioData.hits || 0}</button>
            <button className="bg-[#000] text-white py-[8px] px-[12px] border-none rounded-[4px] cursor-pointer font-['OTF_R']">기업 연락 {portfolioData.contacts.length || 0}</button>
            <div className="flex justify-between items-center gap-[0.4vw] w-[2vw] cursor-pointer font-bold [&>img]:w-[1.5vw] [&>img]:h-auto [&>img]:object-contain" onClick={handleLikeClick}>
              <img
                src={isLiked ? heart_fill : heart_none} // 좋아요 상태에 따라 이미지 변경
                alt={isLiked ? "heart-fill" : "heart-none"}
              />
              <div className="font-['OTF_B']">{portfolioData.likes.length}</div>
            </div>
          </div>
          <h1 className="font-bold font-['OTF_B']">{portfolioData.projectTitle}</h1>
          <p className="font-bold font-['OTF_B'] -mt-[0.5em]">{portfolioData.description}</p>
        </div>

        <div className="flex justify-between items-start px-[2rem] max-md:flex-col max-md:items-center max-md:p-[1rem]">
          <div className="w-[60%] mr-[1rem] max-md:w-full max-md:mr-0">
            <div className="flex flex-row relative">
              {/* 참여기간 */}
              <p className="absolute top-0 text-[1em] font-bold text-white ml-[3.6em] mt-[1.8em] font-['OTF_R']">참여기간</p>
              <img className="w-[10em] h-auto mr-[1em] mt-[0.2em]" src={Notepad3} alt="Notepad3" />
              <p className="relative text-[1em] m-0 mt-[2.5em] font-['OTF_R'] after:content-[''] after:block after:w-[10em] after:h-[0.08em] after:bg-[#000] after:absolute after:left-0">
                {portfolioData.startDate} - {portfolioData.endDate}
              </p>
            </div>
            {/* 사용한 언어 */}
            <div className="flex flex-row relative">
              <p className="absolute top-0 text-[1em] font-bold text-white ml-[3.6em] mt-[1.8em] font-['OTF_R']">사용한 언어</p>
              <img className="w-[10em] h-auto mr-[1em] mt-[0.2em]" src={Notepad3} alt="Notepad3" />
              <p className="relative text-[1em] m-0 mt-[2.5em] font-['OTF_R'] after:content-[''] after:block after:w-[10em] after:h-[0.08em] after:bg-[#000] after:absolute after:left-0">{portfolioData.usedLanguage}</p>
            </div>
            {/* 프로젝트 링크 */}
            <div className="flex flex-row relative">
              <p className="absolute top-0 text-[1em] font-bold text-white ml-[3.6em] mt-[1.8em] font-['OTF_R']">프로젝트 링크</p>
              <img className="w-[10em] h-auto mr-[1em] mt-[0.2em]" src={Notepad3} alt="Notepad3" />
              <p className="relative text-[1em] m-0 mt-[2.5em] font-['OTF_R'] after:content-[''] after:block after:w-[10em] after:h-[0.08em] after:bg-[#000] after:absolute after:left-0">{portfolioData.projectLink}</p>
            </div>

            <div className="mt-[1em] flex flex-col relative">
              {/* 사진  등록된 사진의 갯수에 따라서 생성*/}
              <div className="flex flex-col">
                <p className="absolute left-[2.5em] text-[1.5em] font-bold text-[#000] font-['OTF_R'] max-md:text-[1.2em] max-md:-top-[2%] max-md:left-[8%] max-[480px]:text-[1em] max-[480px]:top-[6%] max-[480px]:left-[5%]">사진</p>
                <img className="w-[10em] h-auto mr-[1em] mt-[0.2em]" src={Notepad12} alt="Notepad12" />
                <div className="grid gap-[1em] w-full grid-cols-4">
                  {portfolioData.images && portfolioData.images.length > 0 ? (
                    portfolioData.images.slice(0, 4).map((image, index) => (
                      <div className="w-[5em] h-[5em] border-[2px] border-[#000] flex items-center justify-center text-[1vw] rounded-[1em] overflow-hidden" key={index}>
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
                    <div className="w-[5em] h-[5em] border-[2px] border-[#000] flex items-center justify-center text-[1vw] rounded-[1em] overflow-hidden">+</div>
                  )}
                </div>
              </div>

              {/* 로고 */}
              <div className="flex flex-col">
                <p className="absolute left-[2.5em] text-[1.5em] font-bold text-[#000] font-['OTF_R'] max-md:text-[1.2em] max-md:-top-[2%] max-md:left-[8%] max-[480px]:text-[1em] max-[480px]:top-[6%] max-[480px]:left-[5%]">로고</p>
                <img className="w-[10em] h-auto mr-[1em] mt-[0.2em]" src={Notepad12} alt="Notepad12" />
                <div className="grid gap-[1em] w-full grid-cols-4">
                <div className="w-[5em] h-[5em] border-[2px] border-[#000] flex items-center justify-center text-[1vw] rounded-[1em] overflow-hidden">
                  {portfolioData.logo ? (
                    <img
                      src={`http://localhost:3000/${portfolioData.logo}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <p>+</p>
                  )}
                </div>
                </div>
              </div>

              {/* 데모 비디오 */}
              <div className="flex flex-col mt-[1em]">
                <p className="absolute left-[2em] text-[1.2em] font-bold text-[#000] font-['OTF_R'] max-md:text-[1em] max-md:top-[72%] max-md:left-[5%] max-[480px]:text-[0.9em] max-[480px]:top-[75%] max-[480px]:left-[5%]">데모 비디오</p>
                <img className="w-[10em] h-auto mr-[1em] mt-[0.2em]" src={Notepad12} alt="Notepad12" />
                {portfolioData.video ? (
                  <div className="flex items-center justify-center border-[3px] border-[#000] rounded-[1em] text-[1vw] w-[40em] h-[15em]">
                    <video width="100%" height="100%" controls>
                      <source src={portfolioData.video} type="video/mp4" />
                      비디오를 지원하지 않는 브라우저입니다.
                    </video>
                  </div>
                ) : (
                  <div className="flex items-center justify-center border-[3px] border-[#000] rounded-[1em] text-[1vw] w-[40em] h-[15em]">비디오 없음</div>
                )}
              </div>
            </div>

            {/* 개발자 개인정보 */}
            <div className="flex flex-col gap-[-2em] mt-[6em]">
              <img className="w-[4em] h-auto -mt-[2.3em]" src={Notepad16} alt="Notepad16" />
              {/* <Bar>{portfolioData.ownerName} </Bar>
              <Bar>
                {portfolioData.ownerEmail
                  ? portfolioData.ownerEmail
                  : "이메일 없음."}{" "}
              </Bar> */}
              {renderDeveloperInfo()}
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

          <div className="w-[80%] mt-[2em] gap-[5em] flex flex-col max-md:w-full max-md:mr-0">
            {/* 배운점 */}
            <div className="w-full h-[20em] border-[3px] border-[#000] rounded-[2em] relative">
              <p className="absolute top-0 text-[1em] font-bold text-[#000] -mt-[2%] ml-[42.5%] font-['OTF_R']">배운점</p>
              <img className="w-[10em] h-auto -mt-[10%] ml-[30%]" src={Notepad5} alt="Notepad5" />
              <div className="bg-white p-[0.4vw] rounded-[4px]">
              {portfolioData.challenge
                ? portfolioData.challenge
                : "배운점 없음."}
            </div>
            </div>
            {/* 문제설명 */}
            <div className="w-full h-[20em] border-[3px] border-[#000] rounded-[2em] relative">
              <p className="absolute top-0 text-[1em] font-bold text-[#000] -mt-[2%] ml-[42.5%] font-['OTF_R']">해결한 점</p>
              <img className="w-[10em] h-auto -mt-[10%] ml-[30%]" src={Notepad5} alt="Notepad5" />
              <div className="bg-white p-[0.4vw] rounded-[4px]">
              {portfolioData.solving
                ? portfolioData.solving
                : "문제 해결 내용 없음."}
            </div>
            </div>
          </div>
        </div>
        {/* 수정 버튼 작성자와 포폴의 아이디가 동일할 경우에만 보이게한다. */}
        {isOwner && (
          <div className="flex justify-end gap-[1em]">
            <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#000] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
              onClick={() => {
                navigate(`/ModifyPortfolioPage/${portfolioId}`);
              }}
            >
              수정
            </button>
            <button className="border-none rounded-[0.4em] mt-[1vh] w-[9.1em] h-[2.25em] float-right bg-[#000] text-white text-[1.1vw] font-['OTF_B'] font-bold cursor-pointer hover:shadow-[0_0.2em_1em_rgba(22,26,63,0.2)] transition-all duration-300 max-md:w-[7em] max-md:h-[2.25em] max-md:text-[0.8125em]"
              onClick={async () => {
                await void 0;
                navigate({ to: "/Mypage" });
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {/* 댓글 */}
      <div className="w-[85%] py-[40px] px-[40px] mx-auto mt-[6vh]">
        <h2 className="font-bold font-['OTF_B']">댓글</h2>
        <WritingBox addComment={addComment} />
        {/* <CommentList
          comments={comments}
          setComments={setComments}
          portfolioId={portfolioId}
        /> */}
        <CommentList comments={comments} setComments={setComments} />
      </div>
    </>
  );
};

export default PortfolioDetailPage2;