import React, { useEffect } from "react";

import { Container } from "../container";
import { QualificationBanner } from "../../components/QualificationBanner";
import { StartButton } from "../../components/ButtonStart";
import { IntroDescriptionItem } from "../../components/IntroDescription";
import { introDescriptionBullets } from "../../mop/introDescriptionBullets";

export const Intro = ({ handleNextQuizNavigation }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Container className="intro-container" style={{ padding: 0 }}>
      <QualificationBanner style={{ marginBottom: "32px" }} />

      <h1
        style={{
          margin: "0",
          marginBottom: "16px",
        }}
        className="title-intro title"
      >
        Find out if solar is worth it for your home in a matter of minutes.
        Ready to go?
      </h1>

      <div className="intro-wrapper">
        {introDescriptionBullets.map((bullet, idx) => (
          <IntroDescriptionItem key={idx} description={bullet.description} />
        ))}

        <StartButton
          onClick={handleNextQuizNavigation}
          className="start-btn-desktop"
        />
      </div>
    </Container>
  );
};
