import React from "react";
import PropTypes from "prop-types";
import defaultProfilePicture from "@/assets/icons/profileIcon.svg"; // 기본 이미지

import MyPageInfoSection from "@/components/MyPage/MyPageInfoSection";
import { useNavigate } from "@tanstack/react-router";
// removed domain/features import

const DashBoard = ({ name, nickname }: any) => {
  const navigate = useNavigate();
  const currentUser = { name: 'Mock Name', nickname: 'Mock Nickname', id: 'mockid' };

  return (
    <div className="flex flex-col w-[45%]">
      <div className="font-['OTF_B'] not-italic font-bold text-[2.2vw] leading-[2.25em] text-black">대시보드</div>
      <div className="py-[1.5rem] px-[2rem] border border-[#ddd] rounded-[0.625em] gap-[1rem]">
        <div className="font-['OTF_R'] not-italic font-bold text-[1.8vw] leading-[2.25em] text-black">내 프로필</div>
        <div className="flex gap-[0.5rem] flex-col">
          <MyPageInfoSection label={"이름"} value={currentUser.name} />
          <MyPageInfoSection label={"닉네임"} value={currentUser.nickname} />
          <MyPageInfoSection
            label={"아이디/이메일"}
            value={currentUser.id || currentUser.email}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="relative inline-block w-auto py-0 px-[1.125rem] appearance-none text-left no-underline leading-none box-border h-[2.25rem] rounded-[0.5rem] font-['OTF_R'] font-semibold text-[0.875rem] select-none cursor-pointer border-[0.0625rem] border-[#ced4da] bg-white text-[#212529]"
            onClick={() => navigate({ to: `/profileedit` })}
          >
            <div className="flex items-center justify-center h-full overflow-visible pointer-events-none">
              <span className="whitespace-nowrap h-full overflow-hidden flex items-center">프로필 편집</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

DashBoard.propTypes = {
  profilePicture: PropTypes.string.isRequired,
};
// 기본 프로필 사진
DashBoard.defaultProps = {
  profilePicture: defaultProfilePicture,
};

export default DashBoard;
