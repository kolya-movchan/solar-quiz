import React from "react";

export const QualifiedBanner = () => {
  return (
    <div className="qualified">
      <span style={{ color: "#027A48", cursor: "default" }}>
        Your home status:
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span
          style={{ fontWeight: "bold", color: "#027A48", cursor: "default" }}
        >
          Pre-Qualified
        </span>
        <img
          src="/icons/alert-circle.svg"
          alt="Info"
          style={{ width: "20px" }}
        />
      </div>
    </div>
  );
};
