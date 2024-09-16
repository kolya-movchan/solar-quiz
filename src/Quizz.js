import React, { useState, useEffect } from "react";
import { Step1 } from "./Steps/Step1";
import { Step2 } from "./Steps/Step2";
import axios from "axios";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Quiz.css"; // We'll create this file for the transition styles

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [quizData, setQuizData] = useState({});

  const handleInputChange = (data) => {
    setQuizData({ ...quizData, ...data });

    if (data.homeOwnership) {
      if (data.homeOwnership === "yes") {
        setStep(3);
      } else {
        setStep(0);
      }
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
        return <>Oops!</>;
      case 1:
        return <Step1 handleInputChange={handleInputChange} />;
      case 2:
        return <Step2 handleInputChange={handleInputChange} />;

      case 3:
        return <Step1 handleInputChange={handleInputChange} />;

      case 4:
        return <Step2 handleInputChange={handleInputChange} />;
      case 5:
        return <Step1 handleInputChange={handleInputChange} />;
      case 6:
        return <Step2 handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  const fetchSolarMapData = async () => {
    const response = await axios.get(
      `https://solar.googleapis.com/v1/buildingInsights:findClosest?location.latitude=37.2746464&location.longitude=-121.7530949&key=${process.env.REACT_APP_SOLAR_API_KEY}`
    );
    console.log(response);
  };

  useEffect(() => {
    fetchSolarMapData();
  }, []);

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
