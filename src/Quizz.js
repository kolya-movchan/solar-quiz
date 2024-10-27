import React, { useState } from "react";
import classNames from "classnames";

import { ProgressBar } from "./components/progressBar";
import { StartButton } from "./components/ButtonStart";
import { BackButton } from "./components/GoBackButton";
import { NextButton } from "./components/nextButton";
import { PopUp } from "./components/PopUpMessage";
import { Logo } from "./components/Logo";

import { FindYourRoofOnMap } from "./layout/steps/FindYourRoofOnMap";
import { HomeOwnership } from "./layout/steps/HomeOwnership";
import { HomeType } from "./layout/steps/HomeType";
import { RoofConditions } from "./layout/steps/RoofConditions";
import { ContactsSubmission } from "./layout/steps/ContactsSubmission";
import { UtilityProvider } from "./layout/steps/UtilityProvider";
import { UtilityBill } from "./layout/steps/UtilityBill";
import { CreditScore } from "./layout/steps/CreditScore";

import { Unqualified } from "./layout/steps/Unqualified";
import { Intro } from "./layout/steps/Intro";

const Quiz = () => {
  const [step, setStep] = useState(3);
  const [stateAbbreviation, setStateAbbreviation] = useState(null);
  const [quizData, setQuizData] = useState({});

  const handleUserAnswer = (data) => {
    if (data.location) {
      setQuizData({ ...data });
    } else {
      setQuizData((prevQuizData) => ({ ...prevQuizData, ...data }));
    }

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

    if (
      data.is_mannual_provider ||
      data.is_mannual_provider === null ||
      data.is_manual_location
    ) {
      return;
    }

    setTimeout(() => {
      setStep((prevStep) => prevStep + 1);
    }, 200);
  };

  const handleGoBack = () => {
    if (step > 0) {
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
        return (
          <HomeOwnership
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
          />
        );
      case 3:
        return (
          <HomeType handleUserAnswer={handleUserAnswer} quizData={quizData} />
        );
      case 4:
        return (
          <RoofConditions
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
          />
        );
      case 5:
        return (
          <UtilityProvider
            handleUserAnswer={handleUserAnswer}
            quizData={quizData}
            stateAbbreviation={stateAbbreviation}
          />
        );
      case 6:
        return (
          <UtilityBill
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
  console.log("state: ", stateAbbreviation);

  return (
    <>
      {!quizData.isQuizDataSubmitted && <ProgressBar step={step} />}

      <Logo />

      <div
        className={classNames(
          { "wrapper-default": step < 8 },
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
            justifyContent: "space-between",
          }}
          className="nav-btn-wrapper"
        >
          {step > 0 && !quizData.isQuizDataSubmitted && (
            <div className="back-btn-wrapper">
              <BackButton onClick={handleGoBack} />
            </div>
          )}

          {step > 0 && step < 8 && (
            <NextButton
              onClick={handleNextQuizNavigation}
              isDisabled={
                (step === 1 && !quizData.location) ||
                (step === 2 && !quizData.home_ownership) ||
                (step === 3 && !quizData.home_type) ||
                (step === 4 && !quizData.roof_condition) ||
                (step === 5 && !quizData.provider && !quizData.is_mannual_provider) ||
                (step === 6 && !quizData.utility_bill_amount) ||
                (step === 7 && !quizData.credit_score)
              }
            />
          )}
        </div>
      )}

      <PopUp />
    </>
  );
};

export default Quiz;
