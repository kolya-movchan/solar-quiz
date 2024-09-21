/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import { Step3 } from "./Steps/Step3";

import "./Quiz.css"; // We'll create this file for the transition styles

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({});

  const handleUserAnswer = (data) => {
    setQuizData((prevQuizData) => ({ ...prevQuizData, ...data }));

    const { homeOwnership, homeType } = data;
    const conditionsToRefuse =
      homeOwnership === "no" ||
      homeType === "mobile-manufactured" ||
      homeType === "apartment-condo";

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

    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(quizData);
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
        return <Step2 handleUserAnswer={handleUserAnswer} />;
      case 5:
        return <Step1 handleUserAnswer={handleUserAnswer} />;
      case 6:
        return <Step2 handleUserAnswer={handleUserAnswer} />;
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
            width: `${(step / 6) * 100}%`,
            height: "10px",
            backgroundColor: "#4caf50",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>

      <div className="step-content">
        <form
          onSubmit={handleSubmit}
          style={{ borderBottom: "1px solid #e0e0e0" }}
        >
          <div
            style={{
              maxWidth: "790px",
              margin: "0 auto",
            }}
          >
            {renderStep()}
          </div>
        </form>

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

          <div>Quizz Saved Data: {JSON.stringify(quizData)}</div>

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
        </div>
      </div>
    </div>
  );
};

export default Quiz;
