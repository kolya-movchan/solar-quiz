import React from "react";

export const ProgressBar = ({ step }) => {
  return (
    <div
      style={{
        width: `${(step / 8) * 102}%`,
        height: "12px",
        backgroundColor: "#FE4A19",
        transition: "width 0.3s ease-in-out",
        borderTopRightRadius: "6px",
        borderBottomRightRadius: "6px",
        position: "fixed",
        top: "0",
        left: "0",
      }}
    />
  );
};
