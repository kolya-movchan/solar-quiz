import React, { useEffect } from "react";
import { Card } from "../../components/ItemCard";
import { Container } from "../container";
import { homeTypes } from "../../mop/homeTypes";

export const HomeType = ({ handleUserAnswer, quizData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="container-without-cards">
      <h1 className="title title-master">What is your home type?</h1>
      <div className="card-container">
        {homeTypes.map((homeType) => (
          <Card
            key={homeType.id}
            title={homeType.name}
            img={homeType.icon}
            onClick={handleUserAnswer}
            quizData={{ home_type: homeType.id }}
            classImg="card-icon-image"
            isActive={quizData.home_type === homeType.id}
            isDisabled={quizData.hasOwnProperty("home_type")}
            style={{ border: "none" }}
          />
        ))}
      </div>
    </Container>
  );
};
