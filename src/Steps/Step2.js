import React, { useEffect, useState } from "react";

export const Step2 = ({ handleUserAnswer }) => {
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
        justifyContent: "center",
        padding: "40px",
        gap: "40px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        height: "77vh",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>Do you own your home?</h1>

      <div style={{ display: "flex", gap: "20px", width: "100%" }}>
        <button
          style={{
            padding: "20px",
            width: "100%",
            backgroundColor: "transparent",
            fontSize: "2rem",
            fontWeight: "bold",
            border: "1px solid #000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            type: "button",
          }}
          onClick={() => handleUserAnswer({ home_ownership: "yes" })}
        >
          <img src="/icons/default.png" alt="Yes" height={40} width={40} />
          <span>Yes</span>
        </button>

        <button
          style={{
            padding: "20px",
            width: "100%",
            backgroundColor: "transparent",
            fontSize: "2rem",
            fontWeight: "bold",
            border: "1px solid #000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            type: "button",
          }}
          onClick={() => handleUserAnswer({ homeOwnership: "no" })}
        >
          <img src="/icons/default.png" alt="No" height={40} width={40} />
          <span>No</span>
        </button>
      </div>
    </div>
  );
};
