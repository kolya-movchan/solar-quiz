import React, { useEffect, useState } from "react";
import "../App.css";

export const Intro = ({}) => {
  const [isVisible, setIsVisible] = useState(false);

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
      <div
        style={{
          background:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(to right, #FE4A19, #982C0F) border-box",
          color: "#313149",
          padding: "10px",
          border: "1px solid transparent",
          borderRadius: "55px",
          display: "inline-block",
          marginBottom: "32px",
        }}
      >
        <p
          style={{
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "4px",
            paddingBottom: "4px",
            display: "flex",
            alignItems: "center",
            margin: "0",
            gap: "8px",
          }}
        >
          <img
            src="/icons/checkmark.svg"
            alt="Checkmark"
            style={{
              width: "20px",
              height: "20px",
              margin: "0",
              marginTop: "2px",
            }}
          />

          <span
            style={{ fontWeight: "500", fontSize: "14px", color: "#FE4A19" }}
          >
            Free Home Solar Design – Requested by 
            <span style={{ fontWeight: 800 }}>180,000+</span> Homeowners
          </span>
        </p>
      </div>
      <h1
        style={{
          fontSize: "3rem",
          margin: "0",
          marginBottom: "32px",
        }}
      >
        See How Much Money You Could Save w/ This $0 Solar Program That Cuts
        Electric Bills by 30-50% – Instantly
      </h1>

      <div style={{ display: "flex", gap: "24px", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "24px", alignItems: "start" }}>
          <img src="/icons/triple-lines.svg" alt="" />

          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h2 style={{ margin: 0 }}>Easily Compare Utility vs Solar Costs</h2>
            <p style={{ margin: 0 }}>Description 1</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "start" }}>
          <img src="/icons/triple-lines.svg" alt="" />

          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h2 style={{ margin: 0 }}>Get a Free Custom Home Solar Design</h2>
            <p style={{ margin: 0 }}>Description 2</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "24px", alignItems: "start" }}>
          <img src="/icons/triple-lines.svg" alt="" />

          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <h2 style={{ margin: 0 }}>
              Watch a Personalized Video Explanation
            </h2>
            <p style={{ margin: 0 }}>Description 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};