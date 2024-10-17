import React, { useEffect, useState } from "react";
import { Card } from "../components/card";

export const RoofCondition = ({ handleUserAnswer, quizData }) => {
  const [isVisible, setIsVisible] = useState(false);

  const roofConditions = [
    {
      name: "Good",
      id: "good",
      icon: "/houses-conditions/good.svg",
    },
    {
      name: "Need repairs",
      id: "need-repairs",
      icon: "/houses-conditions/need-repairs.svg",
    },
    {
      name: "Needs re-roof",
      id: "needs-re-roof",
      icon: "/houses-conditions/need-reroof.svg",
    },
    {
      name: "Unsure",
      id: "unsure",
      icon: "/houses-conditions/unsure.svg",
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
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>
        How would you describe the condition of your roof?
      </h1>
      {/* 
      <p style={{ marginBottom: "40px" }}>
        A healthy roof is essential for solar panel installation. Please assess
        the condition of your roof.
      </p> */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {roofConditions.map((condition) => (
          <Card
            title={condition.name}
            img={condition.icon}
            imgHeight={64}
            imgWidth={64}
            onClick={() => handleUserAnswer({ roof_condition: condition.id })}
            isOneBg={true}
            containerPadding={"20px 20px 0px 20px"}
            isActive={quizData.roof_condition === condition.id}
            isDisabled={quizData.hasOwnProperty("roof_condition")}
          />
        ))}
      </div>
    </div>
  );
};
