/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import classNames from "classnames";

import { ProgressBar } from "./components/progressBar";
import { StartButton } from "./components/strartButton";
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
import { Intro } from "./steps/Intro";
import { PopUp } from "./components/popUp";

const Quiz = () => {
  const [step, setStep] = useState(8);
  const [stateAbbreviation, setStateAbbreviation] = useState(null);
  const [quizData, setQuizData] = useState({});

  const handleUserAnswer = (data) => {
    setQuizData((prevQuizData) => ({ ...prevQuizData, ...data }));

    const { home_ownership, home_type, credit_score } = data;
    const conditionsToRefuse =
      home_ownership === "rent" ||
      home_type === "mobile-manufactured" ||
      home_type === "apartment-condo" ||
      credit_score === "below-550";

    if (conditionsToRefuse) {
      setTimeout(() => {
        setStep(-1);
      }, 200);

      return;
    }

    if (data.is_mannual_provider || data.is_mannual_provider === null) {
      return;
    }

    setTimeout(() => {
      setStep((prevStep) => prevStep + 1);
    }, 200);
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

  console.log("Quiz Data:", quizData);

  const renderStep = () => {
    switch (step) {
      case -1:
        return <Unqualified />;

      case 0:
        return <Intro handleNextQuizNavigation={handleNextQuizNavigation} />;
      case 1:
        return (
          <FindYourRoofOnMap
            handleUserAnswer={handleUserAnswer}
            setStateAbbreviation={setStateAbbreviation}
          />
        );
      case 2:
        return (
          <DoYouOwnYourHome
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
          />
        );
      case 3:
        return (
          <YourHomeType
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
          />
        );
      case 4:
        return (
          <RoofCondition
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
          />
        );
      case 5:
        return (
          <UtilityProvider
            handleUserAnswer={handleUserAnswer}
            stateAbbreviation={stateAbbreviation}
            quizData={quizData}
          />
        );
      case 6:
        return (
          <MonthlyElectricBills
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
          />
        );
      case 7:
        return (
          <CreditScore
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
          />
        );

      case 8:
        return (
          <ContactsSubmission quizData={quizData} onSubmit={handleUserAnswer} />
        );

      case 9:
        return <></>;

      default:
        return <FindYourRoofOnMap />;
    }
  };

  console.log("Quiz Data:", quizData);

  return (
    <>
      {!quizData.isQuizDataSubmitted && <ProgressBar step={step} />}

      <div>
        <div
          style={{
            maxWidth: "790px",
            margin: "0 auto",
            display: "flex",
          }}
          className={classNames(
            { wrapper: step < 8 && step > 0 },
            { "first-and-last-step-wrapper": step === 0 || step === 8 },
            { "unqualified-wrapper": step === -1 }
          )}
        >
          {renderStep()}
        </div>

        {step === 0 && (
          <div className="start-btn-mobile-wrapper">
            <StartButton
              onClick={handleNextQuizNavigation}
              className="start-btn-mobile"
            />
          </div>
        )}

        {step < 8 && step > 0 && (
          <div
            style={{
              display: "flex",
              backgroundColor: "#fff",
              justifyContent: step === 1 ? "flex-end" : "space-between",
            }}
            className="nav-btn-wrapper"
          >
            {step > 1 && !quizData.isQuizDataSubmitted && (
              <div className="back-btn-wrapper">
                <BackButton onClick={handleGoBack} />
              </div>
            )}

            {step > 0 && step < 8 && (
              <NextButton
                onClick={handleNextQuizNavigation}
                isDisabled={step === 1 && !quizData.location}
              />
            )}
          </div>
        )}
      </div>

      <PopUp />
    </>
  );
};

export default Quiz;
