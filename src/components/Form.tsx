"use client";

import React from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import "../styles/validation.css";

const Form: React.FC = () => {
  const {
    formData,
    errors,
    handleInputChange,
    handleBlur,
    handleSubmit,
    getValidationClass,
    getMessageClass,
  } = useFormValidation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit((data) => {
      console.log("Form Data:", data);
      alert("Form submitted successfully!");
    });
  };

  return (
    <form id="contactForm" noValidate onSubmit={onSubmit}>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name*
        </label>
        <input
          type="text"
          className={`form-control ${getValidationClass("firstName")}`}
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          onBlur={() => handleBlur("firstName")}
          required
        />
        <div className={`invalid-feedback ${getMessageClass("firstName")}`}>
          {errors.firstName}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name*
        </label>
        <input
          type="text"
          className={`form-control ${getValidationClass("lastName")}`}
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          onBlur={() => handleBlur("lastName")}
          required
        />
        <div className={`invalid-feedback ${getMessageClass("lastName")}`}>
          {errors.lastName}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email*
        </label>
        <input
          type="email"
          className={`form-control ${getValidationClass("email")}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onBlur={() => handleBlur("email")}
          required
        />
        <div className={`invalid-feedback ${getMessageClass("email")}`}>
          {errors.email}
        </div>
      </div>

      {/* Add other fields (e.g., phone, postal codes, etc.) similarly */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;