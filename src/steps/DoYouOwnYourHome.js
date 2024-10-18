import React, { useEffect, useState } from "react";
import { Card } from "../components/card";

export const DoYouOwnYourHome = ({ handleUserAnswer, quizData }) => {
  const [isVisible, setIsVisible] = useState(false);

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
      <h1 className="title card-title title-master">Do you own or rent your home?</h1>

      <div className="card-container">
        <Card
          title={"Own"}
          img={"/icons/own.svg"}
          classImg={"card-img-own-home"}
          onClick={handleUserAnswer}
          quizData={{ home_ownership: "own" }}
          containerPadding={"20px 20px 0px 20px"}
          isActive={quizData.home_ownership === "own"}
          isDisabled={quizData.hasOwnProperty("home_ownership")}
          style={{ border: "1px solid #D2D2D2" }}
        />

        <Card
          title={"Rent"}
          img={"/icons/rent.svg"}
          classImg={"card-img-own-home"}
          onClick={handleUserAnswer}
          quizData={{ home_ownership: "rent" }}
          containerPadding={"20px 20px 0px 20px"}
          isActive={quizData.home_ownership === "rent"}
          isDisabled={quizData.hasOwnProperty("home_ownership")}
          style={{ border: "1px solid #D2D2D2" }}
        />
      </div>
    </div>
  );
};
