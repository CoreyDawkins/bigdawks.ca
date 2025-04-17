"use client";

import Head from "next/head";
import Script from "next/script";
import { useCalendars } from "@/hooks/useCalendars";
import Calendar from "@/components/Calendar";
import Form from "@/components/Form";
import "../styles/calendars.css";

export default function Home() {
  const { calendars, handleDateClick, preferredDateInputRef } = useCalendars(
    (date) => {
      console.log("Selected Date:", date); // Log the selected date
    }
  );

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

      {/* Preferred Date Input */}
      <input
        id="preferredDate"
        ref={preferredDateInputRef}
        type="text"
        placeholder="Preferred Date"
        readOnly
      />

      {/* Bootstrap JS and Popper */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      />

      {/* Google Maps API */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry`}
        strategy="lazyOnload"
      />

      {/* Custom JS */}
      <Script src="/validation.js" strategy="lazyOnload" />
      <Script src="/map.js" strategy="lazyOnload" />
      <Script src="/moving.js" strategy="lazyOnload" />
    </>
  );
}
