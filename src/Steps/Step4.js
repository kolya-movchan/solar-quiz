import React, { useEffect, useState } from "react";

export const Step4 = ({ handleUserAnswer }) => {
  const [isVisible, setIsVisible] = useState(false);

  const roofConditions = [
    {
      name: "Good",
      id: "good",
      icon: "/icons/default.png",
    },
    {
      name: "Need repairs",
      id: "need-repairs",
      icon: "/icons/default.png",
    },
    {
      name: "Needs re-roof",
      id: "needs-re-roof",
      icon: "/icons/default.png",
    },
    {
      name: "Unsure",
      id: "unsure",
      icon: "/icons/default.png",
    },
  ];

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
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <h1 style={{ fontSize: "3rem" }}>
        How would you describe the condition of your roof?
      </h1>

      <p style={{ marginBottom: "40px" }}>
        A healthy roof is essential for solar panel installation. Please assess
        the condition of your roof.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "100%",
        }}
      >
        {roofConditions.map((condition) => (
          <button
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
            onClick={() => handleUserAnswer({ roof_condition: condition.id })}
          >
            <img
              src={condition.icon}
              alt={condition.name}
              height={80}
              style={{ width: "100%" }}
            />
            <span>{condition.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
