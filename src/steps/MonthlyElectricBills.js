import React, { useEffect, useState } from "react";
import { Card } from "../components/card";
export const MonthlyElectricBills = ({ handleUserAnswer, quizData }) => {
  const [isVisible, setIsVisible] = useState(false);

  const utilityBillsList = [
    {
      name: "$0 – $150",
      id: "$0-$150",
    },
    {
      name: "$150 – $300",
      id: "$150-$300",
    },
    {
      name: "$300 – $450",
      id: "$300-$450",
    },
    {
      name: "$450+",
      id: "$450+",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

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
      <h1 className="title title-master">
        How much are your monthly electric bills?
      </h1>

      {/* <p style={{ marginBottom: "40px" }}>
        Your monthly bill helps us calculate your potential solar savings
      </p> */}

      <div className="card-container-emojie" style={{ marginBottom: "20px" }}>
        {utilityBillsList.map((bill, idx) => (
          <Card
            key={idx}
            title={bill.name}
            img={`/emojies/${bill.id}.png`}
            onClick={() => handleUserAnswer({ utility_bill_amount: bill.id })}
            imgHeight={64}
            imgWidth={64}
            isActive={quizData.utility_bill_amount === bill.id}
            isDisabled={quizData.hasOwnProperty("utility_bill_amount")}
            classImg={"card-emojie"}
            style={{ border: "1px solid #D2D2D2", backgroundColor: "#FAFAFA" }}
          />
        ))}
      </div>
    </div>
  );
};
