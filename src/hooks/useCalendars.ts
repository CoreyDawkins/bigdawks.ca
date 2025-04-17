"use client";

import { useEffect, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export function useCalendars(setPreferredDate: (date: string) => void) {
  const [calendars, setCalendars] = useState<
    { year: number; month: number }[]
  >([]);

  // Initialize calendars for current and next three months
  useEffect(() => {
    const today = new Date();
    const months = [
      { year: today.getFullYear(), month: today.getMonth() },
      { year: today.getFullYear(), month: today.getMonth() + 1 },
      { year: today.getFullYear(), month: today.getMonth() + 2 },
      { year: today.getFullYear(), month: today.getMonth() + 3 },
    ];

    // Adjust for year rollover
    months.forEach((m) => {
      if (m.month >= 12) {
        m.month -= 12;
        m.year += 1;
      }
    });

    setCalendars(months);
  }, []);

  // Initialize Flatpickr
  useEffect(() => {
    const preferredDateInput = document.getElementById("preferredDate");
    if (preferredDateInput) {
      const flatpickrInstance = flatpickr(preferredDateInput, {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: (selectedDates, dateStr) => {
          setPreferredDate(dateStr);
        },
      });

      return () => {
        flatpickrInstance.destroy();
      };
    }
  }, [setPreferredDate]);

  // Handle date click from calendar
  const handleDateClick = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    setPreferredDate(formattedDate);
    const preferredDateInput = document.getElementById(
      "preferredDate"
    ) as HTMLInputElement;
    if (preferredDateInput) {
      flatpickr(preferredDateInput).setDate(formattedDate);
    }
  };

  return { calendars, handleDateClick };
}
