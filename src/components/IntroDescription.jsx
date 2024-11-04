import React from "react";

export const IntroDescriptionItem = ({ title, description }) => {
  return (
    <div
      style={{ display: "flex", gap: "10px", alignItems: "start" }}
      className="intro-description-item"
    >
      <img src="/icons/checkmark-box.svg" alt="" height={24} width={24} />

      <div
        style={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          gap: "8px",
        }}
        className="intro-boolet-container"
      >
        {/* <h2 style={{ margin: 0, color: "#1D2939" }} className="intro-title-2">
          {title}
        </h2> */}
        <p style={{ margin: 0, color: "#505050"}}>
          {description}
        </p>
      </div>
    </div>
  );
};
