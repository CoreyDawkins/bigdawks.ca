"use client";

import Head from "next/head";
import { useEffect, useState } from "react";
import $ from "jquery";
import Form from "@/components/Form";

export default function Home() {
  const [formContent, setFormContent] = useState<string>("");

  // Load form via AJAX
  useEffect(() => {
    $.getScript("/form.js", () => {
      // @ts-ignore
      setFormContent(window.formContent);
    });
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>CDawks' Moving</title>
        {/* Bootstrap CSS */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        {/* Custom CSS */}
        <link rel="stylesheet" href="/moving.css" />
        {/* jQuery */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" async />
        {/* Google Maps API */}
        <script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
        />
      </Head>
      <div className="container my-5">
        {/* Calendars Section */}
        <div className="row mb-5" id="calendars">
          <div className="col-md-3">
            <div className="calendar" id="calendar1"></div>
          </div>
          <div className="col-md-3">
            <div className="calendar" id="calendar2"></div>
          </div>
          <div className="col-md-3">
            <div className="calendar" id="calendar3"></div>
          </div>
          <div className="col-md-3">
            <div className="calendar" id="calendar4"></div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2>Contact Us</h2>
            <div className="col-md-8 mx-auto">
              <h2>Contact Us</h2>
              <Form />
            </div>
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
