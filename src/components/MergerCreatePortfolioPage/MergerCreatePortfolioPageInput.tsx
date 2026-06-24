import React from "react";

const MergerCreatePortfolioPageInput = ({
  formData,
  onInputChange,
  onToggleChange,
}) => {
  const handleToggle = () => {
    const newShareValue = !formData.share;
    onToggleChange({
      target: {
        name: "share",
        value: newShareValue,
      },
    });
  };

  return (
    <div className="flex flex-col gap-[1.5em] mb-[2em]">
      <div className="flex flex-col gap-[0.5em] mb-[1vh]">
        <label className="text-[1.5em] font-[800] text-[#0a27a6] font-['OTF_B']">포트폴리오 이름</label>
        <input
          className="border border-[#d0d1d9] rounded-[1em] outline-none h-[2.5em] w-[30vw] pl-[1em] text-[1rem] placeholder:text-[#a2a3b2]"
          type="text"
          name="portfolioName"
          placeholder="포트폴리오 이름을 입력하세요"
          value={formData.portfolioName}
          onChange={onInputChange}
        />
      </div>

      <hr className="my-[1.5vh] mx-0 border border-[#d0d1d9]" />

      <div className="flex flex-col gap-[0.5em] mb-[1vh]">
        <label className="text-[1.5em] font-[800] text-[#0a27a6] font-['OTF_B']">사용 언어</label>
        <input
          className="border border-[#d0d1d9] rounded-[1em] outline-none h-[2.5em] w-[30vw] pl-[1em] text-[1rem] placeholder:text-[#a2a3b2]"
          type="text"
          name="usedLanguage"
          placeholder="예: JavaScript, Python"
          value={formData.usedLanguage}
          onChange={onInputChange}
        />
      </div>

      <div className="flex flex-col gap-[0.5em] mb-[1vh]">
        <label className="text-[1.5em] font-[800] text-[#0a27a6] font-['OTF_B']">프론트엔드</label>
        <input
          className="border border-[#d0d1d9] rounded-[1em] outline-none h-[2.5em] w-[30vw] pl-[1em] text-[1rem] placeholder:text-[#a2a3b2]"
          type="text"
          name="frontend"
          placeholder="예: Node.js, Zustand"
          value={formData.frontend}
          onChange={onInputChange}
        />
      </div>

      <div className="flex flex-col gap-[0.5em] mb-[1vh]">
        <label className="text-[1.5em] font-[800] text-[#0a27a6] font-['OTF_B']">백엔드</label>
        <input
          className="border border-[#d0d1d9] rounded-[1em] outline-none h-[2.5em] w-[30vw] pl-[1em] text-[1rem] placeholder:text-[#a2a3b2]"
          type="text"
          name="backend"
          placeholder="예: Django, Firebase"
          value={formData.backend}
          onChange={onInputChange}
        />
      </div>

      <hr className="my-[1.5vh] mx-0 border border-[#d0d1d9]" />

      <div className="flex items-center justify-between">
        <label className="text-[1.5em] font-[800] text-[#0a27a6] font-['OTF_B']">공유</label>
        <div className="flex items-center">
          <span className={`text-[0.9rem] font-bold cursor-pointer mx-[0.5em] my-0 ${formData.share ? "text-[#0a27a6]" : "text-[#a2a3b2]"}`}>공개</span>
          <div className="w-[3.5em] h-[1.5em] border-[1.5px] border-[#0a27a6] rounded-[1.5em] flex items-center relative cursor-pointer" onClick={handleToggle}>
            <div className={`w-[1.2em] h-[1.2em] rounded-[50%] bg-[#0a27a6] absolute transition-all duration-300 ease-in-out ${formData.share ? "left-[0.2em]" : "left-[2em]"}`} />
          </div>
          <span className={`text-[0.9rem] font-bold cursor-pointer mx-[0.5em] my-0 ${!formData.share ? "text-[#0a27a6]" : "text-[#a2a3b2]"}`}>비공개</span>
        </div>
      </div>

      <hr className="my-[1.5vh] mx-0 border border-[#d0d1d9]" />
    </div>
  );
};

export default MergerCreatePortfolioPageInput;
