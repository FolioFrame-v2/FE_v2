import React, { useState } from "react";

const InfoSection = ({
  label,
  value,
  isButton = true,
  button = "설정",
  onSave,
}: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [isModified, setIsModified] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsModified(false);
  };

  const handleCancelClick = () => {
    setInputValue(value);
    setIsEditing(false);
    setIsModified(false);
  };

  const handleInputChange = (e: any) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsModified(newValue !== value);
  };

  const handleSaveClick = () => {
    if (isModified && inputValue.trim()) {
      console.log(inputValue.trim());
      onSave(inputValue.trim());
      setIsEditing(false);
      setIsModified(false);
    }
  };

  return (
    <div className="flex items-start py-[1rem] px-0 border-b border-[#ddd]">
      <div className="flex-[0_0_140px] text-[1rem] font-bold leading-[2.5rem]">{label}</div>
      <div className="flex-1">
        {isEditing ? (
          <div className="flex flex-col gap-[0.5rem]">
            <input
              className="w-full p-[0.5rem] text-[1rem] border border-[#ddd] rounded-[0.5rem]"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="값을 입력해주세요."
            />
            <div className="flex justify-end gap-[0.5rem]">
              <button className="py-[0.5rem] px-[1rem] text-[0.875rem] bg-[#fff] text-[#555] border border-[#ddd] rounded-[0.5rem] cursor-pointer hover:bg-[#f9f9f9]" onClick={handleCancelClick}>취소</button>
              <button className={`py-[0.5rem] px-[1rem] text-[0.875rem] rounded-[0.5rem] border ${!isModified ? 'bg-[#ddd] text-[#aaa] border-[#ddd] cursor-not-allowed' : 'bg-[#007bff] text-[#fff] border-[#007bff] cursor-pointer hover:bg-[#0056b3]'}`} onClick={handleSaveClick} disabled={!isModified}>
                저장
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-[1rem] text-[#aaa] flex-1 text-left leading-[2.5rem]">{value || "값을 설정해주세요."}</div>
            {isButton && (
              <button className="py-[0.5rem] px-[1rem] text-[0.875rem] bg-[#fff] text-[#333] border border-[#ddd] rounded-[0.5rem] cursor-pointer hover:bg-[#f9f9f9]" onClick={handleEditClick}>{button}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoSection;
