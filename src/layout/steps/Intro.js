import React from "react";

import { Container } from "../container";
import { QualificationBanner } from "../../components/QualificationBanner";
import { StartButton } from "../../components/ButtonStart";
import { IntroDescriptionItem } from "../../components/IntroDescription";
import { introDescriptionBullets } from "../../mop/introDescriptionBullets";

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
        Find out if solar is worth it for your home in a matter of minutes.
        Ready to go?
      </h1>

      <div className="intro-wrapper">
        {introDescriptionBullets.map((bullet, idx) => (
          <IntroDescriptionItem
            key={bullet.idx}
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
