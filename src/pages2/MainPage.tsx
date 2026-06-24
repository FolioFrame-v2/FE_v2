import React from "react";

import { Navigate } from "react-router-dom";
import MainCard from "../components/commmon/MainCard";

// import search from "../assets/icons/Header/search.png";
import Logo from "../assets/icons/Logo.png";
import copyright from "../assets/icons/Mainpage/copyright.png";
import searchImg from "../assets/icons/Header/search.png";

//slide
import Slide from "../components/MainPage/Slide";

const MainPage = () => {
  return (
    <div className="w-[85%] px-[40px] py-[40px] mx-auto">
      {/* 메인 비디오  */}
      <div className="flex flex-col items-center justify-center relative">
        <div className="flex flex-col items-center justify-center relative">
          <video className="flex flex-col items-center justify-center w-[68.5em] mt-[-3em] h-[25em] object-cover" autoPlay loop muted>
            <source src="/videos/Mainvideo.mp4" type="video/mp4" />
            비디오를 재생할 수 없습니다. 브라우저가 이 형식을 지원하지 않습니다.
          </video>
          <p className="absolute top-[-1.5em] left-0 w-full h-full flex flex-col justify-center items-center z-[1] text-white text-[5em] font-extrabold font-['OTF_B']">FolioFrame</p>
        </div>



        {/* 템플릿, 해커톤, 채용 */}
        <div className="mt-[5em]">
          <p className="text-[2em] font-extrabold font-['OTF_B'] text-[#0a27a6] flex">
            <img className="w-[1em] mt-[-0.2em] pr-[0.5em]" src={Logo} alt="Logo" />
            FolioFrame에는 무엇이 있을까요?
          </p>
          <MainCard />
        </div>

        {/* 슬라이드 */}
        <div className="flex justify-center items-center w-full mt-[2em]">
          <Slide />
        </div>
      </div>

      {/* 마무리 */}
      <div className="mt-[6em]">
        <p className="text-[2em] font-extrabold font-['OTF_B'] text-[#0a27a6] flex">FolioFrame</p>
        <p className="text-[0.8em] font-normal text-[#000] font-['OTF_R'] flex">
          여러분께 소개드립니다. "포폴만들조" 팀은 김태연, 김예은, 조수연,
          최현혜로 구성되어 있으며, 이번 팀 프로젝트1에서는 포트폴리오 제작을
          지원하는 웹사이트 개발을 목표로 하고 있습니다. <br></br>
          저희 팀은 사용자들이 더 나은 서비스를 통해 효과적으로 포트폴리오를
          작성할 수 있도록 최선을 다해 노력하고 있습니다. <br></br>
          앞으로도 지속적인 개선을 통해 더 높은 수준의 서비스를 제공하겠습니다.
        </p>
        <div>
          {/* 구분선 */}
          <div className="w-full border border-[#d0d1d9]"></div>
          <img className="w-[1em] h-[1em] mt-[1em]" src={copyright} alt="저작권 표시" />
          {/* 메인 영상 저작권 */}
          <p className="text-[0.8em] font-normal text-[#000] font-['OTF_R'] flex">
            평평한 디자인의 모션 그래픽 기하학적 배경_preview
          </p>
          <p className="text-[0.8em] font-normal text-[#000] font-['OTF_R'] flex">
            https://kr.freepik.com/free-video/motion-graphic-flat-design-geometric-background_3294690#fromView=search&page=1&position=7&uuid=995143c1-4b7b-489b-9250-c1fc132a130b
          </p>
          {/* 공유 영상 저작권 */}
          <p className="text-[0.8em] font-normal text-[#000] font-['OTF_R'] flex">소셜 미디어 중독자의 모션 그래픽_preview</p>
          <p className="text-[0.8em] font-normal text-[#000] font-['OTF_R'] flex">
            https://kr.freepik.com/free-video/motion-graphic-person-addicted-social-media_3294138#fromView=search&page=6&position=36&uuid=2c0106e1-e052-401a-8156-6a189382987a
          </p>
          {/* 리소그래픽 영상 저작권 */}
          <p className="text-[0.8em] font-normal text-[#000] font-['OTF_R'] flex">
            손으로 그린 리소그래프 요소 컬렉션의 모션 그래픽_preview
          </p>
          <p className="text-[0.8em] font-normal text-[#000] font-['OTF_R'] flex">
            https://kr.freepik.com/free-video/motion-graphic-hand-drawn-risograph-element-collection_3295172#fromView=search&page=1&position=8&uuid=2e65e734-07c3-4cfe-84c9-25c84cf5ea0a
          </p>
          {/* 폰트 저작권 */}
          <p className="text-[0.8em] font-normal text-[#000] font-['OTF_R'] flex">
            폰트
            https://copyright.keris.or.kr/wft/fntDwnldView?fntGrpId=GFT202408200000000000003
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
