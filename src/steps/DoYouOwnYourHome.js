import React, { useEffect, useState } from "react";

export const DoYouOwnYourHome = ({ handleUserAnswer }) => {
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
        gap: "40px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>Do you own or rent your home?</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          width: "550px",
        }}
      >
        <button
          style={{
            padding: "20px 20px 0px 20px",
            zIndex: "2",
            paddingBottom: "0",
            width: "100%",
            fontSize: "2rem",
            fontWeight: "bold",
            border: "1px solid #D2D2D2",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            type: "button",
            overflow: "hidden",
          }}
          onClick={() => handleUserAnswer({ home_ownership: "own" })}
        >
          <img src="/icons/own.svg" alt="Own" height={40} width={40} />

          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              width: "100%",
            }}
          >
            <span style={{ fontSize: "20px" }}>Own</span>
          </div>
        </button>

        <button
          style={{
            padding: "20px 20px 0px 20px",
            zIndex: "2",
            paddingBottom: "0",
            width: "100%",
            fontSize: "2rem",
            fontWeight: "bold",
            border: "1px solid #D2D2D2",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            cursor: "pointer",
            type: "button",
            overflow: "hidden",
          }}
          onClick={() => handleUserAnswer({ home_ownership: "rent" })}
        >
          <img src="/icons/rent.svg" alt="Rent" height={40} width={40} />

          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              width: "100%",
            }}
          >
            <span style={{ fontSize: "20px" }}>Rent</span>
          </div>
        </button>
      </div>
    </div>
  );
};
