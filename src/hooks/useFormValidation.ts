"use client";

import { useState, useEffect } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  company: string;
  fromPostal: string;
  toPostal: string;
  email: string;
  phone: string;
  items: string[];
  accessibility: string[];
  preferredDate: string;
  comment?: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  company?: string; // Added to match FormData
  fromPostal?: string;
  toPostal?: string;
  email?: string;
  phone?: string;
  items?: string;
  accessibility?: string;
  preferredDate?: string;
  comment?: string;
}

export function useFormValidation() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    company: "",
    fromPostal: "",
    toPostal: "",
    email: "",
    phone: "",
    items: [],
    accessibility: [],
    preferredDate: "",
    comment: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const validateField = (name: keyof FormData, value: string | string[]): { status: string; message?: string } => {
    const nameRegex = /^[A-Za-z\s.-]+$/;
    const postalRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?1?\d{10}$/;

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value || typeof value !== "string" || !value.trim()) {
          return { status: "validation-failed", message: `${name === "firstName" ? "First" : "Last"} name is required.` };
        }
        if (value.trim().length < 2) {
          return { status: "validation-failed", message: `${name === "firstName" ? "First" : "Last"} name must be at least 2 characters.` };
        }
        if (!nameRegex.test(value.trim())) {
          return {
            status: "validation-failed",
            message: `${name === "firstName" ? "First" : "Last"} name can only contain letters, spaces, dots, or hyphens.`,
          };
        }
        return { status: "validation-success" };
      case "fromPostal":
      case "toPostal":
        if (!value || typeof value !== "string" || !value.trim()) {
          return { status: "validation-failed", message: "Postal code is required." };
        }
        if (!postalRegex.test(value.trim())) {
          return { status: "validation-failed", message: "Valid postal code (e.g., A1A 1A1) is required." };
        }
        return { status: "validation-success" };
      case "email":
        if (!value || typeof value !== "string" || !value.trim()) {
          return { status: "validation-failed", message: "Email is required." };
        }
        if (!emailRegex.test(value.trim())) {
          return { status: "validation-failed", message: "Valid email is required." };
        }
        return { status: "validation-success" };
      case "phone":
        if (!value || typeof value !== "string" || !value.trim()) {
          return { status: "validation-failed", message: "Phone number is required." };
        }
        if (!phoneRegex.test(value.replace(/[\s-()]/g, ""))) {
          return { status: "validation-failed", message: "Valid phone number is required." };
        }
        return { status: "validation-success" };
      case "items":
        if (!Array.isArray(value) || value.length === 0) {
          return { status: "validation-failed", message: "At least one item must be selected." };
        }
        return { status: "validation-success" };
      case "accessibility":
        if (!Array.isArray(value) || value.length === 0) {
          return { status: "validation-failed", message: "At least one accessibility option must be selected." };
        }
        return { status: "validation-success" };
      case "preferredDate":
        if (!value || typeof value !== "string" || !value.trim()) {
          return { status: "validation-failed", message: "Preferred date is required." };
        }
        return { status: "validation-success" };
      case "comment":
        return { status: "validation-success" }; // Optional field, no validation
      default:
        return { status: "validation-success" };
    }
  };

  useEffect(() => {
    const newErrors: FormErrors = {};
    const newTouched: Partial<Record<keyof FormData, boolean>> = { ...touched };

    (Object.keys(formData) as (keyof FormData)[]).forEach((name) => {
      const value = formData[name];
      // Handle undefined by providing a default empty string for string fields
      const safeValue = Array.isArray(value) ? value : (value ?? "");
      const { status, message } = validateField(name, safeValue);
      if (status === "validation-failed" && message) {
        newErrors[name] = message;
        newTouched[name] = true;
      } else if (status === "validation-success") {
        newTouched[name] = true;
      }
    });

    setErrors(newErrors);
    setTouched(newTouched);
  }, [formData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => {
        const currentValues = prev[name as keyof FormData] as string[];
        if (checked) {
          return {
            ...prev,
            [name]: [...currentValues, value],
          };
        } else {
          return {
            ...prev,
            [name]: currentValues.filter((item) => item !== value),
          };
        }
      });
    } else if (name === "firstName" || name === "lastName") {
      const nameRegex = /^[A-Za-z\s.-]*$/;
      if (nameRegex.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    (Object.keys(formData) as (keyof FormData)[]).forEach((name) => {
      const value = formData[name];
      // Handle undefined by providing a default empty string for string fields
      const safeValue = Array.isArray(value) ? value : (value ?? "");
      const { status, message } = validateField(name, safeValue);
      if (status === "validation-failed" && message) {
        newErrors[name] = message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (callback: (data: FormData) => void) => {
    if (validateForm()) {
      callback(formData);
    }
  };

  const getValidationClass = (name: keyof FormData): string => {
    if (!touched[name]) return "";
    const { status } = validateField(name, formData[name] ?? (Array.isArray(formData[name]) ? formData[name] : ""));
    return status;
  };

  const getMessageClass = (name: keyof FormData): string => {
    if (!touched[name]) return "";
    const { status } = validateField(name, formData[name] ?? (Array.isArray(formData[name]) ? formData[name] : ""));
    return `${status}-message`;
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
    getValidationClass,
    getMessageClass,
  };
}