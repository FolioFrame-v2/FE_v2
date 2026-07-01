import React, { useState, useEffect } from "react";
import InfoSection from "@/components/ProfileEditPage/InfoSection";


// removed domain/features import

import { useNavigate } from "@tanstack/react-router";

//i 아이콘
import infoIcon from "@/assets/images/PortfolioEditPage/InfoIcon.svg";

// 모달 컴포넌트
const Modal = ({ isOpen, onClose, onConfirm }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white p-[20px] rounded-[10px] text-center w-[300px]">
        <p className="text-[16px] mb-[20px]">
          정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </p>
        <div className="flex justify-around">
          <button className="bg-gray-500 text-white py-[10px] px-[20px] border-none rounded-[5px] cursor-pointer" onClick={onClose}>취소</button>
          <button className="bg-red-500 text-white py-[10px] px-[20px] border-none rounded-[5px] cursor-pointer" onClick={onConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
};

const ProfileEditPage = () => {
  const [currentUser, setLocalCurrentUser] = useState({ id: "mock-id", name: "MockUser", nickname: "MockNick", email: "mock@example.com", phoneNumber: "010-0000-0000", certifications: "정보처리기사" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleUpdateName = (newName: any) => {
    console.log("Mock handleUpdateName", newName);
  };

  const handleUpdateNickname = (newNickname: any) => {
    console.log("Mock handleUpdateNickname", newNickname);
  };

  const handleUpdateEmail = (newEmail: any) => {
    console.log("Mock handleUpdateEmail", newEmail);
  };

  const handleUpdatePassword = (newPassword: any) => {
    console.log("Mock handleUpdatePassword", newPassword);
  };

  const handleUpdatePhone = (newPhone: any) => {
    console.log("Mock handleUpdatePhone", newPhone);
  };

  const handleUpdateCertifications = (newCert: any) => {
    console.log("Mock handleUpdateCertifications", newCert);
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(false);
    console.log("Mock handleDeleteAccount");
    navigate({ to: `/` });
  };

  return (
    <div className="w-[70%] mx-auto">
      {/* 내 프로필 섹션 */}
      <div className="mt-[5vh] py-[1.5rem] px-[2rem] border border-[#ddd] rounded-[0.625em] gap-[1rem]">
        <div className="font-['OTF_R'] font-bold text-[1.8vw] leading-[2.25em] text-[#000000]">내 프로필</div>
        <div className="flex gap-[0.5rem] flex-col">
          <InfoSection
            label={"이름"}
            value={currentUser.name}
            isButton={false}
          />
          <InfoSection
            label={"닉네임"}
            value={currentUser.nickname}
            button={"설정"}
            onSave={handleUpdateNickname}
          />
        </div>
      </div>

      {/* 기본정보 섹션 */}
      <div className="mt-[5vh] py-[1.5rem] px-[2rem] border border-[#ddd] rounded-[0.625em] gap-[1rem]">
        <div className="font-['OTF_R'] font-bold text-[1.8vw] leading-[2.25em] text-[#000000]">기본 정보</div>
        <div className="flex gap-[0.5rem] flex-col">
          <InfoSection
            label={"아이디/이메일"}
            value={
              currentUser.id ||
              currentUser.email ||
              "아이디/이메일을 설정해주세요."
            }
            isButton={false}
          />
          <InfoSection
            label={"비밀번호"}
            value={"비밀번호를 설정해주세요."}
            button={"설정"}
            onSave={handleUpdatePassword}
          />
          <InfoSection
            label={"휴대폰번호"}
            value={currentUser.phoneNumber}
            button={"설정"}
            onSave={handleUpdatePhone}
          />
          <InfoSection
            label={"자격증"}
            value={currentUser.certifications || "등록된 자격증이 없습니다."}
            button={"설정"}
            onSave={handleUpdateCertifications}
          />
        </div>
      </div>

      {/* 연락방법 섹션 */}
      <div className="mt-[5vh] py-[1.5rem] px-[2rem] border border-[#ddd] rounded-[0.625em] gap-[1rem]">
        <div className="flex flex-[0_0_140px] gap-[0.5rem] items-center relative [&>img]:w-[1vw] [&>img]:h-[1vw] [&>img]:object-contain [&>.tooltip]:invisible [&>.tooltip]:absolute [&>.tooltip]:-bottom-[1.5vw] [&>.tooltip]:bg-[#333] [&>.tooltip]:text-white [&>.tooltip]:text-center [&>.tooltip]:py-[0.5vw] [&>.tooltip]:px-[1vw] [&>.tooltip]:rounded-[0.625em] [&>.tooltip]:text-[1vw] [&>.tooltip]:whitespace-nowrap [&>.tooltip]:z-10 [&>.tooltip]:opacity-0 [&>.tooltip]:transition-opacity [&>.tooltip]:duration-200 [&>img:hover+.tooltip]:visible [&>img:hover+.tooltip]:opacity-100">
          <div className="font-['OTF_R'] font-bold text-[1.8vw] leading-[2.25em] text-[#000000]">연락방법</div>

          <img src={infoIcon} alt="info 아이콘" />
          <div className="tooltip">
            포트폴리오를 공유했을 시, 기업이 연락할 수단입니다.
          </div>
        </div>
        <div className="flex gap-[0.5rem] flex-col">
          {currentUser.email ? (
            <InfoSection
              label={"이메일"}
              value={currentUser.email}
              isButton={false}
            />
          ) : (
            <InfoSection
              label={"이메일"}
              value={"등록된 이메일이 없습니다."}
              button={"등록"}
              onSave={handleUpdateEmail}
            />
          )}
        </div>
      </div>

      <div className="mt-[5vh] py-[1.5rem] px-[2rem] border border-[#ddd] rounded-[0.625em] gap-[1rem]">
        <div className="font-['OTF_R'] font-bold text-[1.8vw] leading-[2.25em] text-red-500">계정삭제</div>
        <div className="flex gap-[0.5rem] flex-col">
          <div>
            1. 계정 탈퇴 시, 폴리오프레임 서비스에서 모두 탈퇴됩니다.
            <br />
            <br />
            2. 탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다.
          </div>
          <div className="flex justify-end">
            <button className="relative inline-block w-auto px-[1.125rem] appearance-none text-left no-underline leading-none box-border h-[2.25rem] rounded-[0.5rem] font-['OTF_R'] font-semibold text-[0.875rem] select-none cursor-pointer border border-[#ced4da] bg-white text-red-500" onClick={() => setIsModalOpen(true)}>
              <div className="flex items-center justify-center h-full overflow-visible pointer-events-none">
                <span className="whitespace-nowrap h-full overflow-hidden flex items-center">탈퇴</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* 탈퇴 확인 모달 */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default ProfileEditPage;
