import React from "react";

export const ProgressBar = ({ step }) => {
  return (
    <div
      style={{
        width: `${(step / 8) * 100}%`,
        height: "10px",
        backgroundColor: "#4caf50",
        transition: "width 0.3s ease-in-out",
      }}
    />
  );
};

