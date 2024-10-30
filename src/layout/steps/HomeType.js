import React, { useEffect } from "react";
import { Card } from "../../components/ItemCard";
import { Container } from "../container";
import { homeTypes } from "../../mop/homeTypes";

export const HomeType = ({ handleUserAnswer, quizData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Container className="container-with-cards">
      {/* <div className="title-wrapper"> */}
        <h1 className="title title-master">What is your home type?</h1>
      {/* </div> */}
      <div className="card-container">
        {homeTypes.map((homeType) => (
          <Card
            key={homeType.id}
            title={homeType.name}
            img={homeType.icon}
            // imgHeight={'124px'}
            onClick={handleUserAnswer}
            quizData={{ home_type: homeType.id }}
            classImg="card-icon-image"
            isActive={quizData.home_type === homeType.id}
            isDisabled={quizData.hasOwnProperty("home_type")}
            // style={{ border: "1px solid #D2D2D2" }}
          />
        ))}
      </div>
    </Container>
  );
};
