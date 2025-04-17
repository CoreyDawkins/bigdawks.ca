"use client";

import Head from "next/head";
// import { useEffect, useState } from "react";
import $ from "jquery";
import { useCalendars } from "../hooks/useCalendars.ts";
import Calendar from "@/components/Calendar";
import Form from "@/components/Form";

export default function Home() {
  const { calendars, handleDateClick } = useCalendars((date) => {
    const input = document.getElementById(
      "preferredDate"
    ) as HTMLInputElement;
    if (input) input.value = date;
  });

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CDawks' Moving</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/moving.css" />
        <script src="https://cdn.jsdelivr.net/npm/flatpickr" async />
        <script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry"
        />
      </Head>
      <div className="container my-5">
        <div className="row mb-5" id="calendars">
          {calendars.map((cal, index) => (
            <div key={index} className="col-md-3">
              <Calendar
                year={cal.year}
                month={cal.month}
                onDateClick={handleDateClick}
              />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2>Contact Us</h2>
            <Form />
          </div>
        </div>
      </div>

      {/* Bootstrap JS and Popper */}
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        async
      />
      {/* Flatpickr */}
      <script src="https://cdn.jsdelivr.net/npm/flatpickr" async />
      {/* Custom JS */}
      <script src="/validation.js" async />
      <script src="/map.js" async />
      <script src="/moving.js" async />
    </>
  );
}
