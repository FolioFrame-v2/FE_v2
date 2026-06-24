import React, { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
// removed domain/features import
// removed domain/features import
import TemplateCard from "@/components/commmon/TemplateCard";

const MyProjectsPage = () => {
  const { portfolioId } = useParams({ strict: false });
  const [userProjects, setUserProjects] = useState([]);
  const [userPortfolios, setUserPortfolios] = useState([]);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [showModal, setShowModal] = useState(false); // "연락" 버튼 눌렀을 때 true
  const [modalMessage, setModalMessage] = useState(""); //"연락" 버튼 눌렀을 때 창에 띄워지는 메세지
  const [currentUser, setLocalCurrentUser] = useState(null); // 초기값 가져오기

  useEffect(() => {
    // 현재 포트폴리오와 사용자 정보를 기반으로 데이터 필터링
    const portfolio = oriPortfolios.get(Number(portfolioId));
    setUserPortfolios(portfolio);
    if (portfolio) {
      // projects 배열에서 projectId를 추출
      const portfolioProjectIds = portfolio.projects;

      // projectId가 portfolio.projects에 포함된 프로젝트 필터링
      const filteredProjects = Array.from([]).filter(
        (project) => portfolioProjectIds.includes(project.projectId)
      );

      setUserProjects(filteredProjects); // 필터링된 프로젝트 업데이트
    }
  }, [portfolioId]);

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

  //기업회원 시 "연락" 버튼
  const renderDeveloperInfo = () => {
    if (currentUser.recruiter && showContactInfo) {
      return (
        <>
          <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{userPortfolios.ownerName || "이름 없음.."}</div>
          <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{userPortfolios.ownerEmail || "이메일 없음.."}</div>
        </>
      );
    } else if (currentUser.recruiter) {
      return (
        <div className="flex justify-center">
          <button className="bg-[#0a27a6] text-white py-2 px-4 rounded" onClick={handleContactClick}>연락</button>
        </div>
      );
    } else {
      return (
        <>
          <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">개발자</div>
          <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">example@example.com</div>
        </>
      );
    }
  };

  return (
    <div className="w-[85%] mx-auto">
      <h1 className="text-[2vw] text-center mb-[2vh] font-['OTF_B'] font-bold not-italic">{userPortfolios.portfolioName}</h1>

      {/* <div className="mb-[20px]">
        <div className="flex flex-col m-[2vw_1vw] font-['OTF_R']">
          <div className="text-[2vw] font-bold">사용한 스택</div>
          <div className="rounded-[0.3125em] shadow-[0_0.5em_1em_rgba(0,0,0,0.1)] bg-white p-[1vw] mt-[2vw] min-w-[80%]">{userPortfolios.usedLanguage || "해결한 문제 없음"}</div>
        </div>
      </div> */}
      <div className="p-[2vh] mb-[4vh] bg-[#f5f7f7]">
        <div className="grid grid-cols-2 mb-[5vh]">
          <div className="flex flex-col items-center mb-[2vh] font-[Impact]">
            <div className="text-[2vw] font-bold font-['OTF_R']">개발자</div>
            <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[80%]">{renderDeveloperInfo()}</div>
          </div>

          <div className="flex flex-col mb-[2vh]">
            <div className="flex justify-center">
              <div className="text-[2vw] font-bold font-['OTF_R']">사용한 스택</div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="p-[1vw] m-[1vw] font-['OTF_R'] text-[1vw]">언어</div>
              <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[70%] font-[Impact]">{userPortfolios.usedLanguage || ""}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="p-[1vw] m-[1vw] font-['OTF_R'] text-[1vw]">프론트엔드</div>
              <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[70%] font-[Impact]">{userPortfolios.frontend || ""}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="p-[1vw] m-[1vw] font-['OTF_R'] text-[1vw]">백엔드</div>
              <div className="rounded-[0.3125em] bg-white p-[1vw] m-[1vw] min-w-[70%] font-[Impact]">{userPortfolios.backend || ""}</div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] ModalOverlay">
            <div className="bg-white text-[1.3vw] font-bold p-[1vw] w-[25vw] rounded-[0.3125em] text-center shadow-[0_4px_6px_rgba(0,0,0,0.1)] z-[1001] [&>button]:mt-[1.5vw] [&>button]:px-[1vw] [&>button]:py-[0.5vw] [&>button]:bg-[#0a27a6] [&>button]:text-white [&>button]:border-none [&>button]:rounded-[0.3125em] [&>button]:cursor-pointer hover:[&>button]:bg-[#0056b3]">
              <p>{modalMessage}</p>
              <button onClick={() => setShowModal(false)}>확인</button>
            </div>
          </div>
        )}

        <div className="flex flex-col m-[2vw_1vw] font-['OTF_R']">
          <div className="text-[2vw] font-bold">프로젝트</div>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-4 gap-y-[3vw] gap-x-[1vw] mt-[2em] w-full">
              {userProjects.map((project) => (
                <TemplateCard
                  key={project.projectId}
                  portfolioId={project.projectId}
                  templateButton="자세히 보기"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProjectsPage;
