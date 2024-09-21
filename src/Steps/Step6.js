import React, { useEffect, useState } from "react";

export const Step6 = ({ handleUserAnswer }) => {
  const [isVisible, setIsVisible] = useState(false);

  const utilityBillsList = [
    {
      name: "$0 – $150",
      id: "$0–$150",
      icon: "/icons/default.png",
    },
    {
      name: "$150 – $300",
      id: "$150–$300",
      icon: "/icons/default.png",
    },
    {
      name: "$300 – $450",
      id: "$300–$450",
      icon: "/icons/default.png",
    },
    {
      name: "$450+",
      id: "$450+",
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
        How much are your monthly electric bills?
      </h1>

      <p style={{ marginBottom: "40px" }}>
        Your monthly bill helps us calculate your potential solar savings
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "100%",
        }}
      >
        {utilityBillsList.map((bill) => (
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
            onClick={() => handleUserAnswer({ utility_bill_amount: bill.id })}
          >
            <img
              src={bill.icon}
              alt={bill.name}
              height={80}
              style={{ width: "100%" }}
            />
            <span>{bill.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
