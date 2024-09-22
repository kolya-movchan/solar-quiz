import React, { useEffect, useState } from "react";

export const CreditScore = ({ handleUserAnswer }) => {
  const [isVisible, setIsVisible] = useState(false);

  const creditScoreList = [
    {
      name: "Below 600",
      id: "below-600",
      icon: "/icons/default.png",
    },
    {
      name: "600 - 650",
      id: "600-650",
      icon: "/icons/default.png",
    },
    {
      name: "650 - 700",
      id: "650-700",
      icon: "/icons/default.png",
    },
    {
      name: "700+",
      id: "700+",
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
        gap: "20px",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>What is your credit score?</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "100%",
        }}
      >
        {creditScoreList.map((score) => (
          <button
            style={{
              padding: "20px",
              width: "22%",
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
            onClick={() => handleUserAnswer({ credit_score: score.id })}
          >
            <span>{score.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
