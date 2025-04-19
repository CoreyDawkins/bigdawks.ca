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

  console.log("Map Props:", { fromPostal, toPostal });

  useEffect(() => {
    if (!googleMapsApiKey) {
      console.error("Google Maps API Key is missing!");
      return;
    }
    console.log("Google Maps API Key:", googleMapsApiKey);
  }, [googleMapsApiKey]);

  useEffect(() => {
    if (!map || !fromPostal || !toPostal) {
      console.log("Skipping geocoding: map or postal codes missing");
      return;
    }

    const postalRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    if (!postalRegex.test(fromPostal.trim()) || !postalRegex.test(toPostal.trim())) {
      console.log("Invalid postal codes:", { fromPostal, toPostal });
      return;
    }

    const geocoder = new google.maps.Geocoder();

    Promise.all([
      new Promise<google.maps.LatLng>((resolve, reject) => {
        geocoder.geocode({ address: fromPostal + ", Canada" }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            resolve(results[0].geometry.location);
          } else {
            reject(`Geocoding failed for From Postal Code: ${status}`);
          }
        });
      }),
      new Promise<google.maps.LatLng>((resolve, reject) => {
        geocoder.geocode({ address: toPostal + ", Canada" }, (results, status) => {
          if (status === "OK" && results?.[0]) {
            resolve(results[0].geometry.location);
          } else {
            reject(`Geocoding failed for To Postal Code: ${status}`);
          }
        });
      }),
    ])
      .then(([fromLatLng, toLatLng]) => {
        const newPath = [
          { lat: fromLatLng.lat(), lng: fromLatLng.lng() },
          { lat: toLatLng.lat(), lng: toLatLng.lng() },
        ];

        const bounds = new google.maps.LatLngBounds();
        bounds.extend(newPath[0]);
        bounds.extend(newPath[1]);
        map.fitBounds(bounds);

        setPath(newPath);
        console.log("Path set:", newPath);
      })
      .catch((error) => {
        console.error("Geocoding error:", error);
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
        {path.length > 0 && (
          <Polyline
            path={path}
            options={{
              strokeColor: "#00FF00",
              strokeOpacity: 1,
              strokeWeight: 4,
              icons: [
                {
                  icon: {
                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                    scale: 3,
                    strokeColor: "#000000",
                    fillColor: "#000000",
                    fillOpacity: 1,
                  },
                  offset: "100%",
                },
              ],
            }}
          />
        )}

        {path.length > 0 && (
          <Marker
            position={path[0]}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
              scaledSize: new google.maps.Size(30, 30),
            }}
            title="From Location"
          />
        )}

        {path.length > 0 && (
          <Marker
            position={path[1]}
            icon={{
              url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              scaledSize: new google.maps.Size(30, 30),
            }}
            title="To Location"
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;