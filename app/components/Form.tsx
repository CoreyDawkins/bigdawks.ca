"use client";

import React from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import Map from "@/components/Map";

const Form: React.FC = () => {
  const { formData, errors, handleInputChange, handleSubmit } = useFormValidation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit((data) => {
      console.log("Form Data:", data);
      alert("Form submitted successfully! (Placeholder)");
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
          className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">{errors.firstName}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name*
        </label>
        <input
          type="text"
          className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">{errors.lastName}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="company" className="form-label">
          Company
        </label>
        <input
          type="text"
          className="form-control"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="fromPostal" className="form-label">
            From Postal Code*
          </label>
          <input
            type="text"
            className={`form-control ${errors.fromPostal ? "is-invalid" : ""}`}
            id="fromPostal"
            name="fromPostal"
            value={formData.fromPostal}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">{errors.fromPostal}</div>
        </div>
        <div className="col">
          <label htmlFor="toPostal" className="form-label">
            To Postal Code*
          </label>
          <input
            type="text"
            className={`form-control ${errors.toPostal ? "is-invalid" : ""}`}
            id="toPostal"
            name="toPostal"
            value={formData.toPostal}
            onChange={handleInputChange}
            required
          />
          <div className="invalid-feedback">{errors.toPostal}</div>
        </div>
      </div>
      <div className="mb-3">
        <Map fromPostal={formData.fromPostal} toPostal={formData.toPostal} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address*
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">{errors.email}</div>
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number*
        </label>
        <input
          type="tel"
          className={`form-control ${errors.phone ? "is-invalid" : ""}`}
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <div className="invalid-feedback">{errors.phone}</div>
      </div>
      <div className="mb-3">
        <label className="form-label">Items*</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="itemsFurniture"
            name="items"
            value="furniture"
            checked={formData.items.includes("furniture")}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="itemsFurniture">
            Furniture
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="itemsBoxes"
            name="items"
            value="boxes"
            checked={formData.items.includes("boxes")}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="itemsBoxes">
            Boxes
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="itemsBags"
            name="items"
            value="bags"
            checked={formData.items.includes("bags")}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="itemsBags">
            Bags
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="itemsPlants"
            name="items"
            value="plants"
            checked={formData.items.includes("plants")}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="itemsPlants">
            Plants
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="itemsOther"
            name="items"
            value="other"
            checked={formData.items.includes("other")}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="itemsOther">
            Other
          </label>
        </div>
        <div
          className={`invalid-feedback d-block ${
            errors.items ? "d-block" : "d-none"
          }`}
          id="itemsFeedback"
        >
          {errors.items}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Accessibility*</label>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="accessStairs"
            name="accessibility"
            value="stairs"
            checked={formData.accessibility.includes("stairs")}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="accessStairs">
            Stairs
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="accessElevator"
            name="accessibility"
            value="elevator"
            checked={formData.accessibility.includes("elevator")}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="accessElevator">
            Elevator
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="accessLoading"
            name="accessibility"
            value="loading"
            checked={formData.accessibility.includes("loading")}
            onChange={handleInputChange}
          />
          <label className="form-check-label" htmlFor="accessLoading">
            Designated Loading Area
          </label>
        </div>
        <div
          className={`invalid-feedback d-block ${
            errors.accessibility ? "d-block" : "d-none"
          }`}
          id="accessibilityFeedback"
        >
          {errors.accessibility}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="preferredDate" className="form-label">
          Preferred Date*
        </label>
        <input
          type="text"
          className={`form-control ${errors.preferredDate ? "is-invalid" : ""}`}
          id="preferredDate"
          name="preferredDate"
          value={formData.preferredDate}
          onChange={handleInputChange}
          required
          readOnly
        />
        <div className="invalid-feedback">{errors.preferredDate}</div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
