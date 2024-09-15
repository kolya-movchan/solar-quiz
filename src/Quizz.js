import React, { useState } from "react";
import { Step1 } from "./Steps/Step1";

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({});

  const handleInputChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
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
      case 1:
        return <Step1 handleInputChange={handleInputChange} />;
      case 2:
        return (
          <>
            <h2>Step 2</h2>
            <input
              name="email"
              onChange={handleInputChange}
              placeholder="Your email"
            />
          </>
        );
      case 3:
        return (
          <>
            <h2>Step 3</h2>
            <input
              name="age"
              type="number"
              onChange={handleInputChange}
              placeholder="Your age"
            />
          </>
        );
      case 4:
        return (
          <>
            <h2>Step 4</h2>
            <select name="favoriteColor" onChange={handleInputChange}>
              <option value="">Select your favorite color</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
            </select>
          </>
        );
      case 5:
        return (
          <>
            <h2>Step 5</h2>
            <textarea
              name="feedback"
              onChange={handleInputChange}
              placeholder="Please provide any feedback"
            />
          </>
        );
      case 6:
        return (
          <>
            <h2>Step 6 - Review and Submit</h2>
            <p>Please review your answers and submit.</p>
          </>
        );
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
          <div>
            {step > 1 && (
              <button type="button" onClick={handleGoBack}>
                Go Back
              </button>
            )}
          </div>
        </div>
      </form>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "20px",
        }}
      >
        <button
          style={{
            border: "none",
            minWidth: "100px",
            backgroundColor: "#000",
            color: "#fff",
            cursor: "pointer",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
          }}
          type="button"
          onClick={handleNextQuizNavigation}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
