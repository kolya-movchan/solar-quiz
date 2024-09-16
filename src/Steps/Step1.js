import React, { useEffect, useState } from "react";

export const Step1 = ({ handleInputChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        height: "77vh",
      }}
    >
      <h1>Let's check your roof's sun exposure </h1>

      <p>
        We'll use your location to provide you with tailored information about
        solar panels in your area. Your privacy is important to us, so we won't
        share your address!
      </p>

      <div
        style={{
          width: "100%",
          display: "flex",
          border: "1px solid #000",
          marginBottom: "40px",
        }}
      >
        <input
          name="name"
          placeholder="Search by address or ZIP code"
          style={{
            width: "100%",
            height: "20px",
            padding: "10px",
            border: "none",
            borderRadius: "none",
          }}
        />

        <button
          style={{
            border: "none",
            minWidth: "100px",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
          }}
          type="button"
        >
          Check my roof
        </button>
      </div>

      <div style={{ width: "100%", height: "50vh" }}>
        <img
          src="https://placehold.co/600x400"
          alt="Solar Panels"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};
