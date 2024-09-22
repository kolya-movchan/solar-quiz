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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>Oh no...</h1>

      <p style={{ marginBottom: "40px" }}>
        Unfortunately, your home is not applicable for the program..
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "15px",
          border: "1px solid #000",
          marginBottom: "30px",
        }}
      >
        <span>Your home status</span>
        <span style={{ fontWeight: "bold" }}>Unqualified</span>
        <img src="/icons/info.svg" alt="Info" style={{ width: "20px" }} />
      </div>

      <a
        href="/"
        style={{
          border: "none",
          backgroundColor: "#000",
          color: "#fff",
          cursor: "pointer",
          padding: "10px 20px",
          alignItems: "center",
          fontWeight: "bold",
          height: "20px",
          boxSizing: "content-box",
          textDecoration: "none",
          width: "50%",
          display: "flex",
          justifyContent: "center",
        }}
        type="button"
      >
        <span>Go Home</span>
      </a>
    </div>
  );
};
