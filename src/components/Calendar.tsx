"use client";

import React from "react";
import "../styles/calendars.css";

interface CalendarProps {
  year: number;
  month: number;
  onDateClick: (date: Date | string) => void; // Accepts both Date and string
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
        // Empty cells before the first day of the month
        cells.push(<div key={`${i}-${j}`} className="calendar-cell empty" />);
      } else if (dayCounter <= daysInMonth) {
        const currentDay = dayCounter;
        cells.push(
          <div
            key={`${i}-${j}`}
            className="calendar-cell calendar-date"
            onClick={() => {
              const selectedDate = new Date(year, month, currentDay); // Create a Date object
              onDateClick(selectedDate); // Pass the Date object to the callback
            }}
          >
            {currentDay}
          </div>
        );
        dayCounter++;
      } else {
        // Empty cells after the last day of the month
        cells.push(<div key={`${i}-${j}`} className="calendar-cell empty" />);
      }
    }
  }

  return (
    <div className="calendar">
      {/* Month and Year Header */}
      <div className="calendar-header">{`${monthName} ${year}`}</div>

      {/* Days of the Week */}
      <div className="calendar-days">
        {daysOfWeek.map((day) => (
          <span key={day} className="calendar-day-label">
            {day}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">{cells}</div>
    </div>
  );
};

export default Calendar;
