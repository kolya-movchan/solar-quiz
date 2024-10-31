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
        // marginBottom: "0",
        borderRadius: "8px",
        position: "relative",
        cursor: "default",
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

      <div className="tooltip">
        Your home is unqualified based on the home and energy details you
        shared. See below to learn of the different disqualification reasons:
        <ul>
          <li>Outside of service territory.</li>
          <li>Not in single-family home.</li>
          <li>Renting your home.</li>
          <li>Low credit score.</li>
        </ul>
      </div>
    </div>
  );
};
