import React, { useEffect, useState } from "react";

import { Container } from "../components/container";
import { QualificationBanner } from "../components/qualification-banner";
import { StartButton } from "../components/strartButton";
import { IntroDescriptionItem } from "../components/introDescriptionItem";
import { introDescriptionBullets } from "../mop/intro-description-bullets";

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
      <QualificationBanner />

      <h1
        style={{
          margin: "0",
          marginBottom: "32px",
        }}
        className="title-intro-mobile title"
      >
        See How Much Money You Could Save w/ This $0 Solar Program That Cuts
        Electric Bills by 30-50% – Instantly
      </h1>

      <div className="intro-wrapper">
        {introDescriptionBullets.map((bullet) => (
          <IntroDescriptionItem
            key={bullet.title}
            title={bullet.title}
            description={bullet.description}
          />
        ))}

        <StartButton
          onClick={handleNextQuizNavigation}
          className="start-btn-desktop"
        />
      </div>
    </Container>
  );
};
