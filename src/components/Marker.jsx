import React from "react";

export const GoogleMapMarker = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -100%)",
        zIndex: 1,
      }}
    >
      <img
        src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png"
        alt="marker"
      />
    </div>
  );
};