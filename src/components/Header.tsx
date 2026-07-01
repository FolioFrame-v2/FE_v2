import { useNavigate } from '@tanstack/react-router';
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import defaultProfilePicture from "@/assets/icons/Header/profileIcon.png"; // 기본 이미지
import StyledButton from "@/components/StyledButton";


import { SiPagekit } from "react-icons/si";
import { LuPen, LuLogOut } from "react-icons/lu";
import { TbTriangleFilled } from "react-icons/tb";

const profileMenuItems = [
  { label: "마이페이지", icon: <SiPagekit /> },
  { label: "프로필 편집", icon: <LuPen /> },
  { label: "로그아웃", icon: <LuLogOut /> },
];
function Header({}) {
  const navigate = useNavigate();

  // const [accessToken, setAccessToken] = useState(
  //   localStorage.getItem("accessToken")
  // );
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  // 프로필 클릭 이벤트 추가했다구리
  const menuRef = useRef(null);
  const currentUser = null;
  const location = useLocation();

  const isActive = (path: any) => location.pathname === path;

  // useEffect로 컴포넌트가 처음 렌더링될 때 accessToken 업데이트
  useEffect(() => {
    // const handleStorageChange = () => {
    //   setAccessToken(localStorage.getItem("accessToken"));
    // };
    // 여기 추가
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    //window.addEventListener("storage", handleStorageChange);
    document.addEventListener("mousedown", handleClickOutside);
    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      //window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("Id");
    clearCurrentUser();
    //setAccessToken(null); // 로그아웃 시 상태 초기화
    //void 0;
    navigate({ to: `./` });
  };

  const handleMenuClick = (option: any) => {
    if (option === "마이페이지") {
      navigate({ to: `/mypage` });
    } else if (option === "프로필 편집") {
      navigate({ to: `/profileedit` });
    } else if (option === "로그아웃") {
      handleLogout();
    }
    setIsProfileMenuOpen(false); // Close menu after selection
  };

  // const onProfileClick = () => {
  //   navigate({ to: `./MyPage` });
  // };

  return (
    <header className="w-[85%] h-[5em] bg-[#ffffff] flex items-center mx-auto relative shadow-[0_0.5em_1em_rgba(0,0,0,0.1)] px-[20px] justify-between HeaderContainer">
      {/* 로고와 메뉴를 포함하는 메뉴박스 */}
      <div className="flex items-center relative w-[70%] h-[5em]">
        {/* 프로젝트 로고 들어가야함 */}
        <div className="font-['OTF_B'] not-italic font-[700] text-[2.2em] leading-[43px] text-[#0a27a6] absolute left-0 top-[calc(50%-48px/2)] cursor-pointer" onClick={() => navigate({ to: `./` })}>FolioFrame</div>
        {/* 네비게이션바에 있는 메뉴들 */}
        <nav className="flex items-center ml-[200px]">
          <a 
            className={`font-['OTF_B'] font-[700] text-[1.2em] leading-[36px] no-underline ml-[30px] cursor-pointer hover:text-[#0a27a6] ${isActive("/browse") ? "text-[#0a27a6]" : "text-[#919194]"}`}
            onClick={() => navigate({ to: `/browse` })}
          >포트폴리오</a>
          <a 
            className={`font-['OTF_B'] font-[700] text-[1.2em] leading-[36px] no-underline ml-[30px] cursor-pointer hover:text-[#0a27a6] ${isActive("/contests") ? "text-[#0a27a6]" : "text-[#919194]"}`}
            onClick={() => navigate({ to: `/contests` })}
          >공모전/해커톤</a>
          {currentUser?.recruiter && (
            <a 
              className={`font-['OTF_B'] font-[700] text-[1.2em] leading-[36px] no-underline ml-[30px] cursor-pointer hover:text-[#0a27a6] ${isActive(`/RecruiterPage/${currentUser.id}`) ? "text-[#0a27a6]" : "text-[#919194]"}`}
              onClick={() => navigate({ to: `/recruiter/${currentUser.id}` })}
            >기업 공고
            </a>
          )}
        </nav>

        {/* <Nav>
          <NavLink href="#templates">템플릿</NavLink>
          <NavLink href="#hackathon">해커톤</NavLink>
        </Nav> */}
      </div>

      {/* 로그인 여부에 따라 프로필 이미지 또는 로그인/로그아웃 버튼 렌더링 */}
      <div className="relative w-[6vw] rounded-full flex items-center Profile">
        {currentUser ? (
          <>
            <div className="relative flex items-center justify-center w-full ProfileWrapper">
              <img
                className="rounded-full cursor-pointer w-[2.8vw] ProfilePic"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                src={defaultProfilePicture}
                alt="profile"
              />
              {isProfileMenuOpen && (
                <div className="absolute top-full flex flex-col justify-center" ref={menuRef}>
                  <div className="flex justify-center text-[#15243e80]">
                    <TbTriangleFilled />
                  </div>
                  <div className={`w-[10vw] bg-[#15243e80] rounded-[0.625em] flex-col justify-between z-[3] ${isProfileMenuOpen ? "flex" : "hidden"}`}>
                    {profileMenuItems.map((item, index) => (
                      <div
                        className="m-[0.625em] p-[0.25vw] text-white text-[1vw] font-normal font-['OTF_B'] flex items-center border-[0.2em] border-transparent rounded-[0.625em] box-border hover:bg-[#15243e60] hover:cursor-pointer"
                        key={index}
                        onClick={() => handleMenuClick(item.label)}
                      >
                        <div className="inline-block mr-[0.2vw] text-[0.85vw] cursor-pointer">{item.icon}</div>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <LoginButton onClick={handleLogout}>로그아웃</LoginButton> */}
            </div>
          </>
        ) : (
          <StyledButton text="로그인" onClick={() => navigate({ to: `/login` })} />
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  profilePicture: PropTypes.string.isRequired,
};
// 기본 프로필 사진
Header.defaultProps = {
  profilePicture: defaultProfilePicture,
};

export default Header;
