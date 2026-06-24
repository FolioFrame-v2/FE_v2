import React from "react";

const StyledButton = ({ text, onClick }: any) => {
  return (
    <div className="text-center w-[5vw]">
      <button className="py-[0.625em] px-[0em] w-full h-[2.4em] bg-[#0a27a6] text-white border-none rounded-[0.4em] text-[1vw] font-['OTF_R'] font-[400] cursor-pointer text-center float-left hover:bg-[#092091]" onClick={onClick}>{text}</button>
    </div>
  );
};

export default StyledButton;
