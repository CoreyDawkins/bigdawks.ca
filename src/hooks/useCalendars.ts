"use client";

import { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import { useFormValidation } from "@/hooks/useFormValidation";

// Define the type for the callback function
type OnDateSelect = (date: Date | string) => void;

// Update useCalendars to accept an optional onDateSelect callback
export function useCalendars(onDateSelect?: OnDateSelect) {
  const [calendars, setCalendars] = useState<{ year: number; month: number }[]>([]);
  const preferredDateInputRef = useRef<HTMLInputElement | null>(null);
  const { formData, handleInputChange } = useFormValidation();

  useEffect(() => {
    const today = new Date();
    const months = [
      { year: today.getFullYear(), month: today.getMonth() },
      { year: today.getFullYear(), month: today.getMonth() + 1 },
      { year: today.getFullYear(), month: today.getMonth() + 2 },
      { year: today.getFullYear(), month: today.getMonth() + 3 },
    ];

    months.forEach((m) => {
      if (m.month >= 12) {
        m.month -= 12;
        m.year += 1;
      }
    });

    setCalendars(months);
  }, []);

  useEffect(() => {
    if (preferredDateInputRef.current) {
      const flatpickrInstance = flatpickr(preferredDateInputRef.current, {
        dateFormat: "Y-m-d",
        minDate: "today",
        onChange: (selectedDates, dateStr) => {
          const event = new Event("change", { bubbles: true });
          Object.defineProperty(event, "target", {
            value: { name: "preferredDate", value: dateStr },
            writable: false,
          });
          handleInputChange(event as any);
        },
      });

      return () => {
        flatpickrInstance.destroy();
      };
    }
  }, [handleInputChange]);

  const handleDateClick = (date: Date | string) => {
    const formattedDate =
      date instanceof Date
        ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
            .getDate()
            .toString()
            .padStart(2, "0")}`
        : date;

    if (preferredDateInputRef.current) {
      preferredDateInputRef.current.value = formattedDate;
      const event = new Event("change", { bubbles: true });
      Object.defineProperty(event, "target", {
        value: { name: "preferredDate", value: formattedDate },
        writable: false,
      });
      handleInputChange(event as any);
      flatpickr(preferredDateInputRef.current).setDate(formattedDate);
    }

    // Call the onDateSelect callback if it exists
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  return { calendars, handleDateClick, preferredDateInputRef };
}