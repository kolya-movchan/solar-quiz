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
      className="container container-with-cards"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
        gap: "20px",
      }}
    >
      <h1 className="title">What is your credit score?</h1>

      <div className="card-container-emojie" style={{ marginBottom: "20px" }}>
        {creditScoreList.map((score) => (
          <Card
            key={score.id}
            title={score.name}
            img={`/emojies/${score.id}.png`}
            onClick={() => handleUserAnswer({ credit_score: score.id })}
            imgHeight={64}
            imgWidth={64}
            isActive={quizData.credit_score === score.id}
            isDisabled={quizData.hasOwnProperty("credit_score")}
            classImg={"card-emojie"}
          />
        ))}
      </div>
    </div>
  );
};
