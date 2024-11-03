import React from "react";

export const ProgressBar = ({ step }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        backgroundColor: "#FFF",
        height: 12,
      }}
    >
      <div
        className="progres-bar"
        style={{
          width: `${(step / 8) * 102}%`,
        }}
      />
    </div>
  );
};
