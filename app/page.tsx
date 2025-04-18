"use client";

import Head from "next/head";
import Script from "next/script";
import { useCalendars } from "@/hooks/useCalendars";
import Calendar from "@/components/Calendar";
import Form from "@/components/Form";
import "../public/moving.css";

export default function Home() {
  const { calendars, handleDateClick, preferredDateInputRef } = useCalendars(
    (date) => {
      console.log("Selected Date:", date);
      if (preferredDateInputRef.current) {
        const formattedDate = typeof date === "string" ? date : `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        preferredDateInputRef.current.value = formattedDate;
        preferredDateInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
      }
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
      </Head>

      <div className="page-wrapper">
        <header></header>

        <section id="brochure-section" className="container"></section>

        <section id="calendar-section" className="container">
          <div className="container calendar-container">
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
          </div>
        </section>

        <section id="contact-section" className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              <h2>Contact Us</h2>
              <Form />
            </div>
          </div>

          <input
            id="preferredDate"
            ref={preferredDateInputRef}
            type="text"
            placeholder="Preferred Date"
            className={`form-control ${preferredDateInputRef.current?.value ? "validation-success" : ""}`}
            readOnly
          />
        </section>
      </div>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="lazyOnload"
      />
    </>
  );
}