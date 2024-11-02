import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

export const QualifiedBanner = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const bannerRef = useRef(null);

  const handleShowTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  const handleShowTooltipOutside = (event) => {
    if (bannerRef.current && !bannerRef.current.contains(event.target)) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleShowTooltipOutside);
    return () => {
      document.removeEventListener("mousedown", handleShowTooltipOutside);
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      onClick={handleShowTooltip}
      onMouseEnter={handleShowTooltip}
      className={classNames("qualified", {
        "qualified--active": showTooltip,
      })}
    >
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

      <div
        className={classNames("tooltip tooltip-qualified", {
          "tooltip-mobile": showTooltip,
        })}
      >
        Your home is pre-qualified based on your home and energy details and may
        be a good fit to save money with solar. Keep in mind, the utility
        company has the final say on who qualifies for $0-down solar.
      </div>
    </div>
  );
};
