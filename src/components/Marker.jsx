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
      <img src="/icons/mappin.png" alt="marker" height="30px" width="26px" />
    </div>
  );
};
