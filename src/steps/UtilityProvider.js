import React, { useEffect, useState } from "react";
import { statesProviders } from "../statesProviders";

export const UtilityProvider = ({ handleUserAnswer, stateAbbreviation }) => {
  const [isVisible, setIsVisible] = useState(false);

  const providersList = statesProviders.find(
    (state) => state.State === stateAbbreviation
  )?.Providers;

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
          width: "100%",
        }}
      >
        {providersList?.map((provider, idx) => (
          <button
            key={idx}
            style={{
              padding: "20px",
              width: "22%",
              backgroundColor: "transparent",
              fontSize: "1rem",
              border: "1px solid #000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              cursor: "pointer",
              type: "button",
            }}
            onClick={() => handleUserAnswer({ provider })}
          >
            {/* <img
              src={provider.icon}
              alt={provider.name}
              height={80}
              style={{ width: "100%" }}
            /> */}
            <span>{provider}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
