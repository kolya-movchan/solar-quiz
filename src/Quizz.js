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
      // Send form data
      console.log("Sending form data:", quizData);
      // Add your API call here
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
      // Add cases 3, 4, and 5 with appropriate inputs
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
    <form onSubmit={handleSubmit}>
      {renderStep()}
      <button type="submit">{step < 6 ? "Next" : "Submit"}</button>
    </form>
  );
};

export default Quiz;
