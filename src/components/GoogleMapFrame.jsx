import React from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { GoogleMapMarker } from "./Marker";

const mapContainerStyle = {
  width: "100%",
  height: window.innerWidth <= 768 ? "250px" : "300px",
};

const libraries = ["places", "visualization"];

export const GoogleMapLayout = ({ mapCenter, mapRef, onDrag }) => {
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
        zoom={19}
        center={mapCenter}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          mapTypeId: "satellite",
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onDragEnd={() => {
          const center = mapRef.current.getCenter();
          
          const newCenter = { lat: center.lat(), lng: center.lng() };
          onDrag(newCenter);
        }}
      ></GoogleMap>

      <GoogleMapMarker />
    </>
  );
};
