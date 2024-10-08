/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";

import "./Quiz.css";

import { ProgressBar } from "./components/progressBar";
import { BackButton } from "./components/backButton";
import { NextButton } from "./components/nextButton";
import { FindYourRoofOnMap } from "./steps/FindYourRoofOnMap";
import { DoYouOwnYourHome } from "./steps/DoYouOwnYourHome";
import { YourHomeType } from "./steps/YourHomeType";
import { RoofCondition } from "./steps/RoofCondition";
import { UtilityProvider } from "./steps/UtilityProvider";
import { MonthlyElectricBills } from "./steps/MonthlyElectricBills";
import { CreditScore } from "./steps/CreditScore";
import { ContactsSubmission } from "./steps/ContactsSubmission";
import { Unqualified } from "./steps/Unqualified";
import { PopUp } from "./components/popUp";

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [stateAbbreviation, setStateAbbreviation] = useState(null);
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
        return <Unqualified />;
      case 1:
        return (
          <FindYourRoofOnMap setStateAbbreviation={setStateAbbreviation} />
        );
      case 2:
        return <DoYouOwnYourHome handleUserAnswer={handleUserAnswer} />;
      case 3:
        return <YourHomeType handleUserAnswer={handleUserAnswer} />;
      case 4:
        return <RoofCondition handleUserAnswer={handleUserAnswer} />;
      case 5:
        return (
          <UtilityProvider
            handleUserAnswer={handleUserAnswer}
            stateAbbreviation={stateAbbreviation}
          />
        );
      case 6:
        return <MonthlyElectricBills handleUserAnswer={handleUserAnswer} />;
      case 7:
        return <CreditScore handleUserAnswer={handleUserAnswer} />;

      case 8:
        return (
          <ContactsSubmission quizData={quizData} onSubmit={handleUserAnswer} />
        );

      default:
        return <FindYourRoofOnMap />;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      {!quizData.isQuizDataSubmitted && <ProgressBar step={step} />}

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
            {step > 1 && !quizData.isQuizDataSubmitted && (
              <BackButton onClick={handleGoBack} />
            )}
          </div>

          {step > 0 && step < 8 && (
            <NextButton onClick={handleNextQuizNavigation} />
          )}
        </div>
      </div>

      <PopUp />
    </div>
  );
};

export default Quiz;
