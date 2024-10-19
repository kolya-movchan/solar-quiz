import React from "react";

export const ProgressBar = ({ step }) => {
  return (
    <div
      className="progres-bar"
      style={{
        width: `${(step / 8) * 102}%`,
      }}
    />
  );
};
