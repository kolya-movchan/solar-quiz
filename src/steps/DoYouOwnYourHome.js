import React, { useEffect, useState } from "react";
import { Card } from "../components/card";

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
        <Card
          title={"Own"}
          img={"/icons/own.svg"}
          onClick={handleUserAnswer}
          quizData={{ home_ownership: "own" }}
        />

        <Card
          title={"Rent"}
          img={"/icons/rent.svg"}
          onClick={handleUserAnswer}
          quizData={{ home_ownership: "rent" }}
        />
      </div>
    </div>
  );
};
