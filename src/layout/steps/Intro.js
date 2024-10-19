import React from "react";

import { Container } from "../container";
import { QualificationBanner } from "../../components/QualificationBanner";
import { StartButton } from "../../components/StrartButton";
import { IntroDescriptionItem } from "../../components/IntroDescriptionItem";
import { introDescriptionBullets } from "../../mop/intro-description-bullets";

export const Intro = ({ handleNextQuizNavigation }) => {
  return (
    <Container className="intro-container">
      <QualificationBanner />

      <h1
        style={{
          margin: "0",
          marginBottom: "32px",
          // textAlign: "left",
        }}
        className="title-intro title"
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
