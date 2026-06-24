import SelectBox from "@/components/SelectBox";
import React from "react";
import RecruiterPageSearchBar from "@/components/RecruiterPage/RecruiterPageSearchBar";

import StyledButton from "@/components/StyledButton";

import { Navigate, useNavigate } from "@tanstack/react-router";
// removed domain/features import

const RecruiterSection = ({
  title,
  data = [],
  renderItem,
  button,
  buttonKey,
  onSearch,
  onSort,
  userId,
}: any) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-[10vh]">
        <div className="h-[2.625em] top-[11.375em] font-['OTF_B'] font-[700] text-[1.875em] leading-[2.25em] flex items-center text-center tracking-[-0.025em] text-[#000000]">{title}</div>
        <div className="flex justify-between">
          <SelectBox onSort={onSort} />
          <RecruiterPageSearchBar
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
              <div className="col-span-full grid place-content-center">
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
            onClick={() => {
              navigate({ to: `/portfolio` });
            }} //navigate 넣으면 된다요
          />
        </div>
      )}
    </>
  );
};
export default RecruiterSection;
