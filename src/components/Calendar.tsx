"use client";

import React from "react";

interface CalendarProps {
  year: number;
  month: number;
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ year, month, onDateClick }) => {
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
        cells.push(
          <div
            key={`${i}-${j}`}
            className="calendar-cell calendar-date"
            onClick={() => onDateClick(new Date(year, month, currentDay))}
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
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="calendar-grid">{cells}</div>
    </div>
  );
};

export default Calendar;
