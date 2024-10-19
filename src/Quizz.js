import React, { useState } from "react";
import classNames from "classnames";

import { ProgressBar } from "./components/progressBar";
import { StartButton } from "./components/ButtonStart";
import { BackButton } from "./components/GoBackButton";
import { NextButton } from "./components/nextButton";
import { PopUp } from "./components/PopUpMessage";

import { Step } from "./layout/steps/InteractiveStep";
import { FindYourRoofOnMap } from "./layout/steps/FindYourRoofOnMap";

import { ContactsSubmission } from "./layout/steps/ContactsSubmission";
import { Unqualified } from "./layout/steps/Unqualified";
import { Intro } from "./layout/steps/Intro";

const Quiz = () => {
  const [step, setStep] = useState(0);
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
            quizData={quizData}
          />
        );
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return (
          <Step
            step={step}
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
            stateAbbreviation={stateAbbreviation}
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

      <div
        className={classNames(
          "wrapper-default",
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

      <PopUp />
    </>
  );
};

export default Quiz;
