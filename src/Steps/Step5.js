import React, { useEffect, useState } from "react";

export const Step5 = ({ handleUserAnswer }) => {
  const [isVisible, setIsVisible] = useState(false);

  const providersList = [
    {
      name: "Provider1",
      id: "provide1",
      icon: "/icons/default.png",
    },
    {
      name: "Provider2",
      id: "provider2",
      icon: "/icons/default.png",
    },
    {
      name: "Provider3",
      id: "provider3",
      icon: "/icons/default.png",
    },
    {
      name: "Provider4",
      id: "provider4",
      icon: "/icons/default.png",
    },
    {
      name: "Provider5",
      id: "provider5",
      icon: "/icons/default.png",
    },
    {
      name: "Provider6",
      id: "provider6",
      icon: "/icons/default.png",
    },
    {
      name: "Provider7",
      id: "provider7",
      icon: "/icons/default.png",
    },
    {
      name: "Other",
      id: "other",
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
        {providersList.map((provider) => (
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
            onClick={() => handleUserAnswer({ provider: provider.id })}
          >
            <img
              src={provider.icon}
              alt={provider.name}
              height={80}
              style={{ width: "100%" }}
            />
            <span>{provider.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
