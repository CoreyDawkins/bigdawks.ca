"use client";

import { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export function useCalendars(setPreferredDate: (date: string | Date) => void) {
  const [calendars, setCalendars] = useState<{ year: number; month: number }[]>([]);

  // Ref for the preferred date input element
  const preferredDateInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize calendars for the current and next three months
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
    if (preferredDateInputRef.current) {
      const flatpickrInstance = flatpickr(preferredDateInputRef.current, {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: (selectedDates, dateStr) => {
          setPreferredDate(dateStr); // Pass the formatted string to the callback
        },
      });

      return () => {
        flatpickrInstance.destroy(); // Clean up Flatpickr instance on unmount
      };
    }
  }, [setPreferredDate]);

  // Handle date click from calendar
  const handleDateClick = (date: Date) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

    // Update the preferred date
    setPreferredDate(formattedDate);

    // Update Flatpickr if the input exists
    if (preferredDateInputRef.current) {
      flatpickr(preferredDateInputRef.current).setDate(formattedDate);
    }
  };

  return { calendars, handleDateClick, preferredDateInputRef };
}
