import React, { useEffect, useState } from "react";
import { statesProviders } from "../statesProviders";
import { Card } from "../components/card";
export const UtilityProvider = ({ handleUserAnswer, stateAbbreviation }) => {
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
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        gap: "20px",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>Who is your utility provider?</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          alignItems: "center",
          margin: "0 auto",
          width: "100%",
          maxWidth: "620px",
        }}
      >
        {providersList?.map((provider, idx) => (
          <Card
            key={idx}
            title={provider}
            img={"/providers/provider.png"}
            onClick={() => handleUserAnswer({ provider })}
            isOneBg={true}
            containerPadding={"20px 20px 0px 20px"}
            imgHeight={64}
            imgWidth={64}
          />
        ))}

        <input
          type="text"
          placeholder="Other Utility Provider"
          style={{
            border: "1px solid #D2D2D2",
            borderRadius: "8px",
            padding: "20px",
            fontSize: "1rem",
            width: "100%",
            boxSizing: "border-box",
            outline: "none",
            maxWidth: "620px",
          }}
          onChange={(e) => handleUserAnswer({ provider: e.target.value })}
        />
      </div>
    </div>
  );
};
