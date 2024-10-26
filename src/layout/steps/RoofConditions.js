import React, { useEffect } from "react";
import { Card } from "../../components/ItemCard";
import { Container } from "../../layout/container";
import { roofConditions } from "../../mop/roofConditions";

export const RoofConditions = ({ handleUserAnswer, quizData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="container-with-cards">
      <h1 className="title title-master">
        How would you describe the condition of your roof?
      </h1>
      <div className="card-container">
        {roofConditions.map((condition) => (
          <Card
            key={condition.id}
            title={condition.name}
            img={condition.icon}
            onClick={() => handleUserAnswer({ roof_condition: condition.id })}
            // isOneBg={true}
            containerPadding="20px 20px 0px 20px"
            isActive={quizData.roof_condition === condition.id}
            isDisabled={quizData.hasOwnProperty("roof_condition")}
            classImg="card-img-roof-condition"
            style={{ border: "1px solid #D2D2D2" }}
          />
        ))}
      </div>
    </Container>
  );
};
