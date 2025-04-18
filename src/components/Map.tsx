// src/components/Map.tsx

"use client";

import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Polyline, Marker } from "@react-google-maps/api";

interface MapProps {
  fromPostal: string;
  toPostal: string;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 43.6532,
  lng: -79.3832, // Default: Toronto, Canada
};

const Map: React.FC<MapProps> = ({ fromPostal, toPostal }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [path, setPath] = useState<google.maps.LatLngLiteral[]>([]);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (!googleMapsApiKey) {
      console.error("Google Maps API Key is missing!");
      return;
    }
  }, [googleMapsApiKey]);

  useEffect(() => {
    if (!map || !fromPostal || !toPostal) return;

    const postalRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    if (!postalRegex.test(fromPostal.trim()) || !postalRegex.test(toPostal.trim())) {
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
        const newPath = [
          { lat: fromLatLng.lat(), lng: fromLatLng.lng() },
          { lat: toLatLng.lat(), lng: toLatLng.lng() },
        ];

        // Center map to fit both points
        const bounds = new google.maps.LatLngBounds();
        bounds.extend(newPath[0]);
        bounds.extend(newPath[1]);
        map.fitBounds(bounds);

        // Update the path
        setPath(newPath);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [fromPostal, toPostal, map]);

  if (!googleMapsApiKey) {
    return <div>Error: Missing Google Maps API Key</div>;
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["geometry"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={10}
        onLoad={(mapInstance) => setMap(mapInstance)}
      >
        {/* Draw a polyline between the two points */}
        {path.length > 0 && (
          <Polyline
            path={path}
            options={{
              strokeColor: "#00FF00", // Green color
              strokeOpacity: 1,
              strokeWeight: 4,
              icons: [
                {
                  icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // Arrow at the end
                    scale: 3,
                    strokeColor: "#000000",
                    fillColor: "#000000",
                    fillOpacity: 1,
                  },
                  offset: "100%", // Place the arrow at the end of the line
                },
              ],
            }}
          />
        )}

        {/* Add a marker for the starting point */}
        {path.length > 0 && (
          <Marker
            position={path[0]}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png", // Green dot
              scaledSize: new google.maps.Size(40, 40), // Adjust size if needed
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;