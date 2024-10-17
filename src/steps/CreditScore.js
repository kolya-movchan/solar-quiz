import React, { useEffect, useState } from "react";
import { Card } from "../components/card";

export const CreditScore = ({ handleUserAnswer, quizData }) => {
  const [isVisible, setIsVisible] = useState(false);

  const creditScoreList = [
    {
      name: "Below 550",
      id: "below-550",
      color: "#FED6CB",
    },
    {
      name: "550 - 600",
      id: "550-600",
      color: "#FEF8CB",
    },
    {
      name: "600 - 650",
      id: "600-650",
      color: "#F3FECB",
    },
    {
      name: "650+",
      id: "650+",
      color: "#D1FECB",
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
          gap: "20px",
          width: "100%",
        }}
      >
        {creditScoreList.map((score) => (
          <Card
            key={score.id}
            title={score.name}
            img={`/emojies/${score.id}.png`}
            onClick={() => handleUserAnswer({ credit_score: score.id })}
            imgHeight={64}
            imgWidth={64}
            className={{
              width: "175px",
              height: "225px",
              justifyContent: "space-between",
              backgroundColor: score.color,
              paddingTop: "50px",
            }}
            isActive={quizData.credit_score === score.id}
            isDisabled={quizData.hasOwnProperty("credit_score")}
          />
        ))}
      </div>
    </div>
  );
};
