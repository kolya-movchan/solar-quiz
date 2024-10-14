import React, { useEffect, useState } from "react";
import { Card } from "../components/card";

export const YourHomeType = ({ handleUserAnswer }) => {
  const [isVisible, setIsVisible] = useState(false);

  const homeTypes = [
    {
      name: "Single-Family (SFH)",
      id: "single-family",
      icon: "/houses-types/single-family.png",
    },
    {
      name: "Mobile/Manufactured",
      id: "mobile-manufactured",
      icon: "/houses-types/mobile-manufactured.png",
    },
    {
      name: "Apartment/Condo",
      id: "apartment-condo",
      icon: "/houses-types/apartment-condo.png",
    },
    {
      name: "Townhouse",
      id: "townhouse",
      icon: "/houses-types/townhouse.png",
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
        gap: "40px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
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
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <Card
              title={homeType.name}
              img={homeType.icon}
              onClick={handleUserAnswer}
              quizData={{ home_type: homeType.id }}
              imgHeight={"100%" }
              imgWidth={"100%"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
