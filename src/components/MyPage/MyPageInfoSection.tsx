import React from "react";

const MyPageInfoSection = ({ label, value }: any) => {
  return (
    <>
      <div className="w-full flex gap-[0.5rem] items-center">
        <div className="flex flex-[0_0_140px] gap-[0.5rem] items-center">
          <div className="flex-none">{label}</div>
        </div>
        <div className="flex flex-[1_1_auto] w-full min-w-0">
          <div className="w-full flex items-center justify-between">
            <p className="text-[1rem] no-underline text-[#212529] font-semibold leading-[1.5] tap-highlight-transparent underline-offset-auto">{value}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageInfoSection;
