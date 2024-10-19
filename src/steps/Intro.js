import React, { useEffect, useState } from "react";

import { Container } from "../components/container";
import { StartButton } from "../components/strartButton";

export const Intro = ({ handleNextQuizNavigation }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container isVisible={isVisible} className="intro-container">
      <div
        style={{
          background:
            "linear-gradient(#fff 0 0) padding-box, linear-gradient(to right, #FE4A19, #982C0F) border-box",
          color: "#313149",
          padding: "5px 10px",
          border: "1px solid transparent",
          borderRadius: "55px",
          display: "inline-block",
          marginBottom: "32px",
        }}
      >
        <p
          style={{
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

          <p
            style={{
              fontWeight: "500",
              margin: "0",
              fontSize: "14px",
              color: "#FE4A19",
              textAlign: "left",
              lineHeight: "21px",
            }}
          >
            Free Home Solar Design – Requested by 
            <span style={{ fontWeight: 800 }}>180,000+</span> Homeowners
          </p>
        </p>
      </div>
      <h1
        style={{
          margin: "0",
          marginBottom: "32px",
        }}
        className="title-first-mobile"
      >
        See How Much Money You Could Save w/ This $0 Solar Program That Cuts
        Electric Bills by 30-50% – Instantly
      </h1>

      <div
        style={{
          display: "flex",
          gap: "24px",
          flexDirection: "column",
          maxWidth: "340px",
          textAlign: "left",
        }}
      >
        <div style={{ display: "flex", gap: "20px", alignItems: "start" }}>
          <img src="/icons/triple-lines.svg" alt="" />

          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              gap: "8px",
            }}
            className="intro-boolet-container"
          >
            <h2 style={{ margin: 0 }} className="intro-title-2">
              Easily Compare Utility vs Solar Costs
            </h2>
            <p style={{ margin: 0, color: "#475467" }}>Description 1</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "start" }}>
          <img src="/icons/triple-lines.svg" alt="" />

          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              gap: "8px",
            }}
            className="intro-boolet-container"
          >
            <h2 style={{ margin: 0 }} className="intro-title-2">
              Get a Free Custom Home Solar Design
            </h2>
            <p style={{ margin: 0, color: "#475467" }}>Description 2</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "start" }}>
          <img src="/icons/triple-lines.svg" alt="" />

          <div
            style={{
              display: "flex",
              alignItems: "start",
              flexDirection: "column",
              gap: "8px",
            }}
            className="intro-boolet-container"
          >
            <h2 style={{ margin: 0 }} className="intro-title-2">
              Watch a Personalized Video Explanation
            </h2>
            <p style={{ margin: 0, color: "#475467" }}>Description 3</p>
          </div>
        </div>

        <StartButton
          onClick={handleNextQuizNavigation}
          className="start-btn-desktop"
        />
      </div>
    </Container>
  );
};
