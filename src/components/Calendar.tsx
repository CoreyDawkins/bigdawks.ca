"use client";

import React from "react";
import "../styles/calendars.css";
import { useFormValidation } from "@/hooks/useFormValidation";

interface CalendarProps {
  year: number;
  month: number;
  onDateClick: (date: Date | string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ year, month, onDateClick }) => {
  const { formData } = useFormValidation();
  const date = new Date(year, month);
  const monthName = date.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells: JSX.Element[] = [];
  let dayCounter = 1;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        cells.push(<div key={`${i}-${j}`} className="calendar-cell empty" />);
      } else if (dayCounter <= daysInMonth) {
        const currentDay = dayCounter;
        const selectedDate = formData.preferredDate
          ? new Date(formData.preferredDate)
          : null;
        const isSelected =
          selectedDate &&
          selectedDate.getFullYear() === year &&
          selectedDate.getMonth() === month &&
          selectedDate.getDate() === currentDay;
        cells.push(
          <div
            key={`${i}-${j}`}
            className={`calendar-cell calendar-date ${isSelected ? "validation-success" : ""}`}
            onClick={() => {
              const selectedDate = new Date(year, month, currentDay);
              onDateClick(selectedDate);
            }}
          >
            {currentDay}
          </div>
        );
        dayCounter++;
      } else {
        cells.push(<div key={`${i}-${j}`} className="calendar-cell empty" />);
      }
    }
  }

  return (
    <div className="calendar">
      <div className="calendar-header">{`${monthName} ${year}`}</div>
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <span key={day} className="calendar-day-label">
            {day}
          </span>
        ))}
      </div>
      <div className="calendar-grid">{cells}</div>
    </div>
  );
};

export default Calendar;