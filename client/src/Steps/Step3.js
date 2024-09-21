import React, { useEffect, useState } from "react";

export const Step3 = ({ handleUserAnswer }) => {
  const [isVisible, setIsVisible] = useState(false);

  const homeTypes = [
    {
      name: "Single-Family (SFH)",
      id: "single-family",
      icon: "/icons/default.png",
    },
    {
      name: "Mobile/Manufactured",
      id: "mobile-manufactured",
      icon: "/icons/default.png",
    },
    {
      name: "Apartment/Condo",
      id: "apartment-condo",
      icon: "/icons/default.png",
    },
    {
      name: "Townhouse",
      id: "townhouse",
      icon: "/icons/default.png",
    },
  ];

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
      <h1 style={{ fontSize: "3rem" }}>What is your home type?</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {homeTypes.map((homeType) => (
          <button
            style={{
              padding: "20px",
              width: "47%",
              backgroundColor: "transparent",
              fontSize: "1rem",
              border: "1px solid #000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              type: "button",
            }}
            onClick={() => handleUserAnswer({ home_type: homeType.id })}
          >
            <img
              src={homeType.icon}
              alt={homeType.name}
              height={80}
              style={{ width: "100%" }}
              //   width={40}
            />
            <span>{homeType.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
