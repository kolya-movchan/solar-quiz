import React, { useEffect } from "react";
import { Card } from "../../components/ItemCard";
import { Container } from "../../layout/container";

export const HomeOwnership = ({ handleUserAnswer, quizData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="container-with-cards">
      <h1 className="title title-master">Do you own or rent your home?</h1>
      <div className="card-container" style={{ flexGrow: 0 }}>
        {["Own", "Rent"].map((option) => (
          <Card
            key={option}
            title={option}
            img={`/home-ownership/${option.toLowerCase()}.svg`}
            classImg="card-img-own-home"
            onClick={handleUserAnswer}
            quizData={{ home_ownership: option.toLowerCase() }}
            containerPadding="20px 20px 0px 20px"
            isActive={quizData.home_ownership === option.toLowerCase()}
            isDisabled={quizData.hasOwnProperty("home_ownership")}
            // style={{ border: "1px solid #D2D2D2" }}
            isOneBg={true}
          />
        ))}
      </div>
    </Container>
  );
};
