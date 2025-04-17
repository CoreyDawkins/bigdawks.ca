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
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  fromPostal?: string;
  toPostal?: string;
  email?: string;
  phone?: string;
  items?: string;
  accessibility?: string;
  preferredDate?: string;
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
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First Name (letters, dots, hyphens only)
    const nameRegex = /^[A-Za-z.-]+$/;
    if (!formData.firstName.trim() || !nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName =
        "First name is required and can only contain letters, dots, or hyphens.";
    }

    // Last Name (letters, dots, hyphens only)
    if (!formData.lastName.trim() || !nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName =
        "Last name is required and can only contain letters, dots, or hyphens.";
    }

    // Postal Codes (Canadian format: A1A 1A1)
    const postalRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    if (!postalRegex.test(formData.fromPostal.trim())) {
      newErrors.fromPostal = "Valid postal code (e.g., A1A 1A1) is required.";
    }
    if (!postalRegex.test(formData.toPostal.trim())) {
      newErrors.toPostal = "Valid postal code (e.g., A1A 1A1) is required.";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Valid email is required.";
    }

    // Phone (North American format)
    const phoneRegex = /^\+?1?\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[\s-()]/g, ""))) {
      newErrors.phone = "Valid phone number is required.";
    }

    // Items
    if (formData.items.length === 0) {
      newErrors.items = "At least one item must be selected.";
    }

    // Accessibility
    if (formData.accessibility.length === 0) {
      newErrors.accessibility = "At least one accessibility option must be selected.";
    }

    // Preferred Date
    if (!formData.preferredDate) {
      newErrors.preferredDate = "Preferred date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (callback: (data: FormData) => void) => {
    if (validateForm()) {
      callback(formData);
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleSubmit,
  };
}
