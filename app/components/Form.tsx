"use client";

import React from "react";

const Form: React.FC = () => {
  return (
    <form id="contactForm" noValidate>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">
          First Name*
        </label>
        <input type="text" className="form-control" id="firstName" required />
        <div className="invalid-feedback">
          First name is required and can only contain letters, dots, or hyphens.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last Name*
        </label>
        <input type="text" className="form-control" id="lastName" required />
        <div className="invalid-feedback">
          Last name is required and can only contain letters, dots, or hyphens.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="company" className="form-label">
          Company
        </label>
        <input type="text" className="form-control" id="company" />
      </div>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="fromPostal" className="form-label">
            From Postal Code*
          </label>
          <input type="text" className="form-control" id="fromPostal" required />
          <div className="invalid-feedback">
            Valid postal code (e.g., A1A 1A1) is required.
          </div>
        </div>
        <div className="col">
          <label htmlFor="toPostal" className="form-label">
            To Postal Code*
          </label>
          <input type="text" className="form-control" id="toPostal" required />
          <div className="invalid-feedback">
            Valid postal code (e.g., A1A 1A1) is required.
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div id="map" style={{ height: "400px", display: "none" }}></div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email Address*
        </label>
        <input type="email" className="form-control" id="email" required />
        <div className="invalid-feedback">Valid email is required.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone Number*
        </label>
        <input type="tel" className="form-control" id="phone" required />
        <div className="invalid-feedback">Valid phone number is required.</div>
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
          />
          <label className="form-check-label" htmlFor="itemsOther">
            Other
          </label>
        </div>
        <div className="invalid-feedback d-block" id="itemsFeedback">
          At least one item must be selected.
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
          />
          <label className="form-check-label" htmlFor="accessLoading">
            Designated Loading Area
          </label>
        </div>
        <div className="invalid-feedback d-block" id="accessibilityFeedback">
          At least one accessibility option must be selected.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="preferredDate" className="form-label">
          Preferred Date*
        </label>
        <input
          type="text"
          className="form-control"
          id="preferredDate"
          required
          readOnly
        />
        <div className="invalid-feedback">Preferred date is required.</div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Form;
