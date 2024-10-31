import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export const UnqualifiedBanner = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const bannerRef = useRef(null);

  const handleClick = () => {
    setShowTooltip(!showTooltip);
  };

  const handleClickOutside = (event) => {
    if (bannerRef.current && !bannerRef.current.contains(event.target)) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="unqualified-banner"
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        boxSizing: "border-box",
        border: "1px solid #B42318",
        borderRadius: "8px",
        position: "relative",
        cursor: "default",
      }}
      onClick={handleClick}
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

      <div
        className={classNames("tooltip", {
          "tooltip-mobile": showTooltip,
        })}
      >
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
