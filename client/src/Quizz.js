/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import "./Quiz.css"; // We'll create this file for the transition styles

import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";
import { Step4 } from "./Steps/Step4";
import { Step5 } from "./Steps/Step5";
import { Step6 } from "./Steps/Step6";
import { Step7 } from "./Steps/Step7";
import { Step8 } from "./Steps/Step8";

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({});

  const handleUserAnswer = (data) => {
    setQuizData((prevQuizData) => ({ ...prevQuizData, ...data }));

    const { home_ownership, home_type, credit_score } = data;
    const conditionsToRefuse =
      home_ownership === "no" ||
      home_type === "mobile-manufactured" ||
      home_type === "apartment-condo" ||
      credit_score === "below-600";

    if (conditionsToRefuse) {
      setStep(0);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNextQuizNavigation = (e) => {
    e.preventDefault();

    setStep(step + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={{ textAlign: "center", fontSize: "5rem" }}>
            Oops! Shit!
          </div>
        );
      case 1:
        return (
          <div>
            <Step1 />
          </div>
        );
      case 2:
        return <Step2 handleUserAnswer={handleUserAnswer} />;
      case 3:
        return <Step3 handleUserAnswer={handleUserAnswer} />;
      case 4:
        return <Step4 handleUserAnswer={handleUserAnswer} />;
      case 5:
        return <Step5 handleUserAnswer={handleUserAnswer} />;
      case 6:
        return <Step6 handleUserAnswer={handleUserAnswer} />;
      case 7:
        return <Step7 handleUserAnswer={handleUserAnswer} />;

      case 8:
        return <Step8 />;

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <div>
        <div
          style={{
            width: `${(step / 9) * 100}%`,
            height: "10px",
            backgroundColor: "#4caf50",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          backgroundColor: "white",
        }}
      >
        <h3>Quizz Saved Data:</h3>
        <pre>{JSON.stringify(quizData, null, 2).slice(1, -1)}</pre>
      </div>

      <div className="step-content">
        <div
          style={{
            maxWidth: "790px",
            margin: "0 auto",
          }}
        >
          {renderStep()}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
            paddingRight: "50px",
          }}
        >
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={handleGoBack}
                style={{
                  border: "1px solid #000",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  padding: "10px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  alt="arrow"
                  src="/icons/left-arrow.svg"
                  height={20}
                  width={20}
                />
              </button>
            )}
          </div>

          {step < 8 && (
            <button
              style={{
                border: "none",
                backgroundColor: "#000",
                color: "#fff",
                cursor: "pointer",
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
                height: "20px",
                width: "80px",
                boxSizing: "content-box",
              }}
              type="button"
              onClick={handleNextQuizNavigation}
            >
              <span>Next</span>

              <img
                alt="arrow"
                src="/icons/right-arrow.png"
                height={20}
                width={20}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
