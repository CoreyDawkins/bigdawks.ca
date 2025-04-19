"use client";

import React, { useState, useRef } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import Flatpickr from "react-flatpickr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import Map from "@/components/Map";
import "../styles/validation.css";

const Form: React.FC = () => {
  const { formData, errors, handleInputChange, handleSubmit, getValidationClass, getMessageClass } = useFormValidation();
  const [showComment, setShowComment] = useState(false);
  const flatpickrRef = useRef<any>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit((data) => {
      console.log("Form Data:", data);
      alert("Form submitted successfully! (Placeholder)");
    });
  };

  const openCalendar = () => {
    if (flatpickrRef.current) {
      flatpickrRef.current.flatpickr.open();
    }
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
            className={`form-control ${getValidationClass("fromPostal")}`}
            id="fromPostal"
            name="fromPostal"
            value={formData.fromPostal}
            onChange={handleInputChange}
            required
          />
          <div className={`invalid-feedback ${getMessageClass("fromPostal")}`}>
            {errors.fromPostal}
          </div>
        </div>
        <div className="col">
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
            required
          />
          <div className={`invalid-feedback ${getMessageClass("toPostal")}`}>
            {errors.toPostal}
          </div>
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
          className={`form-control ${getValidationClass("email")}`}
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
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
          required
        />
        <div className={`invalid-feedback ${getMessageClass("phone")}`}>
          {errors.phone}
        </div>
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
          className={`invalid-feedback d-block ${getMessageClass("items")}`}
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
          className={`invalid-feedback d-block ${getMessageClass("accessibility")}`}
          id="accessibilityFeedback"
        >
          {errors.accessibility}
        </div>
      </div>
      <div className="mb-3 position-relative">
        <label htmlFor="preferredDate" className="form-label">
          Preferred Date*
        </label>
        <div className="input-group">
          <Flatpickr
            className={`form-control ${getValidationClass("preferredDate")}`}
            value={formData.preferredDate}
            onChange={([date]) => {
              const formattedDate = date.toISOString().split("T")[0];
              const syntheticEvent = {
                target: {
                  name: "preferredDate",
                  value: formattedDate,
                  addEventListener: () => {},
                  removeEventListener: () => {},
                  dispatchEvent: () => true,
                },
              } as unknown as React.ChangeEvent<HTMLInputElement>;
              handleInputChange(syntheticEvent);
            }}
            options={{
              dateFormat: "Y-m-d",
              altInput: true,
              altFormat: "F j, Y",
            }}
            ref={flatpickrRef}
          />
          <span className="input-group-text" onClick={openCalendar} style={{ cursor: "pointer" }}>
            <FontAwesomeIcon icon={faCalendarAlt} />
          </span>
        </div>
        <div className={`invalid-feedback ${getMessageClass("preferredDate")}`}>
          {errors.preferredDate}
        </div>
      </div>
      <div className="mb-3">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowComment(true);
          }}
          className={showComment ? "d-none" : ""}
        >
          Need to include additional information?
        </a>
        {showComment && (
          <div>
            <label htmlFor="comment" className="form-label">
              Additional Information
            </label>
            <textarea
              className={`form-control ${getValidationClass("comment")}`}
              id="comment"
              name="comment"
              value={formData.comment || ""}
              onChange={handleInputChange}
              rows={4}
            />
            <div className={`invalid-feedback ${getMessageClass("comment")}`}>
              {errors.comment}
            </div>
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;