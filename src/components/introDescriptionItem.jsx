import React from "react";

export const IntroDescriptionItem = ({ title, description }) => {
  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "start" }}>
      <img src="/icons/triple-lines.svg" alt="" />

      <div
        style={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          gap: "8px",
        }}
        className="intro-boolet-container"
      >
        <h2 style={{ margin: 0 }} className="intro-title-2">
          {title}
        </h2>
        <p style={{ margin: 0, color: "#475467" }}>{description}</p>
      </div>
    </div>
  );
};
