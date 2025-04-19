"use client";

import React from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import "../styles/validation.css";

interface FormProps {
  submitHandler: (formData: any) => void;
}

const Form: React.FC<FormProps> = ({ submitHandler }) => {
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
      submitHandler(data);
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
        <label htmlFor="company" className="form-label">
          Company
        </label>
        <input
          type="text"
          className={`form-control ${getValidationClass("company")}`}
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          onBlur={() => handleBlur("company")}
        />
        <div className={`invalid-feedback ${getMessageClass("company")}`}>
          {errors.company}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="fromPostal" className="form-label">
          From Postal Code*
        </label>
        <input
          type="text"
          className={`form-control ${getValidationClass("fromPostal")}`}
          id="fromPostal"
          name="fromPostal"
          value={formData.fromPostal}
          onChange={handleInputChange}
          onBlur={() => handleBlur("fromPostal")}
          required
        />
        <div className={`invalid-feedback ${getMessageClass("fromPostal")}`}>
          {errors.fromPostal}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="toPostal" className="form-label">
          To Postal Code*
        </label>
        <input
          type="text"
          className={`form-control ${getValidationClass("toPostal")}`}
          id="toPostal"
          name="toPostal"
          value={formData.toPostal}
          onChange={handleInputChange}
          onBlur={() => handleBlur("toPostal")}
          required
        />
        <div className={`invalid-feedback ${getMessageClass("toPostal")}`}>
          {errors.toPostal}
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

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number*
        </label>
        <input
          type="tel"
          className={`form-control ${getValidationClass("phone")}`}
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          onBlur={() => handleBlur("phone")}
          required
        />
        <div className={`invalid-feedback ${getMessageClass("phone")}`}>
          {errors.phone}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Items*</label>
        <div>
          {["Furniture", "Boxes", "Bags", "Plants", "Other"].map((item) => (
            <div key={item} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`item-${item}`}
                name="items"
                value={item}
                checked={formData.items.includes(item)}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor={`item-${item}`}>
                {item}
              </label>
            </div>
          ))}
        </div>
        <div className={`invalid-feedback ${getMessageClass("items")}`}>
          {errors.items}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Accessibility*</label>
        <div>
          {["Stairs", "Elevator", "Designated Loading Area"].map((option) => (
            <div key={option} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`accessibility-${option.replace(/\s+/g, '-')}`}
                name="accessibility"
                value={option}
                checked={formData.accessibility.includes(option)}
                onChange={handleInputChange}
              />
              <label className="form-check-label" htmlFor={`accessibility-${option.replace(/\s+/g, '-')}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className={`invalid-feedback ${getMessageClass("accessibility")}`}>
          {errors.accessibility}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="preferredDate" className="form-label">
          Preferred Date*
        </label>
        <input
          type="date"
          className={`form-control ${getValidationClass("preferredDate")}`}
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleInputChange}
          onBlur={() => handleBlur("preferredDate")}
          required
        />
        <div className={`invalid-feedback ${getMessageClass("preferredDate")}`}>
          {errors.preferredDate}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="comment" className="form-label">
          Additional Information
        </label>
        <textarea
          className={`form-control ${getValidationClass("comment")}`}
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          onBlur={() => handleBlur("comment")}
          rows={4}
        />
        <div className={`invalid-feedback ${getMessageClass("comment")}`}>
          {errors.comment}
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;