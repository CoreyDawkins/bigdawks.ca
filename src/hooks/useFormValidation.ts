"use client";

import { useState } from "react";

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
  company?: string;
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
  // Initial form data with empty values
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

  // Errors state to store validation messages
  const [errors, setErrors] = useState<FormErrors>({});

  // Touched state to track which fields the user has interacted with
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  // Field validation logic
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
          return { status: "validation-failed", message: `${name === "firstName" ? "First" : "Last"} name can only contain letters, spaces, dots, or hyphens.` };
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
          return { status: "validation-failed", message: "Valid phone number (e.g., 1234567890) is required." };
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
        return { status: "validation-success" }; // Optional field
      default:
        return { status: "validation-success" };
    }
  };

  // Handle input changes and validate in real-time
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => {
        const currentValues = prev[name as keyof FormData] as string[];
        return {
          ...prev,
          [name]: checked
            ? [...currentValues, value]
            : currentValues.filter((item) => item !== value),
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Mark field as touched and validate it
    setTouched((prev) => ({ ...prev, [name]: true }));
    const safeValue = type === "checkbox" ? formData[name as keyof FormData] : value;
    const { status, message } = validateField(name as keyof FormData, safeValue);
    setErrors((prev) => ({
      ...prev,
      [name]: status === "validation-failed" ? message : undefined,
    }));
  };

  // Handle blur event to validate when user leaves a field
  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const value = formData[name];
    const safeValue = Array.isArray(value) ? value : (value ?? "");
    const { status, message } = validateField(name, safeValue);
    setErrors((prev) => ({
      ...prev,
      [name]: status === "validation-failed" ? message : undefined,
    }));
  };

  // Validate entire form on submit
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    (Object.keys(formData) as (keyof FormData)[]).forEach((name) => {
      const value = formData[name];
      const safeValue = Array.isArray(value) ? value : (value ?? "");
      const { status, message } = validateField(name, safeValue);
      if (status === "validation-failed" && message) {
        newErrors[name] = message;
      }
    });
    setErrors(newErrors);
    setTouched((prev) => ({
      ...prev,
      ...Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    }));
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (callback: (data: FormData) => void) => {
    if (validateForm()) {
      callback(formData);
    }
  };

  // Get validation class (only if field is touched)
  const getValidationClass = (name: keyof FormData): string => {
    if (!touched[name]) return "";
    const { status } = validateField(name, formData[name] ?? (Array.isArray(formData[name]) ? formData[name] : ""));
    return status;
  };

  // Get message class (only if field is touched)
  const getMessageClass = (name: keyof FormData): string => {
    if (!touched[name]) return "";
    const { status } = validateField(name, formData[name] ?? (Array.isArray(formData[name]) ? formData[name] : ""));
    return `${status}-message`;
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleBlur,
    handleSubmit,
    getValidationClass,
    getMessageClass,
  };
}