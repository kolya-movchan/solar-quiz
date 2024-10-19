import React, { useEffect, useState } from "react";
import { statesProviders } from "../statesProviders";
import { Card } from "../components/card";
import classNames from "classnames";

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
    window.scrollTo(0, 0);

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
      <h1 className="title title-master">Who is your utility provider?</h1>
      <div className="card-container">
        {providersList?.map((provider, idx) => (
          <Card
            key={idx}
            title={provider}
            img={"/providers/provider.png"}
            onClick={() => {
              handleUserAnswer({
                provider,
                is_mannual_provider: false,
                mannual_provider: null,
              });
            }}
            isOneBg={true}
            containerPadding={"20px 20px 0px 20px"}
            isActive={quizData.provider === provider}
            isDisabled={quizData.hasOwnProperty("provider")}
            classImg={"card-img-roof-condition"}
            style={{ border: "1px solid #D2D2D2" }}
          />
        ))}

        <div
          style={{
            width: "100%",
            borderRadius: "8px",
          }}
          className={classNames("input-other-provider-container", {
            "input-other-provider-container--active":
              quizData.is_mannual_provider,
          })}
        >
          <input
            value={quizData.mannual_provider}
            style={{
              borderRadius: "4px",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              border: "1px solid #D2D2D2",
            }}
            type="text"
            placeholder="Other Utility Provider"
            className={"input-other-provider"}
            onChange={(e) => {
              handleUserAnswer({
                mannual_provider: e.target.value,
                is_mannual_provider: e.target.value.length > 0 ? true : null,
                provider: null,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};
