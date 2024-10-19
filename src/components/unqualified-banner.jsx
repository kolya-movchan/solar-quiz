import React from "react";

export const UnqualifiedBanner = () => {
  return (
    <div
      className="unqualified-banner"
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        boxSizing: "border-box",
        border: "1px solid #B42318",
        marginBottom: "0",
        backgroundColor: "#FFF3F2",
        borderRadius: "8px",
      }}
    >
      <span style={{ color: "#B42318" }}>Your home status:</span>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ color: "#B42318", fontWeight: "650" }}>Unqualified</span>
        <img
          src="/icons/red-alert-circle.svg"
          alt="Info"
          style={{ width: "20px" }}
        />
      </div>
    </div>
  );
};
