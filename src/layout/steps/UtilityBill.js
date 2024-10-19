import React, { useEffect } from "react";
import { Card } from "../../components/ItemCard";
import { Container } from "../container";
import { creditScoreList } from "../../mop/creditScoreList";
export const UtilityBill = ({ handleUserAnswer, quizData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="container-without-cards">
      <h1 className="title title-master">What is your credit score?</h1>
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
            classImg="card-emojie"
            style={{
              border: "1px solid #D2D2D2",
              backgroundColor: score.color,
            }}
          />
        ))}
      </div>
    </Container>
  );
};
