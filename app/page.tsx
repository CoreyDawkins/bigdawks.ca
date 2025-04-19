// src/app/page.tsx
"use client";

import MapForm from "@/components/MapForm";
import "../public/moving.css";

export default function Home() {
  return (
    <>
      <div className="page-wrapper">
        <MapForm />
      </div>
    </>
  );
}