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
      name: "Need Repairs",
      id: "need-repairs",
      icon: "/houses-conditions/need-repairs.svg",
    },
    {
      name: "Needs Re-roof",
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
      className="container container-with-cards"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <h1 className="title">
        How would you describe the condition of your roof?
      </h1>
      {/* 
      <p style={{ marginBottom: "40px" }}>
        A healthy roof is essential for solar panel installation. Please assess
        the condition of your roof.
      </p> */}

      <div className="card-container">
        {roofConditions.map((condition) => (
          <Card
            title={condition.name}
            img={condition.icon}
            onClick={() => handleUserAnswer({ roof_condition: condition.id })}
            isOneBg={true}
            containerPadding={"20px 20px 0px 20px"}
            isActive={quizData.roof_condition === condition.id}
            isDisabled={quizData.hasOwnProperty("roof_condition")}
            classImg={"card-img-roof-condition"}
          />
        ))}
      </div>
    </div>
  );
};
