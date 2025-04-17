"use client";

import React, { useEffect, useRef, useState } from "react";

interface MapProps {
  fromPostal: string;
  toPostal: string;
}

const Map: React.FC<MapProps> = ({ fromPostal, toPostal }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [line, setLine] = useState<google.maps.Polyline | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Google Maps script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry";
    script.async = true;
    script.onload = () => {
      setIsScriptLoaded(true);
      // Initialize map after script loads
      if (mapRef.current) {
        const newMap = new google.maps.Map(mapRef.current, {
          zoom: 10,
          center: { lat: 43.6532, lng: -79.3832 }, // Default: Toronto, Canada
        });
        setMap(newMap);
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Update map when postal codes change
  useEffect(() => {
    if (!isScriptLoaded || !map || !fromPostal || !toPostal) return;

    const postalRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    if (!postalRegex.test(fromPostal.trim()) || !postalRegex.test(toPostal.trim())) {
      if (mapRef.current) mapRef.current.style.display = "none";
      return;
    }

    const geocoder = new google.maps.Geocoder();

    Promise.all([
      new Promise<google.maps.LatLng>((resolve, reject) => {
        geocoder.geocode({ address: fromPostal + ", Canada" }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            resolve(results[0].geometry.location);
          } else {
            reject("Geocoding failed for From Postal Code");
          }
        });
      }),
      new Promise<google.maps.LatLng>((resolve, reject) => {
        geocoder.geocode({ address: toPostal + ", Canada" }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            resolve(results[0].geometry.location);
          } else {
            reject("Geocoding failed for To Postal Code");
          }
        });
      }),
    ])
      .then(([fromLatLng, toLatLng]) => {
        if (mapRef.current) mapRef.current.style.display = "block";

        // Center map to fit both points
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(fromLatLng);
        bounds.extend(toLatLng);
        map.fitBounds(bounds);

        // Remove existing line if any
        if (line) line.setMap(null);

        // Draw new line
        const newLine = new google.maps.Polyline({
          path: [fromLatLng, toLatLng],
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        });
        newLine.setMap(map);
        setLine(newLine);
      })
      .catch((error) => {
        console.error(error);
        if (mapRef.current) mapRef.current.style.display = "none";
      });
  }, [fromPostal, toPostal, map, isScriptLoaded, line]);

  return <div ref={mapRef} style={{ height: "400px", display: "none" }} />;
};

export default Map;
