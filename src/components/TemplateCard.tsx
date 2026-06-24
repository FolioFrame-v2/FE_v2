import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";




import Logo from "../../assets/icons/Logo.png";

const TemplateCard = ({ portfolioId, templateButton, isButton = true }) => {
  const navigate = useNavigate();
  const [portfolioData, setPortfolioData] = useState(null);
  const currentUser = null;

  useEffect(() => {
    //프롭스로 받은 포트폴리오 ID 사용해서 oriPortfolios에서 포트폴리오 데이터 가져오기
    const portfolio = [].get(portfolioId);
    if (portfolio) {
      setPortfolioData(portfolio);
    }
  }, [portfolioId]);

  const handleViewClick = () => {
    if (isButton === true) {
      console.log(currentUser);
      console.log("patchHits 불러옴.");
      if (currentUser && portfolioData) {
        patchHits(currentUser.id, portfolioId); // 조회수 증가 호출
      }

      // navigate(`/PortfolioDetailPage/${portfolioId}`);
      // if (portfolioId === 8) {
      //   navigate(`/PortfolioDetailPage2/${portfolioId}`);
      // } else if (portfolioId === 7) {
      //   navigate(`/PortfolioDetailPage3/${portfolioId}`);
      // } else {
      //   navigate(`/PortfolioDetailPage/${portfolioId}`);
      // }
    }
  };

  if (!portfolioData) {
    return <div className="flex justify-center text-[1vw] font-bold">로딩 중...</div>;
  }

  return (
    <div className="w-full h-[35vh] bg-[#ffffff] rounded-[1em] shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex flex-col items-center justify-between">
      <div className="mt-[1vh] w-[18vw] h-[15vh] bg-[#f9f9f9] border-[0.0625em] border-[#d0d1d9] rounded-[1em] flex justify-center items-center">
        <img className="w-full h-[2.58em] object-contain" src={portfolioData.coverImage || Logo} alt="Template" />
      </div>
      <h3 className="mt-[0.5em] mb-[0.5em] font-['OTF_B'] font-[700] text-[1.2vw] leading-[1.1875em] text-center text-[#000000]">{portfolioData.projectTitle || "빈 제목"}</h3>
      <div className="font-['Inria_Sans',sans-serif] font-[300] text-[0.9vw] leading-[1.0625em] text-center text-[#d0d1d9] w-[18vw] overflow-scroll [&::-webkit-scrollbar]:hidden">{portfolioData.description || "빈 설명"}</div>
      <button
        className="mt-[1vh] mb-[1vh] w-[18vw] h-[4.5vh] bg-[#0a27a6] rounded-[62.5em] border-none text-[#ffffff] font-['OTF_B'] font-[700] text-[1em] leading-[1.1875em] text-center cursor-pointer hover:bg-[#092091]"
        onClick={() => {
          handleViewClick();
          if (portfolioData.projectTemplate === 2) {
            navigate(`/PortfolioDetailPage2/${portfolioId}`);
          } else if (portfolioData.projectTemplate === 3) {
            navigate(`/PortfolioDetailPage3/${portfolioId}`);
          } else {
            navigate(`/PortfolioDetailPage/${portfolioId}`);
          }
        }}
      >
        {templateButton}
      </button>
    </div>
  );
};

// // TemplateCard의 프롭타입
// TemplateCard.propTypes = {
//   templateName: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   templateThumnail: PropTypes.string.isRequired,
// };

export default TemplateCard;
