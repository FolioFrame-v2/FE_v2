import React, { useState, useEffect } from "react";
import PrevMonth from "../../assets/icons/Calendar/arrow_left.png";
import NextMonth from "../../assets/icons/Calendar/arrow_right.png";
import { Color } from "./Color.jsx";

const CreateHackCalendar = ({ onStartDateChange, onEndDateChange }) => {
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const monthName = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const prevMonthLastDate = new Date(currentYear, currentMonth, 0).getDate();
    const nextMonthStartDay = (firstDayOfMonth + daysInMonth) % 7;

    const cells = [];
    const today = new Date();

    const isDateSelected = (day) => {
        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
        return (
            startDate &&
            endDate &&
            (currentDate.toDateString() === startDate.toDateString() ||
                currentDate.toDateString() === endDate.toDateString())
        );
    };

    const isInSelectionRange = (day) => {
        if (!startDate || !endDate) return false;
        const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
        return currentDate >= startDate && currentDate <= endDate;
    };

    const handleDateClick = (day) => {
        const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);

        if (!startDate) {
            setStartDate(selectedDate);
            setEndDate(null);
            onStartDateChange(selectedDate); // Start date 변경 알림
        } else if (!endDate) {
            if (selectedDate < startDate) {
                setStartDate(selectedDate);
                setEndDate(null);
                onStartDateChange(selectedDate); // Start date 변경 알림
            } else {
                setEndDate(selectedDate);
                onEndDateChange(selectedDate); // End date 변경 알림
            }
        } else {
            setStartDate(selectedDate);
            setEndDate(null);
            onStartDateChange(selectedDate); // Start date 변경 알림
        }
    };

    const getCellClass = ({ isToday, isStart, isEnd, isInRange, className }) => {
      return `p-[1em] box-border flex items-center justify-center h-[2.5em] w-[2.5em] cursor-pointer transition-all duration-300 rounded-[50%] relative max-[1100px]:text-[0.8125em] max-[900px]:text-[0.75em] max-md:text-[1em] max-md:h-[2em] max-md:w-[2em] max-md:p-[0.4em] before:content-[''] before:absolute before:inset-0 before:-z-[1] before:transition-all before:duration-300 ${className || ""} ${isToday ? "font-[600]" : "font-[400]"} ${isToday || isStart || isEnd ? "text-[#FFFFFF]" : "text-[#000000]"} ${isToday ? "bg-[#CFDDFB]" : isStart || isEnd ? "bg-[#0A27A6]" : "bg-transparent"} ${isToday ? "shadow-[0px_4px_10px_rgba(129,76,161,0.19)]" : "shadow-none"} ${isInRange ? "before:bg-[#CFDDFB] before:visible" : "before:bg-transparent before:hidden"} ${isStart ? "before:rounded-[20px_0_0_20px]" : isEnd ? "before:rounded-[0_20px_20px_0]" : "before:rounded-[0]"}`;
    };

    // 이전 달의 날짜 추가
    for (let i = firstDayOfMonth; i > 0; i--) {
        cells.push(
            <div key={`prev-${i}`} className={getCellClass({ className: "text-[#ccc]" })}>
                {prevMonthLastDate - i + 1}
            </div>,
        );
    }

    // 현재 달의 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday =
            today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
        const isStart = startDate && new Date(date.getFullYear(), date.getMonth(), day).toDateString() === startDate.toDateString();
        const isEnd = endDate && new Date(date.getFullYear(), date.getMonth(), day).toDateString() === endDate.toDateString();

        cells.push(
            <div
                key={day}
                className={getCellClass({
                  isToday,
                  isInRange: isInSelectionRange(day),
                  isSelected: isDateSelected(day),
                  isStart,
                  isEnd,
                })}
                onClick={() => handleDateClick(day)}
            >
                {day}
            </div>,
        );
    }

    // 다음 달의 날짜 추가
    for (let i = 1; i <= (7 - nextMonthStartDay) % 7; i++) {
        cells.push(
            <div key={`next-${i}`} className={getCellClass({ className: "text-[#ccc]" })}>
                {i}
            </div>,
        );
    }

    const prevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
    };

    return (
        <div className="w-[50%] max-md:h-auto max-md:w-full">
            <div className="flex flex-col justify-center items-center relative w-full h-full box-border max-md:w-full max-md:pr-0 max-md:border-r-0 max-md:border-b max-md:border-[#0A27A6] max-md:pb-[1em]">
                <div className="w-full flex justify-center items-center gap-[2em] mb-[0.5em]">
                    <img src={PrevMonth} className="w-[0.61em] cursor-pointer" onClick={prevMonth} />
                    <div className="text-[0.73em] text-center font-[800] px-[2em]">
                        {`${year}년`} <Color>{`${monthName}`}</Color>
                    </div>
                    <img src={NextMonth} className="w-[2em] cursor-pointer" onClick={nextMonth} />
                </div>
                <div className="gap-y-[0.2em] grid grid-cols-7 grid-rows-7 text-[1em] place-items-center">
                    {days.map((day, index) => (
                        <div className="text-center box-border" key={index}>{day}</div>
                    ))}
                    {cells}
                </div>
            </div>
        </div>
    );
};

export default CreateHackCalendar;
