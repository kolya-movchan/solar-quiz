import React, { useEffect, useState } from "react";
import { statesProviders } from "../statesProviders";
import { Card } from "../components/card";
export const UtilityProvider = ({
  handleUserAnswer,
  stateAbbreviation,
  quizData,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const providersList = statesProviders.find(
    (data) => data.State === stateAbbreviation
  )?.Providers || ["APS", "SRP", "TEP"];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="container container-with-cards"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <h1 className="title">Who is your utility provider?</h1>
      <div className="card-container">
        {providersList?.map((provider, idx) => (
          <Card
            key={idx}
            title={provider}
            img={"/providers/provider.png"}
            onClick={() => handleUserAnswer({ provider })}
            isOneBg={true}
            containerPadding={"20px 20px 0px 20px"}
            isActive={quizData.provider === provider}
            isDisabled={quizData.hasOwnProperty("provider")}
            classImg={"card-img-roof-condition"}
            style={{border: "1px solid #D2D2D2"}}
          />
        ))}
        <input
          type="text"
          className="input-other-provider"
          placeholder="Other Utility Provider"
          style={{
            border: "1px solid #D2D2D2",
            borderRadius: "8px",
            width: "100%",
            boxSizing: "border-box",
            outline: "none",
          }}
          onChange={(e) => handleUserAnswer({ provider: e.target.value })}
        />
      </div>
    </div>
  );
};
