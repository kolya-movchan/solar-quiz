import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { GoogleMapMarker } from "./GoogleMapMarker";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const libraries = ["places", "visualization"];

export const GoogleMapLayout = ({ mapCenter, setMapCenter, mapRef }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "";

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={17}
        center={mapCenter}
        mapTypeId="satellite"
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onDragEnd={() => {
          const center = mapRef.current.getCenter();
          const newCenter = { lat: center.lat(), lng: center.lng() };
          setMapCenter(newCenter);
        }}
      ></GoogleMap>

      <GoogleMapMarker />
    </>
  );
};
