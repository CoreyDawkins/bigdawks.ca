tsx
// src/components/MapForm.tsx
"use client";

import React, { useState } from "react";
import Form from "./Form";
import Map from "./Map";

interface FormData {
  fromPostal: string;
  toPostal: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  items: string[];
  accessibility: string[];
  preferredDate: string;
  comment: string;
}

const MapForm: React.FC = () => {
  const [fromPostal, setFromPostal] = useState<string>("");
  const [toPostal, setToPostal] = useState<string>("");

  const handleSubmit = (formData: FormData) => {
    setFromPostal(formData.fromPostal);
    setToPostal(formData.toPostal);
  };

  return (
    <div>
      <Form submitHandler={handleSubmit} />
      {fromPostal && toPostal && (
        <Map fromPostal={fromPostal} toPostal={toPostal} />
      )}
    </div>
  );
};

export default MapForm;