import React, { useEffect, useState } from "react";

export const Unqualified = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="container"
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // padding: "40px",
        boxSizing: "content-box",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        gap: "24px",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Oh no!</h1>

      <p style={{ margin: "0", color: "#475467", fontSize: "18px" }}>
        Unfortunately, your home is not applicable for the program..
      </p>

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
          <span style={{ color: "#B42318", fontWeight: "650" }}>
            Unqualified
          </span>
          <img
            src="/icons/red-alert-circle.svg"
            alt="Info"
            style={{ width: "20px" }}
          />
        </div>
      </div>

      <a
        href="/"
        className="unqualified-btn"
        style={{
          boxSizing: "border-box",
          border: "none",
          backgroundColor: "#FE4A19",
          color: "#fff",
          cursor: "pointer",
          padding: "0 24px",
          alignItems: "center",
          fontWeight: "bold",
          height: "56px",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          borderRadius: "8px",
        }}
        type="button"
      >
        <span>Go Home</span>
      </a>
    </div>
  );
};
