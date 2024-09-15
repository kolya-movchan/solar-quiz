import React, { useState } from "react";

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({});

  const handleInputChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 6) {
      setStep(step + 1);
    } else {
      console.log("Sending form data:", quizData);
    }
  };

  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2>Step 1</h2>
            <input
              name="name"
              onChange={handleInputChange}
              placeholder="Your name"
            />
          </>
        );
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
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: `${(step / 6) * 100}%`,
            height: "10px",
            backgroundColor: "#4caf50",
            transition: "width 0.3s ease-in-out",
          }}
        />
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}
        <div>
          {step > 1 && (
            <button type="button" onClick={handleGoBack}>
              Go Back
            </button>
          )}
          <button type="submit">{step < 6 ? "Next" : "Submit"}</button>
        </div>
      </form>
    </>
  );
};

export default Quiz;
