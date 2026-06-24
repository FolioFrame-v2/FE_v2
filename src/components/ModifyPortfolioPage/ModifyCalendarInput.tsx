import React, { useState, useEffect } from "react";
import Calendar from "@/components/ModifyPortfolioPage/Calendar.jsx";
// import { useDispatch } from 'react-redux';

const ModifyPortfolioCalendarInput = ({ startDate, endDate, onDateChange }: any) => {
  // state 관리
  const [recruitmentStartDate, setRecruitmentStartDate] = useState(null);
  const [recruitmentEndDate, setRecruitmentEndDate] = useState(null);
  // Button 활성화 상태 관리
  const [isRecruitmentActive, setIsRecruitmentActive] = useState(true);
  const [isStudyPeriodActive, setIsStudyPeriodActive] = useState(false);

  // Redux 관리
  // const dispatch = useDispatch();

  // 날짜 형식 함수
  const formatDate = (date: any) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 모집 날짜 불러오기
  const handleRecruitStartDateChange = (date: any) => {
    if (isRecruitmentActive) {
      setRecruitmentStartDate(date);
    } else if (isStudyPeriodActive) {
      setStudyPeriodStartDate(date);
    }
    const formattedDate = formatDate(date);
    console.log("Start Date:", formattedDate);

    onDateChange("startDate", date);
    // dispatch(setRecruitStartDay(formattedDate));
  };

  const handleRecruitEndDateChange = (date: any) => {
    if (isRecruitmentActive) {
      setRecruitmentEndDate(date);
    } else if (isStudyPeriodActive) {
      setStudyPeriodEndDate(date);
    }
    const formattedDate = formatDate(date);
    console.log("End Date:", formattedDate);

    onDateChange("endDate", date);
    // dispatch(setRecruitEndDay(formattedDate));
  };

  return (
    <div className="w-full flex items-center gap-[2em] max-md:flex-col max-md:gap-[1em] max-md:pb-[1em]">
      {/* 캘린더 영역 */}
      {isRecruitmentActive && (
        <Calendar
          onStartDateChange={handleRecruitStartDateChange}
          onEndDateChange={handleRecruitEndDateChange}
          startDate={startDate}
          endDate={endDate}
        />
      )}
      <div className="flex items-center flex-col gap-[1em] mb-[3em] ml-[1.5em]">
        <div className="flex items-center flex-row gap-[0.2em]">
          <div className="border border-[#0a27a6] rounded-[10px] w-[5.0545em] h-[2.2054em] leading-[2.2054em] text-center text-[#0a27a6] text-[0.8125em] font-bold">시작</div>
          <div className="mx-[0.2em] w-[8em] text-[#161a3f] text-[0.8125em] font-bold">
            {recruitmentStartDate ? formatDate(recruitmentStartDate) : "--"}
          </div>
        </div>
        <div className="flex items-center flex-row gap-[0.2em]">
          <div className="border border-[#0a27a6] rounded-[10px] w-[5.0545em] h-[2.2054em] leading-[2.2054em] text-center text-[#0a27a6] text-[0.8125em] font-bold">끝</div>
          <div className="mx-[0.2em] w-[8em] text-[#161a3f] text-[0.8125em] font-bold">
            {recruitmentEndDate ? formatDate(recruitmentEndDate) : "--"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyPortfolioCalendarInput;