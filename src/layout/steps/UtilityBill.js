import React, { useEffect } from "react";
import { Card } from "../../components/ItemCard";
import { Container } from "../container";
import { utilityBillsList } from "../../mop/utilityBillsList";

export const UtilityBill = ({ handleUserAnswer, quizData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="container-with-cards ">
      <h1 className="title title-master">
        How much are your monthly electric bills?
      </h1>
      <div className="card-container-emojie" style={{ marginBottom: "20px" }}>
        {utilityBillsList.map((bill) => (
          <Card
            key={bill.id}
            title={bill.name}
            img={`/emojies/${bill.id}.png`}
            onClick={() => handleUserAnswer({ utility_bill_amount: bill.id })}
            imgHeight={64}
            imgWidth={64}
            isActive={quizData.utility_bill_amount === bill.id}
            isDisabled={quizData.hasOwnProperty("utility_bill_amount")}
            classImg="card-emojie"
            style={{
              border: "1px solid #D2D2D2",
              backgroundColor: "#FAFAFA",
            }}
          />
        ))}
      </div>
    </Container>
  );
};
