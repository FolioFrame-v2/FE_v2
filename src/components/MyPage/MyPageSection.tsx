import MyPageSelectBox from "@/components/MyPage/MyPageSelectBox";
import React from "react";
import MyPageSearchBar from "@/components/MyPage/MyPageSearchBar";

import StyledButton from "@/components/commmon/StyledButton";

import { Navigate, useNavigate } from "react-router-dom";
// removed domain/features import

const MyPageSection = ({
  title,
  data = [],
  renderItem,
  button,
  buttonKey,
  onSearch,
  onSort,
  userId,
  userEmail,
  userNickname,
}) => {
  const navigate = useNavigate();

  const handleCreatePortfolioClick = () => {
    if (buttonKey == "프로젝트") {
      if (!userEmail || !userNickname) {
        alert("이메일과 닉네임을 등록해 주세요");
      } else {
        navigate("/CreatePortfolioPage");
      }
    } else if (buttonKey == "해커톤") {
      navigate("/CreateHackathonPage");
    } else {
      navigate("/MergerCreatePortfolioPage");
    }
  };

  return (
    <>
      <div className="mt-[10vh]">
        <div className="h-[2.625em] top-[11.375em] font-['OTF_B'] not-italic font-bold text-[1.875em] leading-[2.25em] flex items-center text-center tracking-[-0.025em] text-black">{title}</div>
        <div className="flex justify-between">
          <MyPageSelectBox onSort={onSort} />
          <MyPageSearchBar
            onChange={(e) => console.log(e.target.value)}
            onSearch={onSearch}
            userId={userId}
          />
        </div>

        <hr className="my-[1.5vh] mx-0 border border-[#d0d1d9]"></hr>

        <div>
          <div className="grid grid-cols-4 gap-[3vw_1vw] mt-[2em] w-full">
            {data.length > 0 ? (
              data.map((item) => renderItem(item))
            ) : (
              <div className="col-[1_/_span_4] grid place-content-center">
                <div className="text-[1.5vw] font-['OTF_R'] items-center w-full h-full">비었습니다.</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="my-[1.5vh] mx-0 border border-[#d0d1d9]"></hr>

      {button && (
        <div className="flex justify-end w-full">
          <StyledButton
            text={"추가"}
            onClick={handleCreatePortfolioClick} //navigate 넣으면 된다요
          />
        </div>
      )}
    </>
  );
};
export default MyPageSection;
